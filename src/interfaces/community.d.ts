export interface CommunityPostType {
  postId: string;
  memberId: number;
  nickname: string;
  mbti: string;
  createdAt: string;
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
