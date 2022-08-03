import IconButton from '@mui/material/IconButton';
import styled from '@emotion/styled';

export const Position = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

export const CustomIconButton = styled(IconButton)`
  background-color: ${({ theme }) => theme.palette.background.default};

  &:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
`;
