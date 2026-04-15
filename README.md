# fd-autoscrap-production-entry

## 1. Goal

Automate waste entry creation from SAFI API energy data for Pretium devices. An internal Guidewheel forward-deploy app that pulls energy consumption from a source device, divides by a configurable divisor, and creates a production entry (waste quantity) on a target device in SAFI.

## 2. Description of Functionality

A password-protected internal tool deployed on Railway that provides:

- **Authentication** via a shared site password (hashed before transmission) -> JWT (7-day expiry). Email capture for PostHog analytics identification.
- **Manual entry creation** - Select a source device (energy), target device (production entry), date, timezone, divisor, and rounding. Energy / divisor = waste quantity. Calls `POST /v1/production-entries` on SAFI.
- **Scheduled automation** - Define daily/weekly schedules (source -> target, time, timezone, divisor, rounding). A server-side scheduler engine runs every 60 seconds, executing schedules at their configured time in their configured timezone. Pulls yesterday's energy and creates waste entries automatically. Duplicate prevention via server-side history check.
- **Manual trigger** - "Run Now" button on each schedule for on-demand execution.
- **Upload history** - Server-side persistent history of all entries created (manual + scheduled), viewable in the Upload History tab with source badges, sorting, and search.
- **Energy browser** - View all device energy data for a given date with sortable table and summary cards.
- **Settings** - Configure default energy divisor and default timezone (Pacific, Mountain, Central, Eastern, Alaska, Hawaii, UTC).
- **Timezone support** - User-settable timezone for manual entries, schedules, and app-wide default. All date calculations are timezone-aware.
- **Logout button** - Clears JWT and refreshes.

## 3. Data Points

| Dimension | Status |
|---|---|
| **Storage** | No database. Server persists schedules (`schedules.json`) and upload history (`upload_history.json`, capped at 500 entries) to a Railway Volume mounted at `/data`. Client stores JWT, user email, and app settings in `localStorage`. No new DB is being spun up. |
| **PII** | User email is collected on first load and sent to PostHog via `identify()` for product analytics. Stored in `localStorage`. No other personal data. |
| **Guidewheel API** | Does **not** use the Guidewheel API. Uses the SAFI API (`staging.api.safisense.com`) -- both **read** (`GET /devices`, `GET /devices/energy`) and **write** (`POST /production-entries`). Company: `pretium`. |

## 4. Other Known Risks / FYIs

- **Shared site password**, not per-user auth. Login endpoint is rate-limited (10 attempts per 15 minutes).
- **SAFI production entries are permanent** -- SAFI does not support DELETE or effective PATCH on production entries. Test carefully.
- **SAFI duplicate detection** uses range containment (`>=`/`<=`), not exact timestamp matching. A full-day entry encompasses all 8h shift entries within that range. If 2+ entries match, SAFI returns 409 Conflict.
- **SAFI auto-creates 3x 8-hour shift entries** per day for Pretium devices. Creating a 24-hour entry will match and update one of these (if only 1 match), or 409 (if 2+ match).
- **Banner text** ("Prototype -- not connected to production data") is displayed but the app hits SAFI staging with real device data.
- **Scheduler in-memory state** -- `lastRunDate` tracking resets on deploy/restart. The history-based duplicate check prevents actual duplicate SAFI entries.
- **File-based storage** has theoretical race conditions under concurrent writes (low risk for single-instance Railway deploy).

## 5. Infrastructure

- **Platform:** Railway (Guidewheel workspace)
- **Volume:** `/data` for persistent JSON storage across deploys
- **Domain:** `fd-autoscrap-production-entry-production.up.railway.app`
- **Environment:** Node 22, Express 5, React 19, Vite 8, Tailwind 3.4

---

_This README is maintained by the `gw-security-review` skill. Update Section 1 (Goal) manually; subsequent reviews will update the rest as functionality evolves._
