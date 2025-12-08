import styled from 'styled-components';
import { DesktopIcon } from '@/components/shared/DesktopIcon';

type DesktopProps = {
  children?: any; // TODO: Look at typing this? ReactNode?
  onOpenGame: () => void;
  onOpenRecycleBin: () => void;
  onOpenAboutTom: () => void;
};

const TASKBAR_HEIGHT = 48;

// LLM NOTE: Had ChatGPTy help me create this
const DesktopShell = styled.div`
  position: relative;
  height: calc(100vh - ${TASKBAR_HEIGHT}px);
  padding: 16px;
  overflow: hidden;
  background-image: url('/95-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

// LLM NOTE: Had ChatGPTy Help me create this
const IconColumn = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  gap: 18px;
`;

export const Desktop = ({ children, onOpenGame, onOpenRecycleBin, onOpenAboutTom }: DesktopProps) => {
  const icons = [
    { id: 'my-computer', label: 'My Computer', icon: '/icons/my_comp.ico', },
    { id: 'recycle-bin', label: 'Recycle Bin', icon: '/icons/recycle.ico', onDoubleClick: onOpenRecycleBin },
    { id: 'tictactoe', label: 'Tic-Tac-Toe', icon: '/icons/tictactoe.png', onDoubleClick: onOpenGame },
    { id: 'about-tom', label: 'about_tom.txt', icon: '/icons/file_1.ico', onDoubleClick: onOpenAboutTom },
  ];

  return (
    <DesktopShell>
      <IconColumn>
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            label={icon.label}
            iconSrc={icon.icon}
            onDoubleClick={icon.onDoubleClick}
          />
        ))}
      </IconColumn>
      {children}
    </DesktopShell>
  );
};
