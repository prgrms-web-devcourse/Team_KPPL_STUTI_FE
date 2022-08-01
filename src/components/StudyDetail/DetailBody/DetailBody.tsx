import {
  BodyWrapper,
  Description,
} from '@src/components/StudyDetail/DetailBody/style';
import { Typography } from '@mui/material';

interface Props {
  description: string;
}

function DetailBody({ description }: Props) {
  return (
    <BodyWrapper>
      <Typography variant='h5'>세부 내용</Typography>
      <Description>{description}</Description>
    </BodyWrapper>
  );
}

export default DetailBody;
