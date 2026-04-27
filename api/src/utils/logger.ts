import * as winston from 'winston';
import 'winston-daily-rotate-file';

const infoTransport = new winston.transports.DailyRotateFile({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.ms(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  dirname: 'log',
  level: 'info',
  filename: 'info-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '10m',
  maxFiles: '1d'
});

infoTransport.on('error', (error) => {
  console.error(error);
});

const errorTransport = new winston.transports.DailyRotateFile({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.ms(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  dirname: 'log',
  level: 'error',
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '10m',
  maxFiles: '1d'
});

errorTransport.on('error', (error) => {
  console.error(error);
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.ms(),
    winston.format.simple(),
    winston.format.colorize({ all: true })
  ),
  transports: [infoTransport, errorTransport, new winston.transports.Console()]
});

logger.exceptions.handle(errorTransport);

export { logger };

