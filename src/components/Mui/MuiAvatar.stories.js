import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';

import { MuiProvider } from '../../styles/MuiProvider';

export default {
  title: 'Mui/Avatar',
  component: Avatar,
  argTypes: {
    variant: {
      options: ['circular', 'rounded', 'square', 'string'],
      control: { type: 'radio' },
    },
    src: {
      control: { type: 'text' },
    },
  },
};

const Template = (args) => (
  <MuiProvider>
    <Avatar {...args} />
  </MuiProvider>
);
export const Default = Template.bind({});
Default.args = {
  variant: 'circular',
  src: 'https://picsum.photos/id/1027/200/300',
};

export const AvatarsGroup = () => {
  return (
    <MuiProvider>
      <AvatarGroup>
        <Avatar alt='User 1' src='https://picsum.photos/id/1026/200/300' />
        <Avatar alt='User 2' src='https://picsum.photos/id/1027/200/300' />
        <Avatar alt='User 3' src='https://picsum.photos/id/1028/200/300' />
        <Avatar alt='User 4' src='https://picsum.photos/id/1029/200/300' />
        <Avatar alt='User 5' src='https://picsum.photos/id/1030/200/300' />
      </AvatarGroup>
      <AvatarGroup>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
        <Avatar>C</Avatar>
        <Avatar>D</Avatar>
        <Avatar>E</Avatar>
      </AvatarGroup>
    </MuiProvider>
  );
};
