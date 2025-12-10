import { useState, useEffect } from 'react';
import {
    Button,
    GroupBox,
    Table,
    TableBody,
    TableDataCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from 'react95';
import styled from 'styled-components';
import { localGameStorageService, type GameSession } from '@/services/localGameStorage.service';

type T3TableProps = {
    onLoadGame: (session: GameSession) => void;
};

const TableContainer = styled.div`
    height: 100%;
    overflow: auto;
`;

export const T3Table = ({ onLoadGame }: T3TableProps) => {
    const [sessions, setSessions] = useState<GameSession[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const data = await localGameStorageService.getAllSessions();
                setSessions(data);
            } catch (error) {
                console.error('Failed to fetch game sessions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    //LLM NOTE: Had Claude help me write this, date times...
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

    const handleDeleteGame = async (sessionId: string) => {
        try {
            await localGameStorageService.deleteSession(sessionId);
            // Refresh the sessions list after deletion
            const updatedSessions = await localGameStorageService.getAllSessions();
            setSessions(updatedSessions);
        } catch (error) {
            console.error('Failed to delete game session:', error);
        }
    };

    return (
        <TableContainer>
            <GroupBox label='All Games'>
                {loading ? (
                    <div style={{ padding: '32px', textAlign: 'center' }}>Loading games...</div>
                ) : sessions.length === 0 ? (
                    <div style={{ padding: '32px', textAlign: 'center' }}>No games found</div>
                ) : (
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
                                        <Button
                                            size="sm"
                                            onClick={() => onLoadGame(session)}
                                            style={{ marginRight: '4px' }}
                                        >
                                            Load
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => handleDeleteGame(session._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableDataCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </GroupBox>
        </TableContainer>
    );
};