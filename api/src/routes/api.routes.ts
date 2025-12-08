import express from 'express';
import { registerGameSessionRoutes } from './gameSession.routes';
import { settings } from '../settings'

export function registerRoutes(app: express.Express): void {
    const sessionRoutes = registerGameSessionRoutes();

    app.use('/api/game-sessions', sessionRoutes);

    app.get('/health', (_, res) => {
        res.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            service: settings.app.name,
        });
    });
}
