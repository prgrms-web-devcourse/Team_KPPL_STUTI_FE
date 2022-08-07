import TextField from '@mui/material/TextField';

interface Props {
  id: string;
  name: string;
  placeholder: string;
  fullWidth?: boolean;
  value?: string;
  height: string;
  error?: boolean;
  helperText?: string | false | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function StudyCreateMultiLineInput({
  id,
  name,
  placeholder,
  fullWidth = true,
  value,
  height = '600px',
  error,
  helperText,
  onChange,
}: Props) {
  return (
    <TextField
      id={id}
      name={name}
      placeholder={placeholder}
      fullWidth={fullWidth}
      value={value}
      inputProps={{
        style: {
          height,
        },
      }}
      error={error}
      helperText={helperText}
      onChange={onChange}
      multiline
    />
  );
}

export default StudyCreateMultiLineInput;
