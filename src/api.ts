// fd-app serves everything on the same origin — auth is handled via session cookies.
const JSON_HEADERS: HeadersInit = { 'Content-Type': 'application/json' };

// Demo mode short-circuits SAFI calls so the UI is exercisable without live data.
// Flag is baked in at build time; mock data is identical on every load.
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

// Dev bypass: route device/energy reads through custom server routes that use the
// server-side SAFI_API_KEY, so local dev works without a real Guidewheel session
// access token. Never enable in production.
const DEV_BYPASS = import.meta.env.VITE_DEV_BYPASS === 'true';

const DEMO_DEVICES: Device[] = [
  { deviceid: 'demo-extruder-01', nickname: 'Extruder Line 1', status: 'online' },
  { deviceid: 'demo-extruder-02', nickname: 'Extruder Line 2', status: 'online' },
  { deviceid: 'demo-press-01', nickname: 'Press A', status: 'online' },
  { deviceid: 'demo-press-02', nickname: 'Press B', status: 'idle' },
  { deviceid: 'demo-scrap-chopper', nickname: 'Scrap Chopper', status: 'online' },
  { deviceid: 'demo-regrind-mill', nickname: 'Regrind Mill', status: 'online' },
  { deviceid: 'demo-production-totalizer', nickname: 'Production Totalizer', status: 'online' },
  { deviceid: 'demo-waste-totalizer', nickname: 'Waste Totalizer', status: 'online' },
];

// Stable pseudo-random energy for a device within a window — so reloads return the same values.
function demoEnergyFor(deviceId: string, fromMs: number, toMs: number): number {
  const hours = Math.max(1, (toMs - fromMs) / 3_600_000);
  // Simple hash of the device id so each device gets a different baseline.
  let seed = 0;
  for (let i = 0; i < deviceId.length; i++) seed = (seed * 31 + deviceId.charCodeAt(i)) >>> 0;
  const baseKwhPerHour = 4 + (seed % 20); // 4..23 kWh/hr
  const jitter = ((seed >>> 8) % 100) / 1000; // up to 10% variance
  return Math.round(baseKwhPerHour * hours * (1 + jitter) * 100) / 100;
}

export interface Device {
  deviceid: string;
  nickname: string;
  status: string;
}

export interface DeviceEnergy {
  deviceid: string;
  fromts: string | null;
  tots: string | null;
  energy: {
    offline: number | null;
    idle: number | null;
    online: number | null;
    total: number | null;
  };
}

export interface ProductionEntry {
  id: string;
  device_id?: string;
  deviceId?: string;
  timestamp: string | number;
  to_ts: string | number;
  production?: { produced: number | null };
  waste?: { wasted: number | null };
  created_at: string;
  status: string;
}

export type Rounding = 'none' | 'integer' | 'one_decimal' | 'two_decimals';

export interface SourceConfig {
  device_id: string;
  divisor: number;
  rounding: Rounding;
}

// --- Settings persistence ---

const SETTINGS_KEY = 'app_settings';

export const TIMEZONE_OPTIONS = [
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
  { value: 'UTC', label: 'UTC' },
] as const;

export type TimezoneValue = (typeof TIMEZONE_OPTIONS)[number]['value'];

export const DEFAULT_TIMEZONE: TimezoneValue = 'America/Los_Angeles';

export interface AppSettings {
  default_divisor: number;
  timezone: TimezoneValue;
}

const DEFAULT_SETTINGS: AppSettings = { default_divisor: 60, timezone: DEFAULT_TIMEZONE };

export function getSettings(): AppSettings {
  try {
    const stored = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    return { ...DEFAULT_SETTINGS, ...stored };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Partial<AppSettings>): void {
  const current = getSettings();
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...settings }));
}

export interface Schedule {
  id: string;
  target_device_id: string;
  production_source: SourceConfig | null;
  waste_source: SourceConfig | null;
  frequency: 'daily' | 'weekly';
  time: string;
  timezone: TimezoneValue;
  enabled: boolean;
  created_at: string;
  updated_at?: string;
}

// --- API calls ---

export async function fetchDevices(): Promise<Device[]> {
  if (DEMO_MODE) return DEMO_DEVICES;
  // /api/fleet/* is our own proxy that injects company_id from the session;
  // /api/dev/* is the local-only bypass that uses SAFI_API_KEY directly.
  const res = await fetch(DEV_BYPASS ? '/api/dev/devices' : '/api/fleet/devices');
  if (!res.ok) throw new Error('Failed to fetch devices');
  const data = await res.json();
  return data.data ?? data;
}

export async function fetchEnergy(fromTs: string, toTs: string): Promise<DeviceEnergy[]> {
  // SAFI staging requires millisecond timestamps — ISO strings return null energy.
  const fromMs = new Date(fromTs).getTime();
  const toMs = new Date(toTs).getTime();
  if (DEMO_MODE) {
    return DEMO_DEVICES.map(d => {
      const total = demoEnergyFor(d.deviceid, fromMs, toMs);
      const online = Math.round(total * 0.8 * 100) / 100;
      const idle = Math.round(total * 0.15 * 100) / 100;
      const offline = Math.round(total * 0.05 * 100) / 100;
      return {
        deviceid: d.deviceid,
        fromts: new Date(fromMs).toISOString(),
        tots: new Date(toMs).toISOString(),
        energy: { online, idle, offline, total },
      };
    });
  }
  const params = new URLSearchParams({ from_ts: String(fromMs), to_ts: String(toMs), group_by: 'day' });
  const url = DEV_BYPASS ? `/api/dev/devices/energy?${params}` : `/api/fleet/devices/energy?${params}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch energy data');
  const data = await res.json();
  return data.data ?? data;
}

export interface OverlapConflict {
  id: string;
  from_ts: number;
  to_ts: number;
}

export interface CreateEntryResult {
  ok: boolean;
  status: number;
  data: ProductionEntry | null;
  error: string | null;
  conflicts?: OverlapConflict[];
  timezone?: string;
}

export interface EntryLeg {
  value: number | null;
  energy?: number | null;
  source?: SourceConfig | null;
}

export async function createProductionEntry(
  deviceId: string,
  fromTs: number,
  toTs: number,
  production: EntryLeg | null,
  waste: EntryLeg | null,
  timezone?: TimezoneValue,
): Promise<CreateEntryResult> {
  const body: Record<string, unknown> = { device_id: deviceId, from_ts: fromTs, to_ts: toTs };
  if (timezone) body.timezone = timezone;
  if (production && production.value != null) {
    body.production = {
      value: production.value,
      energy: production.energy ?? null,
      source: production.source ?? null,
    };
  }
  if (waste && waste.value != null) {
    body.waste = {
      value: waste.value,
      energy: waste.energy ?? null,
      source: waste.source ?? null,
    };
  }
  const res = await fetch('/api/production-entries', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (res.ok) {
    return { ok: true, status: res.status, data: json, error: null };
  }
  const msg = json.message || json.error || `Request failed (${res.status})`;
  return {
    ok: false,
    status: res.status,
    data: null,
    error: msg,
    conflicts: Array.isArray(json.conflicts) ? (json.conflicts as OverlapConflict[]) : undefined,
    timezone: typeof json.timezone === 'string' ? json.timezone : undefined,
  };
}

export async function fetchProductionEntry(id: string): Promise<ProductionEntry> {
  const res = await fetch(`/api/production-entries/${id}`);
  if (!res.ok) throw new Error('Failed to fetch production entry');
  return res.json();
}

export interface UploadHistoryEntry {
  id: string;
  source: 'manual' | 'scheduled';
  schedule_id?: string;
  target_device_id: string;
  from_ts: number;
  to_ts: number;
  production_source: SourceConfig | null;
  production_energy: number | null;
  production_value: number | null;
  waste_source: SourceConfig | null;
  waste_energy: number | null;
  waste_value: number | null;
  api_status: number;
  api_error: string | null;
  created_at: string;
}

export async function fetchUploadHistory(): Promise<UploadHistoryEntry[]> {
  const res = await fetch('/api/upload-history');
  if (!res.ok) throw new Error('Failed to fetch upload history');
  return res.json();
}

export async function fetchSchedules(): Promise<Schedule[]> {
  const res = await fetch('/api/schedules');
  if (!res.ok) throw new Error('Failed to fetch schedules');
  return res.json();
}

export async function createSchedule(schedule: Omit<Schedule, 'id' | 'created_at'>): Promise<Schedule> {
  const res = await fetch('/api/schedules', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(schedule),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to create schedule');
  }
  return res.json();
}

export async function updateSchedule(id: string, updates: Partial<Schedule>): Promise<Schedule> {
  const res = await fetch(`/api/schedules/${id}`, {
    method: 'PATCH',
    headers: JSON_HEADERS,
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update schedule');
  return res.json();
}

export async function deleteSchedule(id: string): Promise<void> {
  const res = await fetch(`/api/schedules/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete schedule');
}

export interface ScheduleRunResult {
  skipped?: boolean;
  reason?: string;
  status?: number;
  entry_id?: string | null;
  production_energy?: number | null;
  production_value?: number | null;
  waste_energy?: number | null;
  waste_value?: number | null;
  error?: string | null;
  conflicts?: OverlapConflict[];
  timezone?: string;
}

export async function runScheduleNow(id: string): Promise<ScheduleRunResult> {
  const res = await fetch(`/api/schedules/${id}/run`, {
    method: 'POST',
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Run failed (${res.status})`);
  }
  return res.json();
}
