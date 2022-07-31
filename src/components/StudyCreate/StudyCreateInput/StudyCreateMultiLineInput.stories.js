import StudyCreateMultiLineInput from './StudyCreateMultiLineInput';

export default {
  title: 'Components/StudyCreate',
  component: StudyCreateMultiLineInput,
};

const Template = (args) => <StudyCreateMultiLineInput {...args} />;

export const MultiLineInput = Template.bind({});
MultiLineInput.args = {
  id: 'study-body',
  placeholder: '스터디 내용을 기재해주세요.',
  fullWidth: true,
  height: '700px',
};
