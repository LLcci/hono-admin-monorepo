# web/

## Responsibility

The `web/` package is a Vue 3 SPA admin panel built with Vite. It provides the frontend user interface, managing application state, routing, and API communication via proxy to the Hono API server.

## Design

- **Framework**: Vue 3 (v3.5.32) with Composition API and `<script setup>` syntax
- **Build tool**: Vite (v8.0.8) with `@vitejs/plugin-vue` and `vite-plugin-vue-devtools`
- **State management**: Pinia (v3.0.4)
- **Routing**: Vue Router 5 (v5.0.4) with `createWebHistory`
- **TypeScript**: Strict mode via `tsconfig.app.json`
- **Module type**: ESM (`"type": "module"`)
- **Path alias**: `@` maps to `./src/`

## Flow

1. `index.html` loads `/src/main.ts` as ES module
2. `main.ts` creates Vue app, installs Pinia and Router plugins, mounts to `#app`
3. `App.vue` renders content via `<RouterView />`
4. Vite dev server proxies `/api/*` requests to `localhost:3001`

## Integration

- **API**: Communicates via Vite proxy (`/api` → `http://localhost:3001`) in dev; production deploys proxy separately
- **Monorepo**: Uses pnpm workspace, sibling package `api/` provides REST endpoints
- **Type checking**: `vue-tsc --build` validates Vue SFCs and TypeScript
