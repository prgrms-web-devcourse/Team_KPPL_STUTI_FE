import { isDev } from '@constants/nodeEnv';
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
  size: number,
  laststudyGroupQuestionId?: number,
) => {
  const { data } = await axiosInstance({
    url: isDev
      ? '/mock/studyDetailQustionMockData.json'
      : `/api/v1/study-groups/${studyGroupId}/questions?size=${size}${
          laststudyGroupQuestionId &&
          `&lastStudyGroupQuestionId=${laststudyGroupQuestionId}`
        }`,
    method: 'GET',
  });
  return data;
};

export const createStudyQuestion = async (
  studyGroupId: string,
  parentId: number | null,
  content: string,
) => {
  const { data } = await axiosInstance({
    url: `/api/v1/study-groups/${studyGroupId}/questions`,
    method: 'POST',
    data: {
      parentId,
      content,
    },
  });
  return data;
};

export const changeStudyQuestion = async (
  studyGroupId: string,
  studyGroupQuestionId: number,
  content: string,
) => {
  const { data } = await axiosInstance({
    url: `/api/v1/study-groups/${studyGroupId}/questions/${studyGroupQuestionId}`,
    method: 'PUT',
    data: {
      content,
    },
  });
  return data;
};

export const deleteStudyQuestion = async (
  studyGroupId: string,
  studyGroupQuestionId: number,
) => {
  const { data } = await axiosInstance({
    url: `/api/v1/study-groups/${studyGroupId}/questions/${studyGroupQuestionId}`,
    method: 'DELETE',
  });
  return data;
};

export const joinStudyGroup = async (studyGroupId: string) => {
  const { data } = await axiosInstance({
    url: `/api/1v/study-groups/${studyGroupId}`,
    method: 'POST',
  });
  return data;
};
