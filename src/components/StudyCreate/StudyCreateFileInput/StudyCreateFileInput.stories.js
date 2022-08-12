import StudyCreateFileInput from './StudyCreateFileInput';

export default {
  title: 'Components/StudyCreate',
  component: StudyCreateFileInput,
};

const Template = (args) => <StudyCreateFileInput {...args} />;

export const FileInput = Template.bind({});
FileInput.args = {
  message: '이미지 업로드',
  onChange: (e) => {
    console.log(e.target.files[0]);
  },
};
