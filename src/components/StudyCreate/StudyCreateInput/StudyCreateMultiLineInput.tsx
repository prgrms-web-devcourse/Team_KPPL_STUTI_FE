import TextField from '@mui/material/TextField';

interface Props {
  id: string;
  placeholder: string;
  fullWidth?: boolean;
  height: string;
  onChange?: () => void;
}

function StudyCreateMultiLineInput({
  id,
  placeholder,
  fullWidth = true,
  height = '600px',
  onChange,
}: Props) {
  return (
    <TextField
      id={id}
      placeholder={placeholder}
      fullWidth={fullWidth}
      inputProps={{
        style: {
          height,
        },
      }}
      onChange={onChange}
      multiline
    />
  );
}

export default StudyCreateMultiLineInput;
