import type React from 'react';
import { useState, useEffect } from 'react';
import { Window, WindowContent, WindowHeader, Button } from 'react95';
import styled from 'styled-components';
import TicTacToeBoard from './TicTacToeBoard';
import {
  createEmptyBoard,
  checkWinner,
  makeMove,
  getNextPlayer,
  type Board,
  type GameResult,
} from '../lib/t3GameEngine';

type SimpleGameWindowProps = {
  windowState: any;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  onPositionChange: any;
};

const TASKBAR_HEIGHT = 48;

const WindowShell = styled.div<{ $x: number; $y: number; $isMaximized: boolean }>`
  position: absolute;
  left: ${({ $isMaximized, $x }) => ($isMaximized ? 0 : $x)}px;
  top: ${({ $isMaximized, $y }) => ($isMaximized ? 0 : $y)}px;
  width: ${({ $isMaximized }) => ($isMaximized ? '100vw' : '550px')};
  height: ${({ $isMaximized }) =>
    $isMaximized ? `calc(100vh - ${TASKBAR_HEIGHT}px)` : '550px'};
  z-index: 10;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: move;
`;

const CloseIcon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: -1px;
  margin-top: -1px;
  transform: rotateZ(45deg);
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    background: #000000;
  }

  &:before {
    height: 100%;
    width: 3px;
    left: 50%;
    transform: translateX(-50%);
  }

  &:after {
    height: 3px;
    width: 100%;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const GameContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px;
`;

const BoardWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StatusText = styled.p`
  margin: 8px 0 0;
  font-size: 11px;
  text-align: center;
`;

function T3GameWindow({
  windowState,
  onMinimize,
  onMaximize,
  onClose,
  onPositionChange,
}: SimpleGameWindowProps) {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<GameResult>(null);

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer('X');
    setWinner(null);
  };

  const handleCellSelect = (index: number) => {
    if (winner) return;

    const newBoard = makeMove(board, index, currentPlayer);
    if (!newBoard) return;

    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(getNextPlayer(currentPlayer));
    }
  };

  const getStatusText = () => {
    if (winner === 'tie') return "It's a tie!";
    if (winner) return `${winner} wins!`;
    return `Current player: ${currentPlayer}`;
  };

  const handleClose = () => {
    resetGame();
    onClose();
  };

  const handleDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    if (windowState.isMaximized) return;

    const startX = event.clientX;
    const startY = event.clientY;
    const initialX = windowState.position.x;
    const initialY = windowState.position.y;

    const handleMove = (moveEvent: MouseEvent) => {
      const nextX = initialX + (moveEvent.clientX - startX);
      const nextY = initialY + (moveEvent.clientY - startY);
      onPositionChange({ x: nextX, y: nextY });
    };

    const handleUp = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
  };

  // NOTE: Pattern here for window management taken from react95 styled examples

  return (
    <WindowShell
      $x={windowState.position.x}
      $y={windowState.position.y}
      $isMaximized={windowState.isMaximized}
    >
      <Window
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <WindowHeader>
          <TitleBar onMouseDown={handleDragStart}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <img src="/icons/tictactoe.ico.png" alt="" width={16} height={16} />
              <span>Tic-Tac-Toe</span>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <Button size="sm" onClick={onMinimize}>
                <span style={{ fontWeight: 700, fontSize: '16px' }}>_</span>
              </Button>
              <Button size="sm" onClick={onMaximize}>
                <span style={{ fontWeight: 700, fontSize: '16px' }}>□</span>
              </Button>
              <Button size="sm" onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
          </TitleBar>
        </WindowHeader>

        <WindowContent style={{ height: 'calc(100% - 32px)' }}>
          <GameContent>
            <BoardWrapper>
              <TicTacToeBoard
                board={board}
                disabled={!!winner}
                onSelect={handleCellSelect}
                isMaximized={windowState.isMaximized}
              />
            </BoardWrapper>
            <StatusText>{getStatusText()}</StatusText>
          </GameContent>
        </WindowContent>
      </Window>
    </WindowShell>
  );
}

export default T3GameWindow;
