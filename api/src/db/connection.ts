import mongoose from 'mongoose';
import { logger } from '@/logging/logger';
import { settings } from '@/settings'

export class DatabaseConnection {
    private mongoUrl: string;
    private isConnected: boolean = false;

    constructor(mongoUrl: string = settings.database.mongoUrl) {
        this.mongoUrl = mongoUrl;
    }

    async connect(): Promise<void> {
        if (this.isConnected) {
            logger.warn('Database already connected');
            return;
        }

        try {
            await mongoose.connect(this.mongoUrl, {
                maxPoolSize: 10,
                minPoolSize: 5,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });

            this.isConnected = true;
            logger.info('MongoDB connected successfully with connection pooling');
            logger.info({
                maxPoolSize: 10,
                minPoolSize: 5,
            }, 'Connection pool configuration');
        } catch (error) {
            this.isConnected = false;
            logger.error({ error }, 'MongoDB connection error');
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        if (!this.isConnected) {
            logger.warn('Database already disconnected');
            return;
        }

        try {
            await mongoose.disconnect();
            this.isConnected = false;
            logger.info('MongoDB disconnected successfully');
        } catch (error) {
            logger.error({ error }, 'MongoDB disconnection error');
            throw error;
        }
    }

    getConnectionStatus(): boolean {
        return this.isConnected;
    }
}
