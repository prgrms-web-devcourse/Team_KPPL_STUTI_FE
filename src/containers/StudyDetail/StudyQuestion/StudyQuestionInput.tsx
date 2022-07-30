import { useState } from 'react';
import { StudyQuestionInputWrapper } from '@src/containers/StudyDetail/StudyQuestion/style';
import { Button, TextField } from '@mui/material';

function StudyQuestionInput() {
  const [value, setValue] = useState('');

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const isHaveLength = (value: string): boolean => {
    return value.length > 0 ? true : false;
  };
  return (
    <StudyQuestionInputWrapper>
      <TextField
        id='with-label'
        label='댓글을 입력하세요'
        onChange={handleInputValue}
        fullWidth
      />
      {isHaveLength(value) && <Button>확인</Button>}
    </StudyQuestionInputWrapper>
  );
}

export default StudyQuestionInput;
