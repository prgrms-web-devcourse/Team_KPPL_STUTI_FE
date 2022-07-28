import StudyCreateRadioGroup from './StudyCreateRadioGroup';

export default {
  title: 'Components/StudyCreate',
  component: StudyCreateRadioGroup,
};

const Template = (args) => <StudyCreateRadioGroup {...args} />;

const labels = [
  {
    value: 'offline',
    label: '오프라인',
  },
  {
    value: 'online',
    label: '온라인',
  },
];

export const RadioGroup = Template.bind({});
RadioGroup.args = {
  defaultValue: labels[0].value,
  labels,
  name: 'study-type',
  row: true,
};
