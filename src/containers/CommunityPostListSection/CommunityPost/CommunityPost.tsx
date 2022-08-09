import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, {
  useState,
  useRef,
  useLayoutEffect,
  forwardRef,
  useEffect,
} from 'react';
import moment from 'moment';
import { AxiosError, AxiosResponse } from 'axios';
import { setComment } from '@store/slices/comment';
import { selectComment } from '@src/store/slices/comment';
import { errorType } from '@src/interfaces/error';
import Avatar from '@mui/material/Avatar';
import {
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Box,
  CardActions,
  Card,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  CommunityPostType,
  CommunityPostCommentType,
} from '@interfaces/community';
import CommunityPostTypographyButton from '@containers/CommunityPostListSection/CommunityPostTypographyButton/CommunityPostTypographyButton';
import CommunityPostMenuIconButton from '@containers/CommunityPostListSection/CommunityPost/CommunityPostMenuIconButton';
import {
  ContentsWrapper,
  CommunityPostCommentWrapper,
  CustomCardMedia,
} from '@containers/CommunityPostListSection/CommunityPost/CommunityPost.style';
import {
  postCommunityPostLikeApi,
  deleteCommunityPostLikeApi,
  getCommunityPostCommentApi,
} from '@apis/community';

import CommunityPostComment from '../CommunityPostComment/CommunityPostComment';

const CommunityPost = forwardRef<any, CommunityPostType>(function CommunityPost(
  {
    postId,
    memberId,
    nickname,
    updatedAt,
    profileImageUrl,
    contents,
    postImageUrl,
    likedMembers,
    totalPostComments,
  },
  ref,
) {
  const [liked, setLiked] = useState({ check: false, count: 0 });
  const [isExpand, setIsExpand] = useState<string | number>('none');
  const [isComment, setIsComment] = useState(false);
  const [commentsError, setCommentsError] = useState(false);

  const contentsRef = useRef<HTMLInputElement>(null);
  const postComments = useSelector(selectComment);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    //로그인 한 값이 likedMembers.includes(로그인한 ID)면
    setLiked({ check: true, count: likedMembers.length });
    if (contentsRef.current) {
      const contentsHeight = contentsRef.current.getBoundingClientRect().height;
      setIsExpand(contentsHeight > 96 ? 4 : 'none');
    }
  }, []);

  useEffect(() => {
    if (!commentsError) return;

    const timeOutId = setTimeout(() => {
      setCommentsError(false);
    }, 2000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [commentsError]);

  const handleLiked = async (e: React.MouseEvent<HTMLElement>) => {
    if (liked.check) {
      setLiked({ check: !liked.check, count: (liked.count -= 1) });
      await deleteCommunityPostLikeApi(postId);
    } else {
      setLiked({ check: !liked.check, count: (liked.count += 1) });
      await postCommunityPostLikeApi(postId);
    }
  };

  const handleOpenComment = async () => {
    setIsComment(!isComment);
    setCommentsError(false);
    try {
      const res: CommunityPostCommentType = await getCommunityPostCommentApi(
        postId,
        5,
      );
      dispatch(setComment(res));
    } catch (error) {
      setCommentsError(true);
      console.error(error);
      const { response } = error as AxiosError;
      const { data }: { data: errorType } = response as AxiosResponse;
      const { errorCode } = data;
    }
  };

  return (
    <Card ref={ref}>
      <CardHeader
        avatar={
          <Avatar
            alt='User 1'
            src={profileImageUrl}
            sx={{ cursor: 'pointer' }}
            component={Link}
            to={`/user/${memberId}`}
          />
        }
        action={
          <CommunityPostMenuIconButton
            postId={postId}
            nickname={nickname}
            profileImageUrl={profileImageUrl}
            contents={contents}
            postImageUrl={postImageUrl}
          />
        }
        title={
          <Typography
            variant='h5'
            component={Link}
            to={`/user/${memberId}`}
            sx={{ cursor: 'pointer' }}
          >
            {nickname}
          </Typography>
        }
        subheader={moment(updatedAt, 'YYYY-MM-DD hh:mm:ss').fromNow()}
        sx={{ paddingBottom: '0' }}
      />
      <CardContent sx={{ paddingBottom: '0' }}>
        <ContentsWrapper maxLine={isExpand}>
          <Typography ref={contentsRef}>{contents}</Typography>
        </ContentsWrapper>
        {isExpand !== 'none' && (
          <CommunityPostTypographyButton onClick={() => setIsExpand('none')}>
            더보기
          </CommunityPostTypographyButton>
        )}
      </CardContent>
      {postImageUrl && (
        <Box sx={{ margin: '1rem 1rem 0' }}>
          <CustomCardMedia
            component='img'
            image={postImageUrl}
            alt='postImage'
            sx={{ height: '21rem' }}
          />
        </Box>
      )}
      <CardActions disableSpacing>
        <IconButton aria-label='settings' onClick={handleLiked}>
          {liked.check ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <CommunityPostTypographyButton>
          {liked.count}
        </CommunityPostTypographyButton>
        <CommunityPostTypographyButton
          onClick={handleOpenComment}
          name='댓글'
          margin='0 1rem 0 auto'
        >
          {totalPostComments}
        </CommunityPostTypographyButton>
      </CardActions>
      {isComment && (
        <CommunityPostCommentWrapper>
          <CommunityPostComment {...postComments} size={5} postId={postId} />
        </CommunityPostCommentWrapper>
      )}
    </Card>
  );
});

export default CommunityPost;
