# SEO Keyword API — Industry-level Design & Implementation

## Overview

Design an industry-grade backend API that accepts a free-text topic (e.g. "current finance minister") and returns:

* Keyword ideas (SEO-friendly) with search intent classification (informational, commercial, navigational)
* Related questions in `why` / `how` form
* Estimates of traffic and competition where possible
* Alternative suggestions if the topic has low traffic

Constraints provided by you to honor in the design:

* Work on free-tier tools where possible (avoid paid APIs unless necessary)
* Hard usage cap per user: **50 requests / month** (implement at API layer)
* You already have a server setup; this doc focuses on incremental modules, DB models, controllers, services, debugging, logging, and scaling patterns.

---

## High-level Architecture

* **API Gateway / Express** — validate auth, apply per-user quotas, route requests
* **Auth Layer** — JWT-based, refresh tokens optional
* **Controller Layer** — thin, orchestrates services
* **Service Layer** — `seoService`, `keywordService`, `externalApiService`, `cacheService` (Redis), `quotaService`, `analyticsService`
* **Worker / Job Queue** — BullMQ (Redis) or Bull for background enrichment + throttling
* **DB** — MongoDB (primary), with appropriate indexes and TTLs
* **Cache** — Redis for short-term caches & rate-limiter counters
* **Logging & Tracing** — Winston/Pino + correlation ID; Sentry for errors (free tier) + Prometheus metrics

Notes about free-tier: where external APIs require billing (Google Ads Keyword Planner, Ahrefs, Moz), include fallbacks and heuristics that work offline:

* Use Google Trends (no key) via `google-trends-api` or `pytrends` to estimate relative interest
* Use public signals: Wikipedia pageviews, Reddit/HackerNews counts, StackOverflow tags (if applicable)
* Extract suggestions from Google Autosuggest and "related searches" via lightweight scraping (beware TOS) or use browserless/Playwright only for low volume

---

## Folder Structure (modular, industry-standard)

```
src/
  api/
    v1/
      routes/
      controllers/
      validators/
  services/
    seo/
    external/
    cache/
    quota/
    jobs/
  models/
  lib/
    logger.js
    error.js
    response.js
    correlationId.js
  workers/
  jobs/
  tests/
  scripts/
  config/
  index.js
  app.js

Dockerfile
k8s/

```

---

## API Endpoints (recommended)

**Auth**

* `POST /api/v1/auth/login` — returns JWT

**SEO**

* `POST /api/v1/seo/generate` — create a job to generate keywords & questions

  * body: `{ topic: string, maxKeywords?: number = 20, includeQuestions?: boolean = true }`
* `GET /api/v1/seo/result/:queryId` — fetch stored result
* `GET /api/v1/seo/keyword/:keyword` — fetch cached keyword data

**Admin**

* `GET /api/v1/admin/metrics` — usage, top queries



---

## `seoService` Responsibilities

1. Normalize the incoming topic (NFKC, lower-case, strip punctuation)
2. Check cached keywords in DB
3. If not cached, call `keywordGenerationPipeline`
4. `keywordGenerationPipeline` steps:

   * Use `externalApiService` to fetch:

     * Google Trends interest over time / related queries
     * Autosuggest & People Also Ask (PAA) via lightweight scraping or headless browser (rate-limited)
     * Wikipedia title & pageviews
   * Aggregate candidate keywords, dedupe, normalize
   * Score candidates by estimated traffic (from trends or heuristic), competition (based on length, domain frequency), and intent
   * Generate `why`/`how` questions by templating and small LLM (see cost note) or deterministic patterns
   * Store keywords into `Keyword` collection and return top N

Heuristics you can use without paid API:

* Relative interest == Google Trends values (0..100)
* If Trends low & Wikipedia pageviews low -> low traffic
* Competition score heuristic: shorter keywords + transactional modifiers ("buy", "price") often higher competition
* Use SERP features frequency (if scraping results) to guess intent

---

## External APIs & Free alternatives

