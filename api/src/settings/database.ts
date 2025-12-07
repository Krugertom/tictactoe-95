import { BaseSettings, setting, v } from 'envarna';

export class DatabaseSettings extends BaseSettings {
    @setting.string()
    name: string = 'tic-tac-toe-api';

    @setting.number()
    port: number = 3001;
}
