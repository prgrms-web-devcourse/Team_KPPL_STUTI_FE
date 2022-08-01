import axiosInstance from '@apis/axiosInstance';

export const fetchStudyDetails = async () => {
  try {
    const { data } = await axiosInstance({
      url: '/mock/studyDetailMockData.json',
      method: 'GET',
    });
    return data;
  } catch (error) {
    new Error('fetch Error');
  }
};