| Need                           |                          Paid API | Free / DIY alternative                                                                                   |
| ------------------------------ | --------------------------------: | -------------------------------------------------------------------------------------------------------- |
| Exact search volume            | Google Ads Keyword Planner (paid) | Google Trends (relative) + Wikipedia pageviews + query suggestions frequency                             |
| SERP features & SERP rank data |          SerpApi, Ahrefs, SEMrush | Lightweight SERP scraping for small volume (Playwright), or use `bing-web-search` free tier if available |
| PAA / "People also ask"        |                           SerpApi | scrape Google PAA via headless browser (rate-limit strictly) or parse SERP cache                         |
| Intent classification          |                              LLMs | deterministic rules + small ML model (fasttext) or open-source transformers if you self-host             |

**Important**: scraping search engines may violate terms of service. Prefer official APIs where you can. For a strict free-only product, combine Trends + public sources + small heuristics — it won't be perfect, but it's legal and low-cost.

---

## Rate-limiting & Quota Enforcement (50 reqs / month per user)

* Store `monthlyQuota`, `quotaUsed`, `quotaResetAt` on `User`.
* On each request:

  * If `quotaResetAt` < now, reset `quotaUsed = 0` and set next `quotaResetAt` to start of next month
  * If `quotaUsed + 1 > monthlyQuota` -> return `429` with explanatory body
  * Else increment `quotaUsed` (atomic update: `findOneAndUpdate` with `$inc` and check)



Additionally, use Redis sliding window for per-second rate-limiting to protect from burst abuse.

---

## Caching & Deduplication

* Cache keyword responses per `normalizedTopic` in Mongo (`Keyword` collection) and in Redis for fast hits.
* Cache TTL: 7–30 days depending on freshness budget
* Deduplicate candidate keywords by applying a `normalize()` function (strip punctuation, accents, stopwords optionally)

---

## Background Jobs & Scaling

* Enqueue heavy tasks (SERP scraping, trend aggregation) to a worker pool (BullMQ) and return `202 Accepted` on initial request.
* Worker picks job, updates `Query` doc status, writes `Keyword` results, notifies user via webhook or websocket (optional)

Scaling plan:

* Start: single Node process + Mongo Atlas free tier (or self-hosted), Redis single instance
* Mid: replicate Mongo (read replicas), move Redis to managed or HA cluster, separate worker pool horizontally
* Prod: k8s cluster, autoscaling for API pods and worker pods, managed Mongo, managed Redis, horizontal sharding for Mongo if dataset grows

---

## Logging, Observability & Debugging

* **Structured logs**: use Winston or Pino and output JSON logs. Include `correlationId`, `userId`, `requestId`.
* **Error tracking**: Sentry free tier integrated to capture exceptions, breadcrumbs.
* **Metrics**: expose `/metrics` for Prometheus; collect request latency, job durations, queue lengths, error rates.
* **Distributed tracing**: use OpenTelemetry to trace requests across API -> workers

**Debugging Workflow**

* Use `NODE_ENV=development` and `DEBUG` flags for verbose logs
* Unit tests for services (mock external APIs with `nock` or custom mocks)
* Integration tests with a test DB (Mongo in Docker) and test Redis
* Postman collection + automated tests (Newman) for E2E

---

## Security & Hardening

* Input validation (zod/joi)
* Rate limiting & quota
* Auth and RBAC
* Sanitize inputs to avoid NoSQL injections
* Use HTTPS, helmet, CORS
* Limit worker concurrency and implement retries with exponential backoff for external calls

---

## Dev & CI/CD

* Linting with ESLint + Prettier
* TypeScript for safety (preferred) — provide `.d.ts` and strict tsconfig
* Unit tests (Jest) + integration tests
* CI pipeline: run tests, lint, build docker image, push to registry
* CD: GitOps via ArgoCD or simple k8s manifests for deployment

---

## Example Implementation Snippets

### Normalizer util


---

## Testing & Debugging Strategy (practical steps)

