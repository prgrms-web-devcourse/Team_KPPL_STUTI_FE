import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginUser } from '@src/store/slices/user';
import LogoIcon from '@src/components/LogoIcon/LogoIcon';
import { login } from '@src/apis/user';
import { CircularProgress, Typography, useTheme } from '@mui/material';

import { LoginContainer } from './style';

function Login() {
  const { search } = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const qs = new URLSearchParams(search);
  const id = Number(qs.get('id'));
  const dispatch = useDispatch();

  const loginRequest = async () => {
    try {
      const data = await login(id);
      dispatch(loginUser(data.member));
      localStorage.setItem('token', data.accesstoken);
    } catch (e) {
      console.error(e);
    } finally {
      navigate('/', { replace: true });
    }
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
