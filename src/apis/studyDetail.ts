import axiosInstance, { axiosAuthInstance } from '@apis/axiosInstance';

export const getStudyDetailInfomation = async (studyGroupId: string) => {
  const { data } = await axiosInstance({
    url: `/api/v1/study-groups/${studyGroupId}`,
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
    url: laststudyGroupQuestionId
      ? `/api/v1/study-groups/${studyGroupId}/questions?size=${size}&lastStudyGroupQuestionId=${laststudyGroupQuestionId}`
      : `/api/v1/study-groups/${studyGroupId}/questions?size=${size}`,
    method: 'GET',
  });
  return data;
};

export const createStudyQuestion = async (
  studyGroupId: string,
  parentId: number | null,
  contents: string,
) => {
  const { data } = await axiosAuthInstance({
    url: `/api/v1/study-groups/${studyGroupId}/questions`,
    method: 'POST',
    data: {
      parentId,
      contents,
    },
  });
  return data;
};

export const changeStudyQuestion = async (
  studyGroupId: string,
  studyGroupQuestionId: number,
  contents: string,
) => {
  const { data } = await axiosAuthInstance({
    url: `/api/v1/study-groups/${studyGroupId}/questions/${studyGroupQuestionId}`,
    method: 'PATCH',
    data: {
      contents,
    },
  });
  return data;
};

export const deleteStudyQuestion = async (
  studyGroupId: string,
  studyGroupQuestionId: number,
) => {
  const { data } = await axiosAuthInstance({
    url: `/api/v1/study-groups/${studyGroupId}/questions/${studyGroupQuestionId}`,
    method: 'DELETE',
  });
  return data;
};

export const joinStudyGroup = async (studyGroupId: string) => {
  const { data } = await axiosAuthInstance({
    url: `/api/v1/study-groups/${studyGroupId}/members`,
    method: 'POST',
  });
  return data;
};
