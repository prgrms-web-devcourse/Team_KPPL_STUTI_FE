import StudyCreateHeading from './StudyCreateHeading';

export default {
  title: 'Components/StudyCreate',
  component: StudyCreateHeading,
};

const Template = (args) => <StudyCreateHeading {...args} />;

export const Header = Template.bind({});
Header.args = {
  title: '스터디 생성',
  variant: 'h4',
};
