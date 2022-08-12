/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { openAlert } from '@store/slices/flashAlert';
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
  postId: number;
  onCount: (commentCountType: string) => void;
}

function CommunityPostComment({ commentsInit, postId, onCount }: Props) {
  const dispatch = useDispatch();

  const [commentContents, setCommentContents] = useState<any>();
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [totalElements, setTotalElements] = useState<number>(0);

  const handleInputError = useRef<errorHandle>(null);
  const handleInput = useRef<inputHandle[]>([]);
  const handleInputSub = useRef<inputHandle[]>([]);

  useEffect(() => {
    setCommentContents(commentsInit.contents);
    setHasNext(commentsInit.hasNext);
    setTotalElements(commentsInit.totalElements);
  }, []);

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

  const requestComment = async (
    postId: number,
    size: number,
    lastCommentId: number,
  ) => {
    try {
      const res: CommunityPostCommentType = await getCommunityPostCommentApi(
        postId,
        size,
        lastCommentId,
      );
      setCommentContents([...commentContents, ...res.contents]);
      setHasNext(res.hasNext);
      setTotalElements(res.totalElements);
    } catch (e) {
      console.error(e);
      dispatch(
        openAlert({
          severity: 'error',
          title: '죄송합니다',
          content: '질문을 요청하는데에 실패했습니다.',
        }),
      );
    }
  };

  const createComment = async (
    postId: number,
    parentId: number | null,
    contents: string,
    index: number,
    isDefaultInput?: boolean,
  ) => {
    try {
      const res: CommentContentsType | childrenCommentType =
        await createCommunityPostCommentApi(postId, parentId, contents);

      switch (checkParent(res)) {
        case true: {
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
          const newResponseCommentContents = { ...res, children: [] };
          const newCommentContents = [
            newResponseCommentContents,
            ...commentContents,
          ];
          setCommentContents(newCommentContents);
          onCount('UP');
          break;
        }
      }

      setTotalElements(totalElements + 1);
      if (isDefaultInput) {
        handleInputError.current?.resetValue();
        handleInputError.current?.handleErrorFalse();
      } else {
        handleInput.current[index]?.resetValue();
        handleInput.current[index]?.handleCommentFlag();
        handleInput.current[index]?.handleErrorFalse();
      }
    } catch (e) {
      console.error(e);
      dispatch(
        openAlert({
          severity: 'error',
          title: '죄송합니다',
          content: '질문을 생성하는데에 실패했습니다.',
        }),
      );
    }
  };

  const editComment = async (
    postId: number,
    postCommentId: number,
    contents: string,
    index: number,
    isSub?: boolean,
  ) => {
    try {
      const res: CommentContentsType | childrenCommentType =
        await changeCommunityPostCommentApi(postId, postCommentId, contents);

      switch (checkParent(res)) {
        case true: {
          const parentIndex = findCommentsTargetIdIndex(
            commentContents,
            res.parentId,
          );

          const targetIndex = findCommentsTargetIdIndex(
            commentContents[parentIndex].children,
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
          const targetIndex = findCommentsTargetIdIndex(
            commentContents,
            res.postCommentId,
          );

          const newCommentContents: any = commentContents.slice();
          const newResponseCommentContents: any = { ...res };
          const newCommentContentsChildren =
            commentContents[targetIndex].children?.slice() || [];

          newResponseCommentContents.children = newCommentContentsChildren;
          newResponseCommentContents.children.push();
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
    } catch (e) {
      console.error(e);
      dispatch(
        openAlert({
          severity: 'error',
          title: '죄송합니다',
          content: '질문을 수정하는데에 실패했습니다.',
        }),
      );
    }
  };

  const removeComment = async (postId: number, postCommentId: number) => {
    try {
      const res: CommentContentsType | childrenCommentType =
        await deleteCommunityPostCommentApi(postId, postCommentId);

      switch (checkParent(res)) {
        case true: {
          const parentIndex = findCommentsTargetIdIndex(
            commentContents,
            res.parentId,
          );

          const newCommentContents: any = commentContents.slice();
          const newCommentContentsChildren = commentContents[
            parentIndex
          ].children
            ?.slice()
            .filter(
              (childrenComment: any) =>
                childrenComment.postCommentId !== res.postCommentId,
            );

          newCommentContents[parentIndex].children = newCommentContentsChildren;
          setCommentContents(newCommentContents);
          break;
        }
        case false: {
          const newCommentContents = commentContents
            .slice()
            .filter(
              (commentContent: any) =>
                commentContent.postCommentId !== res.postCommentId,
            );
          setCommentContents(newCommentContents);
          onCount('DOWN');
          break;
        }
      }
    } catch (e) {
      console.error(e);
      dispatch(
        openAlert({
          severity: 'error',
          title: '죄송합니다',
          content: '질문을 삭제하는데에 실패했습니다.',
        }),
      );
    }
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
      {commentContents?.map((content: any, index: number) => {
        const {
          postCommentId,
          profileImageUrl,
          nickname,
          contents: text,
          updatedAt,
          children,
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
            {children?.map((reply: any, index: any) => {
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
