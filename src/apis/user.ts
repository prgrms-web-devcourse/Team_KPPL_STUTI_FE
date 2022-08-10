import { isDev } from '@constants/nodeEnv';
import axiosInstance from '@apis/axiosInstance';

export const login = async (id: number) => {
  const { data } = await axiosInstance({
    baseURL: isDev
      ? 'http://localhost:3000'
      : process.env.REACT_APP_API_ENDPOINT,
    url: isDev ? '/mock/loginUser.json' : '/api/v1/login',
    method: isDev ? 'GET' : 'POST',
    data: {
      id,
    },
  });

  return data;
};

export const getAuthUser = async () => {
  const { data } = await axiosInstance({
    baseURL: isDev
      ? 'http://localhost:3000'
      : process.env.REACT_APP_API_ENDPOINT,
    url: isDev ? '/mock/authUser.json' : '/api/v1/auth',
    method: 'GET',
  });

  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance({
    url: '/api/v1/logout',
    method: 'POST',
  });

  return data;
};
