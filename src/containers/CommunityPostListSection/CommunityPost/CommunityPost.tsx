import { Link } from 'react-router-dom';
import React, { useState, useRef, useLayoutEffect } from 'react';
import CommunityPostTypographyButton from '@src/containers/CommunityPostListSection/CommunityPostTypographyButton/CommunityPostTypographyButton';
import CommunityPostMenuIconButton from '@src/containers/CommunityPostListSection/CommunityPost/CommunityPostMenuIconButton';
import {
  ContentsWrapper,
  CustomCardMedia,
  CustomCard,
} from '@src/containers/CommunityPostListSection/CommunityPost/CommunityPost.style';
import Avatar from '@mui/material/Avatar';
import {
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Box,
  CardActions,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CommunityPostType } from '@interfaces/community';
import {
  postCommunityPostLikeApi,
  deleteCommunityPostLikeApi,
} from '@apis/community';

function CommunityPost({
  postId,
  memberId,
  nickname,
  mbti,
  createdAt,
  profileImageUrl,
  contents,
  postImageUrl,
  totalLikes,
  totalComments,
  isliked,
  lastPost,
}: CommunityPostType) {
  const [liked, setLiked] = useState({ check: false, count: 0 });
  const [isExpand, setIsExpand] = useState<string | number>('none');
  const contentsRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    setLiked({ check: isliked, count: totalLikes });
    if (contentsRef.current) {
      const contentsHeight = contentsRef.current.getBoundingClientRect().height;
      setIsExpand(contentsHeight > 96 ? 4 : 'none');
    }
    console.log(lastPost);
  }, []);

  const handleReadMore = () => {
    setIsExpand('none');
  };

  const handleLiked = async (e: React.MouseEvent<HTMLElement>) => {
    //좋아요 부분

    if (liked.check) {
      setLiked({ ...liked, count: (liked.count -= 1) });
      await deleteCommunityPostLikeApi(`communityurl${postId}`);
    } else {
      setLiked({ ...liked, count: (liked.count += 1) });
      await postCommunityPostLikeApi(`communityurl${postId}/like`);
    }
    setLiked({ ...liked, check: !liked.check });
  };

  return (
    <CustomCard margin={lastPost === true ? '1rem 1rem 0' : '1rem 1rem 1.5rem'}>
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
          />
        }
        title={
          <Typography
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
          <CommunityPostTypographyButton onClick={handleReadMore}>
            더보기
          </CommunityPostTypographyButton>
        )}
      </CardContent>
      {profileImageUrl && (
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
          {/* 개수가 0이면 출력 x */}
        </IconButton>
        <CommunityPostTypographyButton>
          {liked.count}
        </CommunityPostTypographyButton>
        <CommunityPostTypographyButton name='댓글' margin='0 1rem 0 auto'>
          {totalComments}
        </CommunityPostTypographyButton>
        {/* 개수가 0이면 출력 x */}
      </CardActions>
    </CustomCard>
  );
}

export default CommunityPost;
