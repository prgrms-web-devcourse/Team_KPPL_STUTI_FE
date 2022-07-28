import Checkbox from '@mui/material/Checkbox';

import MbtiTag from '../../MbtiTag/MbtiTag';

import { MbtisWrapper } from './style';

const setMbtiColor = (mbti: string) => {
  if (mbti === 'ISTJ') {
    return '#24a347';
  }

  if (mbti === 'ISFJ') {
    return '#41c9f4';
  }

  if (mbti === 'INFJ') {
    return '#ec5b83';
  }

  if (mbti === 'INTJ') {
    return '#754d2a';
  }

  if (mbti === 'ISTP') {
    return '#633271';
  }

  if (mbti === 'ISFP') {
    return '#8d2735';
  }

  if (mbti === 'INFP') {
    return '#fd9213 ';
  }

  if (mbti === 'INTP') {
    return '#8a8ad0 ';
  }

  if (mbti === 'ESTP') {
    return '#608ceb ';
  }

  if (mbti === 'ESFP') {
    return '#facc39 ';
  }

  if (mbti === 'ENFP') {
    return '#cf7c58 ';
  }

  if (mbti === 'ENTP') {
    return '#9ccc3c ';
  }

  if (mbti === 'ESTJ') {
    return '#9c9636 ';
  }

  if (mbti === 'ESFJ') {
    return '#f35860 ';
  }

  if (mbti === 'ENFJ') {
    return '#39b888 ';
  }

  if (mbti === 'ENTJ') {
    return '#9c1f60 ';
  }

  return '#000';
};

const mbtisList = [
  'INFP',
  'INFJ',
  'INTP',
  'INTJ',
  'ISTJ',
  'ISTP',
  'ISFJ',
  'ISFP',
  'ENFP',
  'ENTP',
  'ENFJ',
  'ENTJ',
  'ESFP',
  'ESFJ',
  'ESTP',
  'ESTJ',
];
interface Props {
  onChange: () => void;
}

function StudyCreateMbtiSelect({ onChange }: Props) {
  return (
    <MbtisWrapper>
      {mbtisList.map((mbti) => (
        <Checkbox
          onChange={onChange}
          key={mbti}
          value={mbti}
          // icon={<MbtiTag key={mbti} mbti={mbti} />}
          icon={<MbtiTag key={mbti} mbti={mbti} />}
          checkedIcon={
            <div
              key={mbti}
              style={{ color: setMbtiColor(mbti), margin: '0 2px' }}
            >
              {mbti}
            </div>
          }
        />
      ))}
    </MbtisWrapper>
  );
}

export default StudyCreateMbtiSelect;
