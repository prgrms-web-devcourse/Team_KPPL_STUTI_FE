import axiosInstance from '@apis/axiosInstance';

export const getCommunityDataApi = async (size: number) => {
  try {
    const { data } = await axiosInstance({
      url: '/api/v1/posts',
      method: 'GET',
      params: {
        size: size,
      },
    });
    return data;
  } catch (error) {
    new Error('Community를 가져오는데 오류가 발생하였습니다.');
  }
};

export const deleteCommunityPostApi = async (postId: number) => {
  try {
    const { data } = await axiosInstance({
      url: `/api/v1/posts/${postId}`,
      method: 'DELETE',
    });
    return data;
  } catch (error) {
    new Error('Community Post를 삭제하는데 오류가 발생하였습니다.');
  }
};

export const postCommunityPostApi = async (postFormData: FormData) => {
  try {
    const { data } = await axiosInstance({
      url: '/api/v1/posts',
      method: 'POST',
      data: postFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    new Error('Community Post 생성하는데 오류가 발생하였습니다.');
  }
};

export const editCommunityPostApi = async (
  postId: number,
  postFormData: FormData,
) => {
  try {
    const { data } = await axiosInstance({
      url: `/api/v1/posts/${postId}`,
      method: 'POST',
      data: postFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    new Error('Community Post 수정하는데 오류가 발생하였습니다.');
  }
};

export const postCommunityPostLikeApi = async (postId: number) => {
  try {
    const res = await axiosInstance({
      url: `/api/v1/posts/${postId}/likes`,
      method: 'POST',
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post Like를 등록하는데 오류가 발생하였습니다.');
  }
};

export const deleteCommunityPostLikeApi = async (postId: number) => {
  try {
    const res = await axiosInstance({
      url: `/api/v1/posts/${postId}/likes`,
      method: 'DELETE',
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post Like를 삭제하는데 오류가 발생하였습니다.');
  }
};

export const getCommunityPostCommentApi = async (
  postId: number,
  size: number,
  lastCommunityPostCommentId?: number,
) => {
  try {
    const { data } = await axiosInstance({
      url: `/api/v1/posts/${postId}/comments`,
      method: 'GET',
      params: {
        lastPostId: lastCommunityPostCommentId,
        size: size,
      },
    });
    return data;
  } catch (error) {
    new Error('Community Post Comment를 가져오는데 오류가 발생하였습니다.');
  }
};

export const createCommunityPostCommentApi = async (
  postId: number,
  parentId: number | null,
  contents: string,
) => {
  try {
    const { data } = await axiosInstance({
      url: `/api/v1/posts/${postId}/comments`,
      method: 'POST',
      data: {
        parentId,
        contents,
      },
    });
    return data;
  } catch (error) {
    new Error('Community Post Comment를 생성하는데 오류가 발생하였습니다.');
  }
};

export const changeCommunityPostCommentApi = async (
  postId: number,
  communityPostCommentId: number,
  contents: string,
) => {
  try {
    const { data } = await axiosInstance({
      url: `/api/v1/posts/${postId}/comments/${communityPostCommentId}`,
      method: 'PUT',
      data: {
        contents,
      },
    });
    return data;
  } catch (error) {
    new Error('Community Post Comment를 수정하는데 오류가 발생하였습니다.');
  }
};

export const deleteCommunityPostCommentApi = async (
  postId: number,
  communityPostCommentId: number,
) => {
  try {
    const { data } = await axiosInstance({
      url: `/api/v1/posts/${postId}/comments/${communityPostCommentId}`,
      method: 'DELETE',
    });
    return data;
  } catch (error) {
    new Error('Community Post Comment를 삭제하는데 오류가 발생하였습니다.');
  }
};
