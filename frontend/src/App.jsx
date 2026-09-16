import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Login from './features/auth/Components/Login.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import NotFound from './routes/NotFound.jsx'
import { MainPage } from '../src/features/chat/Components/MainPage.jsx'
import { RegisterPage } from './features/auth/Components/RegisterPage.jsx';
import Layout from './pages/Layout.jsx';
import TestBug from './features/testBug.jsx';

  const router = createBrowserRouter([
    {
      path: '/',
      element:  <Layout/>,
      children: [
        { 
          index: true, element: ( 
          <ProtectedRoute>
            <MainPage/>
          </ProtectedRoute>)
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/register',
          element: <RegisterPage/>
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    },
    
  ])
function App() {
  return <RouterProvider router={router} />
}

export default App
