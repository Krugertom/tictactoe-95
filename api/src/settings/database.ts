import { BaseSettings, setting, v } from 'envarna';

export class DatabaseSettings extends BaseSettings {
    @setting.string()
    mongoUrl!: string;

}
