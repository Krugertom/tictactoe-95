export class ApiSettings {
    baseUrl: string;

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
    }

    static load(): ApiSettings {
        return new ApiSettings();
    }
}
