import * as Yup from 'yup';
import React, { useRef, useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import {
  topicOptions,
  regionOptions,
  recruitsNumberOptions,
} from '@src/constants/selectOptions';
import {
  MbtiRecommend,
  RangeDatePicker,
  RadioGroup,
  MbtiSelect,
  MultiLineInput,
  LabelInput,
  FileInput,
} from '@src/components/StudyCreate';
import Select from '@src/components/Select/Select';
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
} from './style';

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

const CreateSchema = Yup.object({
  title: Yup.string()
    .max(50, '50자를 넘을 수 없습니다.')
    .min(5, '최소 5자 이상입니다.')
    .required('제목을 입력해주세요.'),
  description: Yup.string()
    .max(1000, '1,000자를 넘을 수 없습니다.')
    .min(10, '최소 10자 이상입니다.')
    .required('스터디 내용을 입력해주세요.'),
});

function StudyCreateFormContainer() {
  const [topic, setTopic] = useState<string>('');
  const [recruitsNumber, setRecruitsNumber] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [mbtiPreference, setMbtiPreference] = useState(true);
  const [mbtiCheckedList, setMbtiCheckedList] = useState<string[]>([]);
  const [imageSrc, setImageSrc] = useState<File | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<string>('');
  const [fileErrorMessage, setFileErrorMessage] = useState<string>('');
  const [topicErrorMessage, setTopicErrorMessage] = useState<string>('');
  const [peopleErrorMessage, setPeopleErrorMessage] = useState<string>('');
  const titleRef = useRef<null | HTMLDivElement>(null);
  const descriptionRef = useRef<null | HTMLDivElement>(null);
  const topicRef = useRef<null | HTMLDivElement>(null);
  const peopleRef = useRef<null | HTMLDivElement>(null);

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
    reader.readAsDataURL(fileBlob);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        const result = reader.result as string;
        setThumbnailImage(result);

        resolve();
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

  const isOnlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsOnline(value === 'online' ? true : false);
  };

  useEffect(() => {
    if (topic) setTopicErrorMessage('');
  }, [topic]);

  useEffect(() => {
    if (recruitsNumber) setPeopleErrorMessage('');
  }, [recruitsNumber]);

  const checkSelectOptions = () => {
    if (!topic) {
      setTopicErrorMessage('분야를 선택해주세요');
    }
    if (!recruitsNumber) {
      setPeopleErrorMessage('인원수를 선택해주세요');
    }
  };

  const handleTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTopic(value);
  };
  const handleRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRegion(value);
  };
  const handleRecruitsNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRecruitsNumber(value);
  };

  const getStartDate = (value: string) => {
    setStartDate(value);
  };
  const getEndDate = (value: string) => {
    setEndDate(value);
  };

  const createFormData = (title: string, description: string) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('topic', topic);
    formData.append('isOnline', isOnline.toString());
    formData.append('region', isOnline ? '' : region);
    formData.append('numberOfRecruits', recruitsNumber);
    formData.append('startDateTime', startDate);
    formData.append('endDateTime', endDate);
    formData.append('preferredMBTIs', JSON.stringify(mbtiCheckedList));
    formData.append('imageFile', imageSrc ? imageSrc : '');
    formData.append('description', description);
    return formData;
  };

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
      }}
      validationSchema={CreateSchema}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        const formData = createFormData(values.title, values.description);

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
            <StudyCreateWrapper>
              <Typography variant='h4'>스터디 생성</Typography>
              <InputWrapper>
                {formik.touched.title && formik.errors.title && (
                  <ErrorMessage ref={titleRef}>
                    {(() => {
                      if (titleRef.current) {
                        titleRef.current.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
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
              <TopicWrapper>
                {topicErrorMessage && (
                  <ErrorMessage ref={topicRef}>
                    {(() => {
                      if (!titleRef.current && topicRef.current) {
                        topicRef.current.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        });
                      }
                      return topicErrorMessage;
                    })()}
                  </ErrorMessage>
                )}
                <Select
                  id='topic'
                  label='분야'
                  value={topic}
                  options={topicOptions}
                  fullWidth={true}
                  handleChange={handleTopic}
                />
              </TopicWrapper>
              <LocationWrapper>
                <RadioGroup
                  defaultValue={radioValues[0].value}
                  labels={radioValues}
                  name='isOnline'
                  row={true}
                  onChange={isOnlineChange}
                />
                <Select
                  id='region'
                  label='지역'
                  options={regionOptions}
                  value={region}
                  fullWidth={true}
                  handleChange={handleRegion}
                  disabled={isOnline ? true : false}
                />
              </LocationWrapper>
              <PeopleWrapper>
                {peopleErrorMessage && (
                  <ErrorMessage ref={peopleRef}>
                    {(() => {
                      if (
                        !titleRef.current &&
                        !topicRef.current &&
                        peopleRef.current
                      ) {
                        peopleRef.current.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        });
                      }
                      return peopleErrorMessage;
                    })()}
                  </ErrorMessage>
                )}
                <Select
                  id='study-number-of-people'
                  label='인원'
                  options={recruitsNumberOptions}
                  value={recruitsNumber}
                  fullWidth={true}
                  handleChange={handleRecruitsNumber}
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
                {/*TODO : 해당 User의 추천 MBTI 로직 */}
                <MbtiRecommend mbtis={['INFJ', 'ISFP', 'ENFP']} />
                <MbtiSelect
                  onChange={onMbtiSelectChange}
                  disabled={mbtiPreference ? false : true}
                  limit={mbtiCheckedList.length}
                  checkedList={mbtiCheckedList}
                />
              </MbtiWrapper>
              <FileUploadWrapper>
                <Typography variant='h5'>대표 이미지</Typography>
                <ImageContainer>
                  {fileErrorMessage && (
                    <ErrorMessage>{fileErrorMessage}</ErrorMessage>
                  )}
                  <ImageWrapper>
                    {imageSrc ? (
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
                {formik.touched.description && formik.errors.description && (
                  <ErrorMessage ref={descriptionRef}>
                    {(() => {
                      if (
                        !titleRef.current &&
                        !topicRef.current &&
                        !peopleRef.current &&
                        descriptionRef.current
                      ) {
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
                  label='상세 설명'
                  id='description'
                  placeholder='스터디 내용을 기재해주세요.'
                  height='600px'
                  {...formik.getFieldProps('description')}
                />
              </StudyDescriptionWrapper>
              <Button
                type='submit'
                onClick={checkSelectOptions}
                disabled={formik.isSubmitting}
              >
                제출
              </Button>
            </StudyCreateWrapper>
          </form>
        );
      }}
    </Formik>
  );
}

export default StudyCreateFormContainer;
