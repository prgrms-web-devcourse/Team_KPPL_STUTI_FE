import TextField from '@mui/material/TextField';

interface Props {
  id: string;
  label: string;
  fullWidth?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function StudyCreateLabelInput({
  id,
  label,
  fullWidth = true,
  value,
  onChange,
}: Props) {
  return (
    <TextField
      id={id}
      label={label}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      inputProps={{ maxLength: 50, minLength: 5 }}
    />
  );
}

export default StudyCreateLabelInput;
