# Frontend integration map (baseline scan)

Scanned the complete `app/`, `components/`, `lib/`, `providers/`, `services/`, and `types/` trees before refactoring. The baseline is UI-complete, but its data layer is predominantly simulated.

## Current data flow

| Surface | Current consumers | Current fake implementation | Production endpoint target |
|---|---|---|---|
| Resume upload / analysis | `app/(app)/upload/page.tsx` | `lib/services/api.ts`: `uploadResume` returns `MOCK_RESUME`; `analyzeResume` delays, randomizes scores, and returns `MOCK_RESUME`; page adds a client-side interval/progress simulation | `POST /api/v1/resumes/upload`, then `POST /api/v1/resumes/analyze` |
| Resume details | `app/(app)/resume/page.tsx` | `api.fetchResume()` returns `MOCK_RESUME` | `GET /api/v1/resumes/{resume_id}` |
| ATS analysis | `app/(app)/analysis/page.tsx` | `api.fetchATSAnalysis()` returns `MOCK_ATS` | `POST /api/v1/resumes/ats-feedback` |
| Jobs search / dashboard matches | `app/(app)/jobs/page.tsx`, `app/(app)/dashboard/page.tsx` | `fetchJobMatches` and `searchJobs` return/filter `MOCK_JOBS` in React; job stats contain hardcoded fallbacks | `GET /api/v1/jobs/search`, `GET /api/v1/jobs/aggregate`, `POST /api/v1/jobs/search/match` |
| Chat | `app/(app)/chat/page.tsx`, `components/chat/*` | `lib/services/chat.ts` contains a large local multilingual response generator and a legacy direct `fetch` to `/api/chat` | `POST /api/v1/chat` |
| Roadmap | `app/(app)/dashboard/page.tsx` | `api.fetchCareerRoadmap()` returns `MOCK_ROADMAP` | `GET /api/v1/roadmap/{career_domain}`, `POST /api/v1/roadmap/generate` |
| Dashboard | `app/(app)/dashboard/page.tsx` | `fetchDashboardStats` and `fetchRecentActivity` return `MOCK_DASHBOARD_STATS` / `MOCK_RECENT_ACTIVITY`; page also contains literal stat fallbacks | Compose from resume, aggregate jobs, roadmap, and system endpoints (no dashboard endpoint exists) |
| Opportunity Hub | `app/(app)/opportunity-hub/page.tsx` and all `components/opportunity-hub/*` | `lib/services/opportunities.ts` returns local constants; `lib/services/opportunity-hub-data.ts` and `services/nigeria-opportunities.ts` are data-only mock catalogs; page filters featured data locally | `POST /api/v1/opportunities/recommend`, `GET /api/v1/opportunities/recommend` |
| Demo data | No current page consumer | No demo service | `GET /api/v1/demo/profiles`, `GET /api/v1/demo/{profile_slug}` |
| System | No current consumer | No system service | `GET /api/v1/system/health`, `/api/v1/system/version`, `/health` |
| Other dashboard pages | `skills/page.tsx`, `resources/page.tsx`, `reports/page.tsx` | `MOCK_SKILL_GAP`, `MOCK_CAREER_RESOURCES`, `MOCK_REPORT` through `lib/services/api.ts` | No corresponding endpoint in the supplied production contract; must be composed from supported responses or show an honest empty/error state, never fabricate data |
| Auth/settings | `app/auth/signin/page.tsx`, `signup/page.tsx`, `settings/page.tsx` | Sign-in/sign-up are explicitly mocked in `lib/services/api.ts`; settings notifications are local component state | No auth endpoints were supplied; retain frontend-only JWT-ready boundary and do not invent HTTP routes |

## Baseline fake implementations

- `lib/services/mockData.ts`: exports `MOCK_USER`, `MOCK_RESUME`, `MOCK_JOBS`, `MOCK_ATS`, `MOCK_SKILL_GAP`, `MOCK_CAREER_RESOURCES`, `MOCK_INTERVIEW_QUESTIONS`, `MOCK_REPORT`, `MOCK_ROADMAP`, `MOCK_DASHBOARD_STATS`, `MOCK_NOTIFICATIONS`, and `MOCK_RECENT_ACTIVITY`.
- `lib/services/api.ts`: single mock façade; artificial `setTimeout` delays; random resume scores; fake auth; fake report download; local job filtering; no HTTP client.
- `lib/services/chat.ts`: local `mockResponses` for English, Hausa, Yoruba, and Igbo; artificial delay; direct legacy `fetch(`${API_BASE}/api/chat`)` fallback rather than the production route.
- `lib/services/opportunities.ts`: local opportunity arrays, artificial delays, local filtering/search, and constants for stats/categories/insights/employers/career paths.
- `lib/services/opportunity-hub-data.ts`: static opportunity-hub expansion data and filter options.
- `services/nigeria-opportunities.ts`: static Nigeria opportunity catalogs and delayed service methods.
- `app/(app)/upload/page.tsx`: fake extraction/analyzing progress via `setInterval`/`setTimeout` and invokes the mocked analysis façade.
- `app/(app)/jobs/page.tsx`: hardcoded hero stat fallbacks (`47`, `9`, `89`, `74`) and client-side matching/sorting/filtering.
- `app/(app)/analysis/page.tsx`: hardcoded pass-rate, total-scan, and copy around analysis; consumes mocked ATS values.
- `app/(app)/upload/page.tsx`: hardcoded hero metrics unrelated to a backend response.
- `app/page.tsx`: marketing-only product preview and the literal label `AI mock` (presentation copy, not a data service).
- UI-only placeholders such as input `placeholder` attributes, company-logo fallback markup, loading shimmer, bookmark local state, animation timers, and clipboard timers are not network mocks.

## React Query / hooks inventory

- React Query is already provided globally by `providers/QueryProvider.tsx` with 5-minute stale time and one retry.
- Query consumers: analysis, dashboard, jobs, opportunity hub (13 local queries), reports, resources, resume, and skills pages.
- Mutation consumer: upload page only; it currently calls a mock façade and then runs a second non-React-Query analysis call.
- Local UI hooks/state: `components/opportunity-hub/useBookmarks.ts`, chat composer/sidebar state, upload progress state, settings notification state, and responsive/navigation state. These preserve UX and are not backend services.

## Incremental replacement plan

1. Add `lib/api/client.ts` as the only Axios transport boundary: environment base URL, timeout, retry, JWT-ready auth header, cancellation, normalized friendly errors, and JSON handling.
2. Add endpoint-specific services under `lib/api/` (`resume`, `jobs`, `chat`, `roadmap`, `opportunities`, `system`, `demo`) and preserve existing page-facing types/props while migrating one surface at a time.
3. Migrate upload/resume/ATS, then jobs/dashboard/roadmap, then chat, then Opportunity Hub. Remove mock imports and artificial delays as each slice moves.
4. Replace unsupported mock-only pages with data composed only from supported API responses or an explicit loading/empty state; do not invent backend contracts.
5. Add React Query invalidation/background refresh and Sonner error/success handling while keeping existing animations and skeleton branches.
6. Verify with type-check, lint, build, and a repository-wide search for mock service imports, direct `fetch`, fake delays, and hardcoded data fallbacks.

## Contract note

The checkout does not contain an OpenAPI document and `NEXT_PUBLIC_API_URL` is not set in the repository environment at scan time. Endpoint service types will therefore be kept at the existing frontend boundary until `/api/v1/openapi.json` is available from the deployed API; no backend routes or request/response models are being added here.
