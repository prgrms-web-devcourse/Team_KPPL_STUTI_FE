/* eslint-disable @typescript-eslint/no-empty-function */
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import {
  ReplyContainer,
  ReplyControlTypography,
  ReplyControlWrapper,
  ReplyInfoWrapper,
  ReplyProfileWrapper,
} from '@src/containers/Reply/style';
import ReplyInput, { errorHandle } from '@src/containers/Reply/ReplyInput';
import { Typography } from '@mui/material';
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

  const handleInputError = useRef<errorHandle>({
    handleErrorFalse: () => {},
    handleErrorTrue: () => {},
    resetValue: () => {},
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
  }));

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
                updateFlag && handleUpdateFlag();
              }}
              color='secondary'
            >
              답글 달기
            </ReplyControlTypography>
          )}
          <ReplyControlTypography
            color='secondary'
            onClick={() => {
              handleUpdateFlag();
              commentFlag && handleCommentFlag();
            }}
          >
            수정하기
          </ReplyControlTypography>
          <ReplyControlTypography
            color='secondary'
            onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
              e.stopPropagation();
              onDelete && onDelete();
            }}
          >
            삭제하기
          </ReplyControlTypography>
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
