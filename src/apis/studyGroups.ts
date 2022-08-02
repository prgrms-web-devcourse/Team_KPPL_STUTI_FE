import axiosInstance from '@apis/axiosInstance';

export const getStudyList = async ({
  lastStudyId,
}: {
  lastStudyId?: number;
}) => {
  const { data } = await axiosInstance({
    url: `/mock/studyList${lastStudyId}.json`,
    method: 'GET',
  });
  return data;
};
