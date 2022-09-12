export interface CommunityPostType {
  postId: number;
  memberId: number;
  nickname: string;
  mbti: string;
  updatedAt: string;
  profileImageUrl?: string;
  contents: string;
  postImageUrl?: string;
  likedMembers: number[];
  totalPostComments: number;
}

export interface CommunityType {
  posts: CommunityPostType[];
  hasNext: boolean;
}

export interface CommunityModalType {
  postId: number;
  nickname?: string;
  profileImageUrl?: string;
  contents?: string;
  postImageUrl?: string;
  modalType: string;
  isOpen?: boolean;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}

interface CommunityPostMenuIconButtonType {
  postId: number;
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

export interface childrenCommentType {
  postCommentId: number;
  parentId: number;
  profileImageUrl: string;
  memberId: number;
  nickname: string;
  contents: string;
  updatedAt: string;
  children?;
}

export interface CommentContentsType extends childrenCommentType {
  children?: childrenCommentType[];
}

export interface CommunityPostCommentType {
  contents: CommentContentsType[];
  hasNext: boolean;
  totalElements: number;
}
