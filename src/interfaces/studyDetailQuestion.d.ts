export interface childrenQuestionType {
  parentId: number;
  questionId: number;
  profileImageUrl: string;
  memberId: number;
  nickname: string;
  contents: string;
  createdAt: string;
}

export interface questionContentType {
  questionId: number;
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
  isLast: boolean;
  totalElements: number;
}
