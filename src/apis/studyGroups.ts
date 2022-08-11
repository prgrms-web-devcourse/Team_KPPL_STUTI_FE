import axiosInstance, { axiosAuthInstance } from '@apis/axiosInstance';

export const getAllStudies = async (queries: {
  mbti?: string;
  topic?: string;
  region?: string;
  lastStudyGroupId?: number;
  size?: number;
}) => {
  const queryStrings = Object.entries(queries)
    .map(([key, value]) => {
      if (value) {
        return `${key}=${value}&`;
      } else {
        return '';
      }
    })
    .join('')
    .slice(0, -1);

  const { data } = await axiosInstance({
    method: 'GET',
    url: `/api/v1/study-groups?${queryStrings}`,
  });

  return data;
};

export const getUserStudies = async (
  userId: number,
  queries: {
    studyGroupMemberRole?: string;
    lastStudyGroupId?: number;
    size?: number;
  },
) => {
  const queryStrings = Object.entries(queries)
    .map(([key, value]) => {
      if (value) {
        return `${key}=${value}&`;
      } else {
        return '';
      }
    })
    .join('')
    .slice(0, -1);

  const { data } = await axiosInstance({
    method: 'GET',
    url: `/api/v1/study-groups/members/${userId}?${queryStrings}`,
  });

  return data;
};

export const deleteStudy = async (studyId: number) => {
  await axiosAuthInstance({
    method: 'DELETE',
    url: `/api/v1/study-groups/${studyId}`,
  });
};
