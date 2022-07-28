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
  row?: boolean;
  onChange?: () => void;
}

function StudyCreateRadioGroup({
  defaultValue,
  labels,
  name,
  row,
  onChange,
}: Props) {
  return (
    <RadioGroup
      aria-labelledby='demo-radio-buttons-group-label'
      defaultValue={defaultValue}
      name={name}
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
