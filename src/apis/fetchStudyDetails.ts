import axios, { AxiosInstance } from 'axios';

const host = process.env.REACT_APP_API_HOST ?? 'localhost';
const port = process.env.REACT_APP_API_PORT ?? 3000;

const API_ENDPOINT = `http://${host}:${port}`;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export const fetchStudyDetails = async () => {
  try {
    const { data } = await axiosInstance({
      url: '/dummy/detailsData.json',
      method: 'GET',
    });
    return data;
  } catch (error) {
    new Error('fetch Error');
  }
};
