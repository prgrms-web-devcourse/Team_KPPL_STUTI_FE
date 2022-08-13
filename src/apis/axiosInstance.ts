import axios, { AxiosInstance } from 'axios';
import { getStorageItem } from '@utils/storage';

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

export default axiosInstance;
