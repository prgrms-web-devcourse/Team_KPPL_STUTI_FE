import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import {
  ReplyContainer,
  ReplyControlTypography,
  ReplyControlWrapper,
  ReplyInfoWrapper,
  ReplyProfileWrapper,
} from '@src/containers/Reply/style';
import ReplyInput from '@src/containers/Reply/ReplyInput';
import { Avatar, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { childrenQuestionType } from '@interfaces/studyDetailQuestion';
import { DefaultAvatar } from '@components';

interface Props {
  profileImageUrl: string;
  nickname: string;
  contents: string;
  updatedAt: string;
  replies?: childrenQuestionType[];
  children?: JSX.Element | JSX.Element[];
}

function Reply({
  profileImageUrl,
  nickname,
  contents,
  updatedAt,
  replies,
  children,
}: Props) {
  const [commentFlag, setCommentFlag] = useState(false);

  const handleCommentFlag = () => {
    setCommentFlag(!commentFlag);
  };

  return (
    <ReplyContainer>
      <ReplyProfileWrapper>
        {typeof profileImageUrl === 'string' && profileImageUrl ? (
          <DefaultAvatar src={profileImageUrl} alt='profile-image' />
        ) : (
          <DefaultAvatar>
            <PersonIcon />
          </DefaultAvatar>
        )}
      </ReplyProfileWrapper>
      <ReplyInfoWrapper>
        <Typography variant='h6'>{nickname}</Typography>
        <div>{contents}</div>
        <ReplyControlWrapper>
          <Typography color='secondary'>
            {moment(updatedAt, 'YYYY-MM-DD hh:mm:ss').fromNow()}
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
