import axiosInstance, { axiosAuthInstance } from '@apis/axiosInstance';

export const getCommunityDataApi = async (
  size: number,
  lastPostId?: number,
) => {
  const { data } = await axiosInstance({
    url: '/api/v1/posts',
    method: 'GET',
    params: {
      lastPostId: lastPostId,
      size: size,
    },
  });
  return data;
};

export const deleteCommunityPostApi = async (postId: number) => {
  const { data } = await axiosAuthInstance({
    url: `/api/v1/posts/${postId}`,
    method: 'DELETE',
  });
  return data;
};

export const postCommunityPostApi = async (postFormData: FormData) => {
  const { data } = await axiosAuthInstance({
    url: '/api/v1/posts',
    method: 'POST',
    data: postFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const editCommunityPostApi = async (
  postId: number,
  postFormData: FormData,
) => {
  const { data } = await axiosAuthInstance({
    url: `/api/v1/posts/${postId}`,
    method: 'POST',
    data: postFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const postCommunityPostLikeApi = async (postId: number) => {
  await axiosAuthInstance({
    url: `/api/v1/posts/${postId}/likes`,
    method: 'POST',
  });
};

export const deleteCommunityPostLikeApi = async (postId: number) => {
  await axiosAuthInstance({
    url: `/api/v1/posts/${postId}/likes`,
    method: 'DELETE',
  });
};

export const getCommunityPostCommentApi = async (
  postId: number,
  size: number,
  lastCommentId?: number,
) => {
  const { data } = await axiosInstance({
    url: `/api/v1/posts/${postId}/comments`,
    method: 'GET',
    params: {
      lastCommentId: lastCommentId,
      size: size,
    },
  });
  return data;
};

export const createCommunityPostCommentApi = async (
  postId: number,
  parentId: number | null,
  contents: string,
) => {
  const { data } = await axiosAuthInstance({
    url: `/api/v1/posts/${postId}/comments`,
    method: 'POST',
    data: {
      parentId,
      contents,
    },
  });
  return data;
};

export const changeCommunityPostCommentApi = async (
  postId: number,
  postCommentId: number,
  contents: string,
) => {
  const { data } = await axiosAuthInstance({
    url: `/api/v1/posts/${postId}/comments/${postCommentId}`,
    method: 'POST',
    data: {
      contents,
    },
  });
  return data;
};

export const deleteCommunityPostCommentApi = async (
  postId: number,
  postCommentId: number,
) => {
  const { data } = await axiosAuthInstance({
    url: `/api/v1/posts/${postId}/comments/${postCommentId}`,
    method: 'DELETE',
  });
  return data;
};
