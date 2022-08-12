import { FilledMbtiBox, OutlinedMbtiBox } from './style';

interface Props {
  mbti: string;
  filled?: boolean;
  disabled?: boolean;
}

function MbtiBox({ mbti, filled, disabled }: Props) {
  return filled ? (
    <FilledMbtiBox mbti={mbti}>{mbti}</FilledMbtiBox>
  ) : (
    <OutlinedMbtiBox mbti={mbti} disabled={disabled}>
      {mbti}
    </OutlinedMbtiBox>
  );
}

export default MbtiBox;
