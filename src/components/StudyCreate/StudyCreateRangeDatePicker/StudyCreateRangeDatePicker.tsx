import { useEffect, useState } from 'react';
import moment from 'moment';
import { DatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';

import { RangeDatePickerWRapper } from './style';

interface Props {
  startLabel: string;
  endLabel: string;
  getStartValue: (value: string) => void;
  getEndValue: (value: string) => void;
  disabled?: boolean;
}

function StudyCreateRangeDatePicker({
  startLabel,
  endLabel,
  getStartValue,
  getEndValue,
  disabled,
}: Props) {
  const [startDate, setStartDate] = useState(moment().add(1, 'days'));
  const [endDate, setEndDate] = useState(moment().add(7, 'days'));
  const diffDays = moment.duration(startDate.diff(moment())).asDays() + 1;

  useEffect(() => {
    getStartValue(startDate.format('YYYY-MM-DD HH:mm:ss'));
  }, [startDate]);
  useEffect(() => {
    getEndValue(endDate.format('YYYY-MM-DD HH:mm:ss'));
  }, [endDate]);

  return (
    <RangeDatePickerWRapper>
      <DatePicker
        label={startLabel}
        value={startDate}
        onChange={(newValue) => {
          if (newValue) {
            const flag =
              moment(newValue).isAfter(endDate) ||
              newValue.format('YYYY-MM-DD') === endDate.format('YYYY-MM-DD');
            if (flag) setEndDate(moment(newValue).add(7, 'days'));
            setStartDate(newValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            onKeyDown={(e) => {
              e.preventDefault();
              return false;
            }}
            {...params}
          />
        )}
        disabled={disabled}
      />
      <DatePicker
        minDate={moment().add(diffDays, 'days')}
        label={endLabel}
        value={endDate}
        onChange={(newValue) => {
          if (newValue) {
            setEndDate(newValue);
          }
        }}
        disablePast
        renderInput={(params) => (
          <TextField
            onKeyDown={(e) => {
              e.preventDefault();
              return false;
            }}
            {...params}
          />
        )}
        disabled={disabled}
      />
    </RangeDatePickerWRapper>
  );
}

export default StudyCreateRangeDatePicker;
