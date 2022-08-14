import { Box } from '@mui/material';
import styled from '@emotion/styled';

export const CommunityWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.grey[50]};

  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;
