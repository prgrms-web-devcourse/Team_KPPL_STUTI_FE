import DefaultAvatar from './DefaultAvatar';

export default {
  title: 'Components/DefaultAvatar',
  component: DefaultAvatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <DefaultAvatar {...args} />;

export const Avatar = Template.bind({});
Avatar.args = {};
