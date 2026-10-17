# IdeaForge 🛠️

A faithful, functional clone of the **ideabrowser.com** concept: a signal‑driven
startup‑idea discovery engine. It mines real demand signals across the internet,
scores them, and synthesizes each into a full market report — then features a new
**Idea of the Day**, every day.

> Built as a real codebase, not just a UI. The backend reproduces the actual
> *signal → score → synthesis → curation* pipeline. It runs **fully offline** out
> of the box, and switches to **live data** when you add API keys.

---

## ✨ What's inside

- **Idea Database** — browse 12 seeded ideas with search, category / business‑model
  filters, score range, founder‑fit ceilings, and sorting.
- **Idea of the Day** — one curated idea featured per UTC day (deterministic rotation).
- **Deep‑dive reports** — every idea has the full ideabrowser anatomy:
  - Opportunity / Problem / Feasibility / Why‑Now scores (radar + gauges)
  - Business Fit (revenue, execution, GTM, founder fit)
  - Why Now, Proof & Signals, Market Gap, Execution Plan
  - Frameworks: **Value Equation**, **Market Matrix**, **A.C.P.**, **Value Ladder**
  - Per‑platform **Community Signals** (key pains, money signals, fresh opportunities, most‑wanted fixes)
  - Keyword demand table + 12‑month trend
- **Idea Agent** — chat with any idea; answers come from that idea's report
  (heuristic responder offline, LLM when a key is set).
- **Idea Generator** — rank the database by *founder fit* (skills, capital, interests).

---

## 🚀 Quickstart

```bash
npm install            # also runs `prisma generate`
npm run setup          # create the SQLite DB + seed it by running the pipeline (offline)
npm run dev            # http://localhost:3000
```

That's it — no API keys required. To rebuild the catalog at any time:

```bash
npm run db:reset       # wipe + re‑seed
npm run pipeline:run   # re‑run the pipeline honoring DATA_MODE (offline/live)
```

---

## 🧠 The pipeline (the part that matters)

The real ideabrowser runs AI agents that crawl Reddit, Facebook Groups, YouTube,
Google Trends and keyword data, then humans curate the best. IdeaForge mirrors
that **shape** with a modular, swappable pipeline:

```
 IdeaBrief (authored concept + signal hints)
        │
        ▼
┌───────────────────────┐     collectors/ (one per source, live + offline modes)
│  1. HARVEST signals   │ ──  reddit · youtube · googleTrends · keywords · facebook
└───────────────────────┘
        │
        ▼
┌───────────────────────┐     aggregate.ts
│  2. AGGREGATE         │ ──  normalize into one SignalBundle + metrics
└───────────────────────┘
        │
        ▼
┌───────────────────────┐     scoring.ts
│  3. SCORE             │ ──  Opportunity / Problem / Feasibility / Why‑Now (+ rationale)
└───────────────────────┘
        │
        ▼
┌───────────────────────┐     synthesize.ts  (+ llm.ts)
│  4. SYNTHESIZE        │ ──  compose the full report  (LLM live · templated offline)
└───────────────────────┘
        │
        ▼
┌───────────────────────┐     curate.ts → persist.ts
│  5. CURATE + STORE    │ ──  "Greg's Pick", Idea‑of‑the‑Day rotation, upsert to DB
└───────────────────────┘
```

Run it yourself and watch the table print:

```bash
npm run pipeline:run
```

### Scoring is transparent
`src/pipeline/scoring.ts` derives every score from the aggregated signals
(search volume, YoY growth, trend slope, pain density, community reach, founder
burden, keyword competition) and attaches a one‑line rationale citing the numbers.

---

## 🌐 Offline vs. Live mode

Set `DATA_MODE` in `.env`. **Offline is the default** and needs zero keys.

| Source | Live‑ready? | How |
| --- | --- | --- |
| Reddit | ✅ | OAuth (`REDDIT_CLIENT_ID/SECRET`) → `/search` |
| Google Trends | ✅ | SerpAPI (`SERPAPI_KEY`) timeseries |
| Keyword volume | ✅ | SerpAPI related‑queries proxy |
| YouTube | ✅ | YouTube Data API (`YOUTUBE_API_KEY`) |
| Facebook Groups | ⚠️ fixture | No compliant public API — stub with a clear extension point |
| X / Twitter | ⚠️ fixture | No affordable public API — stub |
| LLM synthesis & Idea Agent | ✅ | `LLM_PROVIDER=openai\|anthropic` + key |

Each live collector **falls back to fixtures automatically** if its key is missing
or a call fails, so the app never breaks. Copy `.env.example` → `.env` and fill in
only what you have:

```bash
cp .env.example .env
# DATA_MODE=live, LLM_PROVIDER=openai, OPENAI_API_KEY=..., REDDIT_*, etc.
npm run pipeline:run
```

---

## 🗂️ Project structure

```
src/
  app/                      # Next.js App Router pages + API routes
    api/{ideas,agent,generate}/route.ts
    idea/[slug]/page.tsx    # deep-dive report
    idea-of-the-day/ database/ pricing/ idea-agent/ generator/ about/
  components/
    site/  ui/  idea/  database/  agent/  generator/
  lib/                      # types, env, prisma client, repo (data access), format,
                            # validation (zod), rateLimit, agentAnswer, dates
  pipeline/                 # the backend engine
    collectors/             # reddit, youtube, googleTrends, keywords, facebook
    aggregate.ts scoring.ts synthesize.ts llm.ts curate.ts persist.ts run.ts
  data/ideas/               # 12 authored IdeaBriefs (pipeline input)
prisma/schema.prisma        # Idea + DailyFeature (SQLite; swap to Postgres/Supabase)
prisma/seed.ts
tests/                      # Vitest unit suites (see "Tests & CI")
.github/workflows/ci.yml    # lint · typecheck · test · build · seed smoke · audit
```

