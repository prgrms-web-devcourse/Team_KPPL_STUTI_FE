import axiosInstance from '@apis/axiosInstance';

export const getStudyDetailInfomation = async () => {
  try {
    const { data } = await axiosInstance({
      url: '/mock/studyDetailMockData.json',
      method: 'GET',
    });
    return data;
  } catch (error) {
    new Error('스터디 상세 정보를 가져오는 도중에 오류가 발생했습니다!');
  }
};

export const getStudyQuestionInfomation = async () => {
  try {
    const { data } = await axiosInstance({
      url: '/mock/studyDetailQustionMockData.json',
      method: 'GET',
    });
    return data;
  } catch (error) {
    new Error('스터디 상세 질문들을 가져오는 도중에 오류가 발생했습니다!');
  }
};
