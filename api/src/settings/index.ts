import { createSettingsProxy } from 'envarna';
import { AppSettings } from './app';
import { LoggingSettings } from './logging';
import { DatabaseSettings } from './database';

export const settings = createSettingsProxy({
    app: () => AppSettings.load(),
    logging: () => LoggingSettings.load(),
    database: () => DatabaseSettings.load(),
});
