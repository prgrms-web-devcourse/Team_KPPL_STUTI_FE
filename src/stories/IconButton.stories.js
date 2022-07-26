import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

import { MuiProvider } from '../styles/MuiProvider';

export default {
  title: 'IconButton',
  component: IconButton,
};

export const Default = (args) => (
  <MuiProvider>
    <IconButton {...args}>
      <SettingsIcon />
    </IconButton>
  </MuiProvider>
);
