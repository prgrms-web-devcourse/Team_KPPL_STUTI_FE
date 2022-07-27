import { CustomChip } from './MbtiTag.style';

export interface Props {
  mbti: string;
  size?: 'small' | 'medium';
  cursor?: boolean;
}

function MbtiTag({ mbti, size, cursor }: Props) {
  return <CustomChip label={mbti} size={size} mbti={mbti} cursor={cursor} />;
}

export default MbtiTag;
