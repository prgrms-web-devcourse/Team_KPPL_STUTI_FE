import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

import {
  HeaderContainer,
  NavContainer,
  NavWrapper,
  LogoWrapper,
  LoginWrapper,
  LoginButton,
} from './style';

function NavigationHeader() {
  const user = {};

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
            {!user ? (
              <Avatar />
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
