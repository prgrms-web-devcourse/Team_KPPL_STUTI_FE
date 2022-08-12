import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Background = styled.div`
  background-color: ${({ theme }) => theme.palette.grey[50]};
  padding: 2rem 1rem 0 1rem;
`;

interface ButtonProps {
  selected: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: 0 0.5rem;
  border: 0;
  background-color: transparent;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.button.fontSize};
  font-weight: ${({ theme }) => theme.typography.button.fontWeight};
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  transition: color 300ms;

  &:not(:last-child) {
    border-right: ${({ theme }) => `1px solid ${theme.palette.secondary.main}`};
  }

  ${({ selected, theme }) =>
    selected &&
    css`
      color: ${theme.palette.primary.main};
    `}

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
