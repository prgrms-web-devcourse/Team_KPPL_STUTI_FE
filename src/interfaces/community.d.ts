export interface CommunityPostType {
  postId: string;
  memberId: number;
  nickname: string;
  mbti: string;
  updatedAt: string;
  profileImageUrl?: string;
  contents: string;
  postImageUrl: string;
  likedMembers: number[];
  totalPostComments: number;
}

export interface CommunityType {
  posts?: CommunityPostType[];
  hasNext?: boolean;
}

export interface CommunityModalType {
  postId: string;
  nickname?: string;
  profileImageUrl?: string;
  contents?: string;
  postImageUrl?: string;
  modalType: string;
  isOpen?: boolean;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}

interface CommunityPostMenuIconButtonType {
  postId: string;
  memberId: number;
  nickname: string;
  profileImageUrl?: string;
  contents: string;
  postImageUrl?: string;
}

export interface CommunityPostTypographyButtonType {
  name?: string | undefined;
  margin?: string;
  children?: string | number;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

//Comment 부분
export interface childrenCommentType {
  parentId: number;
  postCommentId: number;
  profileImageUrl: string;
  memberId: number;
  nickname: string;
  contents: string;
  updatedAt: string;
}

export interface CommentContentsType {
  postCommentId: number;
  parentId: null | number;
  profileImageUrl: string;
  memberId: number;
  nickname: string;
  contents: string;
  updatedAt: string;
  children: childrenCommentType[];
}

export interface CommunityPostCommentType {
  contents: CommentContentType[];
  hasNext: boolean;
  totalElements: number;
}
