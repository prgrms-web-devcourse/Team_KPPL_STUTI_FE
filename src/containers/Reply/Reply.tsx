import { useState } from 'react';
import {
  ReplyContainer,
  ReplyControlTypography,
  ReplyControlWrapper,
  ReplyInfoWrapper,
  ReplyProfileWrapper,
} from '@src/containers/Reply/style';
import ReplyInput from '@src/containers/Reply/ReplyInput';
import { Avatar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { childrenQuestionType } from '@interfaces/studyDetailQuestion';

interface timeType {
  hour: number;
  minute: number;
}
interface Props {
  profileImageUrl: string;
  nickname: string;
  contents: string;
  year: number;
  month: number;
  day: number;
  time?: timeType;
  replies?: childrenQuestionType[];
  children?: JSX.Element | JSX.Element[];
}

function Reply({
  profileImageUrl,
  nickname,
  contents,
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
    <ReplyContainer>
      <ReplyProfileWrapper>
        {typeof profileImageUrl === 'string' && profileImageUrl ? (
          <Avatar src={profileImageUrl} alt='profile-image' />
        ) : (
          <AccountCircleIcon fontSize='large' color='secondary' />
        )}
      </ReplyProfileWrapper>
      <ReplyInfoWrapper>
        <Typography variant='h6'>{nickname}</Typography>
        <div>{contents}</div>
        <ReplyControlWrapper>
          <Typography color='secondary'>
            {changeTime(year, month, day, time)}
          </Typography>
          {replies && (
            <ReplyControlTypography
              onClick={() => {
                handleCommentFlag();
              }}
              color='secondary'
            >
              답글 달기
            </ReplyControlTypography>
          )}
          <ReplyControlTypography color='secondary'>
            수정하기
          </ReplyControlTypography>
          <ReplyControlTypography color='secondary'>
            삭제하기
          </ReplyControlTypography>
        </ReplyControlWrapper>
        {commentFlag && <ReplyInput />}
        {children}
      </ReplyInfoWrapper>
    </ReplyContainer>
  );
}

export default Reply;
