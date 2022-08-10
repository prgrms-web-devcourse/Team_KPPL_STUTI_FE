import axiosInstance from '@apis/axiosInstance';

export const getStudyList = async ({
  lastStudyId,
}: {
  lastStudyId?: number;
}) => {
  const { data } = await axiosInstance({
    url: process.env.REACT_APP_API_ENDPOINT
      ? '/api/v1/study-groups'
      : `/mock/studyList${lastStudyId}.json`,
    method: 'GET',
  });
  return data;
};
