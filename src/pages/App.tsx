import AppShell from './AppShell'
import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals'
import { AddItemModal } from 'components/Modal';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
})

function App() {
  return (
    <MantineProvider theme={theme} >
      <ModalsProvider modals={{ addItem: AddItemModal }}>
        <AppShell />
      </ModalsProvider>
    </MantineProvider >
  )
}

export default App