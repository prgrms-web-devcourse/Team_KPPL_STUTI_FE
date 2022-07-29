import FeedModal from './FeedModal';

export default {
  title: 'FeedModal',
  component: FeedModal,
};

const Default = (args) => <FeedModal {...args}></FeedModal>;

export const FM = Default.bind({});
