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

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0 0.75rem;
  color: #111827;
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

export const LoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 32px;

  &:hover {
    color: #111827;
  }
`;