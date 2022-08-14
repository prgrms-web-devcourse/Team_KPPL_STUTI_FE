export type StudyItemType = {
  studyGroupId: number;
  memberId: number;
  imageUrl: string;
  topic: string;
  title: string;
  preferredMBTIs: string[];
  region: string;
  startDateTime: string;
  endDateTime: string;
  numberOfMembers: number;
  numberOfRecruits: number;
};

export type StudyListType = StudyItemType[];

export type RoleType = 'STUDY_LEADER' | 'STUDY_MEMBER' | 'STUDY_APPLICANT';
