# Repository Atlas: hono-admin-monorepo

## Project Responsibility

Monorepo for a Hono-based REST API and a Vue 3 admin panel styled with Element Plus. The repository centralizes backend HTTP handling, authentication, PostgreSQL persistence through Drizzle ORM, and a Vite-powered frontend that communicates with the API and better-auth backend.

## System Entry Points

- `package.json`: Workspace-level scripts for development, build, linting, formatting, and hooks installation.
- `pnpm-workspace.yaml`: Declares the `api/` and `web/` workspace packages.
- `api/src/index.ts`: Backend application bootstrap, CORS and logging middleware registration, protected route definition, auth handler wiring, and server startup.
- `web/src/main.ts`: Frontend bootstrap, plugin registration, and root app mount.
- `eslint.config.js`, `.prettierrc`, `lefthook.yml`, `commitlint.config.js`: Shared repository policy for code style and commit workflow.

## Repository Design

- **Monorepo pattern**: pnpm workspaces manage two independently buildable packages under a shared toolchain.
- **Backend architecture**: Hono application layer with middleware, utility modules, and a Drizzle-backed data access boundary.
- **Frontend architecture**: Vue 3 SPA using Element Plus for UI, plugin-based composition through Pinia and Vue Router, and Vite auto-import/component resolvers.
- **Documentation layout**: `README.md` covers onboarding and commands, this atlas covers architecture and integration, and `AGENTS.md` contains agent-specific operating guidance.

## Repository Flow

1. Workspace scripts orchestrate backend and frontend commands from the repository root.
2. The `api/` package accepts HTTP traffic, applies CORS and request logging, routes authentication traffic into better-auth backed by PostgreSQL, and exposes protected session-aware endpoints.
3. The `web/` package boots a Vue SPA, uses a better-auth client for authentication, and consumes backend endpoints provided by the API package.
4. Shared linting, formatting, and git hooks enforce consistent repository-wide standards before changes are committed.

## Directory Map

| Directory | Responsibility |
|-----------|----------------|
| `api/` | Hono API package providing authentication, middleware, database access, and runtime configuration. |
| `web/` | Vue 3 SPA package providing the admin UI, auth client integration, routing, and state management. |

## Root Assets

- `package.json`: Declares workspace scripts and shared dev dependencies.
- `pnpm-lock.yaml`: Captures resolved dependency graph for the monorepo.
- `README.md`: Human-oriented project introduction.
- `AGENTS.md`: Concise agent guidance and links back to this atlas.
- `.slim/codemap.json`: Codemap tracking state used to detect future repository changes.

## Integration Points

- `web/` consumes backend endpoints provided by `api/`, with auth requests configured through the frontend auth client.
- `api/` depends on PostgreSQL connectivity and auth/environment configuration from runtime variables.
- Repository-wide tool configuration applies uniformly to both packages through shared root config files.
