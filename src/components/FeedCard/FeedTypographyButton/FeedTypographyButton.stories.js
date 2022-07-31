import FeedTypographyButton from './FeedTypographyButton';

export default {
  title: 'FeedCard/FeedTypographyButton',
  component: FeedTypographyButton,
};

const Default = (args) => (
  <FeedTypographyButton {...args}>안녕</FeedTypographyButton>
);

export const TB = Default.bind({});
