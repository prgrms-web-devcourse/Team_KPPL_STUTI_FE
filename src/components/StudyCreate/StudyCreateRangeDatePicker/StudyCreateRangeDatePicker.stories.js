import StudyCreateRangeDatePicker from './StudyCreateRangeDatePicker';

export default {
  title: 'Components/StudyCreate',
  component: StudyCreateRangeDatePicker,
};

const Template = (args) => <StudyCreateRangeDatePicker {...args} />;

export const RangeDatePicker = Template.bind({});
RangeDatePicker.args = {
  startLabel: '시작일',
  endLabel: '종료일',
};
