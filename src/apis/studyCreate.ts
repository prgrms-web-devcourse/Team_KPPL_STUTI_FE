import { axiosAuthInstance } from './axiosInstance';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

export const createNewStudy = async (formData: FormData) => {
  const { data } = await axiosAuthInstance({
    baseURL: API_END_POINT,
    url: '/api/v1/study-groups',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
