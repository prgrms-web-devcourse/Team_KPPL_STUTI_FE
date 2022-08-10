export type StudyItemType = {
  studyGroupId: number;
  memberId: number;
  thumbnailUrl: string;
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
