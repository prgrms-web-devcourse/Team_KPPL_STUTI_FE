import { setMbtiColor } from '@src/utils/setMbtiColor';
import { Props } from '@src/components/MbtiTag/MbtiTag';
import { Chip } from '@mui/material';
import styled from '@emotion/styled';

const setMbtiBorderColor = (props: Props) => {
  const color = setMbtiColor(props);
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5), 16);
  return `rgba(${r}, ${g}, ${b}, 0.5)`;
};

export const CustomChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'cursor',
})<Props>`
  color: ${({ variant }) => (variant === 'filled' ? '#fff' : setMbtiColor)};
  border-color: ${setMbtiBorderColor};
  background: ${({ variant }) => (variant === 'filled' ? setMbtiColor : '')};
  cursor: ${({ cursor = false }) => (cursor ? 'pointer' : 'default')};
`;
