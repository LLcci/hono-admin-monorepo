import { HTTPException } from 'hono/http-exception';
import { createMiddleware } from 'hono/factory';
import { auth } from '../utils/auth.js';

type Session = Awaited<ReturnType<typeof auth.api.getSession>>;

export const requireAuthMiddleware = createMiddleware<{
  Variables: {
    session: NonNullable<Session>;
  };
}>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers
  });

  if (!session) {
    throw new HTTPException(401, {
      message: 'Unauthorized'
    });
  }

  c.set('session', session);
  await next();
});
