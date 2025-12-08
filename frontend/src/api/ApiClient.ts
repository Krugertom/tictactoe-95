//LLM NOTE: I had claude write up a basic ApiClient for me, pattern I am comfortable with and use in most projects.
import { settings } from '../settings';

export class ApiClient {
    private baseUrl: string = settings.apiBaseUrl;

    protected getUrl(endpoint: string): string {
        return `${this.baseUrl}${endpoint}`;
    }

    protected async request<T>(
        endpoint: string,
        options?: RequestInit
    ): Promise<T> {
        const url = this.getUrl(endpoint);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const config: RequestInit = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options?.headers,
            },
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json() as T;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    protected async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    protected async post<T>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    protected async put<T>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    protected async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}
