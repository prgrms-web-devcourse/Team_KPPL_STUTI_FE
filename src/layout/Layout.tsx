import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect } from 'react';
import { getStorageItem } from '@utils/storage';
import { loginUser, selectUser } from '@store/slices/user';
import { openAlert, selectFlashAlert } from '@store/slices/flashAlert';
import { useAxiosInterceptor } from '@src/hooks/useAxiosAuthInterceptor';
import { FlashAlert, NavigationHeader } from '@containers';
import { getAuthUser } from '@apis/user';

import { LayoutContainer } from './style';

function Layout() {
  const state = useSelector(selectFlashAlert);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const pathname = useLocation();
  useAxiosInterceptor();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const autoLogin = async () => {
      if (!getStorageItem('token', '') || user.isLogin) return;

      try {
        const data = await getAuthUser();
        dispatch(loginUser(data));
      } catch (err) {
        console.error(`자동 로그인 에러: ${err}`);
      }
    };

    autoLogin();
  }, []);

  return (
    <LayoutContainer>
      {state.show && <FlashAlert />}
      <NavigationHeader />
      <main>
        <Outlet />
      </main>
    </LayoutContainer>
  );
}

export default Layout;
