import {
  BodyWrapper,
  Description,
  CustomLinkItUrl,
} from '@src/components/StudyDetail/DetailBody/style';
import { Typography } from '@mui/material';

interface Props {
  description: string;
}

function DetailBody({ description }: Props) {
  return (
    <BodyWrapper>
      <Typography variant='h5'>세부 내용</Typography>
      <CustomLinkItUrl>
        <Description>{description}</Description>
      </CustomLinkItUrl>
    </BodyWrapper>
  );
}

export default DetailBody;
