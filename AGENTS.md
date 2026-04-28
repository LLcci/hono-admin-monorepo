# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-27
**Commit:** ec0071e
**Branch:** main

## OVERVIEW

Hono REST API + Vue 3 管理面板 monorepo using pnpm workspaces.

## STRUCTURE

```
./
├── api/                      # Hono REST API
│   ├── src/
│   │   ├── index.ts        # Entry point (GET /, /hello)
│   │   ├── db/            # Drizzle database connection
│   │   │   └── index.ts   # db instance export
│   │   ├── schema/        # Drizzle table definitions
│   │   │   ├── index.ts   # Schema exports
│   │   │   └── users.ts  # Example table
│   │   ├── middleware/     # Custom middleware
│   │   │   ├── auth.ts    # Session guard middleware for protected routes
│   │   │   └── logger.ts  # Request logging + IP detection
│   │   └── utils/         # Utilities
│   │       └── logger.ts  # Winston config (daily rotate)
│   ├── drizzle.config.ts # Drizzle Kit config
│   └── .env              # Environment variables
│
├── web/                       # Vue 3 admin panel
│   └── src/
│       ├── App.vue          # Root component
│       ├── main.ts          # Entry point
│       ├── router/          # Vue Router
│       └── stores/          # Pinia stores
│
├── eslint.config.js          # ESLint 9 (TypeScript + Vue)
├── .prettierrc               # 2 spaces, 100 width, single quotes
├── lefthook.yml              # pre-commit (lint --fix), pre-push (lint)
├── commitlint.config.js      # @commitlint/config-conventional
└── pnpm-workspace.yaml       # api + web packages
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| API entry | `api/src/index.ts` | Routes + middleware registration, CORS, error handling |
| Database | `api/src/db/index.ts` | Drizzle db instance |
| Schema | `api/src/schema/*.ts` | Drizzle table definitions |
| Drizzle config | `api/drizzle.config.ts` | Migration settings |
| API logs | `api/src/middleware/logger.ts` | IP detection (x-forwarded-for, cf-connecting-ip) |
| Route auth guard | `api/src/middleware/auth.ts` | Validates session and stores it on Hono context |
| Winston config | `api/src/utils/logger.ts` | Daily rotate, 1d retention |
| Web entry | `web/src/main.ts` | Vue + Pinia + Router setup |
| Vue stores | `web/src/stores/` | Pinia state management |
| Vue router | `web/src/router/` | Vue Router config |

## CONVENTIONS (THIS PROJECT)

- **Indent**: 2 spaces
- **Line width**: 100 chars
- **Quotes**: single quotes
- **Semicolons**: always
- **Trailing commas**: none (ES5 style)
- **Module syntax**: `verbatimModuleSyntax` (explicit `.js` extensions in imports)

## ANTI-PATTERNS (THIS PROJECT)

- `@ts-ignore`, `@ts-expect-error`, `as any` — **NEVER**
- Empty catch blocks — **NEVER**
- `console.log` (warn/error allowed) — error in ESLint

## COMMANDS

```bash
pnpm dev          # Start API (3001) + Web (3000, proxies /api)
pnpm dev:api      # API only
pnpm dev:web     # Web only
pnpm build        # Build all
pnpm lint         # ESLint check
pnpm lint:fix     # Auto-fix
pnpm format       # Prettier
pnpm check        # lint + format check

# Database (run from api package)
pnpm --filter api db:generate   # Generate migrations
pnpm --filter api db:migrate    # Run migrations
pnpm --filter api db:push       # Push schema to DB
pnpm --filter api db:studio     # Open Drizzle Studio
```

## NOTES

- API port: 3001 (env: `PORT`)
- Web port: 3000 (proxies `/api` → localhost:3001)
- Log files: `api/log/` (auto-created, gitignored)
- Drizzle migrations: `api/drizzle/`
- ESLint: `@typescript-eslint/no-explicit-any: error`
- ESLint: `@typescript-eslint/no-unused-vars: error` (underscore params exempt)
- No `apps/` directory — workspace uses `api/` and `web/` directly
- Protected API routes can reuse `c.get('session')` after `requireAuthMiddleware`

## Repository Map

A full codemap is available at `codemap.md` in the project root.

Before working on any task, read `codemap.md` to understand:
- Project architecture and entry points
- Directory responsibilities and design patterns
- Data flow and integration points between modules

For deep work on a specific folder, also read that folder's `codemap.md`.
