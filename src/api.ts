// In dev, Vite runs on :5173 and Express on :3001 → use an absolute URL.
// In prod, Express serves the SPA and the API on the same origin → use a relative URL.
const API_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:3001' : '');

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
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

export interface AppSettings {
  default_divisor: number;
}

const DEFAULT_SETTINGS: AppSettings = { default_divisor: 60 };

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
  const res = await fetch(`${API_URL}/api/devices`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch devices');
  const data = await res.json();
  return data.data ?? data;
}

export async function fetchEnergy(fromTs: string, toTs: string): Promise<DeviceEnergy[]> {
  const params = new URLSearchParams({ from_ts: fromTs, to_ts: toTs });
  const res = await fetch(`${API_URL}/api/devices/energy?${params}`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch energy data');
  return res.json();
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
): Promise<CreateEntryResult> {
  const body: Record<string, unknown> = { device_id: deviceId, from_ts: fromTs, to_ts: toTs };
  if (wasteValue != null) {
    body.waste = { wasted: wasteValue };
  }
  const res = await fetch(`${API_URL}/api/production-entries`, {
    method: 'POST',
    headers: authHeaders(),
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
  const res = await fetch(`${API_URL}/api/production-entries/${id}`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch production entry');
  return res.json();
}

export async function fetchSchedules(): Promise<Schedule[]> {
  const res = await fetch(`${API_URL}/api/schedules`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch schedules');
  return res.json();
}

export async function createSchedule(schedule: Omit<Schedule, 'id' | 'created_at'>): Promise<Schedule> {
  const res = await fetch(`${API_URL}/api/schedules`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(schedule),
  });
  if (!res.ok) throw new Error('Failed to create schedule');
  return res.json();
}

export async function updateSchedule(id: string, updates: Partial<Schedule>): Promise<Schedule> {
  const res = await fetch(`${API_URL}/api/schedules/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update schedule');
  return res.json();
}

export async function deleteSchedule(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/schedules/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete schedule');
}
