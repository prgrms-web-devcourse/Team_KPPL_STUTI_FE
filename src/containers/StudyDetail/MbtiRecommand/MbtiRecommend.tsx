import { Typography } from '@mui/material';
import { MbtiTag } from '@components';

interface Props {
  preferredMbtis: string[];
}

function MbtiRecommend({ preferredMbtis }: Props) {
  return (
    <div>
      <Typography variant='h5'>추천 MBTI</Typography>
      {preferredMbtis.map((mbti, index) => (
        <MbtiTag key={`${mbti}-${index}`} mbti={mbti} />
      ))}
    </div>
  );
}

export default MbtiRecommend;
