import { NavLink } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import styled from '@emotion/styled';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 60px;
  padding: 0 1rem;
  font-weight: bold;
  border-bottom: 1px solid #d1d5db;
`;

export const NavContainer = styled.div`
  display: flex;
  margin-left: 1.5rem;
  gap: 0.5rem;
`;

export const HeaderNavLink = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 0.75rem;

  &.active {
    color: ${({ theme }) => theme.palette.primary.main};

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 2px;
      background-color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

export const NavTypography = styled(Typography)`
  color: inherit;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 76px;
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: right;
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 0.75rem;
  color: #6b7280;
`;

export const LoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 32px;
  cursor: pointer;

  &:hover {
    color: #111827;
  }
`;

export const ModalContainer = styled.div`
  position: absolute;
  width: 360px;
  height: 328px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 3px 5px rgba(0, 0, 0, 0.1);
  padding: 4.5rem 1.5rem;
  outline: none;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;
  gap: 1rem;
`;

export const LoginButton = styled(Button)`
  justify-content: start;
  padding: 0.75rem 1.25rem;
`;

export const ButtonTextWrapper = styled.div`
  flex: 1;
  justify-content: center;
`;
