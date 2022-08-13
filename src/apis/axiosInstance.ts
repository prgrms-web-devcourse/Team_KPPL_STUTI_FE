import axios, { AxiosInstance } from 'axios';
import { getStorageItem, setStorageItem } from '@utils/storage';
import { HOME } from '@src/router/path';

const host = process.env.REACT_APP_API_ENDPOINT ?? 'http://localhost:3000';

const API_ENDPOINT = host;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosAuthInstance: AxiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => Promise.reject(error),
);

axiosAuthInstance.interceptors.request.use((config) => {
  const token = getStorageItem('token', '');

  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosAuthInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  async (err) => {
    const { data } = err.response;
    const { errorCode } = data;

    switch (errorCode) {
      case 'T001':
        setStorageItem('token', data.newToken);
        console.log('set New Token and repeat request!');
        return await axiosAuthInstance.request(err.config);

      case 'T002':
        console.error('다시 로그인 하셔야 합니다!');
        window.history.replaceState('', '', HOME);
        break;

      default:
        return Promise.reject(err);
    }
  },
);

export default axiosInstance;
