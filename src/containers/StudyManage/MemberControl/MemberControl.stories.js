import MemberControl from './MemberControl';

export default {
  title: 'Containers/StudyManage',
  component: MemberControl,
};

const Template = (args) => <MemberControl {...args} />;

const members = [
  {
    profileImageUrl: '',
    nickname: '멤버임',
    field: '프론트엔드',
    career: 'N년차',
    mbti: 'ENFP',
    studyGroupMemberRole: 'MEMBER',
    studyMemberId: 1,
  },
  {
    profileImageUrl: '',
    nickname: '멤버임',
    field: '프론트엔드',
    career: 'N년차',
    mbti: 'ENFP',
    studyGroupMemberRole: 'MEMBER',
    studyMemberId: 2,
  },
];

const applicants = [
  {
    profileImageUrl: '',
    nickname: '지원자임',
    field: '프론트엔드',
    career: 'N년차',
    mbti: 'INFP',
    studyGroupMemberRole: 'APPLICANT',
    applicantId: 1,
  },
  {
    profileImageUrl: '',
    nickname: '지원자임',
    field: '프론트엔드',
    career: 'N년차',
    mbti: 'INFP',
    studyGroupMemberRole: 'APPLICANT',
    applicantId: 2,
  },
];

export const MemberControlDefault = Template.bind({});
MemberControlDefault.args = {
  numberOfMembers: 2,
  numberOfRecruits: 5,
  numberOfApplicant: 2,
  studyMembers: members,
  applicants: applicants,
};
