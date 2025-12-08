import { useState, useRef, useEffect, useMemo } from 'react';
import {
  WindowContent,
  Button,
  Toolbar,
  Tabs,
  Tab,
  TabBody,
  MenuList,
  MenuListItem,
  Separator,
  Frame,
} from 'react95';
import styled from 'styled-components';
import { DesktopWindow } from '@/components/shared/DesktopWindow';
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
  windowState: {
    position: { x: number; y: number };
    isMaximized: boolean;
  };
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
};

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

const StatusFrameWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StatusFrame = styled(Frame)`
  width: 50%;
  text-align: center;
  font-weight: bold;
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

const StyledToolbar = styled(Toolbar)`
  position: relative;
`;

const StyledWindowContent = styled(WindowContent)`
  height: calc(100% - 32px);
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
  const hasCreatedInitialSession = useRef(false);

  useEffect(() => {
    const createNewSession = async () => {
      if (hasCreatedInitialSession.current) return;
      hasCreatedInitialSession.current = true;

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

  const tabBodyStyle = useMemo(
    () => ({
      height: windowState.isMaximized ? 'calc(100vh - 200px)' : 350,
      padding: '8px',
    }),
    [windowState.isMaximized]
  );

  const getStatusText = () => {
    if (winner === 'tie') return "It's a tie!";
    if (winner) return `${winner} wins!`;
    return `Current player: ${currentPlayer}`;
  };

  const handleClose = () => {
    resetGame();
    onClose();
  };

  return (
    <DesktopWindow
      title="Tic-Tac-Toe"
      iconSrc="/icons/tictactoe.png"
      windowState={windowState}
      onPositionChange={onPositionChange}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onClose={handleClose}
    >
      <StyledToolbar>
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
                    setActiveTab(0);
                    setOpenMenu(null);
                  }}
                >
                  New Game
                </MenuListItem>
                <MenuListItem
                  onClick={() => {
                    setActiveTab(1);
                    setOpenMenu(null);
                  }}
                >
                  Load Game
                </MenuListItem>
              </MenuList>
            </DropdownMenu>
          </>
        )}

        {openMenu === 'edit' && (
          <>
            <MenuOverlay onClick={() => setOpenMenu(null)} />
            <DropdownMenu $left={fileButtonRef.current ? fileButtonRef.current.offsetWidth + 4 : 50}>
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
      </StyledToolbar>

      <StyledWindowContent>
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tab value={0}>Play</Tab>
          <Tab value={1}>All Games</Tab>
        </Tabs>
        <TabBody style={tabBodyStyle}>
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
              <StatusFrameWrapper>
                <StatusFrame variant='well'>{getStatusText()}</StatusFrame>
              </StatusFrameWrapper>
            </GameContent>
          )}
          {activeTab === 1 && (
            <GameContent>
              <T3Table onLoadGame={loadGame} isMaximized={windowState.isMaximized} />
            </GameContent>
          )}
        </TabBody>
      </StyledWindowContent>
    </DesktopWindow>
  );
};
