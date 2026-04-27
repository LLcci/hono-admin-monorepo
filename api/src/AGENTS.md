# API Package

**Package:** `api/`
**Framework:** Hono + @hono/node-server

## ENTRY POINT

`api/src/index.ts` — registers middleware, defines routes, starts server on PORT (default 3001)

## STRUCTURE

```
api/src/
├── index.ts           # App init, route definitions, serve()
├── middleware/
│   └── logger.ts     # Request logging middleware
└── utils/
    └── logger.ts     # Winston logger (daily rotate, 1d retention)
```

## CURRENT ROUTES

| Method | Path | Handler |
|--------|------|---------|
| GET | `/` | `c.text('Hello Hono!')` |
| GET | `/hello` | `c.text('Hello Hono!')` |

## MIDDLEWARE

### logger.ts
- Records: `path`, `method`, `status`, `duration` (ms), `ip`
- IP detection priority: `x-forwarded-for` → `cf-connecting-ip` → `remote.address`
- Uses `routePath(c, -1)` for matched route path

## LOGGER CONFIG

- **Transport**: `winston.transports.DailyRotateFile`
- **Levels**: info (info-*.log), error (info-*.log)
- **Retention**: 1 day
- **Max size**: 10MB
- **Console**: colored output for dev

## ENV VARS

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | 3001 | Server port |
| `NODE_ENV` | development | Env mode |