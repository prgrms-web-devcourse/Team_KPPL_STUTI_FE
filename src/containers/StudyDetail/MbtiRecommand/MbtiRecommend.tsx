import { Typography } from '@mui/material';
import {
  MbtiRecommandContainer,
  MbtiTagWrapper,
} from '@containers/StudyDetail/MbtiRecommand/style';
import { MbtiTag } from '@components';

interface Props {
  preferredMBTIs: string[];
}

function MbtiRecommend({ preferredMBTIs }: Props) {
  return (
    <MbtiRecommandContainer>
      <Typography variant='h5'>선호 MBTI</Typography>
      <MbtiTagWrapper>
        {preferredMBTIs.map((mbti, index) => (
          <MbtiTag
            key={`${mbti}-${index}`}
            mbti={mbti}
            size='small'
            variant='filled'
          />
        ))}
      </MbtiTagWrapper>
    </MbtiRecommandContainer>
  );
}

export default MbtiRecommend;
