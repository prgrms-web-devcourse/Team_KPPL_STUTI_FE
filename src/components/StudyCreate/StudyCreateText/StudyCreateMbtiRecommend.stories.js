import StudyCreateText from './StudyCreateMbtiRecommend';

export default {
  title: 'Components/StudyCreate',
  component: StudyCreateText,
};

const Template = (args) => <StudyCreateText {...args} />;

export const MbtiRecommend = Template.bind({});
MbtiRecommend.args = {
  mbtis: ['ISFP', 'INFJ', 'ESTP'],
};
