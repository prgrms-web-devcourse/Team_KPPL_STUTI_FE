import TextField from '@mui/material/TextField';

interface Props {
  id: string;
  name: string;
  label: string;
  fullWidth?: boolean;
  value?: string;
  error?: boolean;
  helperText?: string | false | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

function StudyCreateLabelInput({
  id,
  name,
  label,
  fullWidth = true,
  value,
  error,
  helperText,
  onChange,
  autoFocus,
}: Props) {
  return (
    <TextField
      id={id}
      name={name}
      label={label}
      fullWidth={fullWidth}
      value={value}
      error={error}
      helperText={helperText}
      onChange={onChange}
      autoFocus={autoFocus}
    />
  );
}

export default StudyCreateLabelInput;
