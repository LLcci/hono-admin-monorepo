# Logger Middleware (`api/src/middleware`)

## Responsibility

Hono middleware that logs HTTP request details (method, path, status, duration, client IP) for every incoming request.

## Design

```typescript
export const loggerMiddleware = createMiddleware(async (c, next) => {
  // Pre-request: capture start time, method, path, IP
  const start = Date.now();
  const method = c.req.method;
  const path = routePath(c, -1);  // Matched route pattern
  const ip = /* IP extraction */;
  
  await next();  // Continue to route handler
  
  // Post-response: log with status and duration
  logger.info(path, { ip, method, status: c.res.status, duration });
});
```

**IP detection priority:**
1. `x-forwarded-for` header (first entry, before comma)
2. `cf-connecting-ip` header (Cloudflare)
3. `info.remote.address` from `@hono/node-server/conninfo`
4. Fallback to `'unknown'`

**Logged fields:**
- `path` — matched route pattern (e.g., `/api/auth/sign-in`)
- `method` — HTTP method (GET, POST, etc.)
- `status` — HTTP response status code
- `duration` — request duration in milliseconds
- `ip` — client IP address

## Flow

1. Middleware captures request metadata before handler execution
2. Calls `next()` to pass control to route handler
3. After response, calculates duration and logs entry via Winston

## Integration

- **Registered in**: `api/src/index.ts` — `app.use(loggerMiddleware)`
- **Winston logger**: Uses `logger` from `../utils/logger.js`
- **Route path**: Uses `routePath(c, -1)` from `hono/route` to get matched pattern
