import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
`;

interface ButtonProps {
  selected: boolean;
}

export const Button = styled.button<ButtonProps>`
  position: relative;
  height: 3rem;
  padding: 0 0.75rem;
  border: 0;
  background-color: transparent;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.button.fontSize};
  font-weight: ${({ theme }) => theme.typography.button.fontWeight};
  transition: color 300ms;
  cursor: pointer;

  ${({ selected, theme }) =>
    selected &&
    css`
      color: ${theme.palette.primary.main};
    `}

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.palette.primary.main};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 300ms;

    ${({ selected }) =>
      selected &&
      css`
        transform: scaleX(1);
      `}
  }

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
