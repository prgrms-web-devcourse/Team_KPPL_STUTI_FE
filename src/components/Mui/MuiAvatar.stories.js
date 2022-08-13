import React from 'react';
import { AvatarGroup, Avatar } from '@mui/material';

export default {
  title: 'Mui/Avatar',
  component: Avatar,
};

const Template = (args) => <Avatar {...args} />;
export const Default = Template.bind({});
Default.args = {
  src: 'https://picsum.photos/id/1027/200/300',
};

export const AvatarsGroup = () => {
  return (
    <>
      <AvatarGroup>
        <Avatar alt='User 1' src='https://picsum.photos/id/1026/200/300' />
        <Avatar alt='User 2' src='https://picsum.photos/id/1027/200/300' />
        <Avatar alt='User 3' src='https://picsum.photos/id/1028/200/300' />
        <Avatar alt='User 4' src='https://picsum.photos/id/1029/200/300' />
        <Avatar alt='User 5' src='https://picsum.photos/id/1030/200/300' />
      </AvatarGroup>
      <AvatarGroup>
        <Avatar alt='User 1'>A</Avatar>
        <Avatar alt='User 2'>B</Avatar>
        <Avatar alt='User 3'>C</Avatar>
        <Avatar alt='User 4'>D</Avatar>
        <Avatar alt='User 5'>E</Avatar>
      </AvatarGroup>
    </>
  );
};
