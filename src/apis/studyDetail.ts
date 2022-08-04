import { isDev } from '@src/constants/nodeEnv';
import axiosInstance from '@apis/axiosInstance';

export const getStudyDetailInfomation = async (studyGroupId: string) => {
  const { data } = await axiosInstance({
    url: isDev
      ? '/mock/studyDetailMockData.json'
      : `/api/v1/study-groups/${studyGroupId}`,
    method: 'GET',
  });
  return data;
};

export const getStudyQuestionInformation = async (
  studyGroupId: string,
  laststudyGroupQuestionId: number,
  size: number,
) => {
  const { data } = await axiosInstance({
    url: isDev
      ? '/mock/studyDetailQustionMockData.json'
      : `/api/v1/study-groups/${studyGroupId}/questions?lastCommentId=${laststudyGroupQuestionId}&size=${size}`,
    method: 'GET',
  });
  return data;
};
