import { MuiProvider } from '../../../styles';

import DetailLeaderInfo from './DetailLeaderInfo';

export default {
  title: 'Components/StudyDetail',
  component: DetailLeaderInfo,
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
    <DetailLeaderInfo {...args} />
  </MuiProvider>
);

export const LeaderInfo = Template.bind({});
LeaderInfo.args = {
  profileImageUrl: '',
  nickName: '프룽이',
  field: '프론트엔드',
  career: 'N년차',
  mbti: 'INTP',
};
