import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Avatar, ClickAwayListener, Menu, MenuItem } from '@mui/material';

import {
  HeaderContainer,
  NavContainer,
  NavWrapper,
  LogoWrapper,
  LoginWrapper,
  LoginButton,
} from './style';

function NavigationHeader() {
  const user = { id: 1 };
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleClose = () => {
    setEl(null);
    setIsOpen(false);
  };

  return (
    <header>
      <nav>
        <HeaderContainer>
          <LogoWrapper>
            <Link to='/'>STUTI</Link>
          </LogoWrapper>
          <NavContainer>
            <NavWrapper>
              <Link to='/'>스터디</Link>
            </NavWrapper>
            <NavWrapper>
              <Link to='/community'>커뮤니티</Link>
            </NavWrapper>
          </NavContainer>
          <LoginWrapper>
            {user ? (
              <>
                <ClickAwayListener onClickAway={handleClose}>
                  <Avatar alt='User Profile' src='' onClick={handleClick} />
                </ClickAwayListener>
                <Menu open={isOpen} anchorEl={el}>
                  <MenuItem>
                    <Link to={'#'}>마이페이지</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={'#'}>프로필 수정</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={'#'}>로그아웃</Link>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <LoginButton>
                <Link
                  to='#'
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('login modal');
                  }}
                >
                  로그인/회원가입
                </Link>
              </LoginButton>
            )}
          </LoginWrapper>
        </HeaderContainer>
      </nav>
    </header>
  );
}

export default NavigationHeader;
