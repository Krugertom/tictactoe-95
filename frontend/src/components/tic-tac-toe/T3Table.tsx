import {
    Button,
    Table,
    TableBody,
    TableDataCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from 'react95';

export const T3Table = () => {
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
                <TableRow>
                    <TableDataCell>12/7/2025 3:00 PM</TableDataCell>
                    <TableDataCell>X</TableDataCell>
                    <TableDataCell>In Progress</TableDataCell>
                    <TableDataCell style={{ textAlign: 'right' }}>
                        <Button size="sm">Load Game</Button>
                    </TableDataCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}