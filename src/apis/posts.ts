import axiosInstance from '@apis/axiosInstance';

export const getUserPosts = async (
  userId: number,
  params: {
    lastPostId: number | null;
    size: number;
  },
) => {
  const { data } = await axiosInstance({
    method: 'GET',
    url: `/api/v1/posts/members/${userId}`,
    params,
  });

  return data;
};
