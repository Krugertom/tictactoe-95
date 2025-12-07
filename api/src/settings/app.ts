import { BaseSettings, setting, v } from 'envarna';

export class AppSettings extends BaseSettings {
    @setting.string()
    name: string = 'tic-tac-toe-api';

    @setting(
        v
            .string()
            .refine((val) => ['development', 'production', 'test'].includes(val), {
                message: 'NODE_ENV must be one of: development, production, test',
            })
    )
    nodeEnv: string = 'production';

    @setting.number()
    port: number = 3001;
}
