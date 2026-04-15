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
// Demo mode: skip SAFI network calls and synthesize deterministic energy/entries.
const DEMO_MODE = process.env.DEMO_MODE === 'true'
// Dev bypass: expose api-key-authenticated /api/dev/* reads so local devs can use
// real SAFI staging data without a Guidewheel session access token. Never true in prod.
const DEV_BYPASS = process.env.FD_DEV_BYPASS === 'true'

// --- Boot-time validation ---
if (DEMO_MODE) {
  console.log('[server] DEMO_MODE=true — SAFI calls are mocked with synthetic data')
} else {
  // User-initiated reads/writes go through the framework's /api/safi/* proxy
  // using the session's Bearer access token. SAFI_API_KEY is still needed for:
  //  - the background scheduler (runs without a user session)
  //  - /api/dev/* routes when FD_DEV_BYPASS=true for local dev
  if (!SAFI_API_KEY) console.warn('[server] SAFI_API_KEY is not set — scheduler will fail')
  if (!COMPANY_ID) console.warn('[server] SAFI_COMPANY_ID is not set (needed for scheduler/api-key paths)')
}

// --- Demo data (mirrors src/api.ts DEMO_DEVICES) ---
const DEMO_DEVICE_IDS = [
  'demo-extruder-01', 'demo-extruder-02', 'demo-press-01', 'demo-press-02',
  'demo-scrap-chopper', 'demo-regrind-mill', 'demo-production-totalizer', 'demo-waste-totalizer',
]

function demoEnergyFor(deviceId: string, fromMs: number, toMs: number): number {
  const hours = Math.max(1, (toMs - fromMs) / 3_600_000)
  let seed = 0
  for (let i = 0; i < deviceId.length; i++) seed = (seed * 31 + deviceId.charCodeAt(i)) >>> 0
  const baseKwhPerHour = 4 + (seed % 20)
  const jitter = ((seed >>> 8) % 100) / 1000
  return Math.round(baseKwhPerHour * hours * (1 + jitter) * 100) / 100
}

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

// --- Data model ---

type Rounding = 'none' | 'integer' | 'one_decimal' | 'two_decimals'

interface SourceConfig {
  device_id: string
  divisor: number
  rounding: Rounding
}

interface Schedule {
  id: string
  target_device_id: string
  production_source: SourceConfig | null
  waste_source: SourceConfig | null
  frequency: 'daily' | 'weekly'
  time: string
  timezone: string
  enabled: boolean
  created_at: string
  updated_at?: string
}

interface HistoryEntry {
  id: string
  source: 'manual' | 'scheduled'
  schedule_id?: string
  target_device_id: string
  from_ts: number
  to_ts: number
  production_source: SourceConfig | null
  production_energy: number | null
  production_value: number | null
  waste_source: SourceConfig | null
  waste_energy: number | null
  waste_value: number | null
  api_status: number
  api_error: string | null
  created_at: string
}

// --- Schedule persistence ---

function loadSchedules(): Schedule[] {
  if (!existsSync(SCHEDULES_FILE)) return []
  try { return JSON.parse(readFileSync(SCHEDULES_FILE, 'utf-8')) } catch { return [] }
}

function saveSchedules(schedules: Schedule[]): void {
  writeFileSync(SCHEDULES_FILE, JSON.stringify(schedules, null, 2))
}

// --- Upload history persistence ---

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
const VALID_FREQUENCIES = new Set(['daily', 'weekly'])
const VALID_ROUNDINGS = new Set<Rounding>(['none', 'integer', 'one_decimal', 'two_decimals'])
const VALID_TIMEZONES = new Set([
  'America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York',
  'America/Anchorage', 'Pacific/Honolulu', 'UTC',
])
const DEFAULT_TIMEZONE = 'America/Los_Angeles'

