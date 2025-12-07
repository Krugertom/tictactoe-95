// import { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar } from 'react95';
import styled from 'styled-components';

type TaskbarProps = {
  startMenuOpen: boolean;
  onToggleStart: () => void;
  isGameRunning: boolean;
  isGameMinimized: boolean;
  onToggleGameWindow: () => void;
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


function Taskbar({ startMenuOpen, onToggleStart, isGameRunning, isGameMinimized, onToggleGameWindow}: TaskbarProps) {

  return (
    <TaskbarContainer>
      <AppBar style={{ position: 'static', width: '100%' }}>
        <Toolbar>
          <Button onClick={onToggleStart} active={startMenuOpen} style={{ width: 96, justifyContent: 'flex-start' }}>
            <img src="/icons/w95.ico" alt="" width={18} height={18} style={{ marginRight: 4 }} />
            <span style={{ fontWeight: 700 }}>Start</span>
          </Button>

          {isGameRunning && (
            <Button
              onClick={onToggleGameWindow}
              active={!isGameMinimized}
              style={{ marginLeft: 8, minWidth: 140, justifyContent: 'flex-start' }}
            >
              <img src="/icons/tictactoe.ico.png" alt="" width={18} height={18} style={{ marginRight: 8 }} />
              Tic Tac Toe
            </Button>
          )}

        </Toolbar>
      </AppBar>
    </TaskbarContainer>
  );
}

export default Taskbar;
