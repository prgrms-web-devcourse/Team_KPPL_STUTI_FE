import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectUser, logoutUser } from '@src/store/slices/user';
import LogoIcon from '@src/components/LogoIcon/LogoIcon';
import GoogleIcon from '@src/components/GoogleIcon/GoogleIcon';
import GitHubIcon from '@src/components/GitHubIcon/GitHubIcon';
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
import { useTheme } from '@emotion/react';

import {
  HeaderContainer,
  NavContainer,
  HeaderNavLink,
  LogoWrapper,
  LoginWrapper,
  ModalContainer,
  ModalWrapper,
  LoginButtonContainer,
  LoginButton,
  ButtonTextWrapper,
  LoginBox,
  NavTypography,
  Nav,
} from './style';

function NavigationHeader() {
  const theme = useTheme();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [menuEl, setMenuEl] = useState<HTMLElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMenuOpen = Boolean(menuEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuEl(null);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    handleMenuClose();
    handleModalClose();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header>
      <Nav>
        <HeaderContainer>
          <LogoWrapper>
            <Link to='/' style={{ display: 'flex' }}>
              <LogoIcon color={theme.palette.primary.main} />
            </Link>
          </LogoWrapper>
          <NavContainer>
            <HeaderNavLink to='/'>
              <NavTypography variant='h6'>스터디</NavTypography>
            </HeaderNavLink>
            <HeaderNavLink to='/community'>
              <NavTypography variant='h6'>커뮤니티</NavTypography>
            </HeaderNavLink>
          </NavContainer>
          <LoginWrapper>
            {user.isLogin ? (
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
                  <MenuItem component={Link} to='/user/1'>
                    <Typography variant='button'>마이페이지</Typography>
                  </MenuItem>
                  <MenuItem component={Link} to={'/user/1/edit'}>
                    <Typography variant='button'>프로필 수정</Typography>
                  </MenuItem>
                  <MenuItem component={Link} to={'/'} onClick={handleLogout}>
                    <Typography variant='button'>로그아웃</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <LoginBox onClick={handleModalOpen}>로그인/회원가입</LoginBox>
                <Modal
                  open={isModalOpen}
                  onClose={handleModalClose}
                  BackdropProps={{
                    sx: {
                      backgroundColor: '#1118271A',
                    },
                  }}
                >
                  <ModalContainer>
                    <IconButton
                      onClick={handleModalClose}
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
                        <a
                          href={`${process.env.REACT_APP_API_HOST}/oauth2/authorization/google`}
                        >
                          <LoginButton
                            variant='outlined'
                            color='secondary'
                            onClick={handleLogin}
                          >
                            <GoogleIcon />
                            <ButtonTextWrapper>
                              구글 계정으로 계속하기
                            </ButtonTextWrapper>
                          </LoginButton>
                        </a>
                        <a
                          href={`${process.env.REACT_APP_API_HOST}/oauth2/authorization/google`}
                        >
                          <LoginButton
                            variant='outlined'
                            color='secondary'
                            onClick={handleLogin}
                          >
                            <GitHubIcon />
                            <ButtonTextWrapper>
                              깃허브 계정으로 계속하기
                            </ButtonTextWrapper>
                          </LoginButton>
                        </a>
                      </LoginButtonContainer>
                    </ModalWrapper>
                  </ModalContainer>
                </Modal>
              </>
            )}
          </LoginWrapper>
        </HeaderContainer>
      </Nav>
    </header>
  );
}

export default NavigationHeader;
