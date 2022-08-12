import Button from '@mui/material/Button';

interface Props {
  message: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function StudyCreateFileInput({ message, onChange, disabled }: Props) {
  return (
    <Button component='label' disabled={disabled}>
      {message}
      <input
        hidden
        type='file'
        accept='image/jpg,image/png,image/jpeg,image/gif'
        name='study-image'
        onChange={onChange}
      />
    </Button>
  );
}

export default StudyCreateFileInput;
