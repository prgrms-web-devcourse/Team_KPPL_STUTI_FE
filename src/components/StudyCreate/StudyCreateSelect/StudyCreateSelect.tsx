import React, { useState } from 'react';
import { TextField, MenuItem } from '@mui/material';

interface optionsType {
  value: string | number;
  label: string;
}

interface Props {
  id: string;
  label: string;
  fullWidth?: boolean;
  options: optionsType[];
  getValue: (value: string | number) => void;
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
