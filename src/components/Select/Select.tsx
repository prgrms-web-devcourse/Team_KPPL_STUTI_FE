import { MenuItem, TextField } from '@mui/material';

interface OptionType {
  value: string;
  label: string;
}

interface Props {
  id?: string;
  name?: string;
  label: string;
  value: string;
  options: OptionType[];
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string | false | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: React.ChangeEvent<any>) => void;
}

function Select({
  id,
  name,
  label,
  options,
  value,
  required,
  disabled,
  fullWidth,
  error,
  helperText,
  onChange,
}: Props) {
  return (
    <TextField
      id={id}
      name={name}
      label={label}
      onChange={onChange}
      value={value}
      fullWidth={fullWidth}
      required={required}
      disabled={disabled}
      error={error}
      helperText={helperText}
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
