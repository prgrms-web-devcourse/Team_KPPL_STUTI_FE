import { ContentsWrapper } from '@src/components/FeedCard/style';
import Box from '@mui/material/Box';
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

import TypographyButton from './TypographyButton/TypographyButton';

function FeedCard() {
  return (
    <>
      <Card sx={{ width: '608px' }}>
        <CardHeader
          avatar={
            <Avatar
              alt='User 1'
              src='https://picsum.photos/id/1026/200/300'
              sx={{ cursor: 'pointer' }}
            />
          }
          action={
            <IconButton aria-label='settings'>
              <MoreHorizIcon />
            </IconButton>
          }
          title='Paeng'
          subheader='1시간전'
          sx={{ margin: '0.5rem 0 -0.5rem 0' }}
        />
        <CardContent>
          <ContentsWrapper>
            <Typography>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.dd rice and
              stir very gently to distribute. Top with artichokes and peppers,
              and cook without stirring, until most of the liquid is absorbed,
              15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp
              and mussels, tucking them down into the rice, and cook again
              without stirring, until mussels have opened and rice is just
              tender, 5 to 7 minutes more. (Discard any mussels that don&apos;t
              open.)
            </Typography>
          </ContentsWrapper>
          <TypographyButton>더보기</TypographyButton>
        </CardContent>
        <Box sx={{ margin: '1rem 1rem' }}>
          <CardMedia
            component='img'
            image='https://picsum.photos/id/1026/300'
            alt='User 1'
            sx={{
              borderRadius: '8px',
            }}
          />
        </Box>
        <CardActions disableSpacing>
          <IconButton aria-label='settings'>
            <FavoriteBorderIcon />
          </IconButton>
          <TypographyButton>99(좋아요수)</TypographyButton>
          <TypographyButton margin='0 1rem 0 auto'>댓글 199개</TypographyButton>
        </CardActions>
      </Card>
    </>
  );
}

export default FeedCard;
