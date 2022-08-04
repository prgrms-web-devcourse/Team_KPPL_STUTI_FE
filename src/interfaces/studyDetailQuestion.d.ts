export interface childrenQuestionType {
  parentId: number;
  studyGroupQuestionId: number;
  profileImageUrl: string;
  memberId: number;
  nickname: string;
  contents: string;
  createdAt: string;
}

export interface questionContentType {
  studyGroupQuestionId: number;
  parentId: null | number;
  profileImageUrl: string;
  memberId: number;
  nickname: string;
  contents: string;
  createdAt: string;
  children: childrenQuestionType[];
}

export interface studyDetailQuestionType {
  contents: questionContentType[];
  hasNext: boolean;
  totalElements: number;
}
