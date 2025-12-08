
import { Router, Request, Response } from 'express';
import { GameSessionModel } from '../db/models/GameSessionModel';
import { logger } from '../logging/logger';

const router = Router();

export function registerGameSessionRoutes(): Router {

    router.get('/', async (_req: Request, res: Response) => {
        try {
            const sessions = await GameSessionModel.find()
                .sort({ createdAt: -1 })
                .exec();

            logger.info({ count: sessions.length }, 'Retrieved game sessions');

            res.status(200).json(sessions);
        } catch (error) {
            logger.error({ error }, 'Error retrieving game sessions');
            res.status(500).json({ error: 'Failed to retrieve game sessions' });
        }
    });

    router.post('/', async (req: Request, res: Response) => {
        try {
            const { board, currentPlayer, status, winner } = req.body;

            const session = new GameSessionModel({
                board: board || Array(9).fill(null),
                currentPlayer: currentPlayer || 'X',
                status: status || 'in_progress',
                winner: winner || null
            });

            const savedSession = await session.save();
            logger.info({ sessionId: savedSession._id }, 'Game session created');

            res.status(201).json(savedSession);
        } catch (error) {
            logger.error({ error }, 'Error creating game session');
            res.status(500).json({ error: 'Failed to create game session' });
        }
    });


    return router;
}


