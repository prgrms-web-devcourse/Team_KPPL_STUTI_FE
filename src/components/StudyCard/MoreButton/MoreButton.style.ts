import { IconButton } from '@mui/material';
import styled from '@emotion/styled';

export const Position = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

export const StyledIconButton = styled(IconButton)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.common.white};

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;
