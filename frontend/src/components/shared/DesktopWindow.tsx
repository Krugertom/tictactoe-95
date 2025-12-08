import type React from 'react';
import { Button, Window, WindowHeader } from 'react95';
import styled from 'styled-components';

type DesktopWindowProps = {
  title: string;
  iconSrc?: string;
  windowState: {
    position: { x: number; y: number };
    isMaximized: boolean;
  };
  onPositionChange: (position: { x: number; y: number }) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  width?: number;
  height?: number;
  children: React.ReactNode;
};

const TASKBAR_HEIGHT = 48;

const WindowShell = styled.div<{
  $x: number;
  $y: number;
  $isMaximized: boolean;
  $width: number;
  $height: number;
}>`
  position: absolute;
  left: ${({ $isMaximized, $x }) => ($isMaximized ? 0 : $x)}px;
  top: ${({ $isMaximized, $y }) => ($isMaximized ? 0 : $y)}px;
  width: ${({ $isMaximized, $width }) => ($isMaximized ? '100vw' : `${$width}px`)};
  height: ${({ $isMaximized, $height }) =>
    $isMaximized ? `calc(100vh - ${TASKBAR_HEIGHT}px)` : `${$height}px`};
  z-index: 10;
`;

const StyledWindow = styled(Window)`
  width: 100%;
  height: 100%;
  position: relative;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: move;
`;

const TitleBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TitleBarRight = styled.div`
  display: flex;
  gap: 4px;
`;
// Note: Most of this styling taken from React95 Example Docs
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

const ButtonText = styled.span`
  font-weight: 700;
  font-size: 16px;
`;

export const DesktopWindow = ({
  title,
  iconSrc,
  windowState,
  onPositionChange,
  onMinimize,
  onMaximize,
  onClose,
  width = 550,
  height = 550,
  children,
}: DesktopWindowProps) => {
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

  return (
    <WindowShell
      $x={windowState.position.x}
      $y={windowState.position.y}
      $isMaximized={windowState.isMaximized}
      $width={width}
      $height={height}
    >
      <StyledWindow>
        <WindowHeader>
          <TitleBar onMouseDown={handleDragStart}>
            <TitleBarLeft>
              {iconSrc ? <img src={iconSrc} alt="" width={16} height={16} /> : null}
              <span>{title}</span>
            </TitleBarLeft>
            <TitleBarRight>
              <Button size="sm" onClick={onMinimize}>
                <ButtonText>_</ButtonText>
              </Button>
              <Button size="sm" onClick={onMaximize}>
                <ButtonText>□</ButtonText>
              </Button>
              <Button size="sm" onClick={onClose}>
                <CloseIcon />
              </Button>
            </TitleBarRight>
          </TitleBar>
        </WindowHeader>
        {children}
      </StyledWindow>
    </WindowShell>
  );
};
