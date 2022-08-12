export interface UserProfileType {
  id: number;
  email: string;
  profileImageUrl: string;
  nickname: string;
  field: string;
  career: string;
  MBTI: string;
  githubUrl: string | null;
  blogUrl: string | null;
}

export interface UserProfileEditFormType {
  nickname: string;
  field: string;
  career: string;
  MBTI: string;
  githubUrl: string;
  blogUrl: string;
}
