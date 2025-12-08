// LLM NOTE! I had claude generate this for me, just for fun but used my exisiting components for the window
import { DesktopWindow } from '@/components/shared/DesktopWindow';
import { Button, GroupBox, ScrollView, Toolbar, WindowContent } from 'react95';
import styled from 'styled-components';

type RecycleBinWindowProps = {
  windowState: {
    position: { x: number; y: number };
    isMaximized: boolean;
  };
  onPositionChange: (position: { x: number; y: number }) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
};

const ITEMS = [
  { name: 'Survive Y2K', icon: '/icons/folder.ico', type: 'folder' },
  { name: "Tom's Job Offers (Secret)", icon: '/icons/folder.ico', type: 'folder' },
  { name: 'data.final.finalv2.csv', icon: '/icons/file_1.ico', type: 'file' },
  { name: 'definitely_not_A-ViRus.exe', icon: '/icons/file_2.ico', type: 'file' },
  { name: 'ai_slop.tsx', icon: '/icons/file_1.ico', type: 'file' },
  { name: 'mbta_is_number_1.ppt', icon: '/icons/file_1.ico', type: 'file' },
  { name: 'README.md', icon: '/icons/file_1.ico', type: 'file' },
];

const StyledToolbar = styled(Toolbar)`
  position: relative;
`;

const StyledWindowContent = styled(WindowContent) <{ $isMaximized: boolean }>`
  padding: 8px;
  height: ${({ $isMaximized }) => ($isMaximized ? 'calc(100vh - 150px)' : '450px')};
`;

const StyledGroupBox = styled(GroupBox)`
  padding: 4px;
  margin: 0;
  border-width: 1px;
  height: 100%;
`;

const StyledScrollView = styled(ScrollView)`
  width: 100%;
  height: 100%;
  background: white;
  border: none;
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
  padding: 8px;
`;

const IconItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  gap: 8px;

  &:hover {
    background-color: rgba(0, 0, 128, 0.1);
  }
`;

const IconImage = styled.img`
  width: 48px;
  height: 48px;
`;

const IconLabel = styled.span`
  font-size: 12px;
  word-wrap: break-word;
  max-width: 100px;
`;

export const RecycleBinWindow = ({
  windowState,
  onPositionChange,
  onMinimize,
  onMaximize,
  onClose,
}: RecycleBinWindowProps) => {
  return (
    <DesktopWindow
      title="Recycle Bin"
      iconSrc="/icons/recycle.ico"
      windowState={windowState}
      onPositionChange={onPositionChange}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onClose={onClose}
      width={550}
      height={550}
    >
      <StyledToolbar>
        <Button variant="menu" size="sm">
          File
        </Button>
        <Button variant="menu" size="sm">
          Edit
        </Button>
        <Button variant="menu" size="sm">
          View
        </Button>
        <Button variant="menu" size="sm">
          Help
        </Button>
      </StyledToolbar>

      <StyledWindowContent $isMaximized={windowState.isMaximized}>
        <StyledGroupBox variant="flat">
          <StyledScrollView>
            <IconGrid>
              {ITEMS.map((item) => (
                <IconItem key={item.name}>
                  <IconImage src={item.icon} alt="" />
                  <IconLabel>{item.name}</IconLabel>
                </IconItem>
              ))}
            </IconGrid>
          </StyledScrollView>
        </StyledGroupBox>
      </StyledWindowContent>
    </DesktopWindow>
  );
};
