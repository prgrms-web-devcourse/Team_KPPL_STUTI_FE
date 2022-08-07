import DefaultAlert from './DefaultAlert';

export default {
  title: 'Components/DefaultAlert',
  component: DefaultAlert,
  argTypes: {
    severity: {
      options: ['error', 'warning', 'info', 'success'],
      control: { type: 'select' },
    },
    variant: {
      options: ['outlined', 'filled'],
      control: { type: 'select' },
    },
  },
};

const Template = (args) => <DefaultAlert {...args} />;

export const ErrorAlert = Template.bind({});
ErrorAlert.args = {
  severity: 'error',
  title: 'Error!!!!',
  content: '에러 !!!',
};

export const WarningAlert = Template.bind({});
WarningAlert.args = {
  severity: 'warning',
  title: 'Warning!!!!',
  content: '경고 !!!',
};

export const InfoAlert = Template.bind({});
InfoAlert.args = {
  severity: 'info',
  title: 'Info!!!!',
  content: '정보 !!!',
};

export const SuccessAlert = Template.bind({});
SuccessAlert.args = {
  severity: 'success',
  title: 'Success!!!!',
  content: '성공 !!!',
};
