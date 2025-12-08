export type CellValue = 'X' | 'O' | null;
export type Board = CellValue[];
export type GameResult = 'X' | 'O' | 'tie' | null;

export const createEmptyBoard = (): Board => Array(9).fill(null);

export const checkWinner = (board: Board): GameResult => {

  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of winningLines) {

    const [i, j, k] = line;

    const first = board[i];
    const second = board[j];
    const third = board[k];

    if (first && first === second && first === third) {
      return first;
    }
  }

  const isBoardFull = board.every((cell) => cell !== null);
  if (isBoardFull) {
    return 'tie';
  }

  // Game still in progress
  return null;
};

export const makeMove = (
  board: Board,
  index: number,
  player: 'X' | 'O'
): Board | null => {
  if (board[index] !== null) {
    return null;
  }

  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
};

// Todo: Type this better
export const getNextPlayer = (currentPlayer: any) => {
  return currentPlayer === 'X' ? 'O' : 'X';
};
