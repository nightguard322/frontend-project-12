import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './features/auth/Components/Login.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import NotFound from './routes/NotFound.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <MainPage/>
            </ProtectedRoute>
          }>
            <Route path='/login' element={<Login/>}/>
          </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
