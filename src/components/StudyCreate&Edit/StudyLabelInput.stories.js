import StudyLabelInput from './StudyLabelInput';

export default {
  title: 'Components/StudyCreate&Edit',
  component: StudyLabelInput,
};

const Template = (args) => <StudyLabelInput {...args} />;

export const LabelInput = Template.bind({});
LabelInput.args = {
  id: 'study-title',
  label: '스터디 제목',
  fullWidth: true,
};
