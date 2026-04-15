import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import { randomUUID } from 'crypto'
import type { Hono, Context } from 'hono'

// --- Environment ---
const SAFI_API_URL = process.env.SAFI_API_URL || 'https://staging.api.safisense.com/api/v1'
const SAFI_API_KEY = process.env.SAFI_API_KEY
const COMPANY_ID = process.env.SAFI_COMPANY_ID
const DATA_DIR = process.env.DATA_DIR || process.cwd()
const SCHEDULES_FILE = join(DATA_DIR, 'schedules.json')
const HISTORY_FILE = join(DATA_DIR, 'upload_history.json')
const MAX_HISTORY = 500

// --- Boot-time validation ---
if (!SAFI_API_KEY) console.warn('[server] SAFI_API_KEY is not set — scheduler and production entry creation will fail')
if (!COMPANY_ID) console.warn('[server] SAFI_COMPANY_ID is not set')

// --- Time-range validation ---
const MAX_RANGE_DAYS = 31

function validateTimeRange(fromTs: unknown, toTs: unknown, opts: { unit?: 'iso' | 'unix' } = {}): string | null {
  const unit = opts.unit ?? 'iso'
  let from: Date, to: Date
  if (unit === 'unix') {
    const f = Number(fromTs), t = Number(toTs)
    if (!Number.isFinite(f) || !Number.isFinite(t)) return 'from_ts and to_ts must be numeric'
    from = new Date(f * 1000)
    to = new Date(t * 1000)
  } else {
    from = new Date(fromTs as string)
    to = new Date(toTs as string)
  }
  if (isNaN(from.getTime()) || isNaN(to.getTime())) return 'Invalid from_ts or to_ts'
  if (to <= from) return 'to_ts must be after from_ts'
  if (to.getTime() - from.getTime() > MAX_RANGE_DAYS * 24 * 3600 * 1000) return `Range exceeds ${MAX_RANGE_DAYS} days`
  return null
}

// --- Schedule persistence ---

interface Schedule {
  id: string
  source_device_id: string
  target_device_id: string
  frequency: 'daily' | 'weekly'
  time: string
  timezone: string
  divisor: number
  rounding: 'none' | 'integer' | 'one_decimal' | 'two_decimals'
  enabled: boolean
  created_at: string
  updated_at?: string
}

function loadSchedules(): Schedule[] {
  if (!existsSync(SCHEDULES_FILE)) return []
  try { return JSON.parse(readFileSync(SCHEDULES_FILE, 'utf-8')) } catch { return [] }
}

function saveSchedules(schedules: Schedule[]): void {
  writeFileSync(SCHEDULES_FILE, JSON.stringify(schedules, null, 2))
}

// --- Upload history persistence ---

interface HistoryEntry {
  id: string
  source: 'manual' | 'scheduled'
  schedule_id?: string
  source_device_id: string | null
  target_device_id: string
  from_ts: number
  to_ts: number
  total_energy: number | null
  waste_value: number | null
  divisor: number | null
  rounding: string | null
  api_status: number
  api_error: string | null
  created_at: string
}

function loadHistory(): HistoryEntry[] {
  if (!existsSync(HISTORY_FILE)) return []
  try { return JSON.parse(readFileSync(HISTORY_FILE, 'utf-8')) } catch { return [] }
}

function saveHistory(history: HistoryEntry[]): void {
  writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2))
}

function appendHistoryEntry(entry: HistoryEntry): HistoryEntry {
  const history = loadHistory()
  history.unshift(entry)
  if (history.length > MAX_HISTORY) history.length = MAX_HISTORY
  saveHistory(history)
  return entry
}

// --- Validation ---

const DEVICE_ID_RE = /^[a-zA-Z0-9_-]{1,128}$/
const SCHEDULE_PATCH_FIELDS = [
  'source_device_id', 'target_device_id', 'frequency', 'time', 'timezone', 'divisor', 'rounding', 'enabled',
] as const
const VALID_FREQUENCIES = new Set(['daily', 'weekly'])
const VALID_ROUNDINGS = new Set(['none', 'integer', 'one_decimal', 'two_decimals'])
const VALID_TIMEZONES = new Set([
  'America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York',
  'America/Anchorage', 'Pacific/Honolulu', 'UTC',
])
const DEFAULT_TIMEZONE = 'America/Los_Angeles'

