import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Avatar,
  Button,
  ClickAwayListener,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import CloseIcon from '@mui/icons-material/Close';

import {
  HeaderContainer,
  NavContainer,
  NavWrapper,
  LogoWrapper,
  LoginWrapper,
  LoginButton,
  ModalContainer,
  ModalWrapper,
  LoginButtonContainer,
} from './style';

function NavigationHeader() {
  const [isLogin, setIsLogin] = useState(true);
  const [menuEl, setMenuEl] = useState<HTMLElement | null>(null);
  const [isModal, setIsModal] = useState(false);
  const isMenuOpen = Boolean(menuEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuEl(null);
  };

  const popupModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };

  const handleLogout = () => {
    setIsLogin(false);
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
                <ClickAwayListener onClickAway={handleMenuClose}>
                  <Avatar
                    alt='User Profile'
                    src=''
                    onClick={handleMenuOpen}
                    sx={{
                      cursor: 'pointer',
                    }}
                  />
                </ClickAwayListener>
                <Menu
                  open={isMenuOpen}
                  anchorEl={menuEl}
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
                    <Link to={'#'} onClick={handleLogout}>
                      로그아웃
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <LoginButton>
                  <Link to='#' onClick={popupModal}>
                    로그인/회원가입
                  </Link>
                </LoginButton>
                <Modal open={isModal} onClose={handleCloseModal}>
                  <ModalContainer>
                    <IconButton
                      onClick={handleCloseModal}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <ModalWrapper>
                      <Typography variant='h3' align='center'>
                        로그인/회원가입
                      </Typography>
                      <LoginButtonContainer>
                        <Button variant='outlined' color='secondary'>
                          <GoogleIcon sx={{ position: 'absolute', left: 20 }} />
                          구글 계정으로 계속하기
                        </Button>
                        <Button variant='outlined' color='secondary'>
                          <GitHubIcon
                            sx={{
                              position: 'absolute',
                              left: 20,
                            }}
                          />
                          깃허브 계정으로 계속하기
                        </Button>
                      </LoginButtonContainer>
                    </ModalWrapper>
                  </ModalContainer>
                </Modal>
              </>
            )}
          </LoginWrapper>
        </HeaderContainer>
      </nav>
    </header>
  );
}

export default NavigationHeader;
