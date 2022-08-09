import axios from 'axios';
import axiosInstance from '@apis/axiosInstance';

export const getCommunityDataApi = async (size: number) => {
  try {
    const { data } = await axiosInstance({
      url: '/posts',
      method: 'GET',
      params: {
        size: size,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    new Error('Community를 가져오는데 오류가 발생하였습니다.');
  }
};

export const deleteCommunityPostApi = async (postId: string) => {
  try {
    const res = await axios({
      url: `/posts/${postId}`,
      method: 'DELETE',
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post를 삭제하는데 오류가 발생하였습니다.');
  }
};

export const postCommunityPostApi = async (postFormData: FormData) => {
  try {
    const res = await axios({
      url: '/posts',
      method: 'POST',
      data: postFormData,
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
    const res = await axios({
      url: `/posts/${postId}`,
      method: 'PATCH',
      data: postFormData,
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post 수정하는데 오류가 발생하였습니다.');
  }
};

export const postCommunityPostLikeApi = async (postId: string) => {
  try {
    const res = await axios({
      url: `/posts/${postId}/like`,
      method: 'POST',
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post Like를 등록하는데 오류가 발생하였습니다.');
  }
};

export const deleteCommunityPostLikeApi = async (postId: string) => {
  try {
    const res = await axios({
      url: `/posts/${postId}/like`,
      method: 'DELETE',
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post Like를 삭제하는데 오류가 발생하였습니다.');
  }
};

export const getCommunityPostCommentApi = async (
  postId?: string,
  size?: number,
  lastCommunityPostCommentId?: number,
) => {
  try {
    const { data } = await axiosInstance({
      url: '/mock/communityPostCommentMockData.json',
      method: 'GET',
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
      url: `/posts/${postId}/comments`,
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
  postId: string,
  communityPostCommentId: number,
  contents: string,
) => {
  try {
    const { data } = await axiosInstance({
      url: `/posts/${postId}/comments/${communityPostCommentId}`,
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
  postId: string,
  communityPostCommentId: number,
) => {
  try {
    const { data } = await axiosInstance({
      url: `/posts/${postId}/comments/${communityPostCommentId}`,
      method: 'DELETE',
    });
    return data;
  } catch (error) {
    new Error('Community Post Comment를 삭제하는데 오류가 발생하였습니다.');
  }
};
