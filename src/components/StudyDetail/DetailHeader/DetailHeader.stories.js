import NoImage from '@assets/noImage.jpeg';

import DetailHeader from './DetailHeader';

export default {
  title: 'Components/StudyDetail',
  component: DetailHeader,
};

const Template = (args) => <DetailHeader {...args} />;

export const Header = Template.bind({});
Header.args = {
  topic: '프론트엔드',
  title: '자바스크립트로 어서오세요~',
  imageUrl: NoImage,
};
