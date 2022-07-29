import TextField from '@mui/material/TextField';

interface Props {
  id: string;
  label: string;
  fullWidth?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function StudyCreateLabelInput({
  id,
  label,
  fullWidth = true,
  onChange,
}: Props) {
  return (
    <TextField
      id={id}
      label={label}
      fullWidth={fullWidth}
      onChange={onChange}
      inputProps={{ maxLength: 12, minLength: 5 }}
    />
  );
}

export default StudyCreateLabelInput;
