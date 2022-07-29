import React, { useState } from 'react';
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
  getValue: (value: string) => void;
  disabled?: boolean;
}

function StudyCreateSelect({
  id,
  label,
  fullWidth = true,
  options,
  getValue,
  disabled,
}: Props) {
  const [categoryValue, setCategoryValue] = useState(options[0].value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCategoryValue(e.target.value);
    getValue(e.target.value);
  };

  return (
    <TextField
      select
      id={id}
      label={label}
      value={categoryValue}
      fullWidth={fullWidth}
      onChange={handleChange}
      disabled={disabled}
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
