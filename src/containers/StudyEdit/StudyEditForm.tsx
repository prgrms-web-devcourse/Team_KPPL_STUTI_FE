import * as Yup from 'yup';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import { openAlert } from '@store/slices/flashAlert';
import {
  MultiLineInput,
  LabelInput,
  FileInput,
} from '@src/components/StudyCreate&Edit';
import { SpinnerIcon } from '@src/components';
import { getStudyDetailInfomation } from '@src/apis/studyDetail';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { study_id = '0' } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudyDetailInfomation(study_id);
        const { title, description, imageUrl } = data;

        setTitle(title);
        setDescription(description);
        setThumbnailImage(imageUrl);
      } catch (error) {
        new Error('스터디 상세 정보를 가져오는데 실패했습니다.');
      }
    };

    fetchData();
  }, []);

  const encodeFile = (fileBlob: File) => {
    const reader = new FileReader();
    if (!fileBlob) return;
    setIsLoading(true);
    reader.readAsDataURL(fileBlob);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        const result = reader.result as string;
        setThumbnailImage(result);

        resolve();
        setIsLoading(false);
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

        setTimeout(() => {
          for (const key of formData.keys()) {
            console.log(key, ':', formData.get(key));
          }
          actions.setSubmitting(false);
        }, 3000);
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
                    {isLoading ? (
                      <SpinnerWrapper>
                        <SpinnerIcon />
                      </SpinnerWrapper>
                    ) : thumbnailImage ? (
                      <Image src={thumbnailImage} alt='study-image' />
                    ) : (
                      <CameraIcon color='secondary' />
                    )}
                  </ImageWrapper>
                </ImageContainer>
                <ButtonWrapper>
                  <FileInput message='이미지 업로드' onChange={onImageChange} />
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
                />
              </StudyDescriptionWrapper>
              <Button
                type='submit'
                disabled={isSubmitting}
                onClick={() => {
                  handleClick(values);
                }}
              >
                {isSubmitting ? <SpinnerIcon /> : '제출'}
              </Button>
            </StudyEditWrapper>
          </form>
        );
      }}
    </Formik>
  );
}

export default StudyEditForm;
