import TextField from '@mui/material/TextField';

interface Props {
  id: string;
  label: string;
  fullWidth?: boolean;
  value?: string;
  error?: boolean;
  helperText?: string | false | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function StudyCreateLabelInput({
  id,
  label,
  fullWidth = true,
  value,
  error,
  helperText,
  onChange,
}: Props) {
  return (
    <TextField
      id={id}
      label={label}
      fullWidth={fullWidth}
      value={value}
      error={error}
      helperText={helperText}
      onChange={onChange}
    />
  );
}

export default StudyCreateLabelInput;
