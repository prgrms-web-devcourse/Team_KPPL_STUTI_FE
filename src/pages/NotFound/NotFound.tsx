import { useNavigate } from 'react-router-dom';
import { Button, Typography, useTheme } from '@mui/material';
import { LogoIcon } from '@components';

import { ButtonWrapper, NotFoundContainer } from './style';

function NotFound() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <NotFoundContainer>
      <LogoIcon color={theme.palette.primary.main} />
      <Typography variant='h3'>404 Not Found</Typography>
      <Typography variant='body1' color={theme.palette.secondary.main}>
        죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
      </Typography>
      <ButtonWrapper>
        <Button
          variant='text'
          color='primary'
          size='small'
          onClick={() => navigate('/', { replace: true })}
        >
          Go to Home
        </Button>
        <Button
          variant='text'
          color='primary'
          size='small'
          onClick={() => navigate(-1)}
        >
          Go to back
        </Button>
      </ButtonWrapper>
    </NotFoundContainer>
  );
}

export default NotFound;
