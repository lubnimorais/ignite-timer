import { ThemeProvider } from 'styled-components';

import { defaultThemes } from './styles/themes/default';
import { GlobalStyle } from './styles/global';

import { Button } from './components/Button';

function App() {
  return (
    <ThemeProvider theme={defaultThemes}>
      <GlobalStyle />

      <Button variant="primary"></Button>
      <Button variant="secondary"></Button>
      <Button variant="danger"></Button>
      <Button variant="success"></Button>
      <Button></Button>
    </ThemeProvider>
  );
}

export { App };
