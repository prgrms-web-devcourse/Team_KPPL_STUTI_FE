import Button from '@mui/material/Button';

interface Props {
  message: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function StudyCreateFileInput({ message, onChange }: Props) {
  return (
    <Button component='label'>
      {message}
      <input
        hidden
        type='file'
        accept='image/jpg,impge/png,image/jpeg,image/gif'
        name='study-image'
        onChange={onChange}
      ></input>
    </Button>
  );
}

export default StudyCreateFileInput;
