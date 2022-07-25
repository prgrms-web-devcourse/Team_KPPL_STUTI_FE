import { props } from '@src/components/MbtiTag/MbtiTag';
import { Chip } from '@mui/material';
import styled from '@emotion/styled';

const setMbtiColor = ({ mbti }: props) => {
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

export const CustomChip = styled(Chip)<props>`
  color: ${setMbtiColor};
  width: ${({ width = '80px' }) => width};
  height: ${({ height = '30px' }) => height};
  border-color: ${setMbtiColor};
`;
