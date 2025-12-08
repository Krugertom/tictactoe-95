import { useState, type Dispatch, type SetStateAction } from 'react';
import { StartMenu } from '@components/StartMenu';
import { LoadingScreen } from '@components/LoadingScreen';
import { Desktop } from '@components/Desktop';
import { Taskbar } from '@components/TaskBar';
import { T3GameWindow } from '@components/tic-tac-toe/T3GameWindow';
import { RecycleBinWindow } from '@/components/recycling-bin/RecycleBinWindow';

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
}

const openWindow = (setState: Dispatch<SetStateAction<WindowState>>) => {
  setState((prev) => ({
    ...prev,
    isOpen: true,
    isMinimized: false,
  }));
};

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [ticTacToeWindow, setTicTacToeWindow] = useState<WindowState>({
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 100, y: 100 },
  });
  const [recycleBinWindow, setRecycleBinWindow] = useState<WindowState>({
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 48, y: 72 },
  });

  const toggleStartMenu = () => setStartMenuOpen((prev) => !prev);
  const toggleTicTacToe = () => {
    openWindow(setTicTacToeWindow);
    setStartMenuOpen(false);
  };
  const openRecycleBin = () => {
    openWindow(setRecycleBinWindow);
    setStartMenuOpen(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Desktop onOpenGame={toggleTicTacToe} onOpenRecycleBin={openRecycleBin}>
        {recycleBinWindow.isOpen && (
          <div style={{ display: recycleBinWindow.isMinimized ? 'none' : 'block' }}>
            <RecycleBinWindow
              windowState={recycleBinWindow}
              onMinimize={() => setRecycleBinWindow((prev) => ({ ...prev, isMinimized: true }))}
              onMaximize={() =>
                setRecycleBinWindow((prev) => ({ ...prev, isMaximized: !prev.isMaximized }))
              }
              onClose={() => setRecycleBinWindow((prev) => ({ ...prev, isOpen: false }))}
              onPositionChange={(position: { x: number; y: number }) =>
                setRecycleBinWindow((prev) => ({ ...prev, position }))
              }
            />
          </div>
        )}

        {ticTacToeWindow.isOpen && (
          <div style={{ display: ticTacToeWindow.isMinimized ? 'none' : 'block' }}>
            <T3GameWindow
              windowState={ticTacToeWindow}
              onMinimize={() => setTicTacToeWindow((prev) => ({ ...prev, isMinimized: true }))}
              onMaximize={() =>
                setTicTacToeWindow((prev) => ({ ...prev, isMaximized: !prev.isMaximized }))
              }
              onClose={() => setTicTacToeWindow((prev) => ({ ...prev, isOpen: false }))}
              onPositionChange={(position: { x: number; y: number }) =>
                setTicTacToeWindow((prev) => ({ ...prev, position }))
              }
            />
          </div>
        )}

      </Desktop>
      <StartMenu open={startMenuOpen} onClose={() => setStartMenuOpen(false)} />
      <Taskbar
        startMenuOpen={startMenuOpen}
        onToggleStart={toggleStartMenu}
        isGameRunning={ticTacToeWindow.isOpen}
        isGameMinimized={ticTacToeWindow.isMinimized}
        onToggleGameWindow={() =>
          setTicTacToeWindow((prev) => ({
            ...prev,
            isMinimized: !prev.isMinimized,
            isOpen: true,
          }))
        }
        isRecycleOpen={recycleBinWindow.isOpen}
        isRecycleMinimized={recycleBinWindow.isMinimized}
        onToggleRecycleWindow={() =>
          setRecycleBinWindow((prev) => ({
            ...prev,
            isMinimized: !prev.isMinimized,
            isOpen: true,
          }))
        }
      />
    </div>
  );
};
