import axiosInstance, { axiosAuthInstance } from '@apis/axiosInstance';

export const getUserProfile = async (userId: number) => {
  const { data } = await axiosInstance({
    method: 'GET',
    url: `/api/v1/members/${userId}`,
  });

  return data;
};

export const updateUserProfile = async (
  userId: number,
  data: {
    profileImageUrl?: string;
    nickname?: string;
    field?: string;
    career?: string;
    MBTI?: string;
    githubUrl?: string | null;
    blogUrl?: string | null;
  },
) => {
  const { data: resData } = await axiosAuthInstance({
    method: 'PATCH',
    url: `/api/v1/members/${userId}`,
    data,
  });

  return resData;
};
