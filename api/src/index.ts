import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { db } from './db/index.js';
import { loggerMiddleware } from './middleware/logger.js';
import { auth } from './utils/auth.js';
import { logger } from './utils/logger.js';

export { db };

const app = new Hono();
app.use(loggerMiddleware);

app.get('/', (c) => {
  return c.text('Hello Hono!');
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
