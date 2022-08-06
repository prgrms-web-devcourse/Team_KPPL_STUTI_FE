import { mbtiOptions } from '@src/constants/selectOptions';
import Checkbox from '@mui/material/Checkbox';

import MbtiTag from '../../MbtiTag/MbtiTag';

import { MbtisWrapper } from './style';

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
            <MbtiTag
              key={mbti.value}
              mbti={mbti.value}
              disabled={(limit > 2 ? true : false) || disabled}
            />
          }
          checkedIcon={
            <MbtiTag key={mbti.value} mbti={mbti.value} variant='filled' />
          }
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
