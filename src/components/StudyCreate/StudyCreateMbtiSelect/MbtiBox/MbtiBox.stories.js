import MbtiBox from './MbtiBox';

export default {
  title: 'Components/StudyCreate',
  component: MbtiBox,
};

const Template = (args) => <MbtiBox {...args} />;

export const MbtiBoxIcon = Template.bind({});
MbtiBoxIcon.args = {
  mbti: 'ISFP',
  disabled: false,
};
