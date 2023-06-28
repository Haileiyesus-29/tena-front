import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function NavBar() {
   const { isLoggedIn } = useSelector(store => store.user)

   return (
      <div className='navbar shadow-md px-[10%] fixed z-50 top-0 bg-slate-100 bg-opacity-50 backdrop-blur-sm'>
         <div className='navbar-start'>
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
               {isLoggedIn && (
                  <ul
                     tabIndex={0}
                     className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                  >
                     <li>
                        <NavLink to={'/'}>Home</NavLink>
                     </li>

                     <li>
                        <NavLink to={'/profile'}>Profile</NavLink>
                     </li>
                     <li>
                        <NavLink to={'/messages'}>Messages</NavLink>
                     </li>
                     <li>
                        <NavLink to={'/appointments'}>Appointments</NavLink>
                     </li>
                  </ul>
               )}
            </div>
            <a className='btn btn-ghost normal-case text-xl'>daisyUI</a>
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
                  <li>
                     <NavLink className='rounded-full' to={'/messages'}>
                        Messages
                     </NavLink>
                  </li>
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
               <NavLink
                  to={'/logout'}
                  className='btn btn-primary px-6 py-2 rounded-full'
               >
                  Logout
               </NavLink>
            )}
            {isLoggedIn || (
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
