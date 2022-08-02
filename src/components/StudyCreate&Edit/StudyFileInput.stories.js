import StudyFileInput from './StudyFileInput';

export default {
  title: 'Components/StudyCreate&Edit',
  component: StudyFileInput,
};

const Template = (args) => <StudyFileInput {...args} />;

export const FileInput = Template.bind({});
FileInput.args = {
  message: '이미지 업로드',
  onChange: (e) => {
    console.log(e.target.files[0]);
  },
};
