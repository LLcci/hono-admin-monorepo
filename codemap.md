# Repository Atlas: hono-admin-monorepo

## Project Responsibility

Monorepo for a Hono-based REST API and a Vue 3 admin panel. The repository centralizes backend HTTP handling, authentication, PostgreSQL persistence through Drizzle ORM, and a Vite-powered frontend that consumes the API through a development proxy.

## System Entry Points

- `package.json`: Workspace-level scripts for development, build, linting, formatting, and hooks installation.
- `pnpm-workspace.yaml`: Declares the `api/` and `web/` workspace packages.
- `api/src/index.ts`: Backend application bootstrap, CORS and logging middleware registration, protected route definition, auth handler wiring, and server startup.
- `web/src/main.ts`: Frontend bootstrap, plugin registration, and root app mount.
- `eslint.config.js`, `.prettierrc`, `lefthook.yml`, `commitlint.config.js`: Shared repository policy for code style and commit workflow.

## Repository Design

- **Monorepo pattern**: pnpm workspaces manage two independently buildable packages under a shared toolchain.
- **Backend architecture**: Hono application layer with middleware, utility modules, and a Drizzle-backed data access boundary.
- **Frontend architecture**: Vue 3 SPA using plugin-based composition through Pinia and Vue Router.
- **Documentation layout**: Folder-local `codemap.md` files describe subsystem responsibilities, while this root atlas provides the cross-repository entry point.

## Repository Flow

1. Workspace scripts orchestrate backend and frontend commands from the repository root.
2. The `api/` package accepts HTTP traffic, applies CORS and request logging, routes authentication traffic into better-auth backed by PostgreSQL, and exposes protected session-aware endpoints.
3. The `web/` package boots a Vue SPA, renders routed views, and accesses backend endpoints through `/api` during development.
4. Shared linting, formatting, and git hooks enforce consistent repository-wide standards before changes are committed.

## Directory Map

| Directory | Responsibility Summary | Detailed Map |
|-----------|------------------------|--------------|
| `api/` | Backend service package implementing the Hono API, auth integration, database wiring, and server-side operational concerns. | [View Map](api/codemap.md) |
| `api/src/` | Backend bootstrap layer that composes middleware, routes, logger, auth handler, and exported database access. | [View Map](api/src/codemap.md) |
| `api/src/db/` | Database access boundary exposing the singleton Drizzle client backed by a PostgreSQL pool. | [View Map](api/src/db/codemap.md) |
| `api/src/schema/` | Authentication-oriented relational schema definitions and ORM relations for Drizzle and better-auth. | [View Map](api/src/schema/codemap.md) |
| `api/src/middleware/` | HTTP middleware layer for cross-cutting request logging and request metadata capture. | [View Map](api/src/middleware/codemap.md) |
| `api/src/utils/` | Shared backend utility modules for structured logging and auth system configuration. | [View Map](api/src/utils/codemap.md) |
| `web/` | Frontend SPA package containing the Vue admin panel, build pipeline, and API proxy integration. | [View Map](web/codemap.md) |
| `web/src/` | Client application source including app bootstrap, root shell, routing, and state registration. | [View Map](web/src/codemap.md) |
| `web/src/router/` | Client-side navigation subsystem that constructs and exports the Vue Router instance. | [View Map](web/src/router/codemap.md) |
| `web/src/stores/` | Reactive state management layer implemented with Pinia setup stores. | [View Map](web/src/stores/codemap.md) |

## Root Assets

- `package.json`: Declares workspace scripts and shared dev dependencies.
- `pnpm-lock.yaml`: Captures resolved dependency graph for the monorepo.
- `README.md`: Human-oriented project introduction.
- `AGENTS.md`: Auto-loaded operational guidance for agents working in this repository.
- `.slim/codemap.json`: Codemap tracking state used to detect future repository changes.

## Integration Points

- `web/` consumes backend endpoints provided by `api/`, using Vite proxying in local development.
- `api/` depends on PostgreSQL connectivity and auth/environment configuration from runtime variables.
- Repository-wide tool configuration applies uniformly to both packages through shared root config files.
