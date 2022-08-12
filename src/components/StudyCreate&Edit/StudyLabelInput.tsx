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
  disabled?: boolean;
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
  disabled,
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
      disabled={disabled}
    />
  );
}

export default StudyCreateLabelInput;
