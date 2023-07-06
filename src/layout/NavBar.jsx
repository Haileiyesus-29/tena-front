import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setUser, logoutUser } from '../store/reducers/userReducer'

function NavBar() {
   const { isLoggedIn, user } = useSelector(store => store.user)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = async () => {
      try {
         const response = await axios.get('http://localhost:5000/api/logout', {
            withCredentials: true,
         })

         if (response.status === 200) {
            dispatch(setUser(null))
            dispatch(logoutUser())
            navigate('/')
         }
      } catch (error) {
         console.error('Logout failed', error)
      }
   }

   return (
      <div className='navbar shadow-md md:px-[10%] px-4 fixed z-50 top-0 bg-slate-100 bg-opacity-50 backdrop-blur-sm'>
         <div className='navbar-start'>
            {isLoggedIn && (
               <div className='dropdown'>
                  <label tabIndex={0} className='btn btn-ghost lg:hidden'>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                     >
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth='2'
                           d='M4 6h16M4 12h8m-8 6h16'
                        />
                     </svg>
                  </label>

                  <ul className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
                     {user?.accType === 'user' && (
                        <li>
                           <NavLink to={'/'}>Home</NavLink>
                        </li>
                     )}
                     <li>
                        <NavLink className='rounded-full' to={'/profile'}>
                           Profile
                        </NavLink>
                     </li>
                     {user.accType !== 'hospital' && (
                        <li>
                           <NavLink className='rounded-full' to={'/messages'}>
                              Messages
                           </NavLink>
                        </li>
                     )}
                     <li>
                        <NavLink to={'/appointments'}>Appointments</NavLink>
                     </li>
                  </ul>
               </div>
            )}
            <Link to={'/'} className='btn btn-ghost normal-case text-xl'>
               Tena
            </Link>
         </div>
         <div className='navbar-center hidden lg:flex'>
            {isLoggedIn && (
               <ul className='menu menu-horizontal px-1 flex gap-2'>
                  <li>
                     <NavLink className='rounded-full' to={'/'}>
                        Home
                     </NavLink>
                  </li>

                  <li>
                     <NavLink className='rounded-full' to={'/profile'}>
                        Profile
                     </NavLink>
                  </li>
                  {user.accType !== 'hospital' && (
                     <li>
                        <NavLink className='rounded-full' to={'/messages'}>
                           Messages
                        </NavLink>
                     </li>
                  )}
                  <li>
                     <NavLink className='rounded-full' to={'/appointments'}>
                        Appointments
                     </NavLink>
                  </li>
               </ul>
            )}
         </div>
         <div className='navbar-end flex gap-4'>
            {isLoggedIn && (
               <button
                  className='btn btn-primary px-6 py-2 rounded-full'
                  onClick={handleLogout}
               >
                  Logout
               </button>
            )}
            {!isLoggedIn && (
               <>
                  <NavLink
                     to={'/login'}
                     className='btn btn-primary px-6 py-2 rounded-full'
                  >
                     Login
                  </NavLink>
                  <NavLink
                     to={'/signup'}
                     className='btn btn-outline px-6 py-2 btn-primary rounded-full'
                  >
                     SignUp
                  </NavLink>
               </>
            )}
         </div>
      </div>
   )
}

export default NavBar
