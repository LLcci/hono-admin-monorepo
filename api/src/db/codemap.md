# Database Connection (`api/src/db`)

## Responsibility

Provides the Drizzle ORM database instance connected to PostgreSQL. Single exported `db` object used throughout the application for all database operations.

## Design

```typescript
const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
export const db = drizzle({ client: pool, schema });
```

**Components:**
- `Pool` from `pg` — raw PostgreSQL connection pool
- `drizzle()` from `drizzle-orm/node-postgres` — ORM wrapper
- `schema` — imported from `../schema/index.js` (re-exports auth schema)

**Configuration:**
- Connection string sourced from `DATABASE_URL` environment variable
- Schema types passed at initialization for type inference

## Flow

1. Environment variable `DATABASE_URL` loaded at startup
2. `pg.Pool` establishes connection pool to PostgreSQL
3. `drizzle()` wraps pool with ORM interface, scoped to schema types
4. `db` exported as singleton for application use

## Integration

- **Auth**: Used by `better-auth` via `drizzleAdapter` in `utils/auth.ts`
- **Migrations**: Drizzle Kit configured in `api/drizzle.config.ts` points to same PostgreSQL
- **Schema**: Relies on schema definitions in `src/schema/` (auth tables)
