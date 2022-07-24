import React from 'react';
import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import { Provider } from 'react-redux';
import store from '@store';
import reset from '@styles/reset';
import Routers from '@router';

const Layout = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Global styles={reset} />
      <Layout>
        <Routers />
      </Layout>
    </Provider>
  );
}

export default App;
