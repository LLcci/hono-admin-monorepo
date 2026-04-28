import { serve } from '@hono/node-server';
import { getConnInfo } from '@hono/node-server/conninfo';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { db } from './db/index.js';
import { requireAuthMiddleware } from './middleware/auth.js';
import { loggerMiddleware } from './middleware/logger.js';
import { auth } from './utils/auth.js';
import { logger } from './utils/logger.js';

export { db };

type Session = Awaited<ReturnType<typeof auth.api.getSession>>;

const app = new Hono<{
  Variables: {
    session: NonNullable<Session>;
  };
}>();
app.use(
  cors({
    origin: process.env.BETTER_AUTH_URL ?? 'http://localhost:5173',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
  })
);
app.use(loggerMiddleware);

app.onError((err, c) => {
  const method = c.req.method;
  const path = c.req.path;
  const info = getConnInfo(c);

  const ip =
    c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ||
    c.req.header('cf-connecting-ip') ||
    info.remote.address ||
    'unknown';

  if (err instanceof HTTPException) {
    logger.error(`${method} ${path}`, {
      ip,
      status: err.status,
      message: err.message,
      stack: err.stack
    });

    return err.getResponse();
  }

  logger.error(`${method} ${path}`, {
    ip,
    status: 500,
    message: err instanceof Error ? err.message : 'Unknown error',
    stack: err instanceof Error ? err.stack : undefined
  });

  return c.json(
    {
      message: 'Internal Server Error'
    },
    500
  );
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/api/me', requireAuthMiddleware, async (c) => {
  return c.json(c.get('session'));
});

app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw));

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT)
  },
  (info) => {
    logger.info(`Server is running on http://localhost:${info.port}`);
  }
);

