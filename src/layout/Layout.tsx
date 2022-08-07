import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { selectFlashAlert } from '@store/slices/flashAlert';
import { FlashAlert, NavigationHeader } from '@containers';

import { LayoutContainer } from './style';

function Layout() {
  const state = useSelector(selectFlashAlert);

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
