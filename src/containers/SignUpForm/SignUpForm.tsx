import { useState } from 'react';
import { Button, MenuItem, TextField, Typography } from '@mui/material';

import {
  FormContainer,
  FormInputContainer,
  MbtiContainer,
  MbtiWrapper,
  StyledForm,
} from './style';
import { careers, jobs, mbtis } from './options';

function SignUpForm() {
  const [nickname, setNickname] = useState('');
  const [job, setJob] = useState('');
  const [career, setCareer] = useState('');
  const [mbti, setMbti] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`nickname: ${nickname}`);
    console.log(`job: ${job}`);
    console.log(`career: ${career}`);
    console.log(`mbti: ${mbti}`);
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Typography variant='body2' align='center'>
          계정 프로필을 설정해 주세요
        </Typography>
        <FormInputContainer>
          <TextField
            label='닉네임'
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <TextField
            label='직무'
            required
            select
            onChange={(e) => {
              setJob(e.target.value);
            }}
            value={job}
          >
            {jobs.map((job) => (
              <MenuItem key={job.value} value={job.value}>
                {job.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label='경력'
            required
            select
            onChange={(e) => {
              setCareer(e.target.value);
            }}
            value={career}
          >
            {careers.map((career) => (
              <MenuItem key={career.value} value={career.value}>
                {career.label}
              </MenuItem>
            ))}
          </TextField>
          <MbtiContainer>
            <MbtiWrapper>
              <TextField
                label='MBTI'
                required
                select
                onChange={(e) => {
                  setMbti(e.target.value);
                }}
                value={mbti}
                fullWidth
              >
                {mbtis.map((mbti) => (
                  <MenuItem key={mbti} value={mbti}>
                    {mbti}
                  </MenuItem>
                ))}
              </TextField>
            </MbtiWrapper>
            <MbtiWrapper>
              <Button size='large' fullWidth>
                MBTI 검사하기
              </Button>
            </MbtiWrapper>
          </MbtiContainer>
          <Button size='large' fullWidth type='submit'>
            가입
          </Button>
        </FormInputContainer>
      </StyledForm>
    </FormContainer>
  );
}

export default SignUpForm;
