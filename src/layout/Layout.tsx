import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect } from 'react';
import { selectFlashAlert } from '@store/slices/flashAlert';
import { getStorageItem } from '@src/utils/storage';
import { loginUser, selectUser } from '@src/store/slices/user';
import { getAuthUser } from '@src/apis/user';
import { FlashAlert, NavigationHeader } from '@containers';

import { LayoutContainer } from './style';

function Layout() {
  const state = useSelector(selectFlashAlert);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const pathname = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const autoLogin = async () => {
      if (!getStorageItem('token', '') || user.isLogin) return;
      const data = await getAuthUser();
      dispatch(loginUser(data));
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
