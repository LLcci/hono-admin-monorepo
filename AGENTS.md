# PROJECT KNOWLEDGE BASE

## Purpose

Operational notes for agents working in this repository. Keep this file short and defer architecture details to `codemap.md`.

## Read First

1. `codemap.md` — repository-level structure and integration map
2. `README.md` — human-facing entry doc with commands and conventions

## Fast Pointers

| Task | Primary file |
| --- | --- |
| API bootstrap and routes | `api/src/index.ts` |
| Auth guard middleware | `api/src/middleware/auth.ts` |
| Request logging | `api/src/middleware/logger.ts` |
| better-auth server config | `api/src/utils/auth.ts` |
| Drizzle connection | `api/src/db/index.ts` |
| Auth schema | `api/src/schema/auth.ts` |
| Web bootstrap | `web/src/main.ts` |
| Root auth screen | `web/src/App.vue` |
| Auth client | `web/src/hooks/auth.ts` |
| Router | `web/src/router/index.ts` |
| Pinia stores | `web/src/stores/` |

## Project Rules

- Indent with 2 spaces
- Use single quotes
- Keep semicolons
- Use explicit `.js` extensions where TypeScript config requires them
- Do not use `@ts-ignore`, `@ts-expect-error`, or `as any`
- Do not leave empty `catch` blocks
- Do not use `console.log`

## Commands

```bash
pnpm dev
pnpm dev:api
pnpm dev:web
pnpm build
pnpm typecheck
pnpm lint
pnpm lint:fix
pnpm format
pnpm check
pnpm --filter api db:generate
pnpm --filter api db:migrate
pnpm --filter api db:push
pnpm --filter api db:studio
```

## Notes

- API default port is controlled by `PORT`
- Web dev server is Vite-based; default local port is typically `5173`
- Auth client defaults to `http://localhost:3001`
- Log files are written under `api/log/`
