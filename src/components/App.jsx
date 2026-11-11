import { StrictMode } from 'react'
import Routes from '../Router.jsx'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const queryClient = new QueryClient()

const App = () => (
    <StrictMode>
        <MantineProvider env="test">
          <QueryClientProvider client={queryClient}>
            <Notifications /> 
            <Routes/>
          </QueryClientProvider>
        </MantineProvider>
    </StrictMode>
)

export default App;
