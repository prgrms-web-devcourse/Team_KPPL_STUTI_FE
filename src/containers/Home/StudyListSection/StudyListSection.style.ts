import styled from '@emotion/styled';

interface ContainerProps {
  isLogin: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: ${({ theme }) => theme.palette.grey[50]};
  padding-bottom: ${({ isLogin }) => isLogin && '3.5rem'};
`;
