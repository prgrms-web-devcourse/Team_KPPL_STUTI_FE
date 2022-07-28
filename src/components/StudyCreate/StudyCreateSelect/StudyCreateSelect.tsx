import { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface optionsType {
  value: string;
  label: string;
}

interface Props {
  id: string;
  label: string;
  fullWidth?: boolean;
  options: optionsType[];
}

function StudyCreateSelect({ id, label, fullWidth = true, options }: Props) {
  const [categoryValue, setCategoryValue] = useState(options[0].value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCategoryValue(e.target.value);
  };

  return (
    <TextField
      select
      id={id}
      label={label}
      value={categoryValue}
      fullWidth={fullWidth}
      onChange={handleChange}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default StudyCreateSelect;
