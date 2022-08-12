import styled from '@emotion/styled';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 24.5rem;
  width: 100%;
  padding: 2rem 1rem;
`;

export const Flex = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

export const Message = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.secondary.main};
  text-align: center;
`;
