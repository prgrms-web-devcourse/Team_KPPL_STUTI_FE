import { BrowserRouter } from 'react-router-dom';
import { MuiProvider, GlobalStyle } from '@styles';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <MuiProvider>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </MuiProvider>
    </>
  ),
];
