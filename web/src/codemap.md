# web/src/

## Responsibility

The `src/` folder contains the Vue 3 application source code. It provides the root component, entry bootstrap, client-side routing configuration, and shared state management stores.

## Design

- **App.vue**: Root component rendering static content and `<RouterView />` for route outlet
- **main.ts**: App bootstrap — creates Vue app instance, installs Pinia + Router, mounts to DOM
- **router/**: Vue Router 5 instance with `createWebHistory` and empty routes array
- **stores/**: Pinia stores using Composition API style (`defineStore` with setup function)
- **Path alias**: `@` resolves to `./src/`

## Flow

1. `main.ts` executes on page load
2. Creates `createApp(App)` instance
3. Registers `createPinia()` plugin for global state
4. Registers `router` plugin for client-side routing
5. Mounts app to `<div id="app">` in `index.html`
6. `App.vue` renders template, `<RouterView />` swaps in matched route components

## Integration

- **Pinia stores**: Accessed via `useStore()` composable in components; `useCounterStore` example exists in `stores/counter.ts`
- **Router**: Components access navigation via `useRouter()` and route data via `useRoute()`
- **API**: Will communicate with Hono API via `/api` proxied endpoints
