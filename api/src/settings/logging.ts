import { BaseSettings, setting } from 'envarna';

export class LoggingSettings extends BaseSettings {
    @setting.string()
    level: string = 'info';
}
