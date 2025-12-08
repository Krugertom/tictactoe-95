import { model } from 'mongoose';
import { GameSessionSchema, GameSession } from '../schemas/GameSessionSchema';

export const GameSessionModel = model<GameSession>('GameSession', GameSessionSchema);
