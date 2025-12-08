import { Schema } from 'mongoose';

export interface GameSession {
    board: (string | null)[];
    currentPlayer: 'X' | 'O';
    status: 'in_progress' | 'completed';
    winner: 'X' | 'O' | 'tie' | null;
    createdAt: Date;
    updatedAt: Date;
}

export const GameSessionSchema = new Schema<GameSession>(
    {
        board: {
            type: [String],
            required: true,
            default: () => Array(9).fill(null),
        },
        currentPlayer: {
            type: String,
            required: true,
            enum: ['X', 'O'],
            default: 'X'
        },
        status: {
            type: String,
            required: true,
            enum: ['in_progress', 'completed'],
            default: 'in_progress'
        },
        winner: {
            type: String,
            enum: ['X', 'O', 'tie', null],
            default: null
        }
    },
    {
        timestamps: true,
        collection: 'game_sessions'
    }
);
