import axiosInstance from '@apis/axiosInstance';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const getUserProfile = async (userId: number) => {
  const url = `${API_ENDPOINT}/api/v1/members/${userId}`;

  const { data } = await axiosInstance({
    method: 'GET',
    url,
  });

  return data;
};

export const updateUserProfile = async (
  userId: number,
  data: {
    profileImageUrl?: string;
    nickname?: string;
    field?: string;
    career?: string;
    MBTI?: string;
    githubUrl?: string;
    blogUrl?: string;
  },
) => {
  const url = `${API_ENDPOINT}/api/v1/members/${userId}`;

  const res = await axiosInstance({
    // API 수정 중
    method: 'PATCH',
    url,
    data,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2Iiwicm9sZXMiOiJST0xFX01FTUJFUiIsImlhdCI6MTY2MDAyMzIyOCwiZXhwIjoxNjYzMDIzMjI4fQ.lequMTJd6iooVkkY7-f7ALWTSg7qabGZLuM-uiRoWZs',
    },
  });

  console.log(res);
};