---

## ✅ Tests & CI

```bash
npm test               # Vitest unit suite (~100 tests, < 5 s)
npm run test:coverage  # + v8 coverage for src/pipeline and src/lib
npm run ci             # lint → typecheck → test → build (what GitHub Actions runs)
```

What's covered (`tests/`):

| Suite | Guards |
| --- | --- |
| `scoring` | bounds, determinism, monotonicity (volume ↑ opportunity, growth ↑ why‑now, burden ↓ feasibility), rationale text |
| `aggregate` | every collector runs, signal merge order, metrics match brief hints, trend shape/slope, live‑mode fallback without keys |
| `curate` | top‑30% rule, min‑one pick, explicit overrides, input order preserved |
| `synthesize` | `searchGrowthYoY` consistency, Market Matrix quadrant boundaries, value‑ladder note |
| `agentAnswer` | question classifier, every offline answer path, prompt delimiter sanitisation, no instruction leakage |
| `validation` | regressions for the NaN‑500, silent‑zero, oversized‑body and bad‑slug bugs |
| `rateLimit` | limit/retry semantics, key isolation, sliding window, IP extraction |
| `dates` | Idea‑of‑the‑Day rotation: no consecutive repeats, full coverage before repeat |
| `redaction` | API keys never reach logs; `seriesSlope` sign/clamp |

`.github/workflows/ci.yml` runs on every push/PR: lint, typecheck, tests with
coverage, production build, then a **fresh seed + route smoke test** that re‑plays
the October regression probes (400s, cron 503, security headers). A separate job
fails the build on any **critical** `npm audit` finding.

---

## 🧰 Scripts

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run setup` | `prisma db push` + seed |
| `npm run db:seed` | Seed (offline synthesis) |
| `npm run db:reset` | Force‑reset DB + re‑seed |
| `npm run pipeline:run` | Run the full pipeline honoring `DATA_MODE` |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` / `npm run test:coverage` | Vitest unit suite |
| `npm run ci` | Full local CI pass |
| `GET /api/cron/daily` | Same as `pipeline:run`, over HTTP, guarded by `CRON_SECRET` |

---

## ⏰ Daily job (Idea of the Day)

The pipeline writes a 14‑day `DailyFeature` schedule. To keep it rolling in
production, hit the protected cron route once a day:

```bash
# .env
CRON_SECRET="$(openssl rand -hex 32)"

# any scheduler (GitHub Actions, cron, Vercel Cron — see vercel.json)
curl -H "Authorization: Bearer $CRON_SECRET" https://your.app/api/cron/daily
```

The route returns **503 until `CRON_SECRET` is set** (never silently open) and
**401** on a bad token. If the schedule ever lapses, the page falls back to a
true day‑index rotation through the whole catalog (Greg's Picks first), so the
same idea is never featured on consecutive days.

---

## 🔒 Security posture

- **Input validation** — every API route parses its input with `zod`
  (`src/lib/validation.ts`); bad input returns a structured `400`, never a `500`.
- **Rate limiting** — per‑IP sliding window (`src/lib/rateLimit.ts`):
  `/api/agent` 20/min, `/api/generate` 30/min, `/api/ideas` 120/min → `429` +
  `Retry-After`. In‑memory; swap the store for Upstash/Redis on serverless.
- **Idea Agent hardening** — 2 000‑char message cap, 16 KB body cap, report and
  question wrapped in delimited tags, and a system prompt that treats both as data.
- **Headers** — CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer‑Policy,
  Permissions‑Policy; `X-Powered-By` disabled (`next.config.mjs`).
- **Image optimizer disabled** (`images.unoptimized`) — the app never uses
  `next/image` with remote sources, so the `/_next/image` attack surface is gone.
- **Log hygiene** — collector errors never include raw URLs; `redactUrl()` strips
  `api_key` / `key` / `token` / `secret` params from anything logged.
- **Packaging** — the zip script excludes every `.env*` except `.env.example`.

Run `npm audit` after installing. Remaining advisories are **build‑time only**
(Tailwind 3's `braces`/`micromatch`/`chokidar`, ESLint 8 tooling) or require the
Next 16 / Tailwind 4 major upgrade — none are reachable at runtime.

---

## 🏗️ Tech stack

Next.js 15.5 (App Router) · React 19 · TypeScript · Tailwind CSS · Prisma + SQLite ·
custom SVG charts (no chart dependency). Production analog: point the Prisma
datasource at Postgres/Supabase and schedule `/api/cron/daily`.

> `next lint` is deprecated in Next 15 and removed in 16; migrate to the ESLint CLI
> with `npx @next/codemod@canary next-lint-to-eslint-cli .` when you upgrade.

---

## ⚠️ Disclaimer

IdeaForge is an **educational clone** of the ideabrowser.com concept. All ideas,
scores, and market figures are **generated by the pipeline** and are illustrative —
not investment or business advice. Not affiliated with ideabrowser.com.
