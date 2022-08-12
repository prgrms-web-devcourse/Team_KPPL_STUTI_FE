import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { ReplyInputWrapper } from '@containers/Reply/style';

interface Props {
  onCreate?: (content: string) => void;
  onUpdate?: (content: string) => void;
  isUpdate: boolean;
}

export interface errorHandle {
  handleErrorFalse: () => void;
  handleErrorTrue: () => void;
  resetValue: () => void;
  flag: boolean;
}

const ReplyInput = forwardRef<errorHandle, Props>(function ReplyInput(
  { isUpdate, onCreate, onUpdate },
  ref,
) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleErrorFalse = () => {
    setError(false);
  };

  const handleErrorTrue = () => {
    setError(true);
  };

  const resetValue = () => {
    setValue('');
  };

  useImperativeHandle(ref, () => ({
    handleErrorFalse,
    handleErrorTrue,
    resetValue,
    flag: error,
  }));

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const setHelperText = (isUpdate: boolean) => {
    return isUpdate
      ? '댓글 수정중 오류가 발생했습니다.'
      : '댓글 생성중 오류가 발생했습니다.';
  };

  const isHaveLength = (value: string): boolean => {
    return value.length > 0 ? true : false;
  };

  const requestUpdateReply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onUpdate && onUpdate(value);
  };

  const requestCreateReply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCreate && onCreate(value);
  };
  return (
    <ReplyInputWrapper>
      <TextField
        id='with-label'
        placeholder={
          isUpdate ? '수정할 내용을 입력하세요.' : '댓글을 입력하세요'
        }
        value={value}
        onChange={handleInputValue}
        fullWidth
        multiline
        {...(error && { error: true, helperText: setHelperText(isUpdate) })}
      />
      {isHaveLength(value) && (
        <>
          {isUpdate ? (
            <Button
              color={error ? 'error' : 'warning'}
              sx={{ height: '48px' }}
              onClick={requestUpdateReply}
            >
              수정
            </Button>
          ) : (
            <Button
              color={error ? 'error' : 'primary'}
              sx={{ height: '48px' }}
              onClick={requestCreateReply}
            >
              확인
            </Button>
          )}
        </>
      )}
    </ReplyInputWrapper>
  );
});

export default ReplyInput;
