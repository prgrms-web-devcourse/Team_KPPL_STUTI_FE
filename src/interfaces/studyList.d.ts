export type StudyItemType = {
  studyGroupId: number;
  leaderId: number;
  thumbnailUrl: string;
  topic: string;
  title: string;
  preferredMbtis: string[];
  isOnline: boolean;
  region: string;
  startDate: string;
  endDate: string;
  numberOfMembers: number;
  numberOfRecruits: number;
};

export type StudyListType = StudyItemType[];
