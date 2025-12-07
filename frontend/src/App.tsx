import { useState } from 'react';
import StartMenu from './components/StartMenu';
import LoadingScreen from './components/LoadingScreen';

function App() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const toggleStartMenu = () => setStartMenuOpen((prev) => !prev);

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <StartMenu open={startMenuOpen} onClose={() => setStartMenuOpen(false)} />
    </div>
  );
}

export default App;
