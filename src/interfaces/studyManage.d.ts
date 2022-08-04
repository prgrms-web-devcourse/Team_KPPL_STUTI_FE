export interface studyManageMemberType {
  studyMemberId: number;
  profileImageUrl: string;
  nickname: string;
  field: string;
  career: string;
  mbti: string;
  studyMemberRole: string;
}

export interface studyManageApplicantsType {
  studyMemberId: number;
  profileImageUrl: string;
  nickname: string;
  field: string;
  career: string;
  mbti: string;
  studyMemberRole: string;
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
