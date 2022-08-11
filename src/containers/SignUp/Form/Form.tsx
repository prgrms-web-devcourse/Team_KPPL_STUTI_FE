import * as yup from 'yup';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { AxiosError, AxiosResponse } from 'axios';
import { setStorageItem } from '@src/utils/storage';
import { getQueryString } from '@src/utils/queryString';
import { loginUser } from '@src/store/slices/user';
import { openAlert } from '@src/store/slices/flashAlert';
import { errorType } from '@src/interfaces/error';
import { MBTI_TEST_URL } from '@src/constants/externalUrl';
import { Select } from '@src/components';
import { signUp } from '@src/apis/user';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
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
    setFieldError,
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
    onSubmit: async (values) => {
      const formData = {
        email,
        nickname: values.nickname,
        field: values.field,
        career: values.career,
        MBTI: values.MBTI,
      };

      try {
        const data = await signUp(formData);
        dispatch(loginUser(data.member));
        setStorageItem('token', data.accesstoken);
        navigate('/', { replace: true });
      } catch (error) {
        const { response } = error as AxiosError;
        const { data }: { data: errorType } = response as AxiosResponse;
        const { errorCode } = data;

        switch (errorCode) {
          case 'M003':
            dispatch(
              openAlert({
                severity: 'error',
                title: '회원가입 실패',
                content: '닉네임이 중복되었습니다.',
              }),
            );
            setFieldError('nickname', '닉네임이 중복되었습니다.');
            break;

          case 'M005':
            dispatch(
              openAlert({
                severity: 'error',
                title: '회원가입 실패',
                content: '회원가입 시간이 초과하였습니다.',
              }),
            );
            navigate('/', { replace: true });
            break;

          default:
            console.error(error);
        }
      }
    },
  });

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
              <Button
                size='large'
                component='a'
                href={MBTI_TEST_URL}
                target='_blank'
                rel='noopener noreferrer'
                fullWidth
              >
                MBTI 검사하기
              </Button>
            </MbtiWrapper>
          </MbtiContainer>
          <Button size='large' type='submit' disabled={isSubmitting} fullWidth>
            {isSubmitting ? (
              <CircularProgress
                color='secondary'
                size='1.5rem'
                sx={{ margin: '-0.25rem' }}
              />
            ) : (
              '가입하기'
            )}
          </Button>
        </FormInputContainer>
      </StyledForm>
    </FormContainer>
  );
}

export default Form;
