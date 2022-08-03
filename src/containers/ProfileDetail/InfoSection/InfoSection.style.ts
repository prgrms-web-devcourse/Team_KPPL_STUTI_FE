import styled from '@emotion/styled';

export const Section = styled.section`
  padding: 2.5rem 1rem 1.5rem;
`;

export const Loading = styled.div`
  padding-bottom: 1rem;
  text-align: center;
`;

export const Error = styled.div`
  padding-bottom: 1rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: center;
`;
