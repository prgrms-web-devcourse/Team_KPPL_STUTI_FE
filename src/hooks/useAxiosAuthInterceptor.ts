import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '@utils/storage';
import { logoutUser } from '@store/slices/user';
import { openAlert } from '@store/slices/flashAlert';
import { HOME } from '@router/path';
import { axiosAuthInstance } from '@apis/axiosInstance';

export const useAxiosInterceptor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          return await axiosAuthInstance.request(err.config);

        case 'T002':
          dispatch(
            openAlert({
              severity: 'error',
              title: '요청 실패',
              content: '로그인이 필요합니다.',
            }),
          );
          removeStorageItem('token');
          dispatch(logoutUser());
          navigate(HOME, { replace: true });
          break;

        default:
          return Promise.reject(err);
      }
    },
  );
};
