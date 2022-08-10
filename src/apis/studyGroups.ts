import axiosInstance from '@apis/axiosInstance';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const getStudyList = async (queries: {
  lastStudyGroupId?: number;
  size?: number;
  mbti?: string;
  topic?: string;
  region?: string;
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

  const url = `${API_ENDPOINT}/api/v1/study-groups?${queryStrings}`;

  const { data } = await axiosInstance({
    url,
    method: 'GET',
  });

  console.log(data);

  return data;
};

export const deleteStudy = async (studyId: number) => {
  console.log(`${API_ENDPOINT}/study-groups/${studyId}`);
  // const { data } = await axiosInstance({
  //   url: `${API_ENDPOINT}/study-groups/${studyId}`,
  //   method: 'DELETE',
  // });
  // return data;
};
