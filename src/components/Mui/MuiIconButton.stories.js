import IconButton from '@mui/material/IconButton';
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
