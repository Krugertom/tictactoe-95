import { Server } from 'http';
import app from '@/app';
import { settings } from '@/settings';
import { logger } from '@/logging/logger';
import { DatabaseConnection } from '@/db/connection';

export class Orchestrator {
    private server?: Server;
    private port: number;
    private db: DatabaseConnection;

    constructor() {
        this.port = settings.app.port;
        this.db = new DatabaseConnection();
    }

    async start(): Promise<void> {
        try {
            logger.info('Connecting to MongoDB ....');
            await this.db.connect();

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
        } catch (error) {
            logger.error({ error }, 'Failed to start orchestrator');
            throw error;
        }
    }

    async stop(): Promise<void> {
        logger.info('Stopping orchestrator ...');

        if (this.server) {
            await new Promise<void>((resolve, reject) => {
                this.server!.close((error) => {
                    if (error) {
                        reject(error);
                    } else {
                        logger.info('API server stopped');
                        resolve();
                    }
                });
            });
        }
        
        try {
            await this.db.disconnect();
        } catch (error) {
            logger.error({ error }, 'Error disconnecting from database');
        }

        logger.info('Orchestrator stopped successfully');
    }

    isRunning(): boolean {
        return this.server?.listening || false;
    }

    getDatabaseStatus(): boolean {
        return this.db.getConnectionStatus();
    }
}
