import React from 'react';

import Button from './Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
    hoverColor: { control: 'color' },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  backgroundColor: 'red',
  fontcolor: 'white',
  width: '150px',
  height: '50px',
  content: 'test',
  hoverColor: 'orange',
};
