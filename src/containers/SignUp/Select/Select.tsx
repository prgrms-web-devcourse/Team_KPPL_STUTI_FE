import { MenuItem, TextField } from '@mui/material';

interface OptionType {
  value: string;
  label: string;
}

interface Props {
  label: string;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
  options: OptionType[];
  value: string;
  required?: boolean;
  fullWidth?: boolean;
}

function Select({
  label,
  handleChange,
  options,
  value,
  required,
  fullWidth,
}: Props) {
  return (
    <TextField
      label={label}
      required={required}
      select
      onChange={(e) => handleChange(e.target.value)}
      value={value}
      fullWidth={fullWidth}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default Select;
