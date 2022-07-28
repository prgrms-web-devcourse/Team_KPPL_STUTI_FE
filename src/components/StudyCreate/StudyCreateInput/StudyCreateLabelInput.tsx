import TextField from '@mui/material/TextField';

interface Props {
  id: string;
  label: string;
  fullWidth?: boolean;
}

function StudyCreateLabelInput({ id, label, fullWidth = true }: Props) {
  return <TextField id={id} label={label} fullWidth={fullWidth} />;
}

export default StudyCreateLabelInput;
