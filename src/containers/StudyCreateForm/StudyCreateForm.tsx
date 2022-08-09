import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import { AxiosError, AxiosResponse } from 'axios';
import { openAlert } from '@store/slices/flashAlert';
import { errorType } from '@src/interfaces/error';
import {
  topicOptions,
  regionOptions,
  recruitsNumberOptions,
  topicValues,
  regionValues,
  recruitsNumberValues,
} from '@src/constants/selectOptions';
import {
  MultiLineInput,
  LabelInput,
  FileInput,
} from '@src/components/StudyCreate&Edit';
import {
  MbtiRecommend,
  RangeDatePicker,
  RadioGroup,
  MbtiSelect,
} from '@src/components/StudyCreate';
import Select from '@src/components/Select/Select';
import { SpinnerIcon } from '@src/components';
import { createNewStudy } from '@src/apis/studyCreate';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import {
  ButtonWrapper,
  CameraIcon,
  ErrorMessage,
  FileUploadWrapper,
  ImageContainer,
  ImageWrapper,
  Image,
  InputWrapper,
  LocationWrapper,
  MbtiHeadingWrapper,
  MbtiWrapper,
  PeopleWrapper,
  StudyCreateWrapper,
  StudyDescriptionWrapper,
  TopicWrapper,
  SpinnerWrapper,
  MbtiSelectWrapper,
} from './style';

interface formikData {
  isOnline: string;
  title: string;
  topic: string;
  region: string;
  numberOfRecruits: string;
  description: string;
}

const radioValues = [
  {
    value: 'online',
    label: '온라인',
  },
  {
    value: 'offline',
    label: '오프라인',
  },
];

const recommendMbtis = {
  ENFJ: ['INFP', 'ISFP'],
  ENFP: ['INFJ', 'INTJ'],
  ENTJ: ['INFP', 'INTP'],
  ENTP: ['INFJ', 'INTJ'],
  ESFJ: ['ISFP', 'ISTP'],
  ESFP: ['ISFJ', 'ISTJ'],
  ESTJ: ['INTP', 'ISFP', 'ISTP'],
  ESTP: ['ISFJ'],
  INFJ: ['ENFP', 'ENTP'],
  INFP: ['ENFJ', 'ENTJ'],
  INTJ: ['ENFP', 'ENTP'],
  INTP: ['ENTJ', 'ESTJ'],
  ISFJ: ['ESFP', 'ESTP'],
  ISFP: ['ENFJ', 'ESFJ', 'ESTJ'],
  ISTJ: ['ESFP'],
  ISTP: ['ESFJ', 'ESTJ'],
};

const CreateSchema = Yup.object({
  isOnline: Yup.string(),
  title: Yup.string()
    .trim('앞, 뒤 공백을 제거해주세요.')
    .strict()
    .max(50, '50자를 넘을 수 없습니다.')
    .min(5, '최소 5자 이상입니다.')
    .required('제목을 입력해주세요.'),
  topic: Yup.string().oneOf(topicValues).required('분야를 선택해주세요.'),
  region: Yup.string().when(['isOnline'], {
    is: 'offline',
    then: Yup.string().oneOf(regionValues).required('분야를 선택해주세요.'),
    otherwise: Yup.string(),
  }),
  numberOfRecruits: Yup.string()
    .oneOf(recruitsNumberValues)
    .required('인원을 선택해주세요.'),
  description: Yup.string()
    .trim()
    .max(1000, '1,000자를 넘을 수 없습니다.')
    .min(10, '최소 10자 이상입니다.')
    .required('스터디 내용을 입력해주세요.'),
});

