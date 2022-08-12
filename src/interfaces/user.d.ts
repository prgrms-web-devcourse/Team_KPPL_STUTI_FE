export interface UserType {
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

export interface UserSignUpFormType {
  email: string;
  nickname: string;
  field: string;
  career: string;
  MBTI: string;
}

export interface UserEditFormType {
  nickname: string;
  field: string;
  career: string;
  MBTI: string;
  githubUrl: string;
  blogUrl: string;
}
