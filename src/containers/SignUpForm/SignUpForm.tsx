import { Button, TextField, Typography } from '@mui/material';

import {
  FormContainer,
  FormInputContainer,
  MbtiContainer,
  MbtiWrapper,
  StyledForm,
} from './style';

function SignUpForm() {
  return (
    <FormContainer>
      <StyledForm>
        <Typography variant='body2' align='center'>
          계정 프로필을 설정해 주세요
        </Typography>
        <FormInputContainer>
          <TextField label='닉네임' required />
          <TextField label='직무' required select />
          <TextField label='경력' required select />
          <MbtiContainer>
            <MbtiWrapper>
              <TextField label='MBTI' required select fullWidth />
            </MbtiWrapper>
            <MbtiWrapper>
              <Button size='large' fullWidth>
                MBTI 검사하기
              </Button>
            </MbtiWrapper>
          </MbtiContainer>
          <Button size='large' fullWidth>
            가입
          </Button>
        </FormInputContainer>
      </StyledForm>
    </FormContainer>
  );
}

export default SignUpForm;
