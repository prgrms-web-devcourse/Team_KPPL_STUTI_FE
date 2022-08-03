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

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.palette.common.black};
    transform: scaleX(0);
    transform-origin: left;
    transition: 150ms transform;

    ${({ selected }) =>
      selected &&
      css`
        transform: scaleX(1);
      `}
  }
`;
