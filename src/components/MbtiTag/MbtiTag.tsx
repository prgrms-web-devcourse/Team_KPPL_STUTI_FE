import { CustomChip } from './MbtiTag.style';

export interface Props {
  mbti: string;
  size?: 'small' | 'medium';
}

function MbtiTag({ mbti, size }: Props) {
  return <CustomChip label={mbti} size={size} mbti={mbti} />;
}

export default MbtiTag;
