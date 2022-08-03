import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { careers, jobs, mbtis } from '@containers/SignUp/options';
import Select from '@containers/SignUp/Select/Select';

import {
  FormContainer,
  FormInputContainer,
  MbtiContainer,
  MbtiWrapper,
  StyledForm,
} from './style';

function Form() {
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

  const handleClick = () => {
    window.open(
      'https://www.16personalities.com/ko/%EB%AC%B4%EB%A3%8C-%EC%84%B1%EA%B2%A9-%EC%9C%A0%ED%98%95-%EA%B2%80%EC%82%AC',
    );
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
          <Select
            label='직무'
            handleChange={setJob}
            required
            options={jobs}
            value={job}
          />
          <Select
            label='경력'
            handleChange={setCareer}
            required
            options={careers}
            value={career}
          />
          <MbtiContainer>
            <MbtiWrapper>
              <Select
                label='MBTI'
                handleChange={setMbti}
                required
                options={mbtis}
                value={mbti}
                fullWidth
              />
            </MbtiWrapper>
            <MbtiWrapper>
              <Button size='large' fullWidth onClick={handleClick}>
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

export default Form;
