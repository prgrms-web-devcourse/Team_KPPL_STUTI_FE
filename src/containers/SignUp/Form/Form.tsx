import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setStorageItem } from '@src/utils/storage';
import { getQueryString } from '@src/utils/queryString';
import { loginUser } from '@src/store/slices/user';
import { MBTI_TEST_URL } from '@src/constants/externalUrl';
import { signUp } from '@src/apis/user';
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = getQueryString('email', 'string') + '';
  const [nickname, setNickname] = useState(
    getQueryString('name', 'string') + '',
  );
  const [field, setField] = useState('');
  const [career, setCareer] = useState('');
  const [mbti, setMbti] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      email,
      nickname,
      field,
      career,
      MBTI: mbti,
    };

    const data = await signUp(formData);
    dispatch(loginUser(data.member));
    setStorageItem('token', data.accesstoken);
    navigate('/', { replace: true });
  };

  const handleClick = () => {
    window.open(MBTI_TEST_URL);
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
            handleChange={setField}
            required
            options={jobs}
            value={field}
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
