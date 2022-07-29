import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Avatar,
  ClickAwayListener,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '@assets/logo.svg';
import GoogleIcon from '@assets/icons/google-icon.svg';
import GitHubIcon from '@assets/icons/github-icon.svg';

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
  CustomButton,
  ButtonTextWrapper,
} from './style';

function NavigationHeader() {
  const [isLogin, setIsLogin] = useState(true);
  const [menuEl, setMenuEl] = useState<HTMLElement | null>(null);
  const [isModal, setIsModal] = useState(false);
  const isMenuOpen = Boolean(menuEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuEl(event.currentTarget);
    console.log('menu Opened!');
  };

  const handleMenuClose = () => {
    setMenuEl(null);
  };

  const popupModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsModal(true);
  };

  const handleLogin = () => {
    setIsModal(false);
    setIsLogin(true);
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
            <Link to='/' style={{ display: 'flex' }}>
              <img src={Logo} />
            </Link>
          </LogoWrapper>
          <NavContainer>
            <NavWrapper>
              <Link to='/'>
                <Typography variant='h6'>스터디</Typography>
              </Link>
            </NavWrapper>
            <NavWrapper>
              <Link to='/community'>
                <Typography variant='h6'>커뮤니티</Typography>
              </Link>
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
                    <Link to={'#'}>
                      <Typography variant='button'>마이페이지</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={'#'}>
                      <Typography variant='button'>프로필 수정</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={'#'} onClick={handleLogout}>
                      <Typography variant='button'>로그아웃</Typography>
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
                <Modal
                  open={isModal}
                  onClose={handleCloseModal}
                  BackdropProps={{
                    sx: {
                      backgroundColor: '#1118271A',
                    },
                  }}
                >
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
                        <CustomButton
                          variant='outlined'
                          color='secondary'
                          onClick={handleLogin}
                        >
                          <img src={GoogleIcon} />
                          <ButtonTextWrapper>
                            구글 계정으로 계속하기
                          </ButtonTextWrapper>
                        </CustomButton>
                        <CustomButton
                          variant='outlined'
                          color='secondary'
                          onClick={handleLogin}
                        >
                          <img src={GitHubIcon} />
                          <ButtonTextWrapper>
                            깃허브 계정으로 계속하기
                          </ButtonTextWrapper>
                        </CustomButton>
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
