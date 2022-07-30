export interface childrenQuestionType {
  parentId: number;
  questionId: number;
  profileImageUrl: string;
  memberId: number;
  nickName: string;
  content: string;
  createdAt: string;
}

export interface questionContentType {
  questionId: number;
  parentId: null | number;
  profileImageUrl: string;
  memberId: number;
  nickName: string;
  content: string;
  createdAt: string;
  children: childrenQuestionType[];
}

export interface studyDetailQusetionType {
  contents: questionContentType[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  sorted: boolean;
  isFirst: boolean;
  isLast: boolean;
}