function validateScheduleFields(fields: Record<string, unknown>, opts: { partial?: boolean } = {}): string | null {
  if (!opts.partial) {
    for (const k of ['source_device_id', 'target_device_id', 'frequency', 'time', 'divisor']) {
      if (fields[k] == null || fields[k] === '') return `${k} is required`
    }
  }
  if (fields.source_device_id != null && (typeof fields.source_device_id !== 'string' || !DEVICE_ID_RE.test(fields.source_device_id))) return 'invalid source_device_id'
  if (fields.target_device_id != null && (typeof fields.target_device_id !== 'string' || !DEVICE_ID_RE.test(fields.target_device_id))) return 'invalid target_device_id'
  if (fields.frequency != null && !VALID_FREQUENCIES.has(fields.frequency as string)) return 'frequency must be daily or weekly'
  if (fields.time != null && !/^\d{2}:\d{2}$/.test(fields.time as string)) return 'time must be HH:MM'
  if (fields.divisor != null) {
    const n = Number(fields.divisor)
    if (!Number.isFinite(n) || n <= 0) return 'divisor must be a positive number'
  }
  if (fields.rounding != null && !VALID_ROUNDINGS.has(fields.rounding as string)) return 'invalid rounding'
  if (fields.timezone != null && !VALID_TIMEZONES.has(fields.timezone as string)) return 'invalid timezone'
  if (fields.enabled != null && typeof fields.enabled !== 'boolean') return 'enabled must be boolean'
  return null
}

// --- Schedule execution engine ---

function applyRounding(value: number, rounding: string): number {
  switch (rounding) {
    case 'integer': return Math.round(value)
    case 'one_decimal': return Math.round(value * 10) / 10
    case 'two_decimals': return Math.round(value * 100) / 100
    default: return value
  }
}

function getNowInTimezone(tz: string): { time: string; dateKey: string } {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  })
  const parts = Object.fromEntries(fmt.formatToParts(new Date()).map(p => [p.type, p.value]))
  return {
    time: `${parts.hour}:${parts.minute}`,
    dateKey: `${parts.year}-${parts.month}-${parts.day}`,
  }
}

function localMidnightToUtcMs(year: number, month: number, day: number, tz: string): number {
  const approx = new Date(Date.UTC(year, month - 1, day, 12))
  const localStr = approx.toLocaleString('en-US', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  })
  const match = localStr.match(/(\d+)\/(\d+)\/(\d+),?\s+(\d+):(\d+):(\d+)/)
  if (!match) return approx.getTime()
  const localDate = new Date(Date.UTC(+match[3], +match[1] - 1, +match[2], +match[4], +match[5], +match[6]))
  const offsetMs = localDate.getTime() - approx.getTime()
  return Date.UTC(year, month - 1, day) - offsetMs
}

function getYesterdayRangeMs(tz: string = DEFAULT_TIMEZONE): { fromMs: number; toMs: number } {
  const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' })
  const todayStr = fmt.format(new Date())
  const [y, m, d] = todayStr.split('-').map(Number)
  const midnightYesterday = localMidnightToUtcMs(y, m, d - 1, tz)
  const midnightToday = localMidnightToUtcMs(y, m, d, tz)
  return { fromMs: midnightYesterday, toMs: midnightToday }
}

