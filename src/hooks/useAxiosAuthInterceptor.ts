import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '@utils/storage';
import { HOME } from '@router/path';
import { axiosAuthInstance } from '@apis/axiosInstance';

export const useAxiosInterceptor = () => {
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
          removeStorageItem('token');
          window.history.replaceState('', '', HOME);
          break;

        default:
          return Promise.reject(err);
      }
    },
  );
};
