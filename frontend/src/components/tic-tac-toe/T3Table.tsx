import { useState, useEffect } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableDataCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from 'react95';
import { gameSessionService, type GameSession } from '@api';

type T3TableProps = {
    onLoadGame: (session: GameSession) => void;
};

export const T3Table = ({ onLoadGame }: T3TableProps) => {
    const [sessions, setSessions] = useState<GameSession[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const data = await gameSessionService.getAllSessions();
                setSessions(data);
            } catch (error) {
                console.error('Failed to fetch game sessions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    const formatDate = (date: Date | undefined) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const getOutcome = (session: GameSession) => {
        if (session.status === 'completed') {
            if (session.winner === 'tie') return 'Tie';
            if (session.winner) return `${session.winner} Wins`;
        }
        return 'In Progress';
    };

    if (loading) {
        return <div style={{ padding: '16px', textAlign: 'center' }}>Loading games...</div>;
    }

    if (sessions.length === 0) {
        return <div style={{ padding: '16px', textAlign: 'center' }}>No games found</div>;
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeadCell>Time</TableHeadCell>
                    <TableHeadCell>Turn</TableHeadCell>
                    <TableHeadCell>Outcome</TableHeadCell>
                    <TableHeadCell />
                </TableRow>
            </TableHead>
            <TableBody>
                {sessions.map((session) => (
                    <TableRow key={session._id}>
                        <TableDataCell>{formatDate(session.createdAt)}</TableDataCell>
                        <TableDataCell>{session.currentPlayer}</TableDataCell>
                        <TableDataCell>{getOutcome(session)}</TableDataCell>
                        <TableDataCell style={{ textAlign: 'right' }}>
                            <Button size="sm" onClick={() => onLoadGame(session)}>
                                Load Game
                            </Button>
                        </TableDataCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};