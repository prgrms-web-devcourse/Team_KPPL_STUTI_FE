/* eslint-disable @typescript-eslint/no-explicit-any */
import { boolean } from 'yup/lib/locale';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import moment from 'moment';
import { AxiosError, AxiosResponse } from 'axios';
import { selectUser } from '@store/slices/user';
import { openAlert } from '@store/slices/flashAlert';
import {
  Avatar,
  CircularProgress,
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
import { errorType } from '@interfaces/error';
import {
  CommunityPostType,
  CommunityPostCommentType,
} from '@interfaces/community';
import CommunityPostTypographyButton from '@containers/CommunityPostListSection/CommunityPostTypographyButton/CommunityPostTypographyButton';
import CommunityPostMenuIconButton from '@containers/CommunityPostListSection/CommunityPostMenuIconButton/CommunityPostMenuIconButton';
import CommunityPostComment from '@containers/CommunityPostListSection/CommunityPostComment/CommunityPostComment';
import {
  ContentsWrapper,
  CommunityPostCommentWrapper,
  CustomCardMedia,
} from '@containers/CommunityPostListSection/CommunityPost/CommunityPost.style';
import { ItemCard } from '@components';
import {
  postCommunityPostLikeApi,
  deleteCommunityPostLikeApi,
  getCommunityPostCommentApi,
} from '@apis/community';

function CommunityPost({
  postId,
  memberId,
  nickname,
  updatedAt,
  profileImageUrl,
  contents,
  postImageUrl,
  likedMembers,
  totalPostComments,
}: CommunityPostType) {
  const [commentLoading, setCommentLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [liked, setLiked] = useState({
    check: false,
    count: 0,
  });
  const [isExpand, setIsExpand] = useState<string | number>('none');
  const [onCommentOpen, setOnCommentOpen] = useState(false);
  const [commentsInit, setCommentsInit] = useState<CommunityPostCommentType>({
    contents: [],
    hasNext: false,
    totalElements: 0,
  });

  const contentsRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector(selectUser);

  const body = contents.replaceAll('\r', '').split('\n');

  useLayoutEffect(() => {
    setCommentCount(totalPostComments);
    if (contentsRef.current) {
      const contentsHeight = contentsRef.current.getBoundingClientRect().height;
      setIsExpand(contentsHeight > 96 ? 4 : 'none');
    }
  }, []);

  useEffect(() => {
    if (isLogin && user && likedMembers.includes(user.id)) {
      setLiked({ check: true, count: likedMembers.length });
    } else {
      setLiked({ check: false, count: likedMembers.length });
    }
  }, [user, isLogin]);

  const handleLiked = async () => {
    if (!isLogin) return;
    try {
      setLikeLoading(true);
      switch (liked.check) {
        case true: {
          setLiked({ check: false, count: liked.count - 1 });
          await deleteCommunityPostLikeApi(postId);
          break;
        }
        case false: {
          setLiked({ check: true, count: liked.count + 1 });
          await postCommunityPostLikeApi(postId);
          break;
        }
      }
    } catch (e) {
      console.error(e);
      const { response } = e as AxiosError;
      const { data }: { data: errorType } = response as AxiosResponse;
      const { errorCode } = data;

      switch (errorCode) {
        case 'P002': {
          dispatch(
            openAlert({
              severity: 'error',
              title: '이미 좋아요 된 Post입니다.',
              content: '홈으로 갔다가 다시 시도해주세요!',
            }),
          );
          break;
        }
        case 'P003': {
          dispatch(
            openAlert({
              severity: 'error',
              title: 'Post의 좋아요를 찾을 수 없습니다.',
              content: '홈으로 갔다가 다시 시도해주세요!',
            }),
          );
          break;
        }
      }
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCommentCount = (commentCountType: string) => {
    switch (commentCountType) {
      case 'UP':
        setCommentCount(commentCount + 1);
        break;
      case 'DOWN':
        setCommentCount(commentCount - 1);
        break;
    }
  };

  const handleSetComment = async () => {
    try {
      setCommentLoading(true);
      const res: CommunityPostCommentType = await getCommunityPostCommentApi(
        postId,
        3,
      );
      setCommentsInit(res);
      setOnCommentOpen(!onCommentOpen);
      setCommentLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            src={profileImageUrl}
            sx={{ cursor: 'pointer' }}
            component={Link}
            to={`/user/${memberId}`}
          />
        }
        action={
          isLogin &&
          user &&
          user.id === memberId && (
            <CommunityPostMenuIconButton
              postId={postId}
              memberId={memberId}
              nickname={nickname}
              profileImageUrl={profileImageUrl}
              contents={contents}
              postImageUrl={postImageUrl}
            />
          )
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
          <Typography ref={contentsRef}>
            {body.map((content, index) => {
              if (content === '') return <br key={index} />;
              return [content, <br key={index} />];
            })}
          </Typography>
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
            sx={{ height: '21rem', borderRadius: '0.5rem' }}
          />
        </Box>
      )}
      <CardActions disableSpacing>
        <IconButton
          aria-label='settings'
          disabled={likeLoading || !isLogin}
          onClick={handleLiked}
        >
          {liked.check ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography>{liked.count}</Typography>
        <CommunityPostTypographyButton
          onClick={handleSetComment}
          name='댓글'
          margin='0 1rem 0 auto'
        >
          {commentCount}
        </CommunityPostTypographyButton>
      </CardActions>
      {commentLoading && (
        <ItemCard>
          <CircularProgress />
        </ItemCard>
      )}
      {!commentLoading && onCommentOpen && (
        <CommunityPostCommentWrapper>
          <CommunityPostComment
            commentsInit={commentsInit}
            postId={postId}
            onCount={handleCommentCount}
          />
        </CommunityPostCommentWrapper>
      )}
    </Card>
  );
}

export default CommunityPost;
