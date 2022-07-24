import { styleProps } from '@src/components/Button/Button';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

export const CustomButton = styled(Button)<styleProps>`
  background-color: ${({ backgroundColor = 'gray' }) => backgroundColor};
  color: ${({ fontcolor = '#000' }) => fontcolor};
  width: ${({ width = '100px' }) => width};
  height: ${({ height = '40px' }) => height};

  &:hover {
    background-color: ${({ hoverColor = '#eee' }) => hoverColor};
  }
`;
