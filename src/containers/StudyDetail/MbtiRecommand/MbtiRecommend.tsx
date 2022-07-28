import {
  MbtiRecommandContainer,
  MbtiTagWrapper,
} from '@src/containers/StudyDetail/MbtiRecommand/style';
import { Typography } from '@mui/material';
import { MbtiTag } from '@components';

interface Props {
  preferredMbtis: string[];
}

function MbtiRecommend({ preferredMbtis }: Props) {
  return (
    <MbtiRecommandContainer>
      <Typography variant='h5'>추천 MBTI</Typography>
      <MbtiTagWrapper>
        {preferredMbtis.map((mbti, index) => (
          <MbtiTag key={`${mbti}-${index}`} mbti={mbti} size='small' />
        ))}
      </MbtiTagWrapper>
    </MbtiRecommandContainer>
  );
}

export default MbtiRecommend;
