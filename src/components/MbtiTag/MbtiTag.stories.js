import { MuiProvider } from '../../styles';

import MbtiTag from './MbtiTag';

export default {
  title: 'Components/MbtiTag',
  component: MbtiTag,
  argTypes: {
    mbti: {
      options: [
        'INFP',
        'INFJ',
        'INTP',
        'INTJ',
        'ISTJ',
        'ISTP',
        'ISFJ',
        'ISFP',
        'ENFP',
        'ENTP',
        'ENFJ',
        'ENTJ',
        'ESFP',
        'ESFJ',
        'ESTP',
        'ESTJ',
      ],
      control: { type: 'select' },
    },
  },
};

const Template = (args) => (
  <MuiProvider>
    <MbtiTag {...args} />
  </MuiProvider>
);

export const MBTI = Template.bind({});
MBTI.args = {
  mbti: 'ENFP',
};
