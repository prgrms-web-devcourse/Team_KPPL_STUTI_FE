/* eslint-disable @typescript-eslint/no-empty-function */
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { selectUser } from '@store/slices/user';
import { Typography, Avatar } from '@mui/material';
import { UserType } from '@interfaces/user';
import { childrenQuestionType } from '@interfaces/studyDetailQuestion';
import {
  ReplyContainer,
  ReplyControlTypography,
  ReplyControlWrapper,
  ReplyInfoWrapper,
  ReplyProfileWrapper,
} from '@containers/Reply/style';
import ReplyInput, { errorHandle } from '@containers/Reply/ReplyInput';

interface Props {
  memberId: number;
  profileImageUrl: string;
  nickname: string;
  contents: string;
  updatedAt: string;
  replies?: childrenQuestionType[];
  children?: JSX.Element | JSX.Element[];
  onUpdate?: (content: string) => void;
  onCreate?: (content: string) => void;
  onDelete?: () => void;
}

export interface inputHandle extends errorHandle {
  handleCommentFlag: () => void;
  handleUpdateFlag: () => void;
}

const Reply = forwardRef<inputHandle, Props>(function Reply(
  {
    memberId,
    profileImageUrl,
    nickname,
    contents,
    updatedAt,
    replies,
    children,
    onUpdate,
    onCreate,
    onDelete,
  }: Props,
  ref,
) {
  const [commentFlag, setCommentFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);

  type userType = {
    user: UserType;
    isLogin: boolean;
  };

  const { user, isLogin } = useSelector(selectUser) as userType;

  const isSameLoginUser = (user: UserType, memberId: number) => {
    if (!isLogin) return false;

    if (!user) return false;

    if (user.id !== memberId) return false;

    return true;
  };

  const handleInputError = useRef<errorHandle>({
    handleErrorFalse: () => {},
    handleErrorTrue: () => {},
    resetValue: () => {},
    flag: false,
  });

  const handleCommentFlag = () => {
    setCommentFlag(!commentFlag);
  };

  const handleUpdateFlag = () => {
    setUpdateFlag(!updateFlag);
  };

  useImperativeHandle(ref, () => ({
    handleErrorTrue: handleInputError.current?.handleErrorTrue,
    handleErrorFalse: handleInputError.current?.handleErrorFalse,
    resetValue: handleInputError.current?.resetValue,
    handleCommentFlag,
    handleUpdateFlag,
    flag: handleInputError.current?.flag,
  }));

  const handleCommentReply = () => {
    handleCommentFlag();
    updateFlag && handleUpdateFlag();
  };

  const handleUpdateReply = () => {
    handleUpdateFlag();
    commentFlag && handleCommentFlag();
  };

  const requestDeleteReply = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    onDelete && onDelete();
  };

  return (
    <ReplyContainer>
      <ReplyProfileWrapper>
        <Avatar
          src={profileImageUrl}
          component={Link}
          to={`/user/${memberId}`}
        />
      </ReplyProfileWrapper>
      <ReplyInfoWrapper>
        <Typography variant='h6' component={Link} to={`/user/${memberId}`}>
          {nickname}
        </Typography>
        <div>{contents}</div>
        <ReplyControlWrapper>
          <Typography color='secondary'>
            {moment(updatedAt, 'YYYY-MM-DD hh:mm:ss').fromNow()}
          </Typography>
          {isLogin && replies && (
            <ReplyControlTypography
              color='secondary'
              component='button'
              onClick={() => {
                handleCommentReply();
              }}
            >
              답글 달기
            </ReplyControlTypography>
          )}
          {isSameLoginUser(user, memberId) && (
            <>
              <ReplyControlTypography
                color='secondary'
                component='button'
                onClick={() => {
                  handleUpdateReply();
                }}
              >
                수정하기
              </ReplyControlTypography>
              <ReplyControlTypography
                color='secondary'
                component='button'
                onClick={requestDeleteReply}
              >
                삭제하기
              </ReplyControlTypography>
            </>
          )}
        </ReplyControlWrapper>
        {commentFlag && (
          <ReplyInput
            ref={handleInputError}
            onCreate={onCreate}
            onUpdate={onUpdate}
            isUpdate={false}
          />
        )}
        {updateFlag && (
          <ReplyInput
            ref={handleInputError}
            onCreate={onCreate}
            onUpdate={onUpdate}
            isUpdate={true}
          />
        )}
        {children}
      </ReplyInfoWrapper>
    </ReplyContainer>
  );
});

export default Reply;
