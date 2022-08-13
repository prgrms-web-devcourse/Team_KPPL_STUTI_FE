import { Typography } from '@mui/material';
import { SignUpForm } from '@containers';

import { SignUpContainer } from './style';

function SignUp() {
  return (
    <SignUpContainer>
      <Typography variant='h3' align='center'>
        회원가입
      </Typography>
      <SignUpForm />
    </SignUpContainer>
  );
}

export default SignUp;
