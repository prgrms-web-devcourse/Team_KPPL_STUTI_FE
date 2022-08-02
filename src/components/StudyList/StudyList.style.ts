import styled from '@emotion/styled';

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${({ theme }) => theme.palette.grey[50]};
  padding: 2rem 1rem;
`;

export const ItemCard = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.secondary};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  text-align: center;
`;