async function executeSchedule(schedule: Schedule): Promise<{ skipped?: boolean; reason?: string; status?: number; entry_id?: string | null; energy?: number | null; waste?: number | null; error?: string | null }> {
  const { id: scheduleId, source_device_id, target_device_id, divisor, rounding, timezone } = schedule
  const tz = timezone || DEFAULT_TIMEZONE
  const { fromMs, toMs } = getYesterdayRangeMs(tz)

  // Check for duplicate
  const history = loadHistory()
  const alreadyCreated = history.find(h =>
    h.target_device_id === target_device_id &&
    h.from_ts === fromMs &&
    h.to_ts === toMs &&
    h.api_status === 201
  )
  if (alreadyCreated) {
    console.log(`[scheduler] Entry already exists for ${target_device_id} ${fromMs}-${toMs} — skipping.`)
    return { skipped: true, reason: 'already_created' }
  }

  // Fetch energy for source device
  const energyUrl = `${SAFI_API_URL}/devices/energy?company_id=${COMPANY_ID}&from_ts=${fromMs}&to_ts=${toMs}&group_by=day`
  const energyRes = await fetch(energyUrl, { headers: { 'api-key': SAFI_API_KEY! } })
  if (!energyRes.ok) throw new Error(`Energy fetch failed: ${energyRes.status}`)
  const energyData = await energyRes.json() as { data?: Array<{ deviceid: string; energy: { total: number | null } }> }

  const devices = energyData.data ?? (energyData as unknown as Array<{ deviceid: string; energy: { total: number | null } }>)
  const sourceDevice = (Array.isArray(devices) ? devices : []).find(d => d.deviceid === source_device_id)
  const totalEnergy = sourceDevice?.energy?.total ?? null

  if (totalEnergy == null) {
    console.log(`[scheduler] No energy data for ${source_device_id} — skipping.`)
    return { skipped: true, reason: 'no_energy_data' }
  }

  // Compute waste
  const wasteValue = divisor > 0 ? applyRounding(totalEnergy / divisor, rounding || 'integer') : null

  // Create production entry via SAFI API
  const safiBody: Record<string, unknown> = { device_id: target_device_id, from_ts: fromMs, to_ts: toMs }
  if (wasteValue != null) safiBody.waste_qty = wasteValue

  const createRes = await fetch(`${SAFI_API_URL}/production-entries?company_id=${COMPANY_ID}`, {
    method: 'POST',
    headers: { 'api-key': SAFI_API_KEY!, 'Content-Type': 'application/json' },
    body: JSON.stringify(safiBody),
  })
  const createData = await createRes.json() as { id?: string; message?: string }

  const result = {
    status: createRes.status,
    entry_id: createData.id ?? null,
    energy: totalEnergy,
    waste: wasteValue,
    error: createRes.ok ? null : (createData.message || `HTTP ${createRes.status}`),
  }

  appendHistoryEntry({
    id: createData.id ?? `sched-${Date.now()}`,
    source: 'scheduled',
    schedule_id: scheduleId,
    source_device_id,
    target_device_id,
    from_ts: fromMs,
    to_ts: toMs,
    total_energy: totalEnergy,
    waste_value: wasteValue,
    divisor,
    rounding: rounding || 'integer',
    api_status: createRes.status,
    api_error: result.error,
    created_at: new Date().toISOString(),
  })

  return result
}

// --- Hono routes ---

