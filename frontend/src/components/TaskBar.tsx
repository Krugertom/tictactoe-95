import { useEffect, useState } from 'react';
import { AppBar, Button, Frame, Toolbar } from 'react95';
import styled from 'styled-components';

type TaskbarProps = {
  startMenuOpen: boolean;
  onToggleStart: () => void;
  isGameRunning: boolean;
  isGameMinimized: boolean;
  onToggleGameWindow: () => void;
  isRecycleOpen: boolean;
  isRecycleMinimized: boolean;
  onToggleRecycleWindow: () => void;
  isAboutOpen: boolean;
  isAboutMinimized: boolean;
  onToggleAboutWindow: () => void;
};

const TASKBAR_HEIGHT = 48;

const TaskbarContainer = styled.div`
  position: fixed !important;
  left: 0;
  right: 0;
  bottom: 0 !important;
  top: auto !important;
  z-index: 15;
  height: ${TASKBAR_HEIGHT}px;
`;

//LLM NOTE: Added for fun with claude (clock feature in taskbar)
const ClockFrame = styled(Frame)`
  margin-left: auto;
  padding: 6px 12px;
  min-width: 96px;
  display: flex;
  justify-content: center;
`;

// Note: with more time I would package these props to be more DRY. 
export const Taskbar = ({
  startMenuOpen,
  onToggleStart,
  isGameRunning,
  isGameMinimized,
  onToggleGameWindow,
  isRecycleOpen,
  isRecycleMinimized,
  onToggleRecycleWindow,
  isAboutOpen,
  isAboutMinimized,
  onToggleAboutWindow,
}: TaskbarProps) => {

//LLM NOTE: Added for fun with claude (clock feature in taskbar)
  const [timeString, setTimeString] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
  );

  useEffect(() => {
    const intervalId = window.setInterval(
      () => setTimeString(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })),
      30_000,
    );
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <TaskbarContainer>
      <AppBar style={{ position: 'static', width: '100%' }}>
        <Toolbar>
          <Button onClick={onToggleStart} active={startMenuOpen} style={{ width: 96, justifyContent: 'flex-start' }}>
            <img src="/icons/w95.ico" alt="" width={18} height={18} style={{ marginRight: 4 }} />
            <span style={{ fontWeight: 700 }}>Start</span>
          </Button>

          {isRecycleOpen && (
            <Button
              onClick={onToggleRecycleWindow}
              active={!isRecycleMinimized}
              style={{ marginLeft: 8, minWidth: 140, justifyContent: 'flex-start' }}
            >
              <img src="/icons/recycle.ico" alt="" width={18} height={18} style={{ marginRight: 8 }} />
              Recycle Bin
            </Button>
          )}

          {isAboutOpen && (
            <Button
              onClick={onToggleAboutWindow}
              active={!isAboutMinimized}
              style={{ marginLeft: 8, minWidth: 140, justifyContent: 'flex-start' }}
            >
              <img src="/icons/file_1.ico" alt="" width={18} height={18} style={{ marginRight: 8 }} />
              About_Tom.txt
            </Button>
          )}

          {isGameRunning && (
            <Button
              onClick={onToggleGameWindow}
              active={!isGameMinimized}
              style={{ marginLeft: 8, minWidth: 140, justifyContent: 'flex-start' }}
            >
              <img src="/icons/tictactoe.png" alt="" width={18} height={18} style={{ marginRight: 8 }} />
              Tic Tac Toe
            </Button>
          )}

          <ClockFrame variant="well">{timeString}</ClockFrame>
        </Toolbar>
      </AppBar>
    </TaskbarContainer>
  );
};
