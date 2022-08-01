import React, { useEffect, useState } from 'react';
import {
  MultiLineInput,
  LabelInput,
  FileInput,
} from '@src/components/StudyCreate&Edit';
import { fetchStudyDetails } from '@src/apis/fetchStudyDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {
  StudyEditHeading,
  StudyEditWrapper,
  StudyEditImageWrapper,
  ImageWrapper,
  ButtonWrapper,
  StudyDescriptionWrapper,
} from './style';

function StudyEditForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState<File | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<string>('');

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
      alert('첨부 파일은 최대 1MB 입니다.');
      return;
    }

    setImageSrc(files[0]);
    encodeFile(files[0]);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('제목 ' + title);
    console.log('이미지 ' + imageSrc);
    console.log('내용' + description);
  };
  return (
    <form onSubmit={onSubmit}>
      <StudyEditWrapper>
        <StudyEditHeading>
          <Typography variant='h4'>스터디 수정</Typography>
          <LabelInput
            id='study-title'
            label='스터디명'
            value={title}
            fullWidth={true}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </StudyEditHeading>
        <StudyEditImageWrapper>
          <Typography variant='h5'>대표 이미지</Typography>
          <ImageWrapper>
            {thumbnailImage && (
              <img
                src={thumbnailImage}
                alt='study-image'
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '0.5rem',
                  objectFit: 'cover',
                }}
              />
            )}
          </ImageWrapper>
          <ButtonWrapper>
            <FileInput message='이미지 업로드' onChange={onImageChange} />
          </ButtonWrapper>
        </StudyEditImageWrapper>
        <StudyDescriptionWrapper>
          <Typography variant='h5'>상세 설명</Typography>
          <MultiLineInput
            id='study-description'
            placeholder='스터디 내용을 기재해주세요.'
            value={description}
            height='600px'
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </StudyDescriptionWrapper>
        <Button type='submit'>제출</Button>
      </StudyEditWrapper>
    </form>
  );
}

export default StudyEditForm;
