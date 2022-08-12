import StudyMultiLineInput from './StudyMultiLineInput';

export default {
  title: 'Components/StudyCreate&Edit',
  component: StudyMultiLineInput,
};

const Template = (args) => <StudyMultiLineInput {...args} />;

export const MultiLineInput = Template.bind({});
MultiLineInput.args = {
  id: 'study-body',
  placeholder: '스터디 내용을 기재해주세요.',
  fullWidth: true,
  height: '600px',
};
