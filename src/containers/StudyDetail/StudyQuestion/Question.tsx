import { useState } from 'react';
import {
  QuestionContainer,
  QuestionControlWrapper,
  QuestionInfoWrapper,
  QuestionProfileImage,
  QuestionProfileImageWrapper,
  QuestionProfileWrapper,
} from '@src/containers/StudyDetail/StudyQuestion/style';
import StudyQuestionInput from '@src/containers/StudyDetail/StudyQuestion/StudyQuestionInput';
import { Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { childrenQuestionType } from '@interfaces/studyDetailQuestion';

interface timeType {
  hour: number;
  minute: number;
}
interface Props {
  profileImageUrl: string;
  nickName: string;
  content: string;
  year: number;
  month: number;
  day: number;
  time?: timeType;
  replies?: childrenQuestionType[];
  children?: JSX.Element | JSX.Element[];
}

function Question({
  profileImageUrl,
  nickName,
  content,
  year,
  month,
  day,
  time,
  replies,
  children,
}: Props) {
  const [commentFlag, setCommentFlag] = useState(false);

  const handleCommentFlag = () => {
    setCommentFlag(!commentFlag);
  };

  const changeTime = (
    year: number,
    month: number,
    day: number,
    time?: timeType,
  ) => {
    const now = new Date();

    const isOneDay =
      year === now.getFullYear() &&
      month === now.getMonth() &&
      Math.abs(now.getDay() - day) === 1;

    if (time && isOneDay) {
      const isSameHour = time.hour === now.getHours();
      const isSameMinute = time.minute === now.getMinutes();

      if (isSameMinute) {
        return '방금 전';
      } else if (isSameHour) {
        return `${now.getMinutes() - time.minute}분 전`;
      } else {
        return `${now.getHours() - time.hour}시간 전`;
      }
    } else {
      return `${year}년 ${month}월 ${day}일`;
    }
  };

  return (
    <QuestionContainer>
      <QuestionProfileWrapper>
        {typeof profileImageUrl === 'string' && profileImageUrl ? (
          <QuestionProfileImageWrapper>
            <QuestionProfileImage src={profileImageUrl} alt='profile-image' />
          </QuestionProfileImageWrapper>
        ) : (
          <AccountCircleIcon fontSize='large' color='secondary' />
        )}
      </QuestionProfileWrapper>
      <QuestionInfoWrapper>
        <Typography variant='h6'>{nickName}</Typography>
        <div>{content}</div>
        <QuestionControlWrapper>
          <Typography color='secondary'>
            {changeTime(year, month, day, time)}
          </Typography>
          {replies && replies.length === 0 && (
            <Typography
              onClick={() => {
                handleCommentFlag();
              }}
              color='secondary'
            >
              답글 달기
            </Typography>
          )}
        </QuestionControlWrapper>
        {commentFlag && <StudyQuestionInput />}
        {children}
      </QuestionInfoWrapper>
    </QuestionContainer>
  );
}

export default Question;
