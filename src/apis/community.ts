import axiosInstance from '@apis/axiosInstance';

export const getCommunityDataApi = async (size: number) => {
  try {
    const { data } = await axiosInstance({
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
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

export const deleteCommunityPostApi = async (postId: string) => {
  try {
    const res = await axiosInstance({
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: `/api/v1/posts/${postId}`,
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${process.env.REACT_APP_TEST_TOKEN}`,
      },
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post를 삭제하는데 오류가 발생하였습니다.');
  }
};

export const postCommunityPostApi = async (postFormData: FormData) => {
  try {
    const res = await axiosInstance({
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: '/api/v1/posts',
      method: 'POST',
      data: postFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `bearer ${process.env.REACT_APP_TEST_TOKEN}`,
      },
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post 생성하는데 오류가 발생하였습니다.');
  }
};

export const editCommunityPostApi = async (
  postId: string,
  postFormData: FormData,
) => {
  try {
    const res = await axiosInstance({
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: `/api/v1/posts/${postId}`,
      method: 'PATCH',
      data: postFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `bearer ${process.env.REACT_APP_TEST_TOKEN}`,
      },
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post 수정하는데 오류가 발생하였습니다.');
  }
};

export const postCommunityPostLikeApi = async (postId: string) => {
  try {
    const res = await axiosInstance({
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: `/api/v1/posts/${postId}/likes`,
      method: 'POST',
      headers: {
        Authorization: `bearer ${process.env.REACT_APP_TEST_TOKEN}`,
      },
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post Like를 등록하는데 오류가 발생하였습니다.');
  }
};

export const deleteCommunityPostLikeApi = async (postId: string) => {
  try {
    const res = await axiosInstance({
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: `/api/v1/posts/${postId}/likes`,
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${process.env.REACT_APP_TEST_TOKEN}`,
      },
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post Like를 삭제하는데 오류가 발생하였습니다.');
  }
};

export const getCommunityPostCommentApi = async (
  postId: string,
  size: number,
  lastCommunityPostCommentId?: number,
) => {
  try {
    const { data } = await axiosInstance({
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: `/api/v1/posts/${postId}/comments`,
      method: 'GET',
      params: {
        size: size,
      },
    });
    return data;
  } catch (error) {
    new Error('Community Post Comment를 가져오는데 오류가 발생하였습니다.');
  }
};

export const createCommunityPostCommentApi = async (
  postId: string,
  parentId: number | null,
  contents: string,
) => {
  try {
    const { data } = await axiosInstance({
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: `/api/v1/posts/${postId}/comments`,
      method: 'POST',
      data: {
        parentId,
        contents,
      },
      headers: {
        Authorization: `bearer ${process.env.REACT_APP_TEST_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    new Error('Community Post Comment를 생성하는데 오류가 발생하였습니다.');
  }
};

export const changeCommunityPostCommentApi = async (
  postId: string,
  communityPostCommentId: number,
  contents: string,
) => {
  try {
    const { data } = await axiosInstance({
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: `/api/v1/posts/${postId}/comments/${communityPostCommentId}`,
      method: 'PUT',
      data: {
        contents,
      },
      headers: {
        Authorization: `bearer ${process.env.REACT_APP_TEST_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    new Error('Community Post Comment를 수정하는데 오류가 발생하였습니다.');
  }
};

export const deleteCommunityPostCommentApi = async (
  postId: string,
  communityPostCommentId: number,
) => {
  try {
    const { data } = await axiosInstance({
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: `/api/v1/posts/${postId}/comments/${communityPostCommentId}`,
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${process.env.REACT_APP_TEST_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    new Error('Community Post Comment를 삭제하는데 오류가 발생하였습니다.');
  }
};
