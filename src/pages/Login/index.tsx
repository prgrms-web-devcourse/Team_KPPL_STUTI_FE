import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import LogoIcon from '@src/components/LogoIcon/LogoIcon';
import { CircularProgress, Typography, useTheme } from '@mui/material';

import { LoginContainer } from './style';

function Login() {
  const { search } = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const qs = new URLSearchParams(search);
  const id = qs.get('id');

  const loginRequest = async () => {
    console.log(id);
  };

  useEffect(() => {
    loginRequest();
  }, []);

  return (
    <LoginContainer>
      <LogoIcon color={theme.palette.primary.main} />
      <Typography variant='h3'>로그인 요청 중입니다.</Typography>
      <CircularProgress color='primary' />
    </LoginContainer>
  );
}

export default Login;
