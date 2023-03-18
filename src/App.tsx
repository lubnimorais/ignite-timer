import { ThemeProvider } from 'styled-components';

import { BrowserRouter } from 'react-router-dom';

import { Router } from './routes';

import { defaultThemes } from './styles/themes/default';
import { GlobalStyle } from './styles/global';

function App() {
  return (
    <ThemeProvider theme={defaultThemes}>
      <GlobalStyle />

      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export { App };
