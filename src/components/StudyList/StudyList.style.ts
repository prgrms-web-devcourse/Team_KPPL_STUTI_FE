import styled from '@emotion/styled';

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${({ theme }) => theme.palette.grey[50]};
  padding: 2rem 1rem;
`;
