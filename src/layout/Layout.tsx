import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectFlashAlert } from '@store/slices/flashAlert';
import { getStorageItem } from '@src/utils/storage';
import { loginUser } from '@src/store/slices/user';
import { getAuthUser } from '@src/apis/user';
import { FlashAlert, NavigationHeader } from '@containers';

import { LayoutContainer } from './style';

function Layout() {
  const state = useSelector(selectFlashAlert);
  const dispatch = useDispatch();

  useEffect(() => {
    const autoLogin = async () => {
      if (!getStorageItem('token', '')) return;
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
