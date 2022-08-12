import Reply from './Reply';

export default {
  title: 'Containers/Reply',
  component: Reply,
};

const Template = (args) => <Reply {...args} />;

export const ReplyDefault = Template.bind({});
ReplyDefault.args = {
  profileImageUrl: '',
  nickname: '프룽이',
  contents: '참여하고 싶어요!',
  updatedAt: '2000-02-22 10:00:00',
};

export const ReplyComment = Template.bind({});
ReplyComment.args = {
  profileImageUrl: '',
  nickname: '프룽이',
  contents: '참여하고 싶어요!',
  updatedAt: '2000-02-22 10:00:00',
  replies: [],
};

export const ReplyTotal = Template.bind({});
ReplyTotal.args = {
  profileImageUrl: '',
  nickname: '프룽이',
  contents: '참여하고 싶어요!',
  updatedAt: '2000-02-22 10:00:00',
  replies: [],
  children: [
    <Reply
      key={1}
      profileImageUrl=''
      nickname='프롱이'
      contents='참여하고 싶어요!'
      updatedAt='2000-02-22 10:00:00'
    />,
    <Reply
      key={2}
      profileImageUrl=''
      nickname='프롱이'
      contents='참여하고 싶어요!'
      updatedAt='2000-02-22 10:00:00'
    />,
    <Reply
      key={3}
      profileImageUrl=''
      nickname='프롱이'
      contents='참여하고 싶어요!'
      updatedAt='2000-02-22 10:00:00'
    />,
  ],
};
