import { useState } from 'react';
import moment from 'moment';
import { DatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';

import { RangeDatePickerWRapper } from './style';

interface Props {
  startLabel: string;
  endLabel: string;
}

function StudyCreateRangeDatePicker({ startLabel, endLabel }: Props) {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(7, 'days'));
  const diffDays = moment.duration(startDate.diff(moment())).asDays() + 1;

  return (
    <RangeDatePickerWRapper>
      <DatePicker
        label={startLabel}
        value={startDate}
        onChange={(newValue) => {
          if (newValue) {
            setStartDate(newValue);
            console.log(newValue.format('YYYY-MM-DD hh:mm:ss'));
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <DatePicker
        minDate={moment().add(diffDays, 'days')}
        label={endLabel}
        value={endDate}
        onChange={(newValue) => {
          if (newValue) {
            setEndDate(newValue);
            console.log(newValue.format('YYYY-MM-DD hh:mm:ss'));
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </RangeDatePickerWRapper>
  );
}

export default StudyCreateRangeDatePicker;
