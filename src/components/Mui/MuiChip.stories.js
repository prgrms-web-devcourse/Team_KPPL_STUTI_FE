import Chip from '@mui/material/Chip';

import { MuiProvider } from '../../styles';

export default {
  title: 'Mui/Chip',
  component: Chip,
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['small', 'medium'],
    },
    color: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    label: { control: 'text' },
  },
};

const Template = (args) => <Chip {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Chip',
  size: 'medium',
  color: 'secondary',
};
