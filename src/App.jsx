import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import NavBar from './layout/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Footer from './layout/Footer'
import { useSelector } from 'react-redux'
import MessagePage from './pages/MessagePage'
import AppointmentPage from './pages/AppointmentPage'
import ProfilePage from './pages/ProfilePage'
import HospitalPage from './pages/HospitalPage'
import NewAppointmentPage from './pages/NewAppointmentPage'
import Hospital from './pages/Hospital'
import NewDoctor from './pages/NewDoctor'
import UpdateProfile from './pages/UpdateProfile'

function App() {
   return (
      <>
         <NavBar />
         <Routes>
            <Route path='/' element={<HomePage />} />
            {/* <Route path='/' element={<ProfilePage />} /> */}
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/appointments' element={<AppointmentPage />} />
            <Route path='/messages' element={<MessagePage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/profile/:id' element={<ProfilePage />} />
            <Route path='/hospital/:id' element={<HospitalPage />} />
            <Route path='/newapp/:id' element={<NewAppointmentPage />} />
            <Route path='/profile' element={<Hospital />} />
            <Route path='/newdoctor' element={<NewDoctor />} />
            <Route path='/update' element={<UpdateProfile />} />
            <Route path='*' element={<NotFound />} />
         </Routes>
         <Footer />
      </>
   )
}

export default App
