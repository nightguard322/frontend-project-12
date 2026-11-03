import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18n.jsx'
import '@mantine/notifications/styles.css'; 

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <Notifications /> 
          <App>
          </App>
        </QueryClientProvider>
      </MantineProvider>
  </StrictMode>,
)
