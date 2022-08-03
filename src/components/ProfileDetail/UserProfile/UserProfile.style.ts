import styled from '@emotion/styled';
export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 22.5rem;
  margin: 0 auto;
`;

export const H3 = styled.h3`
  margin: 1rem 0 0.25rem;
  font-size: ${({ theme }) => theme.typography.h4.fontSize};
  font-weight: ${({ theme }) => theme.typography.h4.fontWeight};
`;

export const P = styled.p`
  margin-top: 0.25rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const Dl = styled.dl`
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.palette.grey[50]};
  margin: 1rem 0;
`;

export const Flex = styled.div`
  display: flex;
`;

export const Dt = styled.dt`
  flex: 0 0 6rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const A = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;
