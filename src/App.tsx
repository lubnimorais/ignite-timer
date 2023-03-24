import { ThemeProvider } from 'styled-components';

import { BrowserRouter } from 'react-router-dom';

import { Router } from './routes';

import { defaultThemes } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { CyclesContextProvider } from './contexts/CyclesContext';

function App() {
  return (
    <ThemeProvider theme={defaultThemes}>
      <GlobalStyle />

      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export { App };
