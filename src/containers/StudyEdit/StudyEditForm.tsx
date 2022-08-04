import * as Yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { Formik, Field } from 'formik';
import {
  MultiLineInput,
  LabelInput,
  FileInput,
} from '@src/components/StudyCreate&Edit';
import { SpinnerIcon } from '@src/components';
import { fetchStudyDetails } from '@src/apis/fetchStudyDetails';
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
  const titleRef = useRef<null | HTMLDivElement>(null);
  const descriptionRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudyDetails();
      const { title, description, imageUrl } = data;

      setTitle(title);
      setDescription(description);
      setThumbnailImage(imageUrl);
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

        const formData = new FormData();

        formData.append('title', values.title);
        if (imageSrc) formData.append('imageFile', imageSrc);
        formData.append('description', values.description.trim());

        setTimeout(() => {
          for (const key of formData.keys()) {
            console.log(key, ':', formData.get(key));
          }
          actions.setSubmitting(false);
        }, 3000);
      }}
    >
      {(formik) => {
        return (
          <form onSubmit={formik.handleSubmit}>
            <StudyEditWrapper>
              <StudyEditHeading>
                <Typography variant='h4'>스터디 수정</Typography>
                <InputWrapper>
                  {formik.touched.title && formik.errors.title && (
                    <ErrorMessage ref={titleRef}>
                      {(() => {
                        if (titleRef.current) {
                          titleRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          });
                        }
                        return formik.errors.title;
                      })()}
                    </ErrorMessage>
                  )}
                  <Field
                    as={LabelInput}
                    label='스터디명'
                    id='title'
                    {...formik.getFieldProps('title')}
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
                {formik.touched.description && formik.errors.description && (
                  <ErrorMessage ref={descriptionRef}>
                    {(() => {
                      if (descriptionRef.current && !titleRef.current) {
                        descriptionRef.current.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                      }
                      return formik.errors.description;
                    })()}
                  </ErrorMessage>
                )}
                <Field
                  as={MultiLineInput}
                  id='description'
                  placeholder='스터디 내용을 기재해주세요.'
                  height='600px'
                  {...formik.getFieldProps('description')}
                />
              </StudyDescriptionWrapper>
              <Button type='submit' disabled={formik.isSubmitting}>
                제출
              </Button>
            </StudyEditWrapper>
          </form>
        );
      }}
    </Formik>
  );
}

export default StudyEditForm;
