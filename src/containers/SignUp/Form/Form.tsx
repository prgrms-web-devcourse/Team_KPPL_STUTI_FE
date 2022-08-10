import * as yup from 'yup';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { setStorageItem } from '@src/utils/storage';
import { getQueryString } from '@src/utils/queryString';
import { loginUser } from '@src/store/slices/user';
import { MBTI_TEST_URL } from '@src/constants/externalUrl';
import { Select } from '@src/components';
import { signUp } from '@src/apis/user';
import { Button, TextField, Typography } from '@mui/material';
import { careers, jobs, mbtis } from '@containers/SignUp/options';

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

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      nickname: '',
      field: '',
      career: '',
      MBTI: '',
    },
    validationSchema: yup.object({
      nickname: yup
        .string()
        .trim('앞, 뒤 공백을 제거해주세요')
        .strict()
        .max(16, '닉네임은 최대 16글자 까지 가능합니다.')
        .required('닉네임을 입력해 주세요.'),
      field: yup.string().required('직무를 입력해주세요'),
      career: yup.string().required('경력을 입력해주세요'),
      MBTI: yup.string().required('MBTI를 입력해주세요.'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleClick = () => {
    window.open(MBTI_TEST_URL);
  };

  useEffect(() => {
    setFieldValue('nickname', getQueryString('name', 'string'));
  }, []);

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Typography variant='body2' align='center'>
          계정 프로필을 설정해 주세요
        </Typography>
        <FormInputContainer>
          <TextField
            id='nickname'
            name='nickname'
            label='닉네임*'
            value={values.nickname}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.nickname && Boolean(errors.nickname)}
            helperText={touched.nickname && errors.nickname}
          />
          <Select
            id='field'
            name='field'
            label='직무*'
            onChange={handleChange}
            options={jobs}
            value={values.field}
            error={touched.field && Boolean(errors.field)}
            helperText={touched.field && errors.field}
          />
          <Select
            id='career'
            name='career'
            label='경력*'
            onChange={handleChange}
            options={careers}
            value={values.career}
            error={touched.career && Boolean(errors.career)}
            helperText={touched.career && errors.career}
          />
          <MbtiContainer>
            <MbtiWrapper>
              <Select
                id='MBTI'
                name='MBTI'
                label='MBTI'
                onChange={handleChange}
                options={mbtis}
                value={values.MBTI}
                error={touched.MBTI && Boolean(errors.MBTI)}
                helperText={touched.MBTI && errors.MBTI}
                fullWidth
              />
            </MbtiWrapper>
            <MbtiWrapper>
              <Button size='large' fullWidth onClick={handleClick}>
                MBTI 검사하기
              </Button>
            </MbtiWrapper>
          </MbtiContainer>
          <Button size='large' type='submit' disabled={isSubmitting} fullWidth>
            가입
          </Button>
        </FormInputContainer>
      </StyledForm>
    </FormContainer>
  );
}

export default Form;
