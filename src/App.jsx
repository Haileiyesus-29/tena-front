import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import NavBar from './layout/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
   return (
      <>
         <NavBar />
         <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='*' element={<NotFound />} />
         </Routes>
      </>
   )
}

export default App
