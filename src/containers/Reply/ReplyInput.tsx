import { useState } from 'react';
import { ReplyInputWrapper } from '@src/containers/Reply/style';
import { Button, TextField } from '@mui/material';

function ReplyInput() {
  const [value, setValue] = useState('');

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const isHaveLength = (value: string): boolean => {
    return value.length > 0 ? true : false;
  };
  return (
    <ReplyInputWrapper>
      <TextField
        id='with-label'
        label='댓글을 입력하세요'
        onChange={handleInputValue}
        fullWidth
      />
      {isHaveLength(value) && <Button>확인</Button>}
    </ReplyInputWrapper>
  );
}

export default ReplyInput;
