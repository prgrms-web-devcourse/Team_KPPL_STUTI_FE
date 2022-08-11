import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { AxiosError, AxiosResponse } from 'axios';
import { updateUser } from '@store/slices/user';
import { openAlert } from '@store/slices/flashAlert';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { UserProfileEditFormType } from '@interfaces/userProfile';
import { errorType } from '@interfaces/error';
import {
  fieldOptions,
  fieldValidValues,
  careerOptions,
  careerValidValues,
  mbtiOptions,
  mbtiValidValues,
} from '@constants/selectOptions';
import { MBTI_TEST_URL } from '@constants/externalUrl';
import { Select } from '@components';
import { getUserProfile, updateUserProfile } from '@apis/members';

import { Form, Flex, Message } from './EditForm.style';

function EditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_id: userId } = useParams<{ user_id: string }>();
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    setValues,
  } = useFormik<UserProfileEditFormType>({
    initialValues: {
      nickname: '',
      field: '',
      career: '',
      MBTI: '',
      githubUrl: '',
      blogUrl: '',
    },
    validationSchema: yup.object({
      nickname: yup
        .string()
        .trim('앞, 뒤 공백을 제거해 주세요.')
        .strict()
        .max(16)
        .required('닉네임을 입력해 주세요.'),
      field: yup
        .string()
        .oneOf(
          fieldValidValues,
          '잘못된 입력입니다. 직무를 다시 선택해 주세요.',
        )
        .required('직무를 입력해주세요'),
      career: yup
        .string()
        .oneOf(
          careerValidValues,
          '잘못된 입력입니다. 경력을 다시 선택해 주세요.',
        )
        .required('경력을 입력해주세요'),
      MBTI: yup
        .string()
        .oneOf(mbtiValidValues, '잘못된 입력입니다. MBTI를 다시 선택해 주세요.')
        .required('MBTI를 입력해주세요.'),
      githubUrl: yup
        .string()
        .trim('앞, 뒤 공백을 제거해 주세요.')
        .strict()
        .url('잘못된 형식의 주소입니다.')
        .nullable(),
      blogUrl: yup
        .string()
        .trim('앞, 뒤 공백을 제거해 주세요.')
        .strict()
        .url('잘못된 형식의 주소입니다.')
        .nullable(),
    }),
    onSubmit: (values, { setFieldError, setSubmitting }) => {
      (async () => {
        try {
          const data = {
            ...values,
            githubUrl: values.githubUrl !== '' ? values.githubUrl : null,
            blogUrl: values.blogUrl !== '' ? values.blogUrl : null,
          };
          const newUser = await updateUserProfile(Number(userId), values);
          dispatch(updateUser(newUser));
          navigate(`/user/${userId}`);
        } catch (e) {
          const { response } = e as AxiosError;
          const {
            data: { errorCode },
          } = response as AxiosResponse<errorType>;

          switch (errorCode) {
            case 'M002':
              dispatch(
                openAlert({
                  severity: 'error',
                  title: '프로필 수정에 실패했습니다.',
                  content: '사용자 정보를 찾을 수 없습니다.',
                }),
              );
              break;
            case 'M003':
              dispatch(
                openAlert({
                  severity: 'error',
                  title: '프로필 수정에 실패했습니다.',
                  content: '입력된 값을 다시 확인해 주세요.',
                }),
              );
              setFieldError('nickname', '이미 등록된 닉네임입니다.');

              break;
            default:
              dispatch(
                openAlert({
                  severity: 'error',
                  title: '프로필 수정에 실패했습니다. ',
                  content: '잠시후 다시 시도해 주세요.',
                }),
              );
          }

          setSubmitting(false);
        }
      })();
    },
  });

  useEffect(() => {
    (async function requestGetUserProfile() {
      try {
        setLoading(true);
        const userProfile = await getUserProfile(Number(userId));

        setValues({
          nickname: userProfile.nickname,
          field: userProfile.field,
          career: userProfile.career,
          MBTI: userProfile.MBTI,
          githubUrl: userProfile.githubUrl ?? '',
          blogUrl: userProfile.blogUrl ?? '',
        });
        setProfileImageUrl(userProfile.profileImageUrl);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {loading && (
        <Message>
          <CircularProgress color='secondary' />
        </Message>
      )}
      {error && (
        <Message>
          서버로부터 사용자 정보를 불러오지 못했습니다.
          <br />
          잠시 후 다시 시도해 주세요.
        </Message>
      )}
      {!error && !loading && (
        <Form onSubmit={handleSubmit}>
          <Avatar
            src={profileImageUrl}
            alt=''
            sx={{ width: '7.5rem', height: '7.5rem' }}
          />
          <TextField
            id='nickname'
            name='nickname'
            label='닉네임*'
            value={values.nickname}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.nickname && Boolean(errors.nickname)}
            helperText={touched.nickname && errors.nickname}
            disabled={isSubmitting}
            fullWidth
          />
          <Select
            id='field'
            name='field'
            label='직무*'
            value={values.field}
            options={fieldOptions}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.field && Boolean(errors.field)}
            helperText={touched.field && errors.field}
            disabled={isSubmitting}
            fullWidth
          />
          <Select
            id='career'
            name='career'
            label='경력*'
            value={values.career}
            options={careerOptions}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.career && Boolean(errors.career)}
            helperText={touched.career && errors.career}
            disabled={isSubmitting}
            fullWidth
          />
          <Flex>
            <Select
              id='MBTI'
              name='MBTI'
              label='MBTI*'
              value={values.MBTI}
              options={mbtiOptions}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.MBTI && Boolean(errors.MBTI)}
              helperText={touched.MBTI && errors.MBTI}
              disabled={isSubmitting}
              fullWidth
            />
            <Button
              component='a'
              href={MBTI_TEST_URL}
              target='_blank'
              rel='noopener noreferrer'
              fullWidth
            >
              MBTI 검사하기
            </Button>
          </Flex>
          <TextField
            id='githubUrl'
            name='githubUrl'
            label='Github URL'
            value={values.githubUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.githubUrl && Boolean(errors.githubUrl)}
            helperText={touched.githubUrl && errors.githubUrl}
            disabled={isSubmitting}
            fullWidth
          />
          <TextField
            id='blogUrl'
            name='blogUrl'
            label='blog URL'
            value={values.blogUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.blogUrl && Boolean(errors.blogUrl)}
            helperText={touched.blogUrl && errors.blogUrl}
            disabled={isSubmitting}
            fullWidth
          />
          <Button type='submit' disabled={isSubmitting} fullWidth>
            {!isSubmitting ? (
              '확인'
            ) : (
              <CircularProgress
                color='secondary'
                size='1.5rem'
                sx={{ margin: '-0.25rem' }}
              />
            )}
          </Button>
        </Form>
      )}
    </>
  );
}
export default EditForm;
