import Button from '@mui/material/Button';

export default {
  title: 'Mui/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['contained', 'outlined', 'text'],
      table: {
        disable: true,
      },
    },
    color: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: {
      control: 'boolean',
      if: { arg: 'variant', eq: 'contained' },
    },
    label: { control: 'text' },
  },
};

const Template = (args) => <Button {...args}>{args.label || '버튼'}</Button>;

export const Contained = Template.bind({});
Contained.args = {
  variant: 'contained',
  color: 'primary',
  size: 'large',
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  color: 'secondary',
  size: 'large',
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  color: 'secondary',
  size: 'small',
};
