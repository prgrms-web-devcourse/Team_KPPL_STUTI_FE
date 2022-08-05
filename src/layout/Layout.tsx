import { Outlet } from 'react-router';
import NavigationHeader from '@src/containers/NavigationHeader/NavigationHeader';

import { LayoutContainer } from './style';

function Layout() {
  return (
    <LayoutContainer>
      <NavigationHeader />
      <main>
        <Outlet />
      </main>
    </LayoutContainer>
  );
}

export default Layout;