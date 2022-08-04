import React, { useState, useRef, useLayoutEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Box,
  CardActions,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommunityPostTypographyButton from '@containers/CommunityPost/CommunityPostTypographyButton/CommunityPostTypographyButton';
import CommunityPostMenuIconButton from '@containers/CommunityPost/CommunityPostMenuIconButton';
import {
  ContentsWrapper,
  CustomCardMedia,
} from '@containers/CommunityPost/CommunityPost.style';

interface CommunityPostType {
  postId?: number;
  memberId?: number;
  nickname: string;
  createdAt: string;
  profileImageUrl: string;
  contents: string;
  postImageUrl: string;
  totalLikes: number;
  totalComments: number;
  isliked?: boolean;
}
function CommunityPost({
  postId,
  nickname,
  createdAt,
  profileImageUrl,
  contents,
  postImageUrl,
  totalLikes,
  totalComments,
}: CommunityPostType) {
  const [liked, setLiked] = useState(false);
  const [isExpand, setIsExpand] = useState<string | number>('none');
  const contentsRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (contentsRef.current) {
      const contentsHeight = contentsRef.current.getBoundingClientRect().height;
      setIsExpand(contentsHeight > 96 ? 4 : 'none');
    }
  }, []);

  const handleReadMore = () => {
    setIsExpand('none');
  };

  const handleLiked = (e: React.MouseEvent<HTMLElement>) => {
    //좋아요 부분
    setLiked(!liked);
  };

  return (
    <Card sx={{ width: '608px' }}>
      <CardHeader
        avatar={
          <Avatar
            alt='User 1'
            src={profileImageUrl}
            sx={{ cursor: 'pointer' }}
          />
        }
        action={<CommunityPostMenuIconButton />}
        title={nickname}
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
      <Box sx={{ margin: '1rem 1rem 0' }}>
        <CustomCardMedia
          component='img'
          image={postImageUrl}
          alt='postImage'
          sx={{ height: '21rem' }}
        />
      </Box>
      <CardActions disableSpacing>
        <IconButton aria-label='settings' onClick={handleLiked}>
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          {/* 개수가 0이면 출력 x */}
        </IconButton>
        <CommunityPostTypographyButton>
          {totalLikes}
        </CommunityPostTypographyButton>
        <CommunityPostTypographyButton name='댓글' margin='0 1rem 0 auto'>
          {totalComments}
        </CommunityPostTypographyButton>
        {/* 개수가 0이면 출력 x */}
      </CardActions>
    </Card>
  );
}

export default CommunityPost;
