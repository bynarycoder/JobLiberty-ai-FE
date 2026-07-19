# Frontend ↔ Production Backend Integration Map

The frontend talks only to the deployed FastAPI backend.

- Base URL: `NEXT_PUBLIC_API_URL` (defaults to `https://jobliberty-backend.onrender.com`)
- API prefix: `/api/v1`
- Transport: Axios via `lib/api/client.ts`
- Data fetching: React Query
- No direct Gemini / Groq / Adzuna / Arbeitnow / RemoteOK calls from the browser

## Endpoint wiring

| Surface | Frontend entry | Production endpoint(s) | Notes |
|---|---|---|---|
| Resume upload | `app/(app)/upload/page.tsx` → `api.uploadResume` | `POST /api/v1/resumes/upload` | Stores `resume_id` in `localStorage` |
| Resume analyze | upload flow → `api.analyzeResume` | `POST /api/v1/resumes/analyze` | Backend Gemini analysis only |
| Resume details | `app/(app)/resume/page.tsx` | `GET /api/v1/resumes/{resume_id}` | Renders analysis fields when present |
| ATS feedback | `app/(app)/analysis/page.tsx` | `POST /api/v1/resumes/ats-feedback` | Frontend never calculates ATS |
| Job search | `app/(app)/jobs/page.tsx` | `GET /api/v1/jobs/search` | Provider aggregation is backend-only |
| Job match | jobs + dashboard | `POST /api/v1/jobs/search/match` | Match % / skills come from backend |
| Job aggregate | dashboard stats | `GET /api/v1/jobs/aggregate` | Used when composing dashboard stats |
| Job details / providers | `lib/api/jobs.ts` | `GET /api/v1/jobs/{id}`, `GET /api/v1/jobs/providers/status` | Available for future UI |
| Liberty AI chat | `app/(app)/chat/page.tsx` | `POST /api/v1/chat` | Groq stays server-side |
| Career roadmap | dashboard / skills / resources | `GET /api/v1/roadmap/{domain}`, `POST /api/v1/roadmap/generate` | Timeline rendered only |
| Opportunities | Opportunity Hub | `GET/POST /api/v1/opportunities/recommend` | Backend recommendation engine |
| Demo profiles | `lib/api/demo.ts` | `GET /api/v1/demo/profiles`, `GET /api/v1/demo/{slug}` | Ready for demo bootstrap |
| System health | `lib/api/system.ts` | `GET /api/v1/system/health`, `/version`, `/health` | Ops / status |

## Composition rules (no invented backend routes)

Pages without a dedicated backend endpoint compose UI state from supported responses only:

- **Dashboard stats** ← resume + ATS + jobs match/aggregate + roadmap
- **Skill gap** ← resume skills + job-match missing skills
- **Resources** ← roadmap learning path / certifications / projects + resume recommendations
- **Reports** ← resume + ATS + jobs match
- **Recent activity** ← session-derived events from those same payloads

If required upstream data is missing, pages show an honest empty/error state and a path to upload a resume. They do **not** fall back to mock datasets.

## API client guarantees

- Central Axios instance (`lib/api/client.ts`)
- `NEXT_PUBLIC_API_URL` with production default
- JWT-ready `Authorization` header from `jobliberty_access_token`
- Timeout + limited retry for transient failures
- Normalized `ApiError` messages for UI toasts/empty states
- Response normalizers in `lib/api/mappers.ts` accept camelCase or snake_case without inventing business logic

## Explicit non-goals

- No new backend endpoints
- No frontend ATS scoring
- No frontend job-match scoring
- No direct AI provider calls
- No direct job-board provider calls
- No fabricated career data when the API is empty
