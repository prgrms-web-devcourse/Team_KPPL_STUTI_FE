export interface detailMemberType {
  memberId: number;
  profileImageUrl: string;
  nickname: string;
  field: string;
  career: string;
  mbti: string;
}

export interface detailQuestionsChildrenType {
  parentId: number;
  studyGroupQuestionId: number;
  nickname: string;
  content: string;
  updatedAt: string;
}

export interface detailQuestionsType {
  studyGroupQuestionId: number;
  parentId: null;
  nickname: string;
  content: string;
  updatedAt: string;
  children: detailQuestionsChildrenType[];
}

export interface studyDetailType {
  studyGroupId: number;
  topic: string;
  title: string;
  imageUrl: string;
  leader: detailMemberType;
  preferredMBTIs: string[];
  isOnline: boolean;
  region: string;
  startDateTime: string;
  endDateTime: string;
  numberOfMembers: number;
  numberOfRecruits: number;
  description: string;
  questions: detailQuestionsType[];
}
