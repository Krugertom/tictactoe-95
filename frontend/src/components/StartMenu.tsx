import { Frame, MenuList, MenuListItem } from 'react95';
import styled from 'styled-components';

type StartMenuProps = {
  open: boolean;
  onClose: () => void;
};

const TASKBAR_HEIGHT = 48;

const MenuContainer = styled.div`
  position: fixed !important;
  left: 4px;
  bottom: ${TASKBAR_HEIGHT}px !important;
  top: auto !important;
  width: 220px;
  z-index: 20;
`;

export const StartMenu = ({ open, onClose }: StartMenuProps) => {
  if (!open) return null;

  return (
    <MenuContainer onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <Frame variant="outside" shadow={false}>
          <MenuList>
            <MenuListItem disabled>My Programs</MenuListItem>
            <MenuListItem disabled>Settings</MenuListItem>
            <MenuListItem disabled>Find</MenuListItem>
            <MenuListItem disabled>Help</MenuListItem>
            <MenuListItem disabled>Programs</MenuListItem>
            <MenuListItem disabled>Run...</MenuListItem>
          </MenuList>
        </Frame>
      </div>
    </MenuContainer>
  );
};
