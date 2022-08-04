export interface studyManageMemberType {
  studyGroupMemberId: number;
  profileImageUrl: string;
  nickname: string;
  field: string;
  career: string;
  mbti: string;
  studyGroupMemberRole: string;
}

export interface studyManageApplicantsType {
  studyGroupMemberId: number;
  profileImageUrl: string;
  nickname: string;
  field: string;
  career: string;
  mbti: string;
  studyGroupMemberRole: string;
}

export interface studyManageType {
  studyGroupId: number;
  topic: string;
  title: string;
  numberOfMembers: number;
  numberOfRecruits: number;
  studyMembers: studyManageMemberType[];
  numberOfApplicant: number;
  applicants: studyManageApplicantsType[];
}
