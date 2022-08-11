import axiosInstance, { axiosAuthInstance } from '@apis/axiosInstance';

export const getUserPosts = async (
  userId: number,
  params: {
    lastPostId?: number;
    size: number;
  },
) => {
  const { data } = await axiosInstance({
    method: 'GET',
    url: `/api/v1/posts/members/${userId}`,
    params: {
      ...params,
      lastPostId: params.lastPostId === 0 ? null : params.lastPostId,
    },
  });

  console.log(data);

  return data;
};
