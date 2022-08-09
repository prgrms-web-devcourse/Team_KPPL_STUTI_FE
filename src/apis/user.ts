import axiosInstance, { axiosAuthInstance } from '@apis/axiosInstance';

export const login = async (id: number) => {
  const { data } = await axiosInstance({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    url: '/api/v1/login',
    method: 'POST',
    data: {
      id,
    },
  });

  return data;
};

export const getAuthUser = async () => {
  const { data } = await axiosAuthInstance({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    url: '/api/v1/auth',
    method: 'GET',
  });

  return data;
};

export const logout = async () => {
  const { data } = await axiosAuthInstance({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    url: '/api/v1/logout',
    method: 'POST',
  });

  return data;
};
