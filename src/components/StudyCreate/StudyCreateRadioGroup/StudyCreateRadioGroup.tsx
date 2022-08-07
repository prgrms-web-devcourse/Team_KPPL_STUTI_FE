import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

interface labelsType {
  value: string;
  label: string;
}

interface Props {
  defaultValue: string;
  labels: labelsType[];
  name: string;
  value: string;
  row?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function StudyCreateRadioGroup({
  defaultValue,
  labels,
  name,
  row,
  value,
  onChange,
}: Props) {
  return (
    <RadioGroup
      aria-labelledby='demo-radio-buttons-group-label'
      defaultValue={defaultValue}
      name={name}
      value={value}
      row={row}
      onChange={onChange}
    >
      {labels &&
        labels.map((label) => (
          <FormControlLabel
            key={label.value}
            value={label.value}
            control={<Radio />}
            label={label.label}
          />
        ))}
    </RadioGroup>
  );
}

export default StudyCreateRadioGroup;
