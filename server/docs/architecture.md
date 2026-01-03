Below is an **industry-level, in-depth explanation** of **every directory and file**, **why it exists**, **what problem it solves**, and **how it should be used correctly**.
I’ll be blunt where misuse usually happens.

---

# Root-Level Structure (Project Governance)

## `.github/`

**Purpose:** Automation, not code.

### `.github/workflows/`

GitHub Actions CI/CD pipelines.

* **ci.yml**

  * Runs on PRs
  * Linting, tests, build verification
  * Prevents broken code from merging
* **release.yml**

  * Triggered on tags or main merges
  * Builds Docker images, pushes artifacts
* **pr-labeler.yml**

  * Auto-labels PRs (backend, infra, tests, etc.)
  * Improves reviewer routing

**Rule:** No app logic ever goes here.

---

## `.husky/`

**Purpose:** Local developer discipline.

* **pre-commit**

  * Runs before every commit
  * Lint, format, unit tests
  * Blocks bad code early

This prevents “works on my machine” culture.

---

## `infra/`

**Purpose:** How your system runs in the real world.

### `infra/docker/`

* **Dockerfile**

  * Defines runtime environment
  * Must be deterministic
* **docker-compose.yml**

  * Local orchestration (app + DB + queue)

### `infra/k8s/`

* Kubernetes manifests / Helm charts
* Used only in staging/production

### `infra/terraform/`

* Infrastructure as Code
* Cloud resources (VPC, DB, secrets)

**Rule:** Infra never imports app code.

---

## `scripts/`

**Purpose:** Developer and ops automation.

* **local-dev.sh**

  * Boots app locally (DB, env, server)
* **seed-db.sh**

  * Inserts baseline data
* **reset-tests-db.sh**

  * Clean test DB for CI
* **generate-types.sh**

  * Generates API / DB contracts

Scripts are **executable documentation**.

---

## `config/`

**Purpose:** Runtime configuration, not secrets.

* **default.js**

  * Base config
* **production.js**

  * Overrides for prod
* **test.js**

  * Test-specific config
* **schema.json**

  * Validates config shape at runtime

Config is validated, not trusted.

---

## `docker/`

**Purpose:** Support containers.

### `docker/ci-db/`

* DB images or init SQL for CI
* Keeps CI isolated from prod schemas

---

## `migrations/`

**Purpose:** Database evolution.

* Schema changes
* Must be ordered, immutable
* Never edited after deployment

Migrations are legal contracts with your data.

---

#  `src/` — Application Code

---

## `src/main.js`

**Purpose:** App entry point.

* Loads config
* Initializes telemetry
* Starts server

No business logic allowed.

---

## `src/server.js`

**Purpose:** Server lifecycle.

* Starts HTTP server
* Exported for tests
* Enables clean shutdown

---

## `src/app/`

**Purpose:** Core application wiring.

### `src/app/index.js`

* App initialization
* Dependency injection

### `src/app/logger.js`

* Centralized logging
* Redaction, levels, formats

### `src/app/telemetry/`

Observability.

* **tracer.js**

  * Distributed tracing
* **metrics.js**

  * Prometheus / OpenTelemetry metrics

### `src/app/errors/httpError.js`

* Standard error format
* Prevents inconsistent responses

---

## `src/modules/`

**Purpose:** Feature-based boundaries (MOST IMPORTANT).

Each module is **self-contained**.

### `auth/`

* **controller.js**

  * HTTP layer (req/res)
* **service.js**

  * Business logic
* **repository.js**

  * Data access
* **dto/**

  * Input/output contracts
* **tests/**

  * Module-level tests

### `posts/`

Same layering as auth.

* **routes.js**

  * Route bindings only
* **schemas/**

  * Validation (Zod/Joi)
* **tests/**

  * Tests scoped to posts

Modules **must not import each other directly**.

---

## `src/domain/`

**Purpose:** Pure business logic.

### `entities/`

* Domain models
* No DB, no HTTP

### `services/`

* Business rules
* Reusable across modules

Domain must be framework-agnostic.

---

## `src/infrastructure/`

**Purpose:** External systems.

### `db/`

* **index.js**

  * DB client setup
* **migrations/**

  * Infra-level DB helpers
* **test-helpers/**

  * DB setup for tests

### `queue/`

* Background job queues

### `email/`

* Email providers
* Templates, adapters

Infra depends on domain, never opposite.

---

## `src/common/`

**Purpose:** Cross-cutting utilities.

### `types/`

* Shared contracts (JS Doc types)

### `utils/`

* Pure helpers

### `validators/`

* Shared validation logic

Keep this minimal or it becomes a dump.

---

## `src/jobs/`

**Purpose:** Background workers.

* Cron jobs
* Async tasks
* No HTTP access

---

## `src/events/`

**Purpose:** Event-driven logic.

* Subscribers
* Domain events
* Decoupled workflows

---

## `src/api/`

**Purpose:** External interfaces.

### `http/`

* **middlewares/**

  * Auth, rate-limit, etc.
* **routers.js**

  * Route aggregation
* **health.js**

  * Liveness/readiness checks

### `graphql/`

* Schema
* Resolvers
* Context

---

#  Testing

## `tests/`

Separated by intent, not feature.

* **unit/**

  * Pure logic tests
* **integration/**

  * DB + services
* **e2e/**

  * Full system tests
* **fixtures/**

  * Test data

Test folders reflect confidence levels.

---

#  Documentation

## `docs/`

* **architecture.md**

  * System design
* **testing.md**

  * Testing strategy
* **runbooks/**

  * On-call / ops guides

---

#  Root Files

* **.env.example**

  * Environment contract
* **package.json**

  * Dependencies + scripts
* **jest.config.js**

  * Test runner config
* **.eslintrc.cjs**

  * Code standards
* **.prettierrc**

  * Formatting rules
* **README.md**

  * Entry point for humans

---

#  Common Mistakes to Avoid (Blunt Truth)

* Putting business logic in controllers ❌
* Letting modules import each other ❌
* Using `common/` as a junk drawer ❌
* Skipping config validation ❌
* Treating infra as optional ❌

---

#  How to Improve Beyond Industry Standard (IMPORTANT)

1. Enforce module boundaries with ESLint
2. Add architectural tests
3. Fail CI on unused files
4. Version config schema
5. Add ADRs (Architecture Decision Records)
6. Treat migrations as immutable
7. Measure test confidence, not coverage
8. Add runtime contract validation
9. Log domain events explicitly
10. Make structure a **policy**, not a suggestion

If you want next:

* Visual dependency diagram
* ESLint boundary rules
* Sample auth module implementation
* CI rules enforcing this structure

Say the next step.
