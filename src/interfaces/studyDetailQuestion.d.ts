export interface childrenQuestionType {
  parentId: number;
  studyGroupQuestionId: number;
  profileImageUrl: string;
  memberId: number;
  nickname: string;
  contents: string;
  updatedAt: string;
}

export interface questionContentType {
  studyGroupQuestionId: number;
  parentId: null | number;
  profileImageUrl: string;
  memberId: number;
  nickname: string;
  contents: string;
  updatedAt: string;
  children: childrenQuestionType[];
}

export interface studyDetailQuestionType {
  contents: questionContentType[];
  hasNext: boolean;
  totalElements: number;
}
