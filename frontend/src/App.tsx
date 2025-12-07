import { useState } from 'react';
import { StartMenu } from '@components/StartMenu';
import { LoadingScreen } from '@components/LoadingScreen';
import { Desktop } from '@components/Desktop';
import { Taskbar } from '@components/TaskBar';
import { T3GameWindow } from '@components/tic-tac-toe/T3GameWindow';

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
}

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [windowState, setWindowState] = useState<WindowState>({
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 100, y: 100 },
  });

  const ensureWindowOpen = () => {
    setWindowState((prev) => ({
      ...prev,
      isOpen: true,
      isMinimized: false,
    }));
  };

  const toggleStartMenu = () => setStartMenuOpen((prev) => !prev);
  const toggleTicTacToe = () => { ensureWindowOpen(); setStartMenuOpen(false) }

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Desktop onOpenGame={toggleTicTacToe} >
        {windowState.isOpen && !windowState.isMinimized && (
          <T3GameWindow
            windowState={windowState}
            onMinimize={() => setWindowState((prev) => ({ ...prev, isMinimized: true }))}
            onMaximize={() => setWindowState((prev) => ({ ...prev, isMaximized: !prev.isMaximized }))}
            onClose={() => setWindowState((prev) => ({ ...prev, isOpen: false }))}
            onPositionChange={(position: { x: number; y: number }) =>
              setWindowState((prev) => ({ ...prev, position }))
            }
          />
        )}

      </Desktop>
      <StartMenu open={startMenuOpen} onClose={() => setStartMenuOpen(false)} />
      <Taskbar
        startMenuOpen={startMenuOpen}
        onToggleStart={toggleStartMenu}
        isGameRunning={windowState.isOpen}
        isGameMinimized={windowState.isMinimized}
        onToggleGameWindow={() =>
          setWindowState((prev) => ({
            ...prev,
            isMinimized: !prev.isMinimized,
            isOpen: true,
          }))
        }
      />
    </div>
  );
};
