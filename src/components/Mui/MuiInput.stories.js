import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker } from '@mui/x-date-pickers';
import {
  TextField,
  RadioGroup,
  Radio,
  MenuItem,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
  Button,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export default {
  title: 'Mui/Input',
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

export const Text = (args) => <TextField id='input' {...args} />;

const Example = ({ title, children }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
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
  <>
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
  </>
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
  );
};

export const Radios = () => (
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
);

export const File = () => (
  <Button component='label'>
    Upload
    <input hidden accept='image/*' multiple type='file' />
  </Button>
);

export const BasicCheckBoxes = () => {
  return (
    <>
      <Example title='Basic CheckBoxes'>
        <Checkbox checked />
        <Checkbox />
        <Checkbox disabled />
        <Checkbox disabled checked />
      </Example>
      <Example title='Icon CheckBoxes'>
        <Checkbox icon={<StarBorderIcon />} checkedIcon={<StarIcon />} />
      </Example>
    </>
  );
};

export const LabelCheckBoxes = () => {
  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox value='label 1' />}
          label='Label 1'
        />
        <FormControlLabel
          control={<Checkbox value='label 2' />}
          label='Label 2'
        />
        <FormControlLabel
          control={<Checkbox value='label 3' />}
          label='Label 3'
        />
        <FormControlLabel
          control={<Checkbox value='label 4' />}
          label='Label 4'
        />
        <FormControlLabel
          disabled
          control={<Checkbox value='disabled' />}
          label='Disabled'
        />
      </FormGroup>
    </>
  );
};

export const BasicDatePicker = () => {
  const [date, setDate] = useState(moment());
  return (
    <DatePicker
      label='date picker label name'
      value={date}
      selected={date}
      onChange={(newValue) => {
        setDate(newValue);
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};
