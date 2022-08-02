import axiosInstance from '@apis/axiosInstance';

export const getUserProfile = async ({ userId }: { userId: number }) => {
  const { data } = await axiosInstance({
    url: '/mock/userProfile.json',
    method: 'GET',
  });
  return data;
};
