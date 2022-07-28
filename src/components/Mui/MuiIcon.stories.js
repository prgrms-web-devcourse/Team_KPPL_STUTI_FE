import SettingsIcon from '@mui/icons-material/Settings';

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

export const Default = (args) => <SettingsIcon {...args} />;
