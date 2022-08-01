import axiosInstance from '@apis/axiosInstance';

export const getStudyManageInfomation = async () => {
  try {
    const { data } = await axiosInstance({
      url: '/mock/studyManageMockData.json',
      method: 'GET',
    });
    return data;
  } catch (error) {
    new Error('스터디 관리 정보를 가져오는 도중에 오류가 발생했습니다!');
  }
};
