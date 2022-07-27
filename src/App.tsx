import { Provider } from 'react-redux';
import store from '@store';
import Routers from '@router';
import styled from '@emotion/styled';

import { GlobalStyle, MuiProvider } from './styles';

const Layout = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <MuiProvider>
        <Layout>
          <Routers />
        </Layout>
      </MuiProvider>
    </Provider>
  );
}

export default App;
