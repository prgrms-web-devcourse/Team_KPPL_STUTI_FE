import { SignUpForm } from '@src/containers';
import { Typography } from '@mui/material';

import { SignUpContainer } from './style';

function SignUp() {
  return (
    <>
      <SignUpContainer>
        <Typography variant='h3' align='center'>
          회원가입
        </Typography>
        <SignUpForm />
      </SignUpContainer>
    </>
  );
}

export default SignUp;
