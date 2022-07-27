import SettingsIcon from '@mui/icons-material/Settings';

import { MuiProvider } from '../../styles';

export default {
  title: 'Mui/Icon',
  component: SettingsIcon,
  argTypes: {
    fontSize: {
      control: 'inline-radio',
      options: ['small', 'medium'],
    },
  },
};

export const Default = (args) => (
  <MuiProvider>
    <SettingsIcon {...args} />
  </MuiProvider>
);
