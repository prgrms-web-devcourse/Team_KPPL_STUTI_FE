import axios from 'axios';
import axiosInstance from '@apis/axiosInstance';
const END_POINT =
  'https://c69dc827-4460-41db-8879-0e6d753aff12.mock.pstmn.io/api/v1/';

export const getCommunityDataApi = async () => {
  try {
    const { data } = await axiosInstance({
      url: '/mock/CommunityMockData.json',
      method: 'GET',
    });
    return data;
  } catch (error) {
    new Error('Community를 가져오는데 오류가 발생하였습니다.');
  }
};

export const deleteCommunityPostApi = async (url: string) => {
  try {
    const res = await axios({
      url: `${END_POINT}${url}`,
      method: 'DELETE',
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post를 삭제하는데 오류가 발생하였습니다.');
  }
};

export const postCommunityPostApi = async ({
  url,
  postData,
}: {
  url: string;
  postData: FormData;
}) => {
  try {
    const res = await axios({
      url: `${END_POINT}${url}`,
      method: 'POST',
      data: postData,
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post 생성하는데 오류가 발생하였습니다.');
  }
};
export const editCommunityPostApi = async ({
  url,
  postData,
}: {
  url: string;
  postData: FormData;
}) => {
  try {
    const res = await axios({
      url: `${END_POINT}${url}`,
      method: 'PATCH',
      data: postData,
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post 수정하는데 오류가 발생하였습니다.');
  }
};

export const postCommunityPostLikeApi = async (url: string) => {
  try {
    const res = await axios({
      url: `${END_POINT}${url}`,
      method: 'POST',
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post Like를 등록하는데 오류가 발생하였습니다.');
  }
};

export const deleteCommunityPostLikeApi = async (url: string) => {
  try {
    const res = await axios({
      url: `${END_POINT}${url}`,
      method: 'DELETE',
    });
    console.log(res);
  } catch (error) {
    new Error('Community Post Like를 삭제하는데 오류가 발생하였습니다.');
  }
};
