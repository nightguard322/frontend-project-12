import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './features/auth/Components/Login.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import NotFound from './routes/NotFound.jsx'
import MainPage from './pages/MainPage.jsx'
import { MantineProvider } from '@mantine/core';

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <MainPage/>
              </ProtectedRoute>
            }>
            </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
