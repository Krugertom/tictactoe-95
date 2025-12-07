import { MenuList, MenuListItem, Panel } from 'react95';
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

function StartMenu({ open, onClose }: StartMenuProps) {
  if (!open) return null;

  return (
    <MenuContainer onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <Panel variant="outside" shadow={false}>
          <MenuList>
            <MenuListItem disabled>Tic Tac Toe</MenuListItem>
            <MenuListItem disabled>Programs</MenuListItem>
            <MenuListItem disabled>Run</MenuListItem>
          </MenuList>
        </Panel>
      </div>
    </MenuContainer>
  );
}

export default StartMenu;
