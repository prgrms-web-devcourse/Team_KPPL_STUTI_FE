import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { MuiProvider } from '../../styles/MuiProvider';

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

export const BasicCheckBoxes = () => {
  const colors = [
    '#007FFF',
    '#6B7280',
    '#EF4444',
    '#F59E0B',
    '#3B82F6',
    '#14B86A',
  ];
  return (
    <MuiProvider>
      <Example title='Basic CheckBoxes'>
        <Checkbox checked />
        <Checkbox />
        <Checkbox disabled />
        <Checkbox disabled checked />
      </Example>
      <Example title='Color Custom CheckBoxes'>
        {colors.map((color) => {
          return (
            <Checkbox
              checked
              key={color}
              sx={{
                color: color,
                '&.Mui-checked': {
                  color: color,
                },
              }}
            />
          );
        })}
      </Example>
      <Example title='Size Custom CheckBoxes'>
        <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} />
        <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }} />
      </Example>
      <Example title='Icon CheckBoxes'>
        <Checkbox
          icon={<StarBorderIcon />}
          checkedIcon={
            <StarIcon
              sx={{
                color: colors[0],
              }}
            />
          }
        />
      </Example>
    </MuiProvider>
  );
};

export const LabelCheckBoxes = () => {
  const [checkedList, setCheckedList] = useState([]);
  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
    } else {
      setCheckedList(checkedList.filter((element) => element !== item));
    }
  };
  return (
    <>
      <FormGroup>
        <FormControlLabel
          onChange={(e) => {
            onCheckedElement(e.target.checked, e.target.value);
          }}
          control={<Checkbox value='label 1' />}
          label='Label 1'
        />
        <FormControlLabel
          onChange={(e) => {
            onCheckedElement(e.target.checked, e.target.value);
          }}
          control={<Checkbox value='label 2' />}
          label='Label 2'
        />
        <FormControlLabel
          onChange={(e) => {
            onCheckedElement(e.target.checked, e.target.value);
          }}
          control={<Checkbox value='label 3' />}
          label='Label 3'
        />
        <FormControlLabel
          onChange={(e) => {
            onCheckedElement(e.target.checked, e.target.value);
          }}
          control={<Checkbox value='label 4' />}
          label='Label 4'
        />
        <FormControlLabel
          onChange={(e) => {
            onCheckedElement(e.target.checked, e.target.value);
          }}
          disabled
          control={<Checkbox value='disabled' />}
          label='Disabled'
        />
      </FormGroup>
      <Example title='Checked List'>
        {checkedList.map((item) => {
          return <div key={item}>{item}</div>;
        })}
      </Example>
    </>
  );
};

export const BasicDatePicker = () => {
  const [date, setDate] = useState(moment());
  return (
    <MuiProvider>
      <DatePicker
        label='date picker label name'
        value={date}
        selected={date}
        onChange={(newValue) => {
          setDate(newValue);
          console.log(newValue.format('YYYY-MM-DD hh:mm:ss'));
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </MuiProvider>
  );
};

export const StartAndEndDatePicker = () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(7, 'days'));
  let diffDays = moment.duration(startDate.diff(moment())).asDays() + 1;

  return (
    <>
      <MuiProvider>
        <div
          style={{
            display: 'flex',
            gap: 16,
          }}
        >
          <DatePicker
            label='start date picker label name'
            value={startDate}
            selected={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
              console.log(newValue.format('YYYY-MM-DD hh:mm:ss'));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            minDate={moment().add(diffDays, 'days')}
            label='end date picker label name'
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </MuiProvider>
      {startDate && (
        <Example title='시작일'>
          <div>{startDate.format('YYYY-MM-DD')}</div>
        </Example>
      )}
      {endDate && (
        <Example title='종료일'>
          <div>{endDate.format('YYYY-MM-DD')}</div>
        </Example>
      )}
    </>
  );
};
