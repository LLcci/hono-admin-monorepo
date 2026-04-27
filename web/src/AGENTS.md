# Web Package

**Package:** `web/`
**Framework:** Vue 3 + Vite + Pinia + Vue Router

## ENTRY POINT

`web/src/main.ts` — creates Vue app, installs Pinia + Router, mounts to `#app`

## STRUCTURE

```
web/src/
├── App.vue           # Root component (empty, just router-view)
├── main.ts          # App bootstrap
├── router/
│   └── index.ts    # Vue Router (createWebHistory, empty routes)
└── stores/
    └── counter.ts   # Example Pinia store (count, doubleCount, increment)
```

## CURRENT STATE

- **App.vue**: Minimal — just `<RouterView />`
- **Router**: Empty routes array, using `createWebHistory`
- **Store**: Example `useCounterStore` with `ref` + `computed` + action

## VITE PLUGINS

- `vue()` — Vue SFC support
- `vueDevTools()` — Vue DevTools integration

## ALIAS

`@` → `./src` (configured in `vite.config.ts`)

## TYPESCRIPT CONFIGS

- `web/tsconfig.json` — project references
- `web/tsconfig.app.json` — Vue app targets
- `web/tsconfig.node.json` — Vite/node targets