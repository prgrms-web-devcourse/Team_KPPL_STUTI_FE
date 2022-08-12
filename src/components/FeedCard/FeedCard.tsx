import React, { useState } from 'react';
import {
  ContentsWrapper,
  CustomCardMedia,
} from '@src/components/FeedCard/FeedCard.style';
import {
  Avatar,
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
import FeedTypographyButton from '@components/FeedCard/FeedTypographyButton/FeedTypographyButton';
import FeedMenuIconButton from '@components/FeedCard/FeedMenuIconButton/FeedMenuIconButton';

function FeedCard() {
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
            src='https://picsum.photos/id/1026/200/300' //User.image
            sx={{ cursor: 'pointer' }}
          />
        }
        action={<FeedMenuIconButton />}
        title='Paeng' //User.nickname
        subheader='1시간전' //Post 생성 시간
        sx={{ paddingBottom: '0' }}
      />
      <CardContent sx={{ paddingBottom: '0' }}>
        {contentsOpen ? (
          <Typography>
            (여기 부분에다가 post.contents) Heat oil in a (14- to 16-inch)
            paella pan or a large, deep skillet over medium-high heat. Add
            chicken, shrimp and chorizo, and cook, stirring occasionally until
            lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate
            and set aside, leaving chicken and chorizo in the pan. Add pimentón,
            bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
          </Typography>
        ) : (
          <>
            <ContentsWrapper>
              <Typography>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
              </Typography>
            </ContentsWrapper>
            <FeedTypographyButton onClick={handleReadMore}>
              더보기
            </FeedTypographyButton>
          </>
        )}
      </CardContent>
      <Box sx={{ margin: '1rem 1rem 0' }}>
        <CustomCardMedia
          component='img'
          image='https://picsum.photos/id/1026/500'
          alt='postImage'
        />
      </Box>
      <CardActions disableSpacing>
        <IconButton aria-label='settings' onClick={handleLiked}>
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <FeedTypographyButton>99(Linked number)</FeedTypographyButton>
        <FeedTypographyButton margin='0 1rem 0 auto'>
          댓글 199개(댓글 number)
        </FeedTypographyButton>
      </CardActions>
    </Card>
  );
}

export default FeedCard;
