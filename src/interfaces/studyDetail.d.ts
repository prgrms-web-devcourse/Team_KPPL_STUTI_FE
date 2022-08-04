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
  createdAt: string;
}

export interface detailQuestionsType {
  studyGroupQuestionId: number;
  parentId: null;
  nickname: string;
  content: string;
  createdAt: string;
  children: detailQuestionsChildrenType[];
}

export interface studyDetailType {
  studyGroupId: number;
  topic: string;
  title: string;
  imageUrl: string;
  leader: detailMemberType;
  preferredMbtis: string[];
  isOnline: boolean;
  region: string;
  startDateTime: string;
  endDateTime: string;
  numberOfMembers: number;
  numberOfRecruits: number;
  description: string;
  questions: detailQuestionsType[];
}