function StudyCreateFormContainer() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [mbtiPreference, setMbtiPreference] = useState(true);
  const [mbtiCheckedList, setMbtiCheckedList] = useState<string[]>([]);
  const [imageSrc, setImageSrc] = useState<File | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<string>('');
  const [fileErrorMessage, setFileErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onMbtiSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedMbti = e.target.value;
    if (mbtiCheckedList.indexOf(checkedMbti) > -1) {
      setMbtiCheckedList(
        mbtiCheckedList.filter((mbti) => mbti !== checkedMbti),
      );
    } else {
      setMbtiCheckedList([...mbtiCheckedList, checkedMbti]);
    }
  };

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

  const getStartDate = (value: string) => {
    setStartDate(value);
  };
  const getEndDate = (value: string) => {
    setEndDate(value);
  };

  const createFormData = (values: formikData) => {
    const formData = new FormData();
    const { title, topic, isOnline, region, numberOfRecruits, description } =
      values;
    formData.append('title', title);
    formData.append('topic', topic);
    formData.append('isOnline', isOnline === 'online' ? 'true' : 'false');
    if (isOnline === 'offline') formData.append('region', region);
    formData.append('numberOfRecruits', numberOfRecruits);
    formData.append('startDateTime', startDate);
    formData.append('endDateTime', endDate);
    formData.append('preferredMBTIs', mbtiCheckedList.join(', '));
    if (imageSrc) formData.append('imageFile', imageSrc);
    formData.append('description', description);
    return formData;
  };

  const createStudy = async (formData: FormData) => {
    try {
      const res = await createNewStudy(formData);
      const { studyGroupId } = res;
      console.log(studyGroupId);
      navigate(`/study/${studyGroupId}`, { replace: true });
      return res;
    } catch (error) {
      console.error(error);
      dispatch(
        openAlert({
          severity: 'error',
          title: '죄송합니다',
          content: '스터디 생성에 실패했습니다.',
        }),
      );
      const { response } = error as AxiosError;
      const { data }: { data: errorType } = response as AxiosResponse;
      const { errorCode } = data;
    }
  };

  const handleClick = (values: formikData) => {
    const { title, topic, isOnline, region, numberOfRecruits, description } =
      values;
    if (
      !title ||
      !topic ||
      (isOnline === 'offline' && !region) ||
      !numberOfRecruits ||
      !description
    ) {
      dispatch(
        openAlert({
          severity: 'error',
          title: '누락된 값이 있습니다.',
          content: '다시 확인해 주세요.',
        }),
      );
    }
  };

  return (
    <Formik
      initialValues={{
        isOnline: radioValues[0].value,
        title: '',
        topic: '',
        region: '',
        numberOfRecruits: '',
        description: '',
      }}
      validationSchema={CreateSchema}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);

        const formData = createFormData(values);
        createStudy(formData);

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
            <StudyCreateWrapper>
              <Typography variant='h4'>스터디 생성</Typography>
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
              <TopicWrapper>
                <Select
                  id='topic'
                  name='topic'
                  label='분야'
                  value={values.topic}
                  options={topicOptions}
                  fullWidth={true}
                  onChange={handleChange}
                  error={touched.topic && errors.topic ? true : false}
                  helperText={touched.topic && errors.topic}
                />
              </TopicWrapper>
              <LocationWrapper>
                <RadioGroup
                  defaultValue={radioValues[0].value}
                  labels={radioValues}
                  name='isOnline'
                  value={values.isOnline}
                  row={true}
                  onChange={handleChange}
                />
                <Select
                  id='region'
                  name='region'
                  label='지역'
                  options={regionOptions}
                  value={values.region}
                  fullWidth={true}
                  onChange={handleChange}
                  error={touched.region && errors.region ? true : false}
                  helperText={touched.region && errors.region}
                  disabled={values.isOnline === 'online' ? true : false}
                />
              </LocationWrapper>
              <PeopleWrapper>
                <Select
                  id='numberOfRecruits'
                  name='numberOfRecruits'
                  label='인원'
                  options={recruitsNumberOptions}
                  value={values.numberOfRecruits}
                  fullWidth={true}
                  onChange={handleChange}
                  error={
                    touched.numberOfRecruits && Boolean(errors.numberOfRecruits)
                  }
                  helperText={
                    touched.numberOfRecruits && errors.numberOfRecruits
                  }
                />
              </PeopleWrapper>
              <RangeDatePicker
                startLabel='시작일'
                endLabel='종료일'
                getStartValue={getStartDate}
                getEndValue={getEndDate}
              />
              <MbtiWrapper>
                <MbtiHeadingWrapper>
                  <Typography variant='h5'>선호 MBTI</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value='non-preference'
                        onChange={() => {
                          setMbtiPreference(!mbtiPreference);
                        }}
                        disabled={mbtiCheckedList.length > 0 ? true : false}
                      />
                    }
                    label='선택 안함'
                  />
                </MbtiHeadingWrapper>
                <MbtiRecommend mbtis={recommendMbtis['INFJ']} />
                <MbtiSelectWrapper>
                  <MbtiSelect
                    onChange={onMbtiSelectChange}
                    disabled={mbtiPreference ? false : true}
                    limit={mbtiCheckedList.length}
                    checkedList={mbtiCheckedList}
                  />
                </MbtiSelectWrapper>
              </MbtiWrapper>
              <FileUploadWrapper>
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
              </FileUploadWrapper>
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
            </StudyCreateWrapper>
          </form>
        );
      }}
    </Formik>
  );
}

export default StudyCreateFormContainer;
