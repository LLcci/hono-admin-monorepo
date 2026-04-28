# Schema Definitions (`api/src/schema`)

## Responsibility

Defines PostgreSQL table structures for authentication and user management, compatible with better-auth. Uses Drizzle ORM for schema-as-code.

## Design

**Tables:**

| Table | Key Columns | Purpose |
|-------|-------------|---------|
| `user` | id, name, email, emailVerified, image, username, displayUsername, createdAt, updatedAt | User accounts |
| `session` | id, expiresAt, token, userId, ipAddress, userAgent | Active sessions |
| `account` | id, accountId, providerId, userId, accessToken, refreshToken | OAuth/provider bindings |
| `verification` | id, identifier, value, expiresAt | Email verification tokens |

**Relations defined:**
- `user` → many `session`, many `account`
- `session` → one `user` (via userId)
- `account` → one `user` (via userId)

**Indexes:**
- `session_userId_idx` on `session.userId`
- `account_userId_idx` on `account.userId`
- `verification_identifier_idx` on `verification.identifier`

## Flow

1. Schema defined using Drizzle's `pgTable` and column helpers
2. Relations defined using `relations()` for ORM navigation
3. Tables exported from `index.ts` → `schema/auth.ts`
4. Schema consumed by `db/index.ts` for ORM initialization

## Integration

- **Drizzle**: Schema passed to `drizzle()` in `db/index.ts`
- **Better-auth**: `drizzleAdapter` expects these exact table names/columns
- **Migrations**: Drizzle Kit uses schema path from `drizzle.config.ts` to generate migrations
