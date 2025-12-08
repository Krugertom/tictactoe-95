
import { Router, Request, Response } from 'express';
import { GameSessionModel } from '../db/models/GameSessionModel';
import { logger } from '../logging/logger';

const router = Router();

export function registerGameSessionRoutes(): Router {

    // GET /api/game-sessions
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

    // POST /api/game-sessions
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

    // GET /api/game-session/:id
    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const session = await GameSessionModel.findById(id).exec();

            if (!session) {
                logger.warn({ sessionId: id }, 'Game session not found');
                res.status(404).json({ error: 'Game session not found' });
                return;
            }

            logger.info({ sessionId: id }, 'Retrieved game session');
            res.status(200).json(session);
        } catch (error) {
            logger.error({ error, sessionId: req.params.id }, 'Error retrieving game session');
            res.status(500).json({ error: 'Failed to retrieve game session' });
        }
    });

    // PUT /api/game-session/:id
    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { board, currentPlayer, status, winner } = req.body;

            const updateData: any = {};
            if (board !== undefined) updateData.board = board;
            if (currentPlayer !== undefined) updateData.currentPlayer = currentPlayer;
            if (status !== undefined) updateData.status = status;
            if (winner !== undefined) updateData.winner = winner;

            const session = await GameSessionModel.findByIdAndUpdate(
                id,
                updateData,
                {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true
                }
            ).exec();

            logger.info({ sessionId: session._id }, 'Game session upserted');
            res.status(200).json(session);
        } catch (error) {
            logger.error({ error, sessionId: req.params.id }, 'Error upserting game session');
            res.status(500).json({ error: 'Failed to upsert game session' });
        }
    });

    return router;
}


