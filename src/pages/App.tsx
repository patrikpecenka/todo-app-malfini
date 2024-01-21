import '@mantine/core/styles.css';
import { BrowserRouter } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications';
import { AddItemModal } from 'components/Modal';
import { RootRouter } from 'routers/root.router';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
})

function App() {
  return (
    <MantineProvider theme={theme} >
      <Notifications position="top-right" />
      <ModalsProvider modals={{ addItem: AddItemModal }}>
        <BrowserRouter>
          <RootRouter />
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider >
  )
}

export default App