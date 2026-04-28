# API Entry Point (`api/src`)

## Responsibility

Application bootstrap and HTTP route registration. Initializes the Hono app, registers cross-origin and request middleware, defines public and protected routes, and starts the HTTP server.

## Design

```typescript
// Core components wired in index.ts
const app = new Hono();
app.use(cors(...));                  // Cross-origin credential support
app.use(loggerMiddleware);           // Request logging
app.get('/', (c) => c.text('Hello Hono!'));  // Health check
app.get('/api/me', requireAuthMiddleware, (c) => c.json(c.get('session'))); // Session endpoint
app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw)); // Auth
serve({ fetch: app.fetch, port: Number(process.env.PORT) }, callback);
```

**Dependencies imported:**
- `./db/index.js` — exports `db` instance (also re-exported for consumers)
- `./middleware/auth.js` — `requireAuthMiddleware` for protected session routes
- `./middleware/logger.js` — `loggerMiddleware`
- `./utils/auth.js` — `auth` (better-auth instance)
- `./utils/logger.js` — `logger` (Winston instance for startup logging)

## Flow

1. **Middleware registration**: CORS runs first, then `loggerMiddleware` for all requests
2. **Route matching**:
   - `GET /` → returns plain text greeting
   - `GET /api/me` → requires a valid session, then returns the session cached on Hono context
   - `POST|GET /api/auth/*` → delegated to better-auth handler
3. **Error handling**: `app.onError` logs request context and returns Hono/JSON error responses
4. **Server startup**: `serve()` binds to configured port, logs startup message

## Integration

- **Re-exports**: `export { db }` makes database instance available to external consumers
- **Auth handler**: Handles all auth endpoints (sign-in, sign-up, session, etc.)
- **Protected session flow**: `requireAuthMiddleware` resolves `auth.api.getSession()`, stores it on context, and allows downstream handlers to reuse it
- **Port**: Defaults to 3001, configurable via `PORT` env var
- **Logger**: Winston logger used for startup confirmation message
