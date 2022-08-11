import { resolveSoa } from 'dns';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { selectUser } from '@store/slices/user';
import {
  addNewComment,
  addComment,
  changeComment,
  deleteComment,
} from '@store/slices/comment';
import { openAlert } from '@src/store/slices/flashAlert';
import { errorType } from '@src/interfaces/error';
import { Typography } from '@mui/material';
import {
  childrenCommentType,
  CommentContentsType,
  CommunityPostCommentType,
} from '@interfaces/community';
import ReplyInput, { errorHandle } from '@containers/Reply/ReplyInput';
import Reply, { inputHandle } from '@containers/Reply/Reply';
import { PostCommentContainer } from '@containers/CommunityPostListSection/CommunityPostComment/style';
import {
  createCommunityPostCommentApi,
  changeCommunityPostCommentApi,
  getCommunityPostCommentApi,
  deleteCommunityPostCommentApi,
} from '@apis/community';

interface Props {
  commentsInit: CommunityPostCommentType;
  size: number;
  postId: number;
  onCount: (commentCountType: string) => void;
}

function CommunityPostComment({ commentsInit, size, postId, onCount }: Props) {
  const dispatch = useDispatch();
  // const [newSize, setNewSize] = useState(size);

  const [commentContents, setCommentContents] = useState<any>();
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [totalElements, setTotalElements] = useState<number>(0);

  const handleInputError = useRef<errorHandle>(null);
  const handleInput = useRef<inputHandle[]>([]);
  const handleInputSub = useRef<inputHandle[]>([]);

  const state = useSelector(selectUser);
  const checkParent = (target: CommentContentsType | childrenCommentType) =>
    !!target.parentId;

  const findCommentsTargetIdIndex = (
    comments: CommentContentsType[] | childrenCommentType[],
    targetId: number | null,
  ): number => {
    return comments.findIndex(
      (comment: CommentContentsType | childrenCommentType) =>
        comment.postCommentId === targetId,
    );
  };

  useEffect(() => {
    setCommentContents(commentsInit.contents);
    setHasNext(commentsInit.hasNext);
    setTotalElements(commentsInit.totalElements);
  }, []);

  const requestComment = async (
    postId: number,
    size: number,
    lastCommentId: number,
  ) => {
    if (!state.isLogin) return;
    const res: CommunityPostCommentType = await getCommunityPostCommentApi(
      postId,
      size,
      lastCommentId,
    );
    setCommentContents([...commentContents, ...res.contents]);
    setHasNext(res.hasNext);
    setTotalElements(res.totalElements);
    // dispatch(addComment(res));
  };

  const createComment = async (
    postId: number,
    parentId: number | null,
    contents: string,
    index: number,
    isDefaultInput?: boolean,
  ) => {
    if (!state.isLogin) return;

    const res: CommentContentsType | childrenCommentType =
      await createCommunityPostCommentApi(postId, parentId, contents);
    // dispatch(addNewComment(res));

    switch (checkParent(res)) {
      case true: {
        //parent가 있는 것
        const parentIndex = findCommentsTargetIdIndex(
          commentContents,
          res.parentId,
        );

        const newCommentContents: any = commentContents.slice();
        newCommentContents[parentIndex].children = [
          res,
          ...newCommentContents[parentIndex].children,
        ];

        setCommentContents(newCommentContents);
        break;
      }
      case false: {
        //parent가 없는 것
        setCommentContents([res, ...commentContents]);
        break;
      }
    }

    onCount('UP');
    if (isDefaultInput) {
      handleInputError.current?.resetValue();
      handleInputError.current?.handleErrorFalse();
    } else {
      handleInput.current[index]?.resetValue();
      handleInput.current[index]?.handleCommentFlag();
      handleInput.current[index]?.handleErrorFalse();
    }
  };

  const editComment = async (
    postId: number,
    postCommentId: number,
    contents: string,
    index: number,
    isSub?: boolean,
  ) => {
    if (!state.isLogin) return;
    const res: CommentContentsType | childrenCommentType =
      await changeCommunityPostCommentApi(postId, postCommentId, contents);

    // dispatch(changeComment(res));
    switch (checkParent(res)) {
      case true: {
        //parent가 있는 것
        const parentIndex = findCommentsTargetIdIndex(
          commentContents,
          res.parentId,
        );

        const targetIndex = findCommentsTargetIdIndex(
          commentContents[parentIndex],
          res.postCommentId,
        );

        const newResponseCommentContents: any = { ...res };
        const newCommentContents: any = commentContents.slice();
        newCommentContents[parentIndex].children[targetIndex] =
          newResponseCommentContents;
        setCommentContents(newCommentContents);
        break;
      }
      case false: {
        //parent가 없는 것
        const targetIndex = findCommentsTargetIdIndex(
          commentContents,
          res.postCommentId,
        );

        const newCommentContents: any = commentContents.slice();
        const newResponseCommentContents: any = { ...res };
        const newCommentContentsChildren =
          commentContents[targetIndex].children.slice();

        newResponseCommentContents.children = newCommentContentsChildren;

        newCommentContents[targetIndex] = newResponseCommentContents;
        setCommentContents(newCommentContents);
      }
    }
    if (isSub) {
      handleInputSub.current[index]?.resetValue();
      handleInputSub.current[index]?.handleUpdateFlag();
      handleInputSub.current[index]?.handleErrorFalse();
    } else {
      handleInput.current[index]?.resetValue();
      handleInput.current[index]?.handleUpdateFlag();
      handleInput.current[index]?.handleErrorFalse();
    }
  };

  const removeComment = async (postId: number, postCommentId: number) => {
    if (!state.isLogin) return;

    const res: CommentContentsType | childrenCommentType =
      await deleteCommunityPostCommentApi(postId, postCommentId);
    // dispatch(deleteComment(res));

    switch (checkParent(res)) {
      case true: {
        //parent가 있는 것
        const parentIndex = findCommentsTargetIdIndex(
          commentContents,
          res.parentId,
        );
        const targetIndex = findCommentsTargetIdIndex(
          commentContents[parentIndex],
          res.postCommentId,
        );

        const newCommentContents: any = commentContents.slice();

        setCommentContents(
          newCommentContents[parentIndex].children.splice(targetIndex, 1),
        );
        break;
      }
      case false: {
        //parent가 없는 것
        const targetIndex = findCommentsTargetIdIndex(
          commentContents,
          res.postCommentId,
        );
        setCommentContents(commentContents.slice().splice(targetIndex, 1));
        break;
      }
    }
    onCount('DOWN');
  };

  return (
    <PostCommentContainer>
      <ReplyInput
        ref={handleInputError}
        isUpdate={false}
        onCreate={async (contents: string) => {
          createComment(postId, null, contents, -1, true);
        }}
      />
      {commentContents &&
        commentContents.map((content: any, index: number) => {
          const {
            postCommentId,
            profileImageUrl = '',
            nickname = '프룽이',
            contents: text = '참여하고 싶어요!',
            updatedAt = '2022-02-22 10:00:00',
            children = [],
            memberId,
          } = content;
          return (
            <Reply
              ref={(el) => el && (handleInput.current[index] = el)}
              key={content.postCommentId}
              memberId={memberId}
              profileImageUrl={profileImageUrl}
              nickname={nickname}
              contents={text}
              replies={children}
              updatedAt={updatedAt}
              onCreate={(contents: string) => {
                createComment(postId, postCommentId, contents, index);
              }}
              onUpdate={(contents: string) => {
                editComment(postId, postCommentId, contents, index);
              }}
              onDelete={() => {
                removeComment(postId, postCommentId);
              }}
            >
              {children.map((reply: any, index: any) => {
                const {
                  postCommentId,
                  profileImageUrl = '',
                  nickname = '',
                  contents = '',
                  updatedAt = '2022-02-22 10:00:00',
                } = reply;
                return (
                  <Reply
                    ref={(el) => el && (handleInputSub.current[index] = el)}
                    key={postCommentId}
                    memberId={memberId}
                    profileImageUrl={profileImageUrl}
                    nickname={nickname}
                    contents={contents}
                    updatedAt={updatedAt}
                    onUpdate={(contents: string) => {
                      editComment(postId, postCommentId, contents, index, true);
                    }}
                    onDelete={() => {
                      removeComment(postId, postCommentId);
                    }}
                  />
                );
              })}
            </Reply>
          );
        })}
      {hasNext && (
        <Typography
          color='secondary'
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            const lastQuestion = commentContents.at(-1);
            if (!lastQuestion) return;
            // const postSize = newSize + size;
            // setNewSize(postSize);

            const lastCommunityPostCommentId = lastQuestion.postCommentId;
            requestComment(postId, 3, lastCommunityPostCommentId);
          }}
        >
          댓글 {totalElements - commentContents.length}개 더 보기
        </Typography>
      )}
    </PostCommentContainer>
  );
}

export default CommunityPostComment;
