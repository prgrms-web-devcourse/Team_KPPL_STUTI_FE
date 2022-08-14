import { Box } from '@mui/material';
import styled from '@emotion/styled';

interface WrapperProps {
  isLogin: boolean;
}

export const CommunityPostWrapper = styled(Box)<WrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: ${({ isLogin }) => (isLogin ? '1rem 1rem 2rem ' : '1rem')};
`;
