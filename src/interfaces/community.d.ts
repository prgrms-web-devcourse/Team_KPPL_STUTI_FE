export interface CommunityPostType {
  postId: string;
  memberId: number;
  nickname: string;
  mbti: string;
  updatedAt: string;
  profileImageUrl?: string;
  contents: string;
  postImageUrl: string;
  totalLikes: number;
  totalComments: number;
  isliked: boolean;
}

export interface CommunityType {
  posts?: CommunityPostType[];
  hasNext?: boolean;
}

export interface CommunityModalType {
  postId?: string;
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
