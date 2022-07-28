import TypographyButton from './TypographyButton';

export default {
  title: 'FeedCard/TypographyButton',
  component: TypographyButton,
};

const Default = (args) => <TypographyButton {...args}>안녕</TypographyButton>;

export const TB = Default.bind({});
