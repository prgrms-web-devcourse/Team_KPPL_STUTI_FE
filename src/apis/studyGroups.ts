import axiosInstance from '@apis/axiosInstance';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

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

  const url = `${API_ENDPOINT}/api/v1/study-groups?${queryStrings}`;

  const { data } = await axiosInstance({
    method: 'GET',
    url,
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

  const url = `${API_ENDPOINT}/api/v1/study-groups/members/${userId}?${queryStrings}`;

  const { data } = await axiosInstance({
    method: 'GET',
    url,
    // 로그인 구현 후 axiosInstance 변경
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2Iiwicm9sZXMiOiJST0xFX01FTUJFUiIsImlhdCI6MTY2MDAyMzIyOCwiZXhwIjoxNjYzMDIzMjI4fQ.lequMTJd6iooVkkY7-f7ALWTSg7qabGZLuM-uiRoWZs',
    },
  });

  return data;
};

export const deleteStudy = async (studyId: number) => {
  const url = `${API_ENDPOINT}/api/v1/study-groups/${studyId}`;
  await axiosInstance({
    method: 'DELETE',
    url,
    // 로그인 구현 후 axiosInstance 변경
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2Iiwicm9sZXMiOiJST0xFX01FTUJFUiIsImlhdCI6MTY2MDAyMzIyOCwiZXhwIjoxNjYzMDIzMjI4fQ.lequMTJd6iooVkkY7-f7ALWTSg7qabGZLuM-uiRoWZs',
    },
  });
};
