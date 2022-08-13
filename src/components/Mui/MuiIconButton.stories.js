import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export default {
  title: 'Mui/IconButton',
  component: IconButton,
};

export const Default = (args) => (
  <IconButton {...args}>
    <SettingsIcon />
  </IconButton>
);
