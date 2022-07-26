import { MuiProvider } from 'MuiProvider';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

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
