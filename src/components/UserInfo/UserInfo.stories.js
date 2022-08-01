import UserInfo from './UserInfo';

export default {
  title: 'Components/User',
  component: UserInfo,
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

const Template = (args) => <UserInfo {...args} />;

export const UserInfoDefault = Template.bind({});
UserInfoDefault.args = {
  profileImageUrl: '',
  nickname: '프룽이',
  field: '프론트엔드',
  career: 'N년차',
  mbti: 'INTP',
};

export const UserInfoWithTitle = Template.bind({});
UserInfoWithTitle.args = {
  profileImageUrl: '',
  nickname: '프룽이',
  field: '프론트엔드',
  career: 'N년차',
  mbti: 'INTP',
  title: '제목입니다',
};
