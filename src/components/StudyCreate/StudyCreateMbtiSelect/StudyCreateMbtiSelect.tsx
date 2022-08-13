import { Checkbox } from '@mui/material';
import { mbtiOptions } from '@constants/selectOptions';

import { MbtisWrapper } from './style';
import MbtiBox from './MbtiBox/MbtiBox';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  limit: number;
  checkedList: string[];
}

function StudyCreateMbtiSelect({
  onChange,
  disabled,
  limit,
  checkedList,
}: Props) {
  return (
    <MbtisWrapper>
      {mbtiOptions.map((mbti) => (
        <Checkbox
          onChange={onChange}
          key={mbti.value}
          value={mbti.value}
          icon={
            <MbtiBox
              mbti={mbti.value}
              disabled={(limit > 2 ? true : false) || disabled}
            />
          }
          checkedIcon={<MbtiBox mbti={mbti.value} filled />}
          disabled={
            (limit > 2 && !checkedList.includes(mbti.value)) || disabled
          }
          disableRipple
        />
      ))}
    </MbtisWrapper>
  );
}

export default StudyCreateMbtiSelect;
