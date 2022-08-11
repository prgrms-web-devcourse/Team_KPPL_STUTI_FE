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
import { selectUser } from '@store/slices/user';
import { setComment, selectComment, resetComment } from '@store/slices/comment';
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
import {
  CommunityPostType,
  CommunityPostCommentType,
  CommentContentsType,
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
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [liked, setLiked] = useState({ check: false, count: 0 });
  const [isExpand, setIsExpand] = useState<string | number>('none');
  const [onCommentOpen, setOnCommentOpen] = useState(false);
  const [commentsInit, setCommentsInit] = useState<any>();
  const contentsRef = useRef<HTMLInputElement>(null);

  // const dispatch = useDispatch();
  // const postComments = useSelector(selectComment);
  const state = useSelector(selectUser);

  const checkLoginAndUser = () => state.isLogin && state.user;
  const checkLikedMembers = () => likedMembers.includes(state.user?.id as any);

  useLayoutEffect(() => {
    checkLiked();
    setCommentCount(totalPostComments);
    if (contentsRef.current) {
      const contentsHeight = contentsRef.current.getBoundingClientRect().height;
      setIsExpand(contentsHeight > 96 ? 4 : 'none');
    }
  }, []);

  const checkLiked = () => {
    switch (true) {
      case checkLoginAndUser() && checkLikedMembers():
        setLiked({ check: true, count: likedMembers.length });
        break;
      case checkLoginAndUser() && !checkLikedMembers():
        setLiked({ check: false, count: likedMembers.length });
        break;
      default:
        setLiked({ check: false, count: likedMembers.length });
        break;
    }
  };

  const handleLiked = async (e: React.MouseEvent<HTMLElement>) => {
    if (!state.isLogin) return;
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
    setCommentLoading(true);
    const res: CommunityPostCommentType = await getCommunityPostCommentApi(
      postId,
      3,
    );
    // dispatch(setComment(res));
    setCommentsInit(res);
    setOnCommentOpen(!onCommentOpen);
    setCommentLoading(false);
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
            memberId={memberId}
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
            size={3}
            postId={postId}
            onCount={handleCommentCount}
          />
        </CommunityPostCommentWrapper>
      )}
    </Card>
  );
});

export default CommunityPost;
