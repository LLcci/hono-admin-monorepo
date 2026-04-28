# web/src/router/

## Responsibility

Provides Vue Router 5 instance for client-side navigation. Configures history mode and defines application routes.

## Design

- **Module**: Single file `index.ts` exporting default router instance
- **History mode**: `createWebHistory(import.meta.env.BASE_URL)` — HTML5 history API
- **Routes**: Empty array `[]` — routes must be added as features are implemented
- **Base URL**: Read from `VITE_BASE_URL` env variable via `import.meta.env`

## Flow

1. Router created with `createRouter()` configuration
2. `createWebHistory` listens to browser `popstate` events for back/forward navigation
3. When URL changes, router matches against `routes` array
4. Matched route's component renders inside `<RouterView />` in `App.vue`
5. Programmatic navigation via `router.push()` or `<RouterLink>`

## Integration

- **Plugin**: Registered in `main.ts` via `app.use(router)`
- **History fallback**: `createWebHistory` falls back to hash mode if browser lacks History API
- **Route guards**: Not yet configured; `router.beforeEach()` etc. can be added when auth is implemented
