import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Toolbar,
  Tabs,
  Tab,
  TabBody,
  MenuList,
  MenuListItem,
  Separator,
} from 'react95';
import styled from 'styled-components';
import { T3Board } from '@/components/tic-tac-toe/T3Board';
import {
  createEmptyBoard,
  checkWinner,
  makeMove,
  getNextPlayer,
  type Board,
  type GameResult,
} from '@lib/t3GameEngine';
import { T3Table } from './T3Table';
import { gameSessionService, type GameSession } from '@api';

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
`;

const BoardWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const StatusText = styled.p`
  margin: 0 0 8px;
  font-size: 11px;
  text-align: center;
`;

const DropdownMenu = styled.div<{ $left: number }>`
  position: absolute;
  left: ${(props) => props.$left}px;
  top: 100%;
  z-index: 1000;
  min-width: 160px;
`;

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

export const T3GameWindow = ({
  windowState,
  onMinimize,
  onMaximize,
  onClose,
  onPositionChange,
}: SimpleGameWindowProps) => {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<GameResult>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState(0);
  const [openMenu, setOpenMenu] = useState<'file' | 'edit' | 'help' | null>(null);

  const fileButtonRef = useRef<HTMLButtonElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const helpButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const createNewSession = async () => {
      try {
        const session = await gameSessionService.createSession({
          board: createEmptyBoard(),
          currentPlayer: 'X',
          status: 'in_progress',
          winner: null,
        });
        setSessionId(session._id || null);
      } catch (error) {
        console.error('Failed to create game session:', error);
      }
    };

    createNewSession();
  }, []);

  const resetGame = async () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer('X');
    setWinner(null);

    try {
      const session = await gameSessionService.createSession({
        board: createEmptyBoard(),
        currentPlayer: 'X',
        status: 'in_progress',
        winner: null,
      });
      setSessionId(session._id || null);
    } catch (error) {
      console.error('Failed to create new game session:', error);
    }
  };

  const handleCellSelect = async (index: number) => {
    if (winner || !sessionId) return;

    const newBoard = makeMove(board, index, currentPlayer);
    if (!newBoard) return;

    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    const nextPlayer = gameWinner ? currentPlayer : getNextPlayer(currentPlayer);

    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(nextPlayer);
    }

    try {
      await gameSessionService.updateSession(sessionId, {
        board: newBoard,
        currentPlayer: nextPlayer,
        status: gameWinner ? 'completed' : 'in_progress',
        winner: gameWinner,
      });
    } catch (error) {
      console.error('Failed to update game session:', error);
    }
  };

  const loadGame = (session: GameSession) => {
    setBoard(session.board as Board);
    setCurrentPlayer(session.currentPlayer);
    setWinner(session.winner);
    setSessionId(session._id || null);
    setActiveTab(0);
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

        <Toolbar style={{ position: 'relative' }}>
          <Button
            ref={fileButtonRef}
            variant="menu"
            size="sm"
            active={openMenu === 'file'}
            onClick={() => setOpenMenu(openMenu === 'file' ? null : 'file')}
          >
            File
          </Button>
          <Button
            ref={editButtonRef}
            variant="menu"
            size="sm"
            active={openMenu === 'edit'}
            onClick={() => setOpenMenu(openMenu === 'edit' ? null : 'edit')}
          >
            Edit
          </Button>
          <Button
            ref={helpButtonRef}
            variant="menu"
            size="sm"
            active={openMenu === 'help'}
            onClick={() => setOpenMenu(openMenu === 'help' ? null : 'help')}
          >
            Help
          </Button>

          {openMenu === 'file' && (
            <>
              <MenuOverlay onClick={() => setOpenMenu(null)} />
              <DropdownMenu $left={4}>
                <MenuList>
                  <MenuListItem
                    onClick={() => {
                      resetGame();
                      setOpenMenu(null);
                    }}
                  >
                    New Game
                  </MenuListItem>
                  <MenuListItem disabled>Save Game</MenuListItem>
                  <MenuListItem disabled>Load Game</MenuListItem>
                </MenuList>
              </DropdownMenu>
            </>
          )}

          {openMenu === 'edit' && (
            <>
              <MenuOverlay onClick={() => setOpenMenu(null)} />
              <DropdownMenu
                $left={fileButtonRef.current ? fileButtonRef.current.offsetWidth + 4 : 50}
              >
                <MenuList>
                  <MenuListItem disabled>Suggest Next Move</MenuListItem>
                  <MenuListItem disabled>Restart Game</MenuListItem>
                </MenuList>
              </DropdownMenu>
            </>
          )}

          {openMenu === 'help' && (
            <>
              <MenuOverlay onClick={() => setOpenMenu(null)} />
              <DropdownMenu
                $left={
                  (fileButtonRef.current?.offsetWidth || 0) +
                  (editButtonRef.current?.offsetWidth || 0) +
                  8
                }
              >
                <MenuList>
                  <MenuListItem disabled>Help Topics</MenuListItem>
                  <Separator />
                  <MenuListItem disabled>About T3 Game</MenuListItem>
                </MenuList>
              </DropdownMenu>
            </>
          )}
        </Toolbar>

        <WindowContent style={{ height: 'calc(100% - 32px)' }}>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tab value={0}>Play</Tab>
            <Tab value={1}>All Games</Tab>
          </Tabs>
          <TabBody
            style={{
              height: windowState.isMaximized ? 'calc(100vh - 200px)' : 350,
              padding: '8px',
            }}
          >
            {activeTab === 0 && (
              <GameContent>
                <BoardWrapper>
                  <T3Board
                    board={board}
                    disabled={!!winner}
                    onSelect={handleCellSelect}
                    isMaximized={windowState.isMaximized}
                  />
                </BoardWrapper>
                <StatusText>{getStatusText()}</StatusText>
              </GameContent>
            )}
            {activeTab === 1 && (
              <GameContent>
                <T3Table onLoadGame={loadGame} />
              </GameContent>
            )}
          </TabBody>
        </WindowContent>
      </Window>
    </WindowShell>
  );
};
