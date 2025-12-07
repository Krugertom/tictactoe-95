import styled from 'styled-components';
import { DesktopIcon } from './DesktopIcon';

type DesktopProps = {
  children?: any; // TODO: Look at typing this? ReactNode?
  onOpenGame: () => void;
};

const TASKBAR_HEIGHT = 48;

// LLM NOTE: Had ChatGPTy Help me create this
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

export const Desktop = ({ children, onOpenGame,}: DesktopProps) => {
  const icons = [
    { id: 'tictactoe', label: 'Tic-Tac-Toe', icon: '/icons/tictactoe.png', onDoubleClick: onOpenGame },
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
