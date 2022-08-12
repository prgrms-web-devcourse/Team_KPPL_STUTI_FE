import { axiosAuthInstance } from '@apis/axiosInstance';

export const getStudyManageInformation = async (studyGroupId: string) => {
  const { data } = await axiosAuthInstance({
    url: `/api/v1/study-groups/${studyGroupId}/members`,
    method: 'GET',
  });
  return data;
};

export const patchStudyMember = async (
  studyGroupId: string,
  studyGroupMemberId: number,
) => {
  const { data } = await axiosAuthInstance({
    url: `/api/v1/study-groups/${studyGroupId}/members/${studyGroupMemberId}`,
    method: 'PATCH',
  });
  return data;
};

export const deleteStudyMember = async (
  studyGroupId: string,
  studyGroupMemberId: number,
) => {
  const { data } = await axiosAuthInstance({
    url: `/api/v1/study-groups/${studyGroupId}/members/${studyGroupMemberId}`,
    method: 'DELETE',
  });
  return data;
};

export const deleteStudy = async (studyGroupId: string) => {
  const { data } = await axiosAuthInstance({
    url: `/api/v1/study-groups/${studyGroupId}`,
    method: 'DELETE',
  });
  return data;
};
