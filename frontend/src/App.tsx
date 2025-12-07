import { useState } from 'react';
import StartMenu from './components/StartMenu';
import LoadingScreen from './components/LoadingScreen';
import Desktop from './components/Desktop';
import Taskbar from './components/TaskBar';

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
   const [windowState, setWindowState] = useState<WindowState>({
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: {x: 500, y: 500},
  });

  const toggleStartMenu = () => setStartMenuOpen((prev) => !prev);
  const toggleTicTacToe = () => console.log('Game Opened....')

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Desktop onOpenGame={toggleTicTacToe} >

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
}

export default App;
