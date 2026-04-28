# API Package

## Responsibility

Hono REST API server providing authentication endpoints and serving as the backend for the admin panel. Handles HTTP requests, database operations via Drizzle ORM, and session-based authentication via better-auth.

## Design

| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | Hono + @hono/node-server | HTTP server |
| ORM | Drizzle | Type-safe database queries |
| Database | PostgreSQL | Persistent data storage |
| Auth | better-auth | Session-based authentication |
| Logging | Winston + DailyRotateFile | Structured logging with file rotation |

**Package structure:**
```
api/
├── src/                    # Application source
│   ├── index.ts            # Entry point, route definitions
│   ├── db/                 # Database connection
│   ├── schema/             # Drizzle table definitions
│   ├── middleware/         # HTTP middleware
│   └── utils/              # Utilities (logger, auth)
├── drizzle.config.ts       # Drizzle Kit configuration
└── .env                    # Environment variables
```

## Flow

1. Server starts on `PORT` (default 3001)
2. `loggerMiddleware` logs every incoming request
3. Root route `/` returns "Hello Hono!"
4. Auth routes `/api/auth/*` handled by better-auth
5. All other routes fall through to Hono's 404 handler

## Integration

- **Web client**: Connects via `http://localhost:3001` (proxied through web dev server at port 3000)
- **Database**: PostgreSQL connection via `DATABASE_URL`
- **Auth**: Exported `db` instance used by better-auth adapter in `utils/auth.ts`
- **Config**: Uses `drizzle.config.ts` for migrations and schema sync

**Environment variables:**
| Variable | Purpose |
|----------|---------|
| `PORT` | Server port (default: 3001) |
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Secret for auth token signing |
| `BETTER_AUTH_URL` | Auth callback URL |
