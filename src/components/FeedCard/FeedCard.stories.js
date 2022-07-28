import FeedCard from './FeedCard';

export default {
  title: 'FeedCard',
  component: FeedCard,
};

const Default = (args) => <FeedCard {...args} />;

export const Feed = Default.bind({});
