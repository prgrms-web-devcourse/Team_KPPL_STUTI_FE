import React, { useState } from 'react';
import {
  MbtiRecommend,
  Select,
  RangeDatePicker,
  RadioGroup,
  MbtiSelect,
  MultiLineInput,
  LabelInput,
  Heading,
  FileInput,
} from '@src/components/StudyCreate';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import {
  FileUploadWrapper,
  ImageWrapper,
  LocationWrapper,
  MbtiHeadingWrapper,
  MbtiWrapper,
  StudyCreateWrapper,
  StudyDescriptionWrapper,
} from './style';

const options = [
  {
    value: 'FRONTEND',
    label: '프론트엔드',
  },
  {
    value: 'BACKEND',
    label: '백엔드',
  },
  {
    value: 'INFRA',
    label: '인프라',
  },
  {
    value: 'IOS',
    label: 'IOS',
  },
  {
    value: 'ANDROID',
    label: '안드로이드',
  },
  {
    value: 'DATA_ANALYST',
    label: '데이터 분석가',
  },
  {
    value: 'DEVELOPER',
    label: '개발자',
  },
];
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
const locations = [
  {
    value: 'SEOUL',
    label: '서울',
  },
  {
    value: 'BUSAN',
    label: '부산',
  },
  {
    value: 'DAEGU',
    label: '대구',
  },
  {
    value: 'INCHEON',
    label: '인천',
  },
  {
    value: 'GWANGJU',
    label: '광주',
  },
  {
    value: 'DAEJEON',
    label: '대전',
  },
  {
    value: 'ULSAN',
    label: '울산',
  },
  {
    value: 'JEJU',
    label: '제주',
  },
];

const people = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 10,
    label: '10',
  },
];

function StudyCreateFormContainer() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string | number>('');
  const [location, setLocation] = useState<string | number>('');
  const [peopleNumber, setPeopleNumber] = useState<string | number>(0);
  const [isOnline, setIsOnline] = useState(true);
  const [startDate, setStartDate] = useState<string | number>('');
  const [endDate, setEndDate] = useState<string | number>('');
  const [mbtiPreference, setMbtiPreference] = useState(true);
  const [mbtiCheckedList, setMbtiCheckedList] = useState<string[]>([]);
  const [imageSrc, setImageSrc] = useState<File | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<string>('');
  const [body, setBody] = useState('');

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
    if (e.target.files && e.target.files[0]) {
      const maxSize = 1 * 1024 * 1024;
      const fileSize = e.target.files[0].size;

      if (fileSize > maxSize) {
        alert('첨부 파일은 최대 1MB 입니다.');
        return;
      }
      setImageSrc(e.target.files[0]);
      encodeFile(e.target.files[0]);
    }
  };

  const isOnlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'online') {
      setIsOnline(true);
      setLocation('');
    } else {
      setIsOnline(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('제목 ' + title);
    console.log('카테고리 ' + category);
    console.log('지역 ' + isOnline + ' ' + location);
    console.log('인원 ' + peopleNumber);
    console.log('스터디 기간 ' + startDate + '~' + endDate);
    console.log('선호 MBTI ' + mbtiCheckedList);
    console.log('이미지 ' + imageSrc);
    console.log('내용' + body);
  };

  const getCategory = (value: string | number) => {
    setCategory(value);
  };
  const getLocation = (value: string | number) => {
    setLocation(value);
  };
  const getPeopleNumber = (value: string | number) => {
    setPeopleNumber(value);
  };
  const getStartDate = (value: string | number) => {
    setStartDate(value);
  };
  const getEndDate = (value: string | number) => {
    setEndDate(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <StudyCreateWrapper>
        <Heading title='스터디 생성' variant='h4' />
        <LabelInput
          id='study-title'
          label='제목'
          fullWidth={true}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Select
          id='study-category'
          label='분야'
          fullWidth={true}
          options={options}
          getValue={getCategory}
        />
        <LocationWrapper>
          <RadioGroup
            defaultValue={radioValues[0].value}
            labels={radioValues}
            name='study-location'
            row={true}
            onChange={isOnlineChange}
          />
          <Select
            id='study-location'
            label='지역'
            fullWidth={false}
            options={locations}
            getValue={getLocation}
            disabled={isOnline ? true : false}
          />
        </LocationWrapper>
        <Select
          id='study-number-of-people'
          label='인원'
          fullWidth={true}
          options={people}
          getValue={getPeopleNumber}
        />
        <RangeDatePicker
          startLabel='시작일'
          endLabel='종료일'
          getStartValue={getStartDate}
          getEndValue={getEndDate}
        />
        <MbtiWrapper>
          <MbtiHeadingWrapper>
            <Heading title='선호 MBTI' variant='h5' />
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
          <MbtiRecommend mbtis={['INFJ', 'ISFP', 'ENFP']} />
          <MbtiSelect
            onChange={onMbtiSelectChange}
            disabled={mbtiPreference ? false : true}
            limit={mbtiCheckedList.length}
            checkedList={mbtiCheckedList}
          />
        </MbtiWrapper>
        <Heading title='대표 이미지' variant='h5' />
        <FileUploadWrapper>
          <ImageWrapper>
            {imageSrc && (
              <img src={thumbnailImage} alt='study-image' width='320' />
            )}
          </ImageWrapper>
          <FileInput message='이미지 업로드' onChange={onImageChange} />
        </FileUploadWrapper>
        <StudyDescriptionWrapper>
          <Heading title='상세 설명' variant='h5' />
          <MultiLineInput
            id='study-body'
            placeholder='스터디 내용을 기재해주세요.'
            height='600px'
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </StudyDescriptionWrapper>
        <Button type='submit'>제출</Button>
      </StudyCreateWrapper>
    </form>
  );
}

export default StudyCreateFormContainer;
