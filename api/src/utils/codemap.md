# Utilities (`api/src/utils`)

## Responsibility

Application utilities: Winston-based structured logging with daily file rotation, and better-auth instance configuration.

## Design

### Logger (`utils/logger.ts`)

Winston logger with three transports:

| Transport | Level | Output | Retention |
|-----------|-------|--------|-----------|
| `DailyRotateFile` | info | `log/info-YYYY-MM-DD.log` | 1 day, max 10MB |
| `DailyRotateFile` | error | `log/error-YYYY-MM-DD.log` | 1 day, max 10MB |
| `Console` | combined | stdout (colorized) | none |

**Format:** JSON with timestamp (`YYYY-MM-DD HH:mm:ss`), ms timing, pretty-printed.

### Auth (`utils/auth.ts`)

Better-auth instance configured with:

```typescript
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  emailAndPassword: { enabled: true },
  plugins: [username()]
});
```

**Enabled features:**
- Email/password authentication
- Username plugin (additional login field)
- Drizzle ORM adapter for PostgreSQL

## Flow

### Logger
1. Created at module load time
2. Logs written to files in `api/log/` directory
3. Rotates daily, removes files older than 1 day
4. Also outputs to console during development

### Auth
1. Initialized at module load using `db` from `../db/index.js`
2. Exported for use in route handlers (`api/auth/*` paths)
3. Provides sign-in, sign-up, session, and other auth endpoints

## Integration

- **Logger middleware**: Imports `logger` from `../utils/logger.js`
- **Entry point**: Imports `auth` from `../utils/auth.js` for route handler
- **Database**: Auth utility imports `db` from `../db/index.js`
