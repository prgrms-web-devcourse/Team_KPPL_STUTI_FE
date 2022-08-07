import { FilledMbtiBox, OutlinedMbtiBox } from './style';

interface Props {
  mbti: string;
  filled?: boolean;
  disabled?: boolean;
}

function MbtiBox({ mbti, filled, disabled }: Props) {
  if (filled) return <FilledMbtiBox mbti={mbti}>{mbti}</FilledMbtiBox>;
  else {
    return (
      <OutlinedMbtiBox mbti={mbti} disabled={disabled}>
        {mbti}
      </OutlinedMbtiBox>
    );
  }
}

export default MbtiBox;
