import axios, { AxiosInstance } from 'axios';
import { getStorageItem } from '@src/utils/storage';

const host = process.env.REACT_APP_API_ENDPOINT ?? 'http://localhost:3000';

const API_ENDPOINT = host;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_ENDPOINT, // baseURL 미리세팅
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
  // (response) => Promise.resolve(response),
  (config) => {
    config.headers.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3Iiwicm9sZXMiOiJST0xFX01FTUJFUiIsImlhdCI6MTY2MDAyMzIyOCwiZXhwIjoxNjYzMDIzMjI4fQ.r1-tjiAUYPbfJtA7wbKSgI6C7t7ajnDkMSPMytnxJ9s';
    return config;
  },
  (error) => Promise.reject(error),
);

axiosAuthInstance.interceptors.request.use((config) => {
  const token = getStorageItem('token', '');

  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