1. **Unit test** every pure function in `seoService`. Mock external APIs using `nock` or a simple stub server.
2. **Integration tests**: spin up ephemeral Mongo + Redis containers in CI and run end-to-end job processing tests.
3. **Load testing**: run k6 scripts to emulate concurrency and ensure quota limiter & rate-limiter prevents abuse.
4. **Local debugging**: use `node --inspect` and VSCode remote debugging for worker processes.

---

## Deployment Checklist

* Dockerfile with multi-stage builds
* Health + readiness probes
* Environment variables management (use Vault or k8s secrets)
* Graceful shutdown for workers (listen to SIGTERM, finish current jobs)

---

## Tradeoffs & Decisions to Make

* **Paid exact data vs free heuristics**: If you need *exact* search volume (absolute numbers) and SERP metrics, paid APIs are required (budget tradeoff). For MVP and free-tier, use Trends + heuristics.
* **Sync vs Async**: For fastest UX, return cached results sync; for fresh results, use async jobs. Avoid blocking user while scraping.
* **Scraping legal risk**: scraping large volumes of Google SERPs risks IP blocks and ToS violations — mitigate with low volume, proxy rotation (careful), or prefer official APIs.

---

## Observability Example: Log Format (JSON)

```json
{
  "timestamp": "2026-01-14T12:00:00Z",
  "level": "info",
  "correlationId": "abcd-1234",
  "userId": "507f1f77bcf86cd799439011",
  "route": "POST /api/v1/seo/generate",
  "durationMs": 120,
  "meta": { "topic": "current finance minister" }
}
```

---

## Quick Roadmap to Start (practical incremental tasks)

1. Create `User`, `Query`, `Keyword` models and migration script
2. Implement auth (JWT) + quota middleware
3. Implement `POST /seo/generate` with cache fast-path and enqueue to worker
4. Implement worker with a stubbed `seoService` that runs deterministic heuristics (no external calls) — enables local testing
5. Add Redis caching and a small rate-limiter
6. Integrate Google Trends (node library) as first external signal
7. Add unit & integration tests, Postman collection
8. Improve scoring & optionally add light SERP scraping behind a feature flag

---

## Debugging & Logging Best Practices (concrete)

* Add correlation id middleware that attaches `x-correlation-id` to responses
* Log at `debug` level locally and `info` in prod; never log secrets
* Add clear error hierarchy (custom `QuotaError`, `ExternalApiError`) and central error handler
* Capture stack traces in Sentry and attach user/context metadata for quick triage

---

## Scaling Considerations

* Use indexed queries (`topic`, `user`) and limit document size
* For very large keyword store, partition by hash or by owner
* Avoid `find()` without projection; use pagination for results
* Use connection pooling and tune Mongo indexes; monitor slow queries

---

## Costs & Free-Tier Recommendations

* MongoDB: start with a free tier (Atlas) — fine for MVP
* Redis: self-hosted Docker or free cloud tier
* Sentry: free tier for errors
* Avoid paid keyword APIs until you validate product metrics; start with Trends+heuristics

---

## How to improve more than industry standard

(You asked for this at the end of every response — actionable, hard feedback and next-level improvements.)

1. **Precision telemetry**: instrument more granular metrics — not just request counts, but *keyword funnel metrics*: how many generated keywords get clicked/selected by users; track conversions from suggested keywords to published content.
2. **Model evaluation**: build an A/B pipeline to compare heuristics vs paid API data on a sample set; compute precision/recall for top-10 keywords.
3. **Self-hosted lightweight ML for intent**: train a small classifier (fastText or ONNX) on labeled query intent to beat rule-based heuristics.
4. **Automated re-scoring**: implement re-scoring of cached keywords weekly using latest trends and bump TTLs dynamically when signals increase.
5. **Human-in-the-loop**: provide an editor UI where SEOs can mark bad suggestions; feed that feedback into a supervised retraining loop.
6. **Privacy & GDPR**: implement data retention policies and easy deletion endpoints so the product is enterprise-ready.

---

## Next steps I can take for you

* If you want, I can scaffold the repository files: Mongoose models, Express controllers, example worker, and Postman collection.
* I can also generate the Dockerfile + Helm k8s manifests for a production-like deployment.

---

*Document created on 2026-01-14.*