function validateSourceConfig(src: unknown, field: string): string | null {
  if (src == null) return null
  if (typeof src !== 'object') return `${field} must be an object`
  const s = src as Record<string, unknown>
  if (typeof s.device_id !== 'string' || !DEVICE_ID_RE.test(s.device_id)) return `invalid ${field}.device_id`
  const div = Number(s.divisor)
  if (!Number.isFinite(div) || div <= 0) return `${field}.divisor must be a positive number`
  if (s.rounding != null && !VALID_ROUNDINGS.has(s.rounding as Rounding)) return `invalid ${field}.rounding`
  return null
}

function normalizeSourceConfig(src: unknown): SourceConfig | null {
  if (src == null) return null
  const s = src as Record<string, unknown>
  return {
    device_id: s.device_id as string,
    divisor: Number(s.divisor),
    rounding: (s.rounding as Rounding) ?? 'none',
  }
}

function validateScheduleFields(fields: Record<string, unknown>, opts: { partial?: boolean } = {}): string | null {
  if (!opts.partial) {
    if (fields.target_device_id == null || fields.target_device_id === '') return 'target_device_id is required'
    if (fields.frequency == null || fields.frequency === '') return 'frequency is required'
    if (fields.time == null || fields.time === '') return 'time is required'
    if (fields.production_source == null && fields.waste_source == null) {
      return 'at least one of production_source or waste_source is required'
    }
  }
  if (fields.target_device_id != null && (typeof fields.target_device_id !== 'string' || !DEVICE_ID_RE.test(fields.target_device_id))) {
    return 'invalid target_device_id'
  }
  if (fields.frequency != null && !VALID_FREQUENCIES.has(fields.frequency as string)) return 'frequency must be daily or weekly'
  if (fields.time != null && !/^\d{2}:\d{2}$/.test(fields.time as string)) return 'time must be HH:MM'
  if (fields.timezone != null && !VALID_TIMEZONES.has(fields.timezone as string)) return 'invalid timezone'
  if (fields.enabled != null && typeof fields.enabled !== 'boolean') return 'enabled must be boolean'
  if (Object.prototype.hasOwnProperty.call(fields, 'production_source')) {
    const err = validateSourceConfig(fields.production_source, 'production_source')
    if (err) return err
  }
  if (Object.prototype.hasOwnProperty.call(fields, 'waste_source')) {
    const err = validateSourceConfig(fields.waste_source, 'waste_source')
    if (err) return err
  }
  return null
}

// --- Schedule execution engine ---

