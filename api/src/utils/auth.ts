import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { username } from 'better-auth/plugins';
import { db } from '../db/index.js';
import { logger } from './logger.js';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg'
  }),
  emailAndPassword: {
    enabled: true
  },
  logger: {
    level: 'debug',
    log(level, message, ...args) {
      const metadata = args.length > 0 ? { args } : undefined;

      switch (level) {
        case 'error':
          logger.error(message, metadata);
          break;
        case 'warn':
          logger.warn(message, metadata);
          break;
        case 'debug':
          logger.debug(message, metadata);
          break;
        default:
          logger.info(message, metadata);
          break;
      }
    }
  },
  plugins: [username()]
});

