import styled from '@emotion/styled';

export const Article = styled.article`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.secondary};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  text-align: center;
`;
