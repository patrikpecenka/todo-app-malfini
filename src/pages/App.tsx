import AppShell from './AppShell'

import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
})

function App() {
  return (
    <MantineProvider theme={theme} >
      <AppShell />
    </MantineProvider>
  )
}

export default App