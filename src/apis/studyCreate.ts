import axiosInstance from './axiosInstance';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;
const token = process.env.REACT_APP_TEST_TOKEN;

export const createNewStudy = async (formData: FormData) => {
  const { data } = await axiosInstance({
    baseURL: API_END_POINT,
    url: '/study-groups',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
