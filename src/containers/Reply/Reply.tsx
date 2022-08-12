/* eslint-disable @typescript-eslint/no-empty-function */
import { useSelector } from 'react-redux';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { selectUser } from '@store/slices/user';
import {
  ReplyContainer,
  ReplyControlTypography,
  ReplyControlWrapper,
  ReplyInfoWrapper,
  ReplyProfileWrapper,
} from '@src/containers/Reply/style';
import { Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { UserType } from '@interfaces/user';
import { childrenQuestionType } from '@interfaces/studyDetailQuestion';
import ReplyInput, { errorHandle } from '@containers/Reply/ReplyInput';
import { DefaultAvatar } from '@components';

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
