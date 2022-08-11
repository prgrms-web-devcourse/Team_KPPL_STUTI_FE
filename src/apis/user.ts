import { UserSignUpType } from '@src/interfaces/user';
import axiosInstance, { axiosAuthInstance } from '@apis/axiosInstance';

export const login = async (id: number) => {
  const { data } = await axiosInstance({
    url: '/api/v1/login',
    method: 'POST',
    data: {
      id,
    },
  });

  return data;
};

export const getAuthUser = async () => {
  const { data } = await axiosAuthInstance({
    url: '/api/v1/auth',
    method: 'GET',
  });

  return data;
};

export const logout = async () => {
  const { data } = await axiosAuthInstance({
    url: '/api/v1/logout',
    method: 'POST',
  });

  return data;
};

export const signUp = async ({
  email,
  nickname,
  field,
  career,
  MBTI,
}: UserSignUpType) => {
  const { data } = await axiosInstance({
    url: '/api/v1/signup',
    method: 'POST',
    data: {
      email,
      nickname,
      field,
      career,
      MBTI,
    },
  });

  return data;
};
