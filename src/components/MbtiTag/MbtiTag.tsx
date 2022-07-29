import { CustomChip } from './MbtiTag.style';
export interface Props {
  mbti: string;
  size?: 'small' | 'medium';
  cursor?: boolean;
  variant?: 'outlined' | 'filled';
  disabled?: boolean;
}

function MbtiTag({ mbti, size, cursor, variant, disabled }: Props) {
  return (
    <CustomChip
      label={mbti}
      size={size}
      mbti={mbti}
      cursor={cursor}
      variant={variant}
      disabled={disabled}
    />
  );
}

export default MbtiTag;
