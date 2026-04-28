# web/src/stores/

## Responsibility

Provides Pinia state management stores using Vue 3 Composition API. Contains reactive state, computed properties, and actions for feature domains.

## Design

- **Store pattern**: Composition API style with `defineStore(id, setupFn)`
- **counter.ts**: Example `useCounterStore` with:
  - `count` — `ref(0)` reactive number
  - `doubleCount` — `computed(() => count.value * 2)`
  - `increment()` — action that mutates `count.value`
- **Module structure**: Each store is a separate file, named with `use` prefix convention

## Flow

1. Component calls `useCounterStore()` composable
2. Pinia returns reactive state (`count`, `doubleCount`) and actions (`increment`)
3. Template bindings auto-track reactive dependencies via Vue's reactivity system
4. `doubleCount` recomputes when `count` changes
5. `increment()` is called imperatively from event handlers

## Integration

- **Pinia plugin**: Installed globally in `main.ts` via `app.use(createPinia())`
- **Access pattern**: `import { useCounterStore } from '@/stores/counter'`
- **SSR note**: Composition API stores are not directly serializable; serialization wrappers needed for SSR
