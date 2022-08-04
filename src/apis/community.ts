import axiosInstance from '@apis/axiosInstance';

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
