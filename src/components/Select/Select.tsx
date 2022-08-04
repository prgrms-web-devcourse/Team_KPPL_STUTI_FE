import { MenuItem, TextField } from '@mui/material';

interface OptionType {
  value: string;
  label: string;
}

interface Props {
  id: string;
  label: string;
  value: string;
  options: OptionType[];
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Select({
  id,
  label,
  options,
  value,
  required,
  disabled,
  fullWidth,
  handleChange,
}: Props) {
  return (
    <TextField
      id={id}
      label={label}
      onChange={handleChange}
      value={value}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      select
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
