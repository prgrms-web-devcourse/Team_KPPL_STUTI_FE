import React from 'react';

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
    cursor: { control: { type: 'boolean' } },
  },
};

const Template = (args) => <MbtiTag {...args} />;

export const MBTI = Template.bind({});
MBTI.args = {
  mbti: 'ENFP',
};
