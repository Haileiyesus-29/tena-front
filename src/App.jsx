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
   const { isLoggedIn, user } = useSelector(store => store.user)
   return (
      <>
         <NavBar />
         <Routes>
            {user?.accType === 'user' && (
               <Route path='/' element={<HomePage />} />
            )}
            {isLoggedIn || <Route path='/' element={<HomePage />} />}
            {user?.accType === 'hospital' && (
               <Route path='/' element={<Hospital />} />
            )}
            {user?.accType === 'doctor' && (
               <Route path='/' element={<ProfilePage />} />
            )}
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/appointments' element={<AppointmentPage />} />
            {user?.accType !== 'hospital' && (
               <>
                  {/* <Route path='/messages' element={<MessagePage />} /> */}
                  <Route path='/profile' element={<ProfilePage />} />
                  {user?.accType === 'user' && (
                     <>
                        <Route path='/profile/:id' element={<ProfilePage />} />
                        <Route
                           path='/hospital/:id'
                           element={<HospitalPage />}
                        />
                     </>
                  )}
                  <Route path='/newapp/:id' element={<NewAppointmentPage />} />
               </>
            )}
            {user?.accType === 'hospital' && (
               <>
                  <Route path='/profile' element={<Hospital />} />
                  <Route path='/newdoctor' element={<NewDoctor />} />
               </>
            )}
            <Route path='/update' element={<UpdateProfile />} />
            <Route path='*' element={<NotFound />} />
         </Routes>
         {isLoggedIn && <Footer />}
      </>
   )
}

export default App
