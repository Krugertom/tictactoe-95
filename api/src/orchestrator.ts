import { Server } from 'http';
import app from './app';
import { settings } from './settings';
import { logger } from './logging/logger';

export class Orchestrator {
    private server?: Server;
    private port: number;

    constructor() {
        this.port = settings.app.port;
    }

    async start(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.server = app.listen(this.port, () => {
                    logger.info(`${settings.app.name} startup succesfully on port: ${this.port}`);
                    resolve();
                });

                this.server.on('error', (error) => {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.server) {
                resolve();
                return;
            }

            this.server.close((error) => {
                if (error) {
                    reject(error);
                } else {
                    logger.info('API server stopped');
                    resolve();
                }
            });
        });
    }

    isRunning(): boolean {
        return this.server?.listening || false;
    }
}
