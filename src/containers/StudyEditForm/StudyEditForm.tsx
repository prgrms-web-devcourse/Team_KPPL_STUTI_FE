import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import { AxiosError, AxiosResponse } from 'axios';
import { openAlert } from '@store/slices/flashAlert';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { errorType } from '@interfaces/error';
import {
  MultiLineInput,
  LabelInput,
  FileInput,
} from '@components/StudyCreate&Edit';
import { editStudy } from '@apis/studyEdit';
import { getStudyDetailInfomation } from '@apis/studyDetail';

import {
  StudyEditHeading,
  StudyEditWrapper,
  StudyEditImageWrapper,
  ImageWrapper,
  Image,
  ButtonWrapper,
  StudyDescriptionWrapper,
  ImageContainer,
  CameraIcon,
  InputWrapper,
  ErrorMessage,
  SpinnerWrapper,
  LoadingWrapper,
} from './style';

interface formikData {
  title: string;
  description: string;
}

const EditSchema = Yup.object({
  title: Yup.string()
    .trim('앞, 뒤 공백을 제거해주세요.')
    .strict()
    .max(50, '50자를 넘을 수 없습니다.')
    .min(5, '최소 5자 이상입니다.')
    .required('제목을 입력해주세요.'),
  description: Yup.string()
    .trim()
    .max(1000, '1,000자를 넘을 수 없습니다.')
    .min(10, '최소 10자 이상입니다.')
    .required('스터디 내용을 입력해주세요.'),
});