export default function customServer(app: Hono): void {
  // --- Upload history ---
  app.get('/api/upload-history', (c: Context) => {
    return c.json(loadHistory())
  })

  app.delete('/api/upload-history', (c: Context) => {
    saveHistory([])
    return c.json({ cleared: true })
  })

  // --- Production entries ---
  app.post('/api/production-entries', async (c: Context) => {
    const body = await c.req.json() as Record<string, unknown>
    const { device_id, from_ts, to_ts, waste, source_device_id, divisor, rounding, total_energy } = body

    if (!device_id || typeof device_id !== 'string' || from_ts == null || to_ts == null) {
      return c.json({ error: 'device_id, from_ts, and to_ts are required' }, 400)
    }
    if (!DEVICE_ID_RE.test(device_id)) return c.json({ error: 'Invalid device_id format' }, 400)
    if (source_device_id && typeof source_device_id === 'string' && !DEVICE_ID_RE.test(source_device_id)) {
      return c.json({ error: 'Invalid source_device_id format' }, 400)
    }
    const rangeError = validateTimeRange(from_ts, to_ts, { unit: 'unix' })
    if (rangeError) return c.json({ error: rangeError }, 400)

    try {
      const fromMs = (from_ts as number) < 1e12 ? (from_ts as number) * 1000 : (from_ts as number)
      const toMs = (to_ts as number) < 1e12 ? (to_ts as number) * 1000 : (to_ts as number)
      const safiBody: Record<string, unknown> = { device_id, from_ts: fromMs, to_ts: toMs }
      const wasteObj = waste as { wasted?: number } | undefined
      const wasteValue = wasteObj?.wasted != null ? Number(wasteObj.wasted) : null
      if (wasteValue != null) safiBody.waste_qty = wasteValue

      const response = await fetch(`${SAFI_API_URL}/production-entries?company_id=${COMPANY_ID}`, {
        method: 'POST',
        headers: { 'api-key': SAFI_API_KEY!, 'Content-Type': 'application/json' },
        body: JSON.stringify(safiBody),
      })
      const data = await response.json() as { id?: string; message?: string }

      appendHistoryEntry({
        id: data.id ?? `local-${Date.now()}`,
        source: 'manual',
        source_device_id: (source_device_id as string) || null,
        target_device_id: device_id,
        from_ts: fromMs,
        to_ts: toMs,
        total_energy: (total_energy as number) ?? null,
        waste_value: wasteValue,
        divisor: (divisor as number) ?? null,
        rounding: (rounding as string) ?? null,
        api_status: response.status,
        api_error: response.ok ? null : (data.message || `HTTP ${response.status}`),
        created_at: new Date().toISOString(),
      })

      return c.json(data, response.status as 200)
    } catch {
      return c.json({ error: 'Failed to create production entry' }, 502)
    }
  })

  app.get('/api/production-entries/:id', async (c: Context) => {
    const id = c.req.param('id') ?? ''
    if (!/^[a-zA-Z0-9_-]{1,64}$/.test(id)) {
      return c.json({ error: 'Invalid id' }, 400)
    }
    try {
      const response = await fetch(`${SAFI_API_URL}/production-entries/${id}?company_id=${COMPANY_ID}`, {
        headers: { 'api-key': SAFI_API_KEY! },
      })
      const data = await response.json()
      return c.json(data)
    } catch {
      return c.json({ error: 'Failed to fetch production entry' }, 502)
    }
  })

  // --- Schedules CRUD ---
  app.get('/api/schedules', (c: Context) => {
    return c.json(loadSchedules())
  })

  app.post('/api/schedules', async (c: Context) => {
    const body = await c.req.json() as Record<string, unknown>
    const err = validateScheduleFields(body)
    if (err) return c.json({ error: err }, 400)
    const schedules = loadSchedules()
    const schedule: Schedule = {
      id: randomUUID(),
      source_device_id: body.source_device_id as string,
      target_device_id: body.target_device_id as string,
      frequency: body.frequency as Schedule['frequency'],
      time: body.time as string,
      timezone: (body.timezone as string) ?? DEFAULT_TIMEZONE,
      divisor: Number(body.divisor),
      rounding: (body.rounding as Schedule['rounding']) ?? 'none',
      enabled: (body.enabled as boolean) ?? true,
      created_at: new Date().toISOString(),
    }
    schedules.push(schedule)
    saveSchedules(schedules)
    return c.json(schedule)
  })

  app.patch('/api/schedules/:id', async (c: Context) => {
    const schedules = loadSchedules()
    const idx = schedules.findIndex(s => s.id === c.req.param('id'))
    if (idx === -1) return c.json({ error: 'Schedule not found' }, 404)
    const body = await c.req.json() as Record<string, unknown>
    const patch: Record<string, unknown> = {}
    for (const key of SCHEDULE_PATCH_FIELDS) {
      if (Object.prototype.hasOwnProperty.call(body, key)) patch[key] = body[key]
    }
    const err = validateScheduleFields(patch, { partial: true })
    if (err) return c.json({ error: err }, 400)
    schedules[idx] = { ...schedules[idx], ...patch, updated_at: new Date().toISOString() } as Schedule
    saveSchedules(schedules)
    return c.json(schedules[idx])
  })

  app.delete('/api/schedules/:id', (c: Context) => {
    const schedules = loadSchedules()
    const idx = schedules.findIndex(s => s.id === c.req.param('id'))
    if (idx === -1) return c.json({ error: 'Schedule not found' }, 404)
    const removed = schedules.splice(idx, 1)[0]
    saveSchedules(schedules)
    return c.json(removed)
  })

  // --- Manual schedule trigger ---
  app.post('/api/schedules/:id/run', async (c: Context) => {
    const schedules = loadSchedules()
    const sched = schedules.find(s => s.id === c.req.param('id'))
    if (!sched) return c.json({ error: 'Schedule not found' }, 404)
    try {
      const result = await executeSchedule(sched)
      return c.json(result)
    } catch (err) {
      return c.json({ error: (err as Error).message }, 502)
    }
  })

  // --- Scheduler interval (runs every 60s) ---
  const schedulerState: { lastRunDate: Record<string, string> } = { lastRunDate: {} }

  setInterval(async () => {
    const schedules = loadSchedules()
    for (const sched of schedules) {
      if (!sched.enabled) continue
      const tz = sched.timezone || DEFAULT_TIMEZONE
      const { time: currentTime, dateKey: todayKey } = getNowInTimezone(tz)
      if (sched.time !== currentTime) continue
      if (schedulerState.lastRunDate[sched.id] === todayKey) continue

      schedulerState.lastRunDate[sched.id] = todayKey
      console.log(`[scheduler] Executing schedule ${sched.id} (${sched.source_device_id} → ${sched.target_device_id}) at ${currentTime} ${tz}`)
      try {
        const result = await executeSchedule(sched)
        if (result.skipped) {
          console.log(`[scheduler] Skipped: ${result.reason}`)
        } else if (result.error) {
          console.error(`[scheduler] SAFI error: ${result.error}`)
        } else {
          console.log(`[scheduler] Created entry ${result.entry_id}, energy=${result.energy}, waste=${result.waste}`)
        }
      } catch (err) {
        console.error(`[scheduler] Failed:`, (err as Error).message)
      }
    }
  }, 60_000)

  console.log('[server] Custom routes loaded (schedules, upload history, production entries)')
}
