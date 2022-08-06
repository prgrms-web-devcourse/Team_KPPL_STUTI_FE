import { Provider } from 'react-redux';
import store from '@store';
import Routers from '@router';

import { GlobalStyle, MuiProvider } from './styles';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <MuiProvider>
        <Routers />
      </MuiProvider>
    </Provider>
  );
}

export default App;
