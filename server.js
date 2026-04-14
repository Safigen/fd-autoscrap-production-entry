import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || process.env.API_PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;
const SAFI_API_URL = process.env.SAFI_API_URL || 'https://staging.api.safisense.com/api/v1';
const SAFI_API_KEY = process.env.SAFI_API_KEY;
const COMPANY_ID = process.env.SAFI_COMPANY_ID;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
// On Railway, set DATA_DIR=/data and mount a Volume there so schedules persist across deploys.
const DATA_DIR = process.env.DATA_DIR || __dirname;
const SCHEDULES_FILE = join(DATA_DIR, 'schedules.json');
const DIST_DIR = join(__dirname, 'dist');
const SERVE_STATIC = process.env.NODE_ENV === 'production' || existsSync(DIST_DIR);

// --- Boot-time env validation ---
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be set and at least 32 characters. Generate with: openssl rand -hex 32');
}
if (!process.env.SITE_PASSWORD) {
  throw new Error('SITE_PASSWORD must be set');
}
if (!SAFI_API_KEY) {
  throw new Error('SAFI_API_KEY must be set');
}
if (!COMPANY_ID) {
  throw new Error('SAFI_COMPANY_ID must be set');
}

// --- Security middleware ---
// contentSecurityPolicy disabled when serving our own SPA — Vite's build emits inline styles.
app.use(helmet({ contentSecurityPolicy: false }));
// When serving frontend from the same origin, CORS is irrelevant. Only enable for dev split-origin.
if (!SERVE_STATIC) {
  app.use(cors({ origin: ALLOWED_ORIGIN }));
}
app.use(express.json({ limit: '100kb' }));

// Rate limit the password verification endpoint to block brute-force attacks.
const verifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts. Please try again later.' },
});

// --- Time-range validation ---
const MAX_RANGE_DAYS = 31;

function validateTimeRange(fromTs, toTs, { unit = 'iso' } = {}) {
  let from, to;
  if (unit === 'unix') {
    const f = Number(fromTs), t = Number(toTs);
    if (!Number.isFinite(f) || !Number.isFinite(t)) return 'from_ts and to_ts must be numeric';
    from = new Date(f * 1000);
    to = new Date(t * 1000);
  } else {
    from = new Date(fromTs);
    to = new Date(toTs);
  }
  if (isNaN(from.getTime()) || isNaN(to.getTime())) return 'Invalid from_ts or to_ts';
  if (to <= from) return 'to_ts must be after from_ts';
  if (to - from > MAX_RANGE_DAYS * 24 * 3600 * 1000) return `Range exceeds ${MAX_RANGE_DAYS} days`;
  return null;
}

// --- Schedule persistence ---

function loadSchedules() {
  if (!existsSync(SCHEDULES_FILE)) return [];
  try {
    return JSON.parse(readFileSync(SCHEDULES_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function saveSchedules(schedules) {
  writeFileSync(SCHEDULES_FILE, JSON.stringify(schedules, null, 2));
}

// Auth middleware for protected routes
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

// --- Password auth ---

app.post('/api/verify', verifyLimiter, (req, res) => {
  const { password } = req.body;
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required' });
  }
  if (password !== process.env.SITE_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  const token = jwt.sign({ verified: true }, JWT_SECRET, { expiresIn: '7d' });
  return res.json({ token });
});

app.get('/api/check', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false });
  }
  try {
    jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    return res.json({ valid: true });
  } catch {
    return res.status(401).json({ valid: false });
  }
});

// --- SAFI API proxy ---

app.get('/api/devices', requireAuth, async (req, res) => {
  try {
    const response = await fetch(
      `${SAFI_API_URL}/devices?company_id=${COMPANY_ID}`,
      { headers: { 'api-key': SAFI_API_KEY } }
    );
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Failed to fetch devices' });
  }
});

app.get('/api/devices/energy', requireAuth, async (req, res) => {
  const { from_ts, to_ts } = req.query;
  if (!from_ts || !to_ts) {
    return res.status(400).json({ error: 'from_ts and to_ts are required' });
  }
  const rangeError = validateTimeRange(from_ts, to_ts, { unit: 'iso' });
  if (rangeError) return res.status(400).json({ error: rangeError });
  try {
    // SAFI staging requires millisecond timestamps — ISO strings return null energy.
    const fromMs = new Date(from_ts).getTime();
    const toMs = new Date(to_ts).getTime();
    const url = `${SAFI_API_URL}/devices/energy?company_id=${COMPANY_ID}&from_ts=${fromMs}&to_ts=${toMs}&group_by=day`;
    const response = await fetch(url, { headers: { 'api-key': SAFI_API_KEY } });
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Failed to fetch energy data' });
  }
});

