import { ApiClient } from '../ApiClient';
import type { Board, GameResult } from '@lib/t3GameEngine';

export interface GameSession {
    _id?: string;
    board: (string | null)[];
    currentPlayer: 'X' | 'O';
    status: 'in_progress' | 'completed';
    winner: 'X' | 'O' | 'tie' | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateGameSessionRequest {
    board?: Board;
    currentPlayer?: 'X' | 'O';
    status?: 'in_progress' | 'completed';
    winner?: GameResult;
}

export interface UpdateGameSessionRequest {
    board?: Board;
    currentPlayer?: 'X' | 'O';
    status?: 'in_progress' | 'completed';
    winner?: GameResult;
}

class GameSessionService extends ApiClient {
    private readonly endpoint = '/api/game-sessions';

    async getAllSessions(): Promise<GameSession[]> {
        return this.get<GameSession[]>(this.endpoint);
    }

    async getSessionById(id: string): Promise<GameSession> {
        return this.get<GameSession>(`${this.endpoint}/${id}`);
    }

    async createSession(data?: CreateGameSessionRequest): Promise<GameSession> {
        return this.post<GameSession>(this.endpoint, data);
    }

    async updateSession(
        id: string,
        data: UpdateGameSessionRequest
    ): Promise<GameSession> {
        return this.put<GameSession>(`${this.endpoint}/${id}`, data);
    }
}

export const gameSessionService = new GameSessionService();
