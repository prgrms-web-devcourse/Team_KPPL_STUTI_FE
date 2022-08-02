import React, { useState } from 'react';
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
import CommunityTypographyButton from '@containers/CommunityCard/CommunityTypographyButton/CommunityTypographyButton';
import CommunityMenuIconButton from '@containers/CommunityCard/CommunityMenuIconButton';
import {
  ContentsWrapper,
  CustomCardMedia,
} from '@containers/CommunityCard/CommunityCard.style';

interface CommunityCardType {
  postId?: number;
  memberId?: number;
  nickName: string;
  createdAt: string;
  profileImageUrl: string;
  contents: string;
  postImageUrl: string;
  totalLikes: number;
  totalComments: number;
  isliked?: boolean;
  inputRef?: any;
}
function CommunityCard({
  postId,
  nickName,
  createdAt,
  profileImageUrl,
  contents,
  postImageUrl,
  totalLikes,
  totalComments,
  inputRef,
}: CommunityCardType) {
  const [contentsOpen, setContentsOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleReadMore = (e: React.MouseEvent<HTMLElement>) => {
    setContentsOpen(true);
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
        action={<CommunityMenuIconButton />}
        title={nickName}
        subheader={createdAt}
        sx={{ paddingBottom: '0' }}
      />
      <CardContent sx={{ paddingBottom: '0' }}>
        {contentsOpen ? (
          <ContentsWrapper>
            <Typography ref={inputRef}>{contents}</Typography>
          </ContentsWrapper>
        ) : (
          <>
            <ContentsWrapper>
              <Typography ref={inputRef}>{contents}</Typography>
            </ContentsWrapper>
            <CommunityTypographyButton onClick={handleReadMore}>
              더보기
            </CommunityTypographyButton>
          </>
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
        </IconButton>
        <CommunityTypographyButton>{totalLikes}</CommunityTypographyButton>
        <CommunityTypographyButton name='댓글' margin='0 1rem 0 auto'>
          {totalComments}
        </CommunityTypographyButton>
      </CardActions>
    </Card>
  );
}

export default CommunityCard;
