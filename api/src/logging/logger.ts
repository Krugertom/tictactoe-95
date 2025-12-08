import pino from 'pino';
import { settings } from '@/settings';

const usePrettyLogs = settings.app.nodeEnv !== 'production';

export const logger = pino({
  level: settings.logging.level,
  ...(usePrettyLogs && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
        translateTime: 'HH:MM:ss',
      },
    },
  }),
});
