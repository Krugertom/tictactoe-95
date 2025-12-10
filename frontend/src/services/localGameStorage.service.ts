import type { Board, GameResult } from '@lib/t3GameEngine';

export interface GameSession {
    _id: string;
    board: (string | null)[];
    currentPlayer: 'X' | 'O';
    status: 'in_progress' | 'completed';
    winner: 'X' | 'O' | 'tie' | null;
    createdAt: Date;
    updatedAt: Date;
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

const STORAGE_KEY = 'tictactoe_game_sessions';

class LocalGameStorageService {
    private generateId(): string {
        return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private getSessions(): GameSession[] {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];

        try {
            const sessions = JSON.parse(data);
            return sessions.map((session: any) => ({
                ...session,
                createdAt: new Date(session.createdAt),
                updatedAt: new Date(session.updatedAt),
            }));
        } catch (error) {
            console.error('Failed to parse game sessions from localStorage:', error);
            return [];
        }
    }

    private saveSessions(sessions: GameSession[]): void {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
        } catch (error) {
            console.error('Failed to save game sessions to localStorage:', error);
            throw error;
        }
    }

    async getAllSessions(): Promise<GameSession[]> {
        const sessions = this.getSessions();
        return sessions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    async getSessionById(id: string): Promise<GameSession> {
        const sessions = this.getSessions();
        const session = sessions.find(s => s._id === id);

        if (!session) {
            throw new Error('Game session not found');
        }

        return session;
    }

    async createSession(data?: CreateGameSessionRequest): Promise<GameSession> {
        const now = new Date();
        const newSession: GameSession = {
            _id: this.generateId(),
            board: data?.board || Array(9).fill(null),
            currentPlayer: data?.currentPlayer || 'X',
            status: data?.status || 'in_progress',
            winner: data?.winner || null,
            createdAt: now,
            updatedAt: now,
        };

        const sessions = this.getSessions();
        sessions.push(newSession);
        this.saveSessions(sessions);

        return newSession;
    }

    async updateSession(
        id: string,
        data: UpdateGameSessionRequest
    ): Promise<GameSession> {
        const sessions = this.getSessions();
        const sessionIndex = sessions.findIndex(s => s._id === id);

        if (sessionIndex === -1) {
            throw new Error('Game session not found');
        }

        const updatedSession: GameSession = {
            ...sessions[sessionIndex],
            ...data,
            updatedAt: new Date(),
        };

        sessions[sessionIndex] = updatedSession;
        this.saveSessions(sessions);

        return updatedSession;
    }

    async deleteSession(id: string): Promise<void> {
        const sessions = this.getSessions();
        const filteredSessions = sessions.filter(s => s._id !== id);
        this.saveSessions(filteredSessions);
    }

    clearAllSessions(): void {
        localStorage.removeItem(STORAGE_KEY);
    }
}

export const localGameStorageService = new LocalGameStorageService();
