import { getConnInfo } from '@hono/node-server/conninfo';
import { createMiddleware } from 'hono/factory';
import { routePath } from 'hono/route';
import { logger } from '../utils/logger.js';

export const loggerMiddleware = createMiddleware(async (c, next) => {
  const start = Date.now();
  const method = c.req.method;
  const path = routePath(c, -1);
  const info = getConnInfo(c);

  // 获取请求来源 IP
  const ip =
    c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ||
    c.req.header('cf-connecting-ip') ||
    info.remote.address ||
    'unknown';

  await next();

  // 获取响应信息
  const status = c.res.status;

  const duration = Date.now() - start;

  logger.info(path, {
    ip,
    method,
    status,
    duration
  });
});

