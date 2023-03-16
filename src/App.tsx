import { ThemeProvider } from "styled-components"

import { defaultThemes } from "./styles/themes/default"

import { Button } from "./components/Button"

function App() {
 return (
  <ThemeProvider theme={defaultThemes}>
    <Button variant="primary"></Button>
    <Button variant="secondary"></Button>
    <Button variant="danger"></Button>
    <Button variant="success"></Button>
    <Button></Button>
  </ThemeProvider>
 )
}

export {App}
