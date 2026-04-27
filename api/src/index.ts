import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { loggerMiddleware } from './middleware/logger.js';
import { logger } from './utils/logger.js';

const app = new Hono();
app.use(loggerMiddleware);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});
app.get('/hello', (c) => {
  return c.text('Hello Hono!');
});

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT)
  },
  (info) => {
    logger.info(`Server is running on http://localhost:${info.port}`);
  }
);
