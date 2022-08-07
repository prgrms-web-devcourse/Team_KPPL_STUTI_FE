import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, {
  useState,
  useRef,
  useLayoutEffect,
  forwardRef,
  useEffect,
} from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { selectQuestion, setQuestions } from '@store/slices/question';
import { errorType } from '@src/interfaces/error';
import CommunityPostTypographyButton from '@src/containers/CommunityPostListSection/CommunityPostTypographyButton/CommunityPostTypographyButton';
import CommunityPostMenuIconButton from '@src/containers/CommunityPostListSection/CommunityPost/CommunityPostMenuIconButton';
import {
  ContentsWrapper,
  CustomCardMedia,
} from '@src/containers/CommunityPostListSection/CommunityPost/CommunityPost.style';
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
import { studyDetailQuestionType } from '@interfaces/studyDetailQuestion';
import { CommunityPostType } from '@interfaces/community';
import { StudyDetailStudyQuestion } from '@containers';
import { getStudyQuestionInformation } from '@apis/studyDetail';
import {
  postCommunityPostLikeApi,
  deleteCommunityPostLikeApi,
} from '@apis/community';

const CommunityPost = forwardRef<any, CommunityPostType>(function CommunityPost(
  {
    postId,
    memberId,
    nickname,
    createdAt,
    profileImageUrl,
    contents,
    postImageUrl,
    totalLikes,
    totalComments,
    isliked,
  },
  ref,
) {
  const [liked, setLiked] = useState({ check: false, count: 0 });
  const [isExpand, setIsExpand] = useState<string | number>('none');
  const [isComment, setIsComment] = useState(false);
  const [commentsError, setCommentsError] = useState(false);

  const contentsRef = useRef<HTMLInputElement>(null);
  const postComments = useSelector(selectQuestion);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setLiked({ check: isliked, count: totalLikes });
    if (contentsRef.current) {
      const contentsHeight = contentsRef.current.getBoundingClientRect().height;
      setIsExpand(contentsHeight > 96 ? 4 : 'none');
    }

    const fetchComments = async () => {
      setCommentsError(false);
      try {
        const res: studyDetailQuestionType = await getStudyQuestionInformation(
          postId,
          5,
        );
        dispatch(setQuestions(res));
      } catch (error) {
        setCommentsError(true);
        console.error(error);
        const { response } = error as AxiosError;
        const { data }: { data: errorType } = response as AxiosResponse;
        const { errorCode } = data;
      }
    };
    (async () => {
      await Promise.all([fetchComments()]);
    })();
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
      await deleteCommunityPostLikeApi(`posts/${postId}/like`);
    } else {
      setLiked({ check: !liked.check, count: (liked.count += 1) });
      await postCommunityPostLikeApi(`posts/${postId}/like`);
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
        subheader={createdAt}
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
          onClick={() => setIsComment(!isComment)}
          name='댓글'
          margin='0 1rem 0 auto'
        >
          {totalComments}
        </CommunityPostTypographyButton>
      </CardActions>
      {isComment && (
        <Box sx={{ margin: '-1.5rem 1rem 1rem' }}>
          <StudyDetailStudyQuestion
            {...postComments}
            size={5}
            study_id={postId}
          />
        </Box>
      )}
    </Card>
  );
});

export default CommunityPost;