app.post('/api/production-entries', requireAuth, async (req, res) => {
  const { device_id, from_ts, to_ts, waste } = req.body;
  if (!device_id || typeof device_id !== 'string' || from_ts == null || to_ts == null) {
    return res.status(400).json({ error: 'device_id, from_ts, and to_ts are required' });
  }
  const rangeError = validateTimeRange(from_ts, to_ts, { unit: 'unix' });
  if (rangeError) return res.status(400).json({ error: rangeError });
  try {
    // Convert seconds to ms if needed — SAFI staging expects milliseconds.
    const safiBody = {
      device_id,
      from_ts: from_ts < 1e12 ? from_ts * 1000 : from_ts,
      to_ts: to_ts < 1e12 ? to_ts * 1000 : to_ts,
    };
    // SAFI accepts waste_qty / production_qty as top-level fields.
    if (waste && typeof waste === 'object' && waste.wasted != null) {
      safiBody.waste_qty = Number(waste.wasted);
    }
    const response = await fetch(
      `${SAFI_API_URL}/production-entries?company_id=${COMPANY_ID}`,
      {
        method: 'POST',
        headers: {
          'api-key': SAFI_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(safiBody),
      }
    );
    const data = await response.json();
    // Forward the SAFI status code so the client sees 201, 409, 422, etc.
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Failed to create production entry' });
  }
});

app.get('/api/production-entries/:id', requireAuth, async (req, res) => {
  // Restrict id to UUID-like characters to prevent path injection on upstream.
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(req.params.id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  try {
    const response = await fetch(
      `${SAFI_API_URL}/production-entries/${req.params.id}?company_id=${COMPANY_ID}`,
      { headers: { 'api-key': SAFI_API_KEY } }
    );
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Failed to fetch production entry' });
  }
});

// --- Schedules ---

const SCHEDULE_PATCH_FIELDS = [
  'source_device_id', 'target_device_id', 'frequency', 'time', 'divisor', 'rounding', 'enabled',
];
const VALID_FREQUENCIES = new Set(['daily', 'weekly']);
const VALID_ROUNDINGS = new Set(['none', 'integer', 'one_decimal', 'two_decimals']);

function validateScheduleFields(fields, { partial = false } = {}) {
  if (!partial) {
    for (const k of ['source_device_id', 'target_device_id', 'frequency', 'time', 'divisor']) {
      if (fields[k] == null || fields[k] === '') return `${k} is required`;
    }
  }
  if (fields.source_device_id != null && typeof fields.source_device_id !== 'string') return 'source_device_id must be a string';
  if (fields.target_device_id != null && typeof fields.target_device_id !== 'string') return 'target_device_id must be a string';
  if (fields.frequency != null && !VALID_FREQUENCIES.has(fields.frequency)) return 'frequency must be daily or weekly';
  if (fields.time != null && !/^\d{2}:\d{2}$/.test(fields.time)) return 'time must be HH:MM';
  if (fields.divisor != null) {
    const n = Number(fields.divisor);
    if (!Number.isFinite(n) || n <= 0) return 'divisor must be a positive number';
  }
  if (fields.rounding != null && !VALID_ROUNDINGS.has(fields.rounding)) return 'invalid rounding';
  if (fields.enabled != null && typeof fields.enabled !== 'boolean') return 'enabled must be boolean';
  return null;
}

app.get('/api/schedules', requireAuth, (req, res) => {
  return res.json(loadSchedules());
});

app.post('/api/schedules', requireAuth, (req, res) => {
  const err = validateScheduleFields(req.body);
  if (err) return res.status(400).json({ error: err });
  const schedules = loadSchedules();
  const schedule = {
    id: randomUUID(),
    source_device_id: req.body.source_device_id,
    target_device_id: req.body.target_device_id,
    frequency: req.body.frequency,
    time: req.body.time,
    divisor: Number(req.body.divisor),
    rounding: req.body.rounding ?? 'none',
    enabled: req.body.enabled ?? true,
    created_at: new Date().toISOString(),
  };
  schedules.push(schedule);
  saveSchedules(schedules);
  return res.json(schedule);
});

app.patch('/api/schedules/:id', requireAuth, (req, res) => {
  const schedules = loadSchedules();
  const idx = schedules.findIndex((s) => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Schedule not found' });
  // Whitelist fields — prevents mass-assignment of id/created_at/arbitrary keys.
  const patch = {};
  for (const key of SCHEDULE_PATCH_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) patch[key] = req.body[key];
  }
  const err = validateScheduleFields(patch, { partial: true });
  if (err) return res.status(400).json({ error: err });
  schedules[idx] = { ...schedules[idx], ...patch, updated_at: new Date().toISOString() };
  saveSchedules(schedules);
  return res.json(schedules[idx]);
});

app.delete('/api/schedules/:id', requireAuth, (req, res) => {
  let schedules = loadSchedules();
  const idx = schedules.findIndex((s) => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Schedule not found' });
  const removed = schedules.splice(idx, 1)[0];
  saveSchedules(schedules);
  return res.json(removed);
});

// --- Serve built frontend in production (single-port deploy on Railway) ---
if (SERVE_STATIC) {
  app.use(express.static(DIST_DIR));
  // SPA fallback — any non-/api GET returns index.html so client-side routing works.
  app.get(/^\/(?!api\/).*/, (req, res) => {
    res.sendFile(join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