function StudyEditForm() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<File | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<string>('');
  const [fileErrorMessage, setFileErrorMessage] = useState<string>('');
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { study_id = '0' } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getStudyDetailInfomation(study_id);
        const { title, description, imageUrl } = data;

        setTitle(title);
        setDescription(description);
        setThumbnailImage(imageUrl);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        const { response } = error as AxiosError;
        const { data }: { data: errorType } = response as AxiosResponse;
        const { errorCode } = data;

        if (errorCode === 'SG002') {
          dispatch(
            openAlert({
              severity: 'error',
              title: '스터디 그룹을 찾지 못했습니다!',
              content: '홈으로 갔다가 다시 시도해주세요!',
            }),
          );
          return;
        }

        dispatch(
          openAlert({
            severity: 'error',
            title: '죄송합니다',
            content: '스터디 관리 정보를 가져오는데 실패했습니다.',
          }),
        );
      }
    };

    fetchData();
  }, []);

  const encodeFile = (fileBlob: File) => {
    const reader = new FileReader();
    if (!fileBlob) return;
    setIsImageLoading(true);
    reader.readAsDataURL(fileBlob);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        const result = reader.result as string;
        setThumbnailImage(result);

        resolve();
        setIsImageLoading(false);
      };
    });
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files || !files[0]) return;

    const maxSize = 1 * 1024 * 1024;
    const fileSize = files[0].size;

    if (fileSize > maxSize) {
      setFileErrorMessage('파일 크기는 최대 1MB 입니다.');
      return;
    }

    setImageSrc(files[0]);
    encodeFile(files[0]);
    setFileErrorMessage('');
  };

  const handleClick = (values: formikData) => {
    const { title, description } = values;
    if (!title || !description) {
      dispatch(
        openAlert({
          severity: 'error',
          title: '누락된 값이 있습니다.',
          content: '다시 확인해 주세요.',
        }),
      );
    }
  };

  const createFormData = (values: formikData) => {
    const formData = new FormData();
    const { title, description } = values;

    formData.append('title', title);
    if (imageSrc) formData.append('imageFile', imageSrc);
    formData.append('description', description);

    return formData;
  };

  const updateStudy = async (formData: FormData, study_id: string) => {
    try {
      const res = await editStudy(formData, study_id);
      const { studyGroupId } = res;

      navigate(`/study/${studyGroupId}`, { replace: true });
      return res;
    } catch (error) {
      console.error(error);

      const { response } = error as AxiosError;
      const { data }: { data: errorType } = response as AxiosResponse;
      const { errorCode } = data;

      if (errorCode === 'C001') {
        dispatch(
          openAlert({
            severity: 'error',
            title: '잘못 입력된 값이 있습니다.',
            content: '다시 한 번 확인해주세요.',
          }),
        );
      }
      if (errorCode === 'SG001') {
        dispatch(
          openAlert({
            severity: 'error',
            title: '스터디 기간이 잘 못 설정되었습니다.',
            content: '시작일은 종료일보다 과거여야 합니다.',
          }),
        );
      }
      if (errorCode === 'F001') {
        dispatch(
          openAlert({
            severity: 'error',
            title: '지원하지 않는 형식의 파일입니다.',
            content: 'PNG, JPEG, JPG만 가능합니다.',
          }),
        );
      }
      if (errorCode === 'F002') {
        dispatch(
          openAlert({
            severity: 'error',
            title: '파일 크기가 1MB를 초과합니다.',
            content: '최대 1MB까지 가능합니다.',
          }),
        );
      }
      if (errorCode === 'F003') {
        dispatch(
          openAlert({
            severity: 'error',
            title: '파일 업로드 실패.',
            content: '파일 업로드에 실패했습니다.',
          }),
        );
      }
      dispatch(
        openAlert({
          severity: 'error',
          title: '죄송합니다.',
          content: '스터디 생성에 실패했습니다.',
        }),
      );
    }
  };

  return (
    <Formik
      initialValues={{
        title,
        description,
      }}
      enableReinitialize
      validationSchema={EditSchema}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);

        const formData = createFormData(values);

        updateStudy(formData, study_id);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        isSubmitting,
        touched,
        errors,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <StudyEditWrapper>
              {isLoading ? (
                <LoadingWrapper>
                  <CircularProgress />
                </LoadingWrapper>
              ) : (
                <>
                  <StudyEditHeading>
                    <Typography variant='h4'>스터디 수정</Typography>
                    <InputWrapper>
                      <Field
                        as={LabelInput}
                        id='title'
                        name='title'
                        label='스터디명'
                        error={touched.title && errors.title ? true : false}
                        helperText={touched.title && errors.title}
                        onChange={handleChange}
                        autoFocus={true}
                        disabled={isSubmitting || isLoading}
                      />
                    </InputWrapper>
                  </StudyEditHeading>
                  <StudyEditImageWrapper>
                    <Typography variant='h5'>대표 이미지</Typography>
                    <ImageContainer>
                      {fileErrorMessage && (
                        <ErrorMessage>{fileErrorMessage}</ErrorMessage>
                      )}
                      <ImageWrapper>
                        {isImageLoading ? (
                          <SpinnerWrapper>
                            <CircularProgress />
                          </SpinnerWrapper>
                        ) : thumbnailImage ? (
                          <Image src={thumbnailImage} alt='study-image' />
                        ) : (
                          <CameraIcon color='secondary' />
                        )}
                      </ImageWrapper>
                    </ImageContainer>
                    <ButtonWrapper>
                      <FileInput
                        message='이미지 업로드'
                        onChange={onImageChange}
                        disabled={isSubmitting || isLoading}
                      />
                    </ButtonWrapper>
                  </StudyEditImageWrapper>
                  <StudyDescriptionWrapper>
                    <Typography variant='h5'>상세 설명</Typography>
                    <Field
                      as={MultiLineInput}
                      id='description'
                      name='description'
                      label='상세 설명'
                      placeholder='스터디 내용을 기재해주세요.'
                      height='500px'
                      error={
                        touched.description && errors.description ? true : false
                      }
                      helperText={touched.description && errors.description}
                      onChange={handleChange}
                      disabled={isSubmitting || isLoading}
                    />
                  </StudyDescriptionWrapper>
                  <Button
                    type='submit'
                    disabled={isSubmitting || isLoading}
                    onClick={() => {
                      handleClick(values);
                    }}
                  >
                    {isSubmitting ? (
                      <CircularProgress
                        color='secondary'
                        size='1.5rem'
                        sx={{ margin: '-0.25rem' }}
                      />
                    ) : (
                      '제출'
                    )}
                  </Button>
                </>
              )}
            </StudyEditWrapper>
          </form>
        );
      }}
    </Formik>
  );
}

export default StudyEditForm;
