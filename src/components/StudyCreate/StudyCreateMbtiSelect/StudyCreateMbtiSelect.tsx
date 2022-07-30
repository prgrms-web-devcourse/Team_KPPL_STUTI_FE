import Checkbox from '@mui/material/Checkbox';

import MbtiTag from '../../MbtiTag/MbtiTag';

import { MbtisWrapper } from './style';

const mbtisList = [
  'INFP',
  'INFJ',
  'INTP',
  'INTJ',
  'ISTJ',
  'ISTP',
  'ISFJ',
  'ISFP',
  'ENFP',
  'ENTP',
  'ENFJ',
  'ENTJ',
  'ESFP',
  'ESFJ',
  'ESTP',
  'ESTJ',
];
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
      {mbtisList.map((mbti) => (
        <Checkbox
          onChange={onChange}
          key={mbti}
          value={mbti}
          icon={
            <MbtiTag
              key={mbti}
              mbti={mbti}
              disabled={(limit > 2 ? true : false) || disabled}
            />
          }
          checkedIcon={<MbtiTag key={mbti} mbti={mbti} variant='filled' />}
          disabled={(limit > 2 && !checkedList.includes(mbti)) || disabled}
        />
      ))}
    </MbtisWrapper>
  );
}

export default StudyCreateMbtiSelect;
