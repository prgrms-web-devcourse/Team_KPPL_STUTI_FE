import { Props } from '@src/components/MbtiTag/MbtiTag';
import { Chip } from '@mui/material';
import styled from '@emotion/styled';
const setMbtiColor = ({ mbti }: Props) => {
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
const setMbtiBorderColor = (props: Props) => {
  const color = setMbtiColor(props);
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5), 16);
  return `rgba(${r}, ${g}, ${b}, 0.5)`;
};
export const CustomChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'cursor',
})<Props>`
  color: ${({ variant }) => (variant === 'filled' ? '#fff' : setMbtiColor)};
  border-color: ${setMbtiBorderColor};
  background: ${({ variant }) => (variant === 'filled' ? setMbtiColor : '')};
  cursor: ${({ cursor = false }) => (cursor ? 'pointer' : 'default')};
`;