function applyRounding(value: number, rounding: Rounding): number {
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

interface EnergyRow { deviceid: string; energy: { total: number | null } }

interface OverlapConflict { id: unknown; from_ts: number; to_ts: number }

// Look up SAFI production entries on a device that overlap [fromMs, toMs].
// Used to enrich 409 "duplicate entry" responses with the actual culprits.
// Uses api-key auth — SAFI staging doesn't accept Bearer tokens.
async function fetchOverlappingEntries(
  deviceId: string,
  fromMs: number,
  toMs: number,
): Promise<OverlapConflict[]> {
  if (DEMO_MODE) return []
  if (!SAFI_API_KEY) return []
  const lookbackDays = 2
  const lookaheadDays = 2
  // SAFI staging doesn't accept Bearer tokens yet — use api-key + company_id
  // for all SAFI calls (same as fetchDevices / fetchEnergy).
  const qs = new URLSearchParams({
    device_id: deviceId,
    from_ts: String(fromMs - lookbackDays * 86_400_000),
    to_ts: String(toMs + lookaheadDays * 86_400_000),
    company_id: COMPANY_ID ?? '',
  })
  const headers = { 'api-key': SAFI_API_KEY }
  try {
    const res = await fetch(`${SAFI_API_URL}/production-entries?${qs}`, { headers })
    if (!res.ok) return []
    const json = await res.json() as { data?: unknown[] } | unknown[]
    const rows = Array.isArray(json) ? json : (json.data ?? [])
    const asMs = (v: unknown): number => {
      if (typeof v === 'number') return v < 1e12 ? v * 1000 : v
      if (typeof v === 'string') {
        // SAFI sometimes serializes epoch-ms as a numeric string.
        if (/^\d+$/.test(v)) {
          const n = Number(v)
          return Number.isFinite(n) ? (n < 1e12 ? n * 1000 : n) : 0
        }
        const parsed = Date.parse(v)
        return Number.isFinite(parsed) ? parsed : 0
      }
      return 0
    }
    return (rows as Array<Record<string, unknown>>)
      .map(e => {
        const duration = (e.duration as Record<string, Record<string, unknown>> | undefined) ?? {}
        const scheduled = duration.scheduled ?? {}
        const production = duration.production ?? {}
        const efrom = asMs(e.from_ts ?? e.fromts ?? e.timestamp ?? scheduled.from ?? production.from)
        const eto = asMs(e.to_ts ?? e.tots ?? scheduled.to ?? production.to)
        return { id: e.id, from_ts: efrom, to_ts: eto }
      })
      .filter(e => e.from_ts && e.to_ts && e.from_ts < toMs && e.to_ts > fromMs)
      .slice(0, 20)
  } catch (err) {
    console.error('[overlap-lookup] failed:', (err as Error).message)
    return []
  }
}

function formatOverlapTs(ms: number, tz: string): string {
  // Human-readable "MMM D, YYYY h:mm A" in the target timezone.
  try {
    return new Date(ms).toLocaleString('en-US', {
      timeZone: tz,
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  } catch {
    return new Date(ms).toISOString()
  }
}

function formatOverlapSummary(overlaps: OverlapConflict[], tz: string): string {
  return overlaps
    .map(o => `${String(o.id).slice(0, 8)} ${formatOverlapTs(o.from_ts, tz)} → ${formatOverlapTs(o.to_ts, tz)}`)
    .join('; ')
}

async function fetchEnergyForRange(fromMs: number, toMs: number): Promise<EnergyRow[]> {
  if (DEMO_MODE) {
    return DEMO_DEVICE_IDS.map(id => ({ deviceid: id, energy: { total: demoEnergyFor(id, fromMs, toMs) } }))
  }
  const url = `${SAFI_API_URL}/devices/energy?company_id=${COMPANY_ID}&from_ts=${fromMs}&to_ts=${toMs}&group_by=day`
  const res = await fetch(url, { headers: { 'api-key': SAFI_API_KEY! } })
  if (!res.ok) throw new Error(`Energy fetch failed: ${res.status}`)
  const data = await res.json() as { data?: EnergyRow[] } | EnergyRow[]
  const rows = Array.isArray(data) ? data : (data.data ?? [])
  return rows
}

function computeSourceValue(rows: EnergyRow[], src: SourceConfig | null): { energy: number | null; value: number | null } {
  if (!src) return { energy: null, value: null }
  const row = rows.find(r => r.deviceid === src.device_id)
  const energy = row?.energy?.total ?? null
  if (energy == null) return { energy: null, value: null }
  const value = src.divisor > 0 ? applyRounding(energy / src.divisor, src.rounding || 'none') : null
  return { energy, value }
}

async function executeSchedule(
  schedule: Schedule,
): Promise<{ skipped?: boolean; reason?: string; status?: number; entry_id?: string | null; production_energy?: number | null; production_value?: number | null; waste_energy?: number | null; waste_value?: number | null; error?: string | null; conflicts?: OverlapConflict[]; timezone?: string }> {
  const { id: scheduleId, target_device_id, production_source, waste_source, timezone } = schedule
  const tz = timezone || DEFAULT_TIMEZONE
  const { fromMs, toMs } = getYesterdayRangeMs(tz)

  // No history-based duplicate check — local history can drift from SAFI
  // (entries get deleted, container state resets, etc.). SAFI's 409 is the
  // source of truth for "already exists." The 60s-interval runner has its own
  // in-memory `lastRunDate` guard to prevent the same-minute from firing twice
  // within a single process lifetime.

  // Fetch energy once for all sources
  const rows = await fetchEnergyForRange(fromMs, toMs)
  const prod = computeSourceValue(rows, production_source)
  const waste = computeSourceValue(rows, waste_source)

  if (prod.value == null && waste.value == null) {
    console.log(`[scheduler] No energy data for ${schedule.id} — skipping.`)
    return { skipped: true, reason: 'no_energy_data' }
  }

  // Create production entry via SAFI API (or synthesize in demo mode)
  const safiBody: Record<string, unknown> = { device_id: target_device_id, from_ts: fromMs, to_ts: toMs }
  if (prod.value != null) safiBody.production_qty = prod.value
  if (waste.value != null) safiBody.waste_qty = waste.value

  let createRes: { status: number; ok: boolean }
  let createData: { id?: string; message?: string }
  let historyError: string | null = null
  let conflicts: OverlapConflict[] = []
  if (DEMO_MODE) {
    createRes = { status: 201, ok: true }
    createData = { id: `demo-sched-${randomUUID()}` }
  } else {
    const res = await fetch(`${SAFI_API_URL}/production-entries?company_id=${COMPANY_ID}`, {
      method: 'POST',
      headers: { 'api-key': SAFI_API_KEY!, 'Content-Type': 'application/json' },
      body: JSON.stringify(safiBody),
    })
    createRes = { status: res.status, ok: res.ok }
    createData = await res.json() as { id?: string; message?: string }
    if (!res.ok) historyError = createData.message || `HTTP ${res.status}`

    // On 409, enrich the error with the existing overlapping entries so the
    // Run Now UI can show which entries are blocking.
    if (res.status === 409) {
      conflicts = await fetchOverlappingEntries(target_device_id, fromMs, toMs)
      if (conflicts.length > 0) {
        historyError = `${conflicts.length} overlapping entry(ies) on device`
      }
    }
  }

  const result = {
    status: createRes.status,
    entry_id: createData.id ?? null,
    production_energy: prod.energy,
    production_value: prod.value,
    waste_energy: waste.energy,
    waste_value: waste.value,
    error: createRes.ok ? null : (createData.message || `HTTP ${createRes.status}`),
    conflicts: conflicts.length > 0 ? conflicts : undefined,
    timezone: tz,
  }

  appendHistoryEntry({
    id: createData.id ?? `sched-${Date.now()}`,
    source: 'scheduled',
    schedule_id: scheduleId,
    target_device_id,
    from_ts: fromMs,
    to_ts: toMs,
    production_source,
    production_energy: prod.energy,
    production_value: prod.value,
    waste_source,
    waste_energy: waste.energy,
    waste_value: waste.value,
    api_status: createRes.status,
    api_error: createRes.ok ? null : (historyError ?? `HTTP ${createRes.status}`),
    created_at: new Date().toISOString(),
  })

  return result
}

// --- Hono routes ---

export default function customServer(app: Hono): void {
  // --- Request logger ---
  // Logs every request with path, whether it carried a launch_token, whether the
  // fd_session cookie was present, and the final response status. This lets us
  // diagnose the iframe launch flow: dataViz opens /?launch_token=XYZ → fd-app
  // middleware exchanges it with dataProxy → sets fd_session cookie → 302 redirects
  // to /. If the cookie fails to persist (third-party cookie block in iframe) we
  // see back-to-back launches with no cookie on the second request.
  app.use('*', async (c, next) => {
    const url = new URL(c.req.url)
    const hasLaunchToken = url.searchParams.has('launch_token')
    const cookieHeader = c.req.header('cookie') ?? ''
    const hasSession = cookieHeader.includes('fd_session=')
    const referer = c.req.header('referer') ?? '-'
    const proto = c.req.header('x-forwarded-proto') ?? 'http'
    const secFetchDest = c.req.header('sec-fetch-dest') ?? '-'
    const secFetchMode = c.req.header('sec-fetch-mode') ?? '-'
    const secFetchSite = c.req.header('sec-fetch-site') ?? '-'
    await next()
    // Skip only favicon + healthz to keep logs actionable. We want to see assets.
    const path = url.pathname
    if (path === '/favicon.ico' || path === '/healthz') return
    const setCookieHdr = c.res.headers.get('set-cookie') ?? ''
    const setSession = setCookieHdr.includes('fd_session=') ? 'set' : '-'
    console.log(
      `[req] ${c.req.method} ${path} status=${c.res.status} launch=${hasLaunchToken ? 'yes' : 'no'} session=${hasSession ? 'yes' : 'no'} setCookie=${setSession} proto=${proto} dest=${secFetchDest} mode=${secFetchMode} site=${secFetchSite} ref=${referer.slice(0, 80)}`,
    )
  })

  // --- Client diagnostic trace endpoint ---
  // The SPA posts beacons here to trace its lifecycle (module load, render,
  // mount). Useful when the iframe is being torn down before the app can make
  // a normal API call like /api/session, so we can see how far the JS got.
  app.post('/api/debug/trace', async (c: Context) => {
    try {
      const text = await c.req.text()
      console.log(`[client-trace] ${text.slice(0, 300)}`)
    } catch (err) {
      console.log(`[client-trace] parse-error: ${(err as Error).message}`)
    }
    return c.body(null, 204)
  })

  // --- SAFI device/energy proxy (api-key auth) ---
  // SAFI staging's read endpoints don't accept JWT Bearer tokens yet — they
  // return 401 "No API key found in request" which causes the fd-app client
  // helper to fire bridge.notifySessionExpired() and re-launch the iframe
  // (causing an infinite reload loop). Until SAFI accepts Bearer auth
  // everywhere, we route client reads through these custom routes that use
  // the server-side SAFI_API_KEY + company_id.
  //
  // The framework's /api/safi/* proxy (Bearer auth) is still registered for
  // endpoints that may already accept JWT, but our client uses these api-key
  // routes for devices + energy.
  const safiHeaders = () => ({ 'api-key': SAFI_API_KEY ?? '' })
  app.get('/api/devices', async (c: Context) => {
    if (DEMO_MODE) return c.json({ data: DEMO_DEVICE_IDS.map(id => ({ deviceid: id, nickname: id, status: 'online' })) })
    if (!SAFI_API_KEY) return c.json({ error: 'SAFI_API_KEY not configured' }, 500)
    try {
      const url = `${SAFI_API_URL}/devices?company_id=${COMPANY_ID}`
      const res = await fetch(url, { headers: safiHeaders() })
      const data = await res.json() as unknown
      return c.json(data as Record<string, unknown>, res.status as 200)
    } catch (err) {
      return c.json({ error: (err as Error).message }, 502)
    }
  })
  app.get('/api/devices/energy', async (c: Context) => {
    if (DEMO_MODE) {
      const fromMs = Number(c.req.query('from_ts') ?? Date.now())
      const toMs = Number(c.req.query('to_ts') ?? Date.now())
      const data = DEMO_DEVICE_IDS.map(id => {
        const total = demoEnergyFor(id, fromMs, toMs)
        return {
          deviceid: id,
          fromts: new Date(fromMs).toISOString(),
          tots: new Date(toMs).toISOString(),
          energy: {
            online: Math.round(total * 0.8 * 100) / 100,
            idle: Math.round(total * 0.15 * 100) / 100,
            offline: Math.round(total * 0.05 * 100) / 100,
            total,
          },
        }
      })
      return c.json({ data })
    }
    if (!SAFI_API_KEY) return c.json({ error: 'SAFI_API_KEY not configured' }, 500)
    const qs = new URLSearchParams(c.req.query() as Record<string, string>)
    qs.set('company_id', COMPANY_ID ?? '')
    try {
      const url = `${SAFI_API_URL}/devices/energy?${qs.toString()}`
      const res = await fetch(url, { headers: safiHeaders() })
      const data = await res.json() as unknown
      return c.json(data as Record<string, unknown>, res.status as 200)
    } catch (err) {
      return c.json({ error: (err as Error).message }, 502)
    }
  })

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
    // SAFI staging doesn't accept JWT Bearer tokens yet — writes go through
    // the server-side SAFI_API_KEY + company_id, same as device reads.
    // Auth at the app boundary is enforced by fd-app's session middleware.
    const body = await c.req.json() as Record<string, unknown>
    const { device_id, from_ts, to_ts, production, waste, timezone } = body
    const manualTz = typeof timezone === 'string' && timezone ? timezone : DEFAULT_TIMEZONE

    if (!device_id || typeof device_id !== 'string' || from_ts == null || to_ts == null) {
      return c.json({ error: 'device_id, from_ts, and to_ts are required' }, 400)
    }
    if (!DEVICE_ID_RE.test(device_id)) return c.json({ error: 'Invalid device_id format' }, 400)
    const rangeError = validateTimeRange(from_ts, to_ts, { unit: 'unix' })
    if (rangeError) return c.json({ error: rangeError }, 400)

    type LegValue = { value: number | null; energy: number | null; source: SourceConfig | null }
    const parseLeg = (leg: unknown, name: string): LegValue | { error: string } => {
      if (leg == null) return { value: null, energy: null, source: null }
      if (typeof leg !== 'object') return { error: `${name} must be an object` }
      const l = leg as Record<string, unknown>
      const value = l.value != null ? Number(l.value) : null
      if (value != null && !Number.isFinite(value)) return { error: `${name}.value must be numeric` }
      const energy = l.energy != null ? Number(l.energy) : null
      let source: SourceConfig | null = null
      if (l.source != null) {
        const err = validateSourceConfig(l.source, `${name}.source`)
        if (err) return { error: err }
        source = normalizeSourceConfig(l.source)
      }
      return { value, energy, source }
    }

    const prodParsed = parseLeg(production, 'production')
    if ('error' in prodParsed) return c.json({ error: prodParsed.error }, 400)
    const wasteParsed = parseLeg(waste, 'waste')
    if ('error' in wasteParsed) return c.json({ error: wasteParsed.error }, 400)

    if (prodParsed.value == null && wasteParsed.value == null) {
      return c.json({ error: 'At least one of production.value or waste.value is required' }, 400)
    }

    try {
      const fromMs = (from_ts as number) < 1e12 ? (from_ts as number) * 1000 : (from_ts as number)
      const toMs = (to_ts as number) < 1e12 ? (to_ts as number) * 1000 : (to_ts as number)
      const safiBody: Record<string, unknown> = { device_id, from_ts: fromMs, to_ts: toMs }
      if (prodParsed.value != null) safiBody.production_qty = prodParsed.value
      if (wasteParsed.value != null) safiBody.waste_qty = wasteParsed.value

      let response: { status: number; ok: boolean }
      let data: { id?: string; message?: string; conflicts?: unknown[] }
      // Short form of the error for upload history (keeps the badge readable).
      let historyError: string | null = null
      if (DEMO_MODE) {
        response = { status: 201, ok: true }
        data = { id: `demo-${randomUUID()}` }
      } else {
        if (!SAFI_API_KEY) return c.json({ error: 'SAFI_API_KEY not configured' }, 500)
        const safiUrl = `${SAFI_API_URL}/production-entries?company_id=${COMPANY_ID}`
        const res = await fetch(safiUrl, {
          method: 'POST',
          headers: { 'api-key': SAFI_API_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify(safiBody),
        })
        response = { status: res.status, ok: res.ok }
        data = await res.json() as { id?: string; message?: string }
        if (!res.ok) historyError = data.message || `HTTP ${res.status}`

        // On SAFI 409 (unique-key conflict), fetch the existing entries that overlap
        // the requested window and surface them to the client. SAFI treats this as an
        // "overlap" constraint, not strict equality — e.g. 8-hour shift entries will
        // block a 24-hour entry covering the same day. Listing the conflicts lets the
        // user decide whether to delete them or pick a different target device.
        if (res.status === 409) {
          const overlaps = await fetchOverlappingEntries(device_id, fromMs, toMs)
          data.conflicts = overlaps
          ;(data as Record<string, unknown>).timezone = manualTz
          if (overlaps.length > 0) {
            historyError = `${overlaps.length} overlapping entry(ies) on device`
          }
        }
      }

      appendHistoryEntry({
        id: data.id ?? `local-${Date.now()}`,
        source: 'manual',
        target_device_id: device_id,
        from_ts: fromMs,
        to_ts: toMs,
        production_source: prodParsed.source,
        production_energy: prodParsed.energy,
        production_value: prodParsed.value,
        waste_source: wasteParsed.source,
        waste_energy: wasteParsed.energy,
        waste_value: wasteParsed.value,
        api_status: response.status,
        api_error: response.ok ? null : (historyError ?? `HTTP ${response.status}`),
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
    if (DEMO_MODE) {
      const entry = loadHistory().find(h => h.id === id)
      if (!entry) return c.json({ error: 'Not found' }, 404)
      return c.json({
        id: entry.id,
        device_id: entry.target_device_id,
        timestamp: entry.from_ts,
        to_ts: entry.to_ts,
        production: { produced: entry.production_value },
        waste: { wasted: entry.waste_value },
        created_at: entry.created_at,
        status: 'created',
      })
    }
    // SAFI staging doesn't accept JWT Bearer tokens — use api-key + company_id
    // like the rest of our SAFI calls.
    if (!SAFI_API_KEY) return c.json({ error: 'SAFI_API_KEY not configured' }, 500)
    try {
      const url = `${SAFI_API_URL}/production-entries/${id}?company_id=${COMPANY_ID}`
      const response = await fetch(url, { headers: { 'api-key': SAFI_API_KEY } })
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
      target_device_id: body.target_device_id as string,
      production_source: normalizeSourceConfig(body.production_source),
      waste_source: normalizeSourceConfig(body.waste_source),
      frequency: body.frequency as Schedule['frequency'],
      time: body.time as string,
      timezone: (body.timezone as string) ?? DEFAULT_TIMEZONE,
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
    const patchableFields = ['target_device_id', 'production_source', 'waste_source', 'frequency', 'time', 'timezone', 'enabled'] as const
    const patch: Record<string, unknown> = {}
    for (const key of patchableFields) {
      if (Object.prototype.hasOwnProperty.call(body, key)) patch[key] = body[key]
    }
    const err = validateScheduleFields(patch, { partial: true })
    if (err) return c.json({ error: err }, 400)
    // Normalize source configs if provided
    if (Object.prototype.hasOwnProperty.call(patch, 'production_source')) {
      patch.production_source = normalizeSourceConfig(patch.production_source)
    }
    if (Object.prototype.hasOwnProperty.call(patch, 'waste_source')) {
      patch.waste_source = normalizeSourceConfig(patch.waste_source)
    }
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
      const prodId = sched.production_source?.device_id ?? '—'
      const wasteId = sched.waste_source?.device_id ?? '—'
      console.log(`[scheduler] Executing schedule ${sched.id} (prod:${prodId}, waste:${wasteId} → ${sched.target_device_id}) at ${currentTime} ${tz}`)
      try {
        const result = await executeSchedule(sched)
        if (result.skipped) {
          console.log(`[scheduler] Skipped: ${result.reason}`)
        } else if (result.error) {
          console.error(`[scheduler] SAFI error: ${result.error}`)
        } else {
          console.log(`[scheduler] Created entry ${result.entry_id}, prod=${result.production_value}, waste=${result.waste_value}`)
        }
      } catch (err) {
        console.error(`[scheduler] Failed:`, (err as Error).message)
      }
    }
  }, 60_000)

  console.log('[server] Custom routes loaded (schedules, upload history, production entries)')

  if (DEV_BYPASS) {
    const devSession = Buffer.from(JSON.stringify({
      accessToken: 'dev-bypass', company: COMPANY_ID ?? 'pretium', username: 'dev@local',
    })).toString('base64')
    console.log('')
    console.log('[server] ────────────────────────────────────────────────────────────────')
    console.log('[server]  DEV BYPASS: paste this in your browser console at localhost to')
    console.log('[server]  create a local session cookie (fd-app auth needs a cookie, but')
    console.log('[server]  reads/writes route through /api/dev/* which uses SAFI_API_KEY):')
    console.log('[server]')
    console.log(`[server]  document.cookie = "fd_session=${devSession}; path=/"; location.reload();`)
    console.log('[server] ────────────────────────────────────────────────────────────────')
    console.log('')
  }
}
