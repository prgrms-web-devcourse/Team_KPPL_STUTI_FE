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
  const [isLogin, setIsLogin] = useState(true);
  const [el, setEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(el);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setEl(event.currentTarget);
  };

  const handleClose = () => {
    setEl(null);
  };

  const popupModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log('login modal');
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
            {isLogin ? (
              <>
                <ClickAwayListener onClickAway={handleClose}>
                  <Avatar alt='User Profile' src='' onClick={handleClick} />
                </ClickAwayListener>
                <Menu
                  open={isOpen}
                  anchorEl={el}
                  autoFocus={false}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem>
                    <Link to={'#'}>마이페이지</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={'#'}>프로필 수정</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={'#'} onClick={() => setIsLogin(false)}>
                      로그아웃
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <LoginButton>
                <Link to='#' onClick={popupModal}>
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
