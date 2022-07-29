import { CustomChip } from './MbtiTag.style';
export interface Props {
  mbti: string;
  size?: 'small' | 'medium';
  cursor?: boolean;
  variant?: 'outlined' | 'filled';
}

function MbtiTag({ mbti, size, cursor, variant }: Props) {
  return (
    <CustomChip
      label={mbti}
      size={size}
      mbti={mbti}
      cursor={cursor}
      variant={variant}
    />
  );
}

export default MbtiTag;
