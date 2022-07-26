import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setStorageItem } from '@utils/storage';
import { loginUser } from '@store/slices/user';
import { CircularProgress, Typography, useTheme } from '@mui/material';
import LogoIcon from '@components/LogoIcon/LogoIcon';
import { login } from '@apis/user';

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
      setStorageItem('token', data.accesstoken);
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
