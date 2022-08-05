import { Outlet } from 'react-router';
import NavigationHeader from '@src/containers/NavigationHeader/NavigationHeader';

function Layout() {
  return (
    <>
      <NavigationHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
