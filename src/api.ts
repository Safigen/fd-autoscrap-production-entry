// fd-app serves everything on the same origin — auth is handled via session cookies.
const JSON_HEADERS: HeadersInit = { 'Content-Type': 'application/json' };

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
  waste: {
    wasted: number | null;
  };
  created_at: string;
  status: string;
}

export interface CreatedEntry {
  id: string;
  source_device_id: string;
  target_device_id: string;
  from_ts: number;
  to_ts: number;
  total_energy: number | null;
  waste_value: number | null;
  divisor: number;
  rounding: string;
  created_at: string;
  api_response: ProductionEntry | null;
  /** HTTP status from SAFI (201 = created, 409 = duplicate, etc.) */
  api_status?: number;
  /** Error message from SAFI when the request failed */
  api_error?: string | null;
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
  source_device_id: string;
  target_device_id: string;
  frequency: 'daily' | 'weekly';
  time: string;
  timezone: TimezoneValue;
  divisor: number;
  rounding: 'none' | 'integer' | 'one_decimal' | 'two_decimals';
  enabled: boolean;
  created_at: string;
  updated_at?: string;
}

// --- localStorage helpers for tracking entries created from this app ---

const ENTRIES_KEY = 'created_production_entries';

export function getStoredEntries(): CreatedEntry[] {
  try {
    return JSON.parse(localStorage.getItem(ENTRIES_KEY) || '[]');
  } catch {
    return [];
  }
}

export function storeEntry(entry: CreatedEntry): void {
  const entries = getStoredEntries();
  entries.unshift(entry);
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

// --- API calls ---

export async function fetchDevices(): Promise<Device[]> {
  const res = await fetch('/api/safi/devices');
  if (!res.ok) throw new Error('Failed to fetch devices');
  const data = await res.json();
  return data.data ?? data;
}

export async function fetchEnergy(fromTs: string, toTs: string): Promise<DeviceEnergy[]> {
  // SAFI staging requires millisecond timestamps — ISO strings return null energy.
  const fromMs = new Date(fromTs).getTime();
  const toMs = new Date(toTs).getTime();
  const params = new URLSearchParams({ from_ts: String(fromMs), to_ts: String(toMs), group_by: 'day' });
  const res = await fetch(`/api/safi/devices/energy?${params}`);
  if (!res.ok) throw new Error('Failed to fetch energy data');
  const data = await res.json();
  return data.data ?? data;
}

export interface CreateEntryResult {
  ok: boolean;
  status: number;
  data: ProductionEntry | null;
  error: string | null;
}

export async function createProductionEntry(
  deviceId: string,
  fromTs: number,
  toTs: number,
  wasteValue?: number | null,
  metadata?: { source_device_id?: string; total_energy?: number | null; divisor?: number; rounding?: string },
): Promise<CreateEntryResult> {
  const body: Record<string, unknown> = { device_id: deviceId, from_ts: fromTs, to_ts: toTs };
  if (wasteValue != null) {
    body.waste = { wasted: wasteValue };
  }
  if (metadata) {
    if (metadata.source_device_id) body.source_device_id = metadata.source_device_id;
    if (metadata.total_energy != null) body.total_energy = metadata.total_energy;
    if (metadata.divisor != null) body.divisor = metadata.divisor;
    if (metadata.rounding) body.rounding = metadata.rounding;
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
  // SAFI returns { statusCode, message, error? }
  const msg = json.message || json.error || `Request failed (${res.status})`;
  return { ok: false, status: res.status, data: null, error: msg };
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
  source_device_id: string | null;
  target_device_id: string;
  from_ts: number;
  to_ts: number;
  total_energy: number | null;
  waste_value: number | null;
  divisor: number | null;
  rounding: string | null;
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
  if (!res.ok) throw new Error('Failed to create schedule');
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
  energy?: number | null;
  waste?: number | null;
  error?: string | null;
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
