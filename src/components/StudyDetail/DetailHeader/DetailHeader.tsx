import {
  HeaderWrapper,
  Image,
  ImageWrapper,
} from '@src/components/StudyDetail/DetailHeader/style';
import { Typography } from '@mui/material';

interface Props {
  topic: string;
  title: string;
  imageUrl: string;
}

function DetailHeader({ topic, title, imageUrl }: Props) {
  return (
    <HeaderWrapper>
      <Typography variant='subtitle2' color='#6B7280'>
        {topic}
      </Typography>
      <Typography variant='h4'>{title}</Typography>
      <ImageWrapper>
        <Image src={imageUrl} alt='study-image' />
      </ImageWrapper>
    </HeaderWrapper>
  );
}

export default DetailHeader;
