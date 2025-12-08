import { BaseSettings, setting } from 'envarna';

export class ApiSettings extends BaseSettings {
    @setting.string()
    baseUrl: string = import.meta.env.VITE_API_BASE_URL!;
}
