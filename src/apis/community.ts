import axiosInstance, { axiosAuthInstance } from '@apis/axiosInstance';

export const getCommunityDataApi = async (
  size: number,
  lastPostId?: number,
) => {
  try {
    const { data } = await axiosInstance({
      url: '/api/v1/posts',
      method: 'GET',
      params: {
        lastPostId: lastPostId,
        size: size,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    new Error('Community를 가져오는데 오류가 발생하였습니다.');
  }
};

export const deleteCommunityPostApi = async (postId: number) => {
  try {
    const { data } = await axiosAuthInstance({
      url: `/api/v1/posts/${postId}`,
      method: 'DELETE',
    });
    return data;
  } catch (error) {
    console.error(error);
    new Error('Community Post를 삭제하는데 오류가 발생하였습니다.');
  }
};

export const postCommunityPostApi = async (postFormData: FormData) => {
  try {
    const { data } = await axiosAuthInstance({
      url: '/api/v1/posts',
      method: 'POST',
      data: postFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    new Error('Community Post 생성하는데 오류가 발생하였습니다.');
  }
};

export const editCommunityPostApi = async (
  postId: number,
  postFormData: FormData,
) => {
  try {
    const { data } = await axiosAuthInstance({
      url: `/api/v1/posts/${postId}`,
      method: 'POST',
      data: postFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    new Error('Community Post 수정하는데 오류가 발생하였습니다.');
  }
};

export const postCommunityPostLikeApi = async (postId: number) => {
  try {
    const res = await axiosAuthInstance({
      url: `/api/v1/posts/${postId}/likes`,
      method: 'POST',
    });
    console.log(res);
  } catch (error) {
    console.error(error);
    new Error('Community Post Like를 등록하는데 오류가 발생하였습니다.');
  }
};

export const deleteCommunityPostLikeApi = async (postId: number) => {
  try {
    const res = await axiosAuthInstance({
      url: `/api/v1/posts/${postId}/likes`,
      method: 'DELETE',
    });
    console.log(res);
  } catch (error) {
    console.error(error);
    new Error('Community Post Like를 삭제하는데 오류가 발생하였습니다.');
  }
};

export const getCommunityPostCommentApi = async (
  postId: number,
  size: number,
  lastCommentId?: number,
) => {
  try {
    const { data } = await axiosInstance({
      url: `/api/v1/posts/${postId}/comments`,
      method: 'GET',
      params: {
        lastCommentId: lastCommentId,
        size: size,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    new Error('Community Post Comment를 가져오는데 오류가 발생하였습니다.');
  }
};

export const createCommunityPostCommentApi = async (
  postId: number,
  parentId: number | null,
  contents: string,
) => {
  try {
    const { data } = await axiosAuthInstance({
      url: `/api/v1/posts/${postId}/comments`,
      method: 'POST',
      data: {
        parentId,
        contents,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    new Error('Community Post Comment를 생성하는데 오류가 발생하였습니다.');
  }
};

export const changeCommunityPostCommentApi = async (
  postId: number,
  postCommentId: number,
  contents: string,
) => {
  try {
    const { data } = await axiosAuthInstance({
      url: `/api/v1/posts/${postId}/comments/${postCommentId}`,
      method: 'POST',
      data: {
        contents,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    new Error('Community Post Comment를 수정하는데 오류가 발생하였습니다.');
  }
};

export const deleteCommunityPostCommentApi = async (
  postId: number,
  postCommentId: number,
) => {
  try {
    const { data } = await axiosAuthInstance({
      url: `/api/v1/posts/${postId}/comments/${postCommentId}`,
      method: 'DELETE',
    });
    return data;
  } catch (error) {
    console.error(error);
    new Error('Community Post Comment를 삭제하는데 오류가 발생하였습니다.');
  }
};
