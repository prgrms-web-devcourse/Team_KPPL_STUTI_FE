import Button from '@mui/material/Button';
import styled from '@emotion/styled';

export const Form = styled.form`
  display: flex;
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 568px) {
    flex-direction: column;
  }
`;

export const StyledButton = styled(Button)`
  flex-shrink: 0;
`;
