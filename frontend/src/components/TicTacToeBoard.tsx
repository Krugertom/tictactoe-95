import styled from 'styled-components';

type TicTacToeBoardProps = {
  board: any; //TODO: Type this later
  disabled?: boolean;
  onSelect: (index: number) => void;
  isMaximized?: boolean;
};

const BoardContainer = styled.div`
  display: inline-block;
  background: #ffffff;
  border: 2px solid;
  border-color: #808080 #ffffff #ffffff #808080;
  padding: 4px;
`;

const Grid = styled.div<{ $isMaximized: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, ${({ $isMaximized }) => $isMaximized ? '1fr' : '80px'});
  grid-template-rows: repeat(3, ${({ $isMaximized }) => $isMaximized ? '1fr' : '80px'});
  gap: 0;
  background: #000000;
  border: 2px solid #000000;
  width: ${({ $isMaximized }) => $isMaximized ? '450px' : 'auto'};
  height: ${({ $isMaximized }) => $isMaximized ? '450px' : 'auto'};
`;

const Cell = styled.div<{ $disabled: boolean; $filled: boolean; $isMaximized: boolean }>`
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $isMaximized }) => $isMaximized ? '90px' : '48px'};
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  cursor: ${(props) => (props.$disabled || props.$filled ? 'default' : 'pointer')};
  user-select: none;
  border-right: 2px solid #000000;
  border-bottom: 2px solid #000000;
  position: relative;

  &:nth-child(3n) {
    border-right: none;
  }

  &:nth-child(n + 7) {
    border-bottom: none;
  }

  &:hover {
    background: ${(props) => (props.$disabled || props.$filled ? '#ffffff' : '#e0e0e0')};
  }

  &:active {
    background: ${(props) => (props.$disabled || props.$filled ? '#ffffff' : '#c0c0c0')};
  }
`;

const XSymbol = styled.span`
  color: #ff0000;
  line-height: 1;
`;

const OSymbol = styled.span`
  color: #0000ff;
  line-height: 1;
`;

export const TicTacToeBoard = ({ board, disabled, onSelect, isMaximized = false }: TicTacToeBoardProps) => {
  return (
    <BoardContainer>
      <Grid $isMaximized={isMaximized}>
        {board.map((cell, index) => (
          <Cell
            key={index}
            $disabled={disabled || false}
            $filled={Boolean(cell)}
            $isMaximized={isMaximized}
            onClick={() => {
              if (!disabled && !cell) {
                onSelect(index);
              }
            }}
            aria-label={`cell ${index + 1}`}
          >
            {cell === 'X' && <XSymbol>X</XSymbol>}
            {cell === 'O' && <OSymbol>O</OSymbol>}
          </Cell>
        ))}
      </Grid>
    </BoardContainer>
  );
};
