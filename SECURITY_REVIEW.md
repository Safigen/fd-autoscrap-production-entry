# Security review — fd-autoscrap-production-entry

**Review date:** 2026-04-17  
**Scope:** Application source under `src/` ([`src/server.ts`](src/server.ts), [`src/App.tsx`](src/App.tsx), [`src/api.ts`](src/api.ts)), [`README.md`](README.md). Vendored `vendor/` and `fd-app` internals not fully audited.  
**Assumption:** `@safi_ai/fd-app` applies authenticated session (or equivalent) to **all** `/api/*` routes unless excluded; several custom routes do **not** re-check session in this repo — see P1.

---

## Prioritized findings

### P0 — Address before treating as production-hardened

1. **`FD_DEV_BYPASS` boot path prints a usable `fd_session` recipe**  
   If this flag is ever enabled in a shared or mis-labeled environment, stdout/logs become a session forgery aid for anyone with log access.  
   **Where:** [`src/server.ts`](src/server.ts) (approx. lines 755–766).  
   **Ask:** Remove console-printed cookie recipe; gate behind explicit local-only tooling or one-time OTP; ensure Railway/prod env **cannot** set this variable.

2. **`POST /api/debug/trace` accepts arbitrary body text and logs it**  
   No in-handler auth check in this file; if the framework does not restrict it, this is an unauthenticated log sink (noise, PII exfiltration into logs, partial log injection). Bodies are truncated to 300 chars but can still carry secrets or identifiers.  
   **Where:** [`src/server.ts`](src/server.ts) (approx. lines 510–521); client [`src/App.tsx`](src/App.tsx) `beacon()` (approx. lines 38–56).  
   **Ask:** Require same session as other mutations, strict JSON schema, rate limit, and/or disable in production builds. Do not log raw client payloads — log a structured, allowlisted event type + correlation id only.

### P1 — High

3. **Defense in depth: session checked only on `POST /api/production-entries`**  
   Schedules CRUD, upload history (including `DELETE /api/upload-history`), and `POST /api/schedules/:id/run` do not call `c.get('session')` in [`src/server.ts`](src/server.ts). If `fd-app` ever misroutes, exposes a bypass, or a new route is added without middleware parity, impact is high (arbitrary SAFI writes via schedules, data destruction).  
   **Ask:** Add a shared `requireSession(c)` (or use framework hook) on every mutating and sensitive-read route in this file; document the middleware contract in a one-line comment at the top of `customServer`.

4. **README vs code: PostHog identity**  
   README states email is collected and sent to PostHog ([`README.md`](README.md) section 3). Code uses `posthog.identify(session.username)` ([`src/App.tsx`](src/App.tsx) approx. lines 537–544). If `username` is not always the same as “email captured for analytics,” README is wrong or code is wrong — compliance and incident response depend on this.  
   **Ask:** Align implementation and README; if the identifier is PII, name it exactly (field + storage + vendor).

5. **PostHog project key hardcoded in client**  
   [`src/App.tsx`](src/App.tsx) (approx. lines 517–519): `phc_…` in source. Public keys are expected for PostHog, but hardcoding complicates rotation, multi-env (staging vs prod projects), and secret scanning noise.  
   **Ask:** Move to `import.meta.env.VITE_POSTHOG_KEY` with build-time injection per environment.

6. **Verbose request logging on every non-favicon request**  
   Middleware logs method, path, status, launch token presence, session cookie presence, `Set-Cookie`, forwarded proto, Sec-Fetch-* headers, and Referer (truncated). High volume in production; Referer and paths can leak internal query patterns.  
   **Where:** [`src/server.ts`](src/server.ts) (approx. lines 489–507).  
   **Ask:** Sample or downgrade to `debug` level; strip query strings; redact `launch_token`; avoid logging on static asset paths beyond a coarse counter.

### P2 — Medium

7. **Energy tab: `useEffect` omits `appTimezone` from dependencies**  
   [`src/App.tsx`](src/App.tsx) (approx. lines 746–764): `loadEnergy()` uses `appTimezone` via `getDayRange(energyDate, appTimezone)` but the effect only depends on `[energyDate]` with an eslint disable. Changing timezone without changing the date can leave the table showing the wrong window or skip a refetch — and is exactly the sort of subtle bug that causes **wrong SAFI windows** or repeated manual retries (API churn).  
   **Ask:** Include `appTimezone` in deps or key the fetch by serialized `(energyDate, appTimezone)`; remove the disable if possible.

8. **Client `fetchEnergy` does not validate range before calling upstream**  
   [`src/api.ts`](src/api.ts) (approx. lines 141–164): builds ms from `fromTs`/`toTs` strings without rejecting invalid or equal timestamps. Server validates writes ([`src/server.ts`](src/server.ts) `validateTimeRange`, approx. lines 46–65) but read spam / nonsense queries still hit the `/api/safi/devices/energy` proxy.  
   **Ask:** Mirror server rules client-side (finite dates, `to > from`, max span) and short-circuit before `fetch`.

9. **Scheduler uses service API key without human-in-the-loop**  
   Documented and intentional for automation; still a **blast-radius** item: any compromise of `SAFI_API_KEY` or server shell equals write access.  
   **Where:** [`src/server.ts`](src/server.ts) energy fetch and production entry creation paths using `SAFI_API_KEY`.  
   **Ask:** Key per env, rotation runbook, least-privilege SAFI key if the vendor supports scoped keys; alert on scheduler failures.

### P3 — Low / hardening

10. **File-backed persistence races**  
    README already notes theoretical concurrent write races ([`README.md`](README.md) section 4). Low likelihood on single-instance Railway, but vibe-coded apps often scale to 2 instances later.  
    **Ask:** Atomic writes (temp file + rename), file lock, or move to a real store if replicas are ever enabled.

11. **Client diagnostic beacon includes partial User-Agent**  
    [`src/App.tsx`](src/App.tsx) `beacon('module_load', { ua: … })` — low sensitivity but contributes to log fingerprinting; keep if operational value remains after tightening `/api/debug/trace`.

---

## Verified OK (this pass)

- No `dangerouslySetInnerHTML`, `eval`, `new Function`, or `child_process` usage under [`src/`](src/).
- Production entry **writes** validate `device_id` pattern, require `from_ts`/`to_ts`, and enforce max range and `to > from` on the server ([`src/server.ts`](src/server.ts)).
- README contains an explicit **PII** subsection and describes SAFI vs Guidewheel API usage ([`README.md`](README.md)).

---

## Residual risk summary

Primary residual risks are **framework-level auth guarantees** not visible in this repository, **operational logging and debug endpoints**, and **scheduler + API key blast radius**. Closing P0/P1 items above materially reduces risk for a forward-deployed internal app.
