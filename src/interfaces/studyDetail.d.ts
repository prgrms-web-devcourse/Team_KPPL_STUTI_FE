export interface detailMemberType {
  leaderId: number;
  profileImageUrl: string;
  nickname: string;
  field: string;
  career: string;
  mbti: string;
}

export interface detailStudyPeriodType {
  startDate: string;
  endDate: string;
}

export interface detailQuestionsChildrenType {
  parentId: number;
  questionId: number;
  nickname: string;
  content: string;
  createdAt: string;
}

export interface detailQuestionsType {
  questionId: number;
  parentId: null;
  nickname: string;
  content: string;
  createdAt: string;
  children: detailQuestionsChildrenType[];
}

export interface studyDetailType {
  topic: string;
  title: string;
  imageUrl: string;
  leader: detailMemberType;
  preferredMbtis: string[];
  isOnline: boolean;
  region: string;
  studyPeriod: detailStudyPeriodType;
  numberOfMembers: number;
  numberOfRecruits: number;
  description: string;
  questions: detailQuestionsType[];
}
