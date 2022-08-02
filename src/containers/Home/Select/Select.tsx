import { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

type Option = {
  value: string;
  label: string;
};

interface Props {
  id: string;
  name: string;
  label: string;
  initialValue: string;
  options: Option[];
  fullWidth?: boolean;
  onChange: (name: string, value: string) => void;
}

function Select({
  id,
  name,
  label,
  initialValue,
  options,
  fullWidth,
  onChange,
}: Props) {
  const [value, setValue] = useState<string>(initialValue);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(name, newValue);
  };

  return (
    <TextField
      id={id}
      label={label}
      value={value}
      onChange={handleChange}
      select
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
