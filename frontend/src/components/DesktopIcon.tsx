import styled from 'styled-components';

type DesktopIconProps = {
  label: string;
  iconSrc: string;
  onDoubleClick?: () => void;
};

const IconWrapper = styled.div`
  width: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
`;

const IconImage = styled.img`
  width: 48px;
  height: 48px;
`;

const IconLabel = styled.span`
  text-align: center;
  color: #fff;
  text-shadow: 1px 1px 0 #000;
  font-size: 12px;
`;

function DesktopIcon({ label, iconSrc, onDoubleClick }: DesktopIconProps) {
  return (
    <IconWrapper onDoubleClick={onDoubleClick} title={label}>
      <IconImage src={iconSrc} alt={label} draggable={false} />
      <IconLabel>{label}</IconLabel>
    </IconWrapper>
  );
}

export default DesktopIcon;
