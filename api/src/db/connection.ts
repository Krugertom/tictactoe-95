import mongoose from 'mongoose';
import { logger } from '../logging/logger';
import { settings } from '../settings'

export class DatabaseConnection {
    private mongoUrl: string;

    constructor(mongoUrl: string = settings.database.mongoUrl) {
        this.mongoUrl = mongoUrl;
    }

    async connect(): Promise<void> {
        try {
            await mongoose.connect(this.mongoUrl);
            logger.info('MongoDB connected successfully');
        } catch (error) {
            logger.error({ error }, 'MongoDB connection error');
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        try {
            await mongoose.disconnect();
            logger.info('MongoDB disconnected successfully');
        } catch (error) {
            logger.error({ error }, 'MongoDB disconnection error');
            throw error;
        }
    }
}
