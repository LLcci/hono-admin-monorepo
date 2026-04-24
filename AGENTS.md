# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-24
**Branch:** master

## OVERVIEW

hono-admin-monorepo: Monorepo with Hono API server and Vue 3 web admin panel.

## STRUCTURE

```
./
├── apps/
│   ├── api/          # Hono REST API (Node adapter)
│   └── web/          # Vue 3 + Vite admin panel
├── node_modules/
├── biome.json       # Lint + format (space indent, 100 width)
├── lefthook.yml     # Git hooks (pre-commit, pre-push)
└── tsconfig.base.json
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|---------|-------|
| API routes | apps/api/src/routes/ | Hono route handlers |
| API middleware | apps/api/src/middleware/ | Custom middleware |
| Web components | apps/web/src/components/ | Vue components |
| Web stores | apps/web/src/stores/ | Pinia stores |
| Web pages | apps/web/src/pages/ | Route pages |

## CODE MAP

| Symbol | Type | Location |
|--------|------|----------|
| api/index.ts | entry | apps/api/src/index.ts |
| web/main.ts | entry | apps/web/src/main.ts |

## CONVENTIONS

- **Indent**: 2 spaces
- **Line width**: 100
- **Quotes**: single
- **Semicolons**: always
- **Trailing commas**: none (ES5 style)

## ANTI-PATTERNS

- Don't use `@ts-ignore`, `@ts-expect-error`, or `as any`
- No empty catch blocks
- Don't suppress biome rules

## COMMANDS

```bash
pnpm dev          # Start all apps
pnpm dev:api      # API only
pnpm dev:web     # Web only
pnpm build        # Build all
pnpm lint         # Biome lint
pnpm format       # Biome format
pnpm check        # Biome check --write
```

## NOTES

- API runs on localhost:3001
- Web runs on localhost:3000 (proxies /api to 3001)
- Auto-imports generated: apps/web/src/auto-imports.d.ts (gitignored)