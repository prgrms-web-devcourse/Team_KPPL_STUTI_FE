import { Provider } from 'react-redux';
import React from 'react';
import reset from '@styles/reset';
import store from '@store';
import Routers from '@router';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';

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
