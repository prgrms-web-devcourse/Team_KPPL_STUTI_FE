import { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import { MuiProvider } from '../styles/MuiProvider';

export default {
  title: 'Input',
  component: TextField,
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['small', 'medium'],
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export const Text = (args) => (
  <MuiProvider>
    <TextField id='input' {...args} />
  </MuiProvider>
);

const Example = ({ title, children }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '16px',
    }}
  >
    <div
      style={{
        flexBasis: '160px',
      }}
    >
      {title}
    </div>
    {children}
  </div>
);

Example.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export const TextVariant = () => (
  <MuiProvider>
    <Example title='input only'>
      <TextField id='input-only' />
    </Example>

    <Example title='with label'>
      <TextField id='with-label' label='label' />
    </Example>

    <Example title='helper text'>
      <TextField id='helper-text' helperText='helper text' />
    </Example>

    <Example title='autofocus'>
      <TextField id='autofocus' autoFocus />
    </Example>

    <Example title='error'>
      <TextField id='error' error />
    </Example>

    <Example title='disabled'>
      <TextField id='disabled' disabled />
    </Example>

    <Example title='required'>
      <TextField id='required' required />
    </Example>

    <Example title='multiline'>
      <TextField id='multiline' multiline />
    </Example>
  </MuiProvider>
);

export const Select = () => {
  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  const [currency, setCurrency] = useState('EUR');
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <MuiProvider>
      <TextField
        id='outlined-select-currency'
        select
        label='Select'
        value={currency}
        onChange={handleChange}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </MuiProvider>
  );
};

export const Radios = () => (
  <MuiProvider>
    <FormControl>
      <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
      <RadioGroup
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue='female'
        name='radio-buttons-group'
      >
        <FormControlLabel value='female' control={<Radio />} label='Female' />
        <FormControlLabel value='male' control={<Radio />} label='Male' />
        <FormControlLabel value='other' control={<Radio />} label='Other' />
      </RadioGroup>
    </FormControl>
  </MuiProvider>
);

export const File = () => (
  <MuiProvider>
    <Button component='label'>
      Upload
      <input hidden accept='image/*' multiple type='file' />
    </Button>
  </MuiProvider>
);

export const DatePicker = () => <MuiProvider></MuiProvider>;
