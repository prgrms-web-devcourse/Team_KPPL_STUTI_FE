import React, { useState } from 'react';
import {
  ContentsWrapper,
  FeedBoxWrapper,
} from '@src/components/FeedCard/style';
import Avatar from '@mui/material/Avatar';
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import FeedTypographyButton from './FeedTypographyButton/FeedTypographyButton';
import FeedMenuIconButton from './FeedMenuIconButton/FeedMenuIconButton';

export interface BoxProps {
  margin?: string;
}

function FeedCard() {
  const [contentsOpen, setContentsOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  const handlehi = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.currentTarget);
  };

  const handleReadMore = (e: React.MouseEvent<HTMLElement>) => {
    setContentsOpen(true);
  };

  const handleLiked = (e: React.MouseEvent<HTMLElement>) => {
    //좋아요 부분
    setLiked(!liked);
    // if (liked) {
    //   //좋아요 개수 +=1;
    // } else {
    //   //좋아요 개수 -=1;
    // }
  };

  return (
    <Card sx={{ width: '608px', borderRadius: '8px' }}>
      <CardHeader
        avatar={
          <Avatar
            alt='User 1'
            src='https://picsum.photos/id/1026/200/300'
            sx={{ cursor: 'pointer' }}
          />
        }
        action={<FeedMenuIconButton />}
        title='Paeng'
        subheader='1시간전'
        sx={{ margin: '0.5rem 0 -0.5rem 0' }}
      />
      <CardContent>
        {contentsOpen ? (
          <Typography>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add
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
      <FeedBoxWrapper margin='1rem 1rem'>
        <CardMedia
          component='img'
          image='https://picsum.photos/id/1026/300'
          alt='User 1'
          sx={{
            borderRadius: '8px',
          }}
        />
      </FeedBoxWrapper>
      <CardActions disableSpacing>
        <IconButton aria-label='settings' onClick={handleLiked}>
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <FeedTypographyButton>99(좋아요수)</FeedTypographyButton>
        <FeedTypographyButton margin='0 1rem 0 auto'>
          댓글 199개
        </FeedTypographyButton>
      </CardActions>
    </Card>
  );
}

export default FeedCard;
