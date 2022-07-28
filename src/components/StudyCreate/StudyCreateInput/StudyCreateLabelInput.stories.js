import StudyCreateLabelInput from './StudyCreateLabelInput';

export default {
  title: 'Components/StudyCreateLabelInput',
  component: StudyCreateLabelInput,
};

const Template = (args) => <StudyCreateLabelInput {...args} />;

export const LabelInput = Template.bind({});
LabelInput.args = {
  id: 'study-title',
  label: '스터디 제목',
  fullWidth: true,
};
