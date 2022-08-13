import axiosInstance, { axiosAuthInstance } from '@apis/axiosInstance';

export const getAllStudies = async (params: {
  mbti: string | null;
  topic: string | null;
  region: string | null;
  lastStudyGroupId: number | null;
  size: number | null;
}) => {
  const { data } = await axiosInstance({
    method: 'GET',
    url: '/api/v1/study-groups',
    params,
  });

  return data;
};

export const getUserStudies = async (
  userId: number,
  params: {
    studyGroupMemberRole: string | null;
    lastStudyGroupId: number | null;
    size: number | null;
  },
) => {
  const { data } = await axiosInstance({
    method: 'GET',
    url: `/api/v1/study-groups/members/${userId}`,
    params,
  });

  return data;
};

export const deleteStudy = async (studyId: number) => {
  await axiosAuthInstance({
    method: 'DELETE',
    url: `/api/v1/study-groups/${studyId}`,
  });
};
