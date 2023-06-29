import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/reducers/userReducer'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const showToastSuccess = message => {
      toast.success(message, {
         position: toast.POSITION.TOP_RIGHT,
      })
   }

   const showToastError = message => {
      toast.error(message, {
         position: toast.POSITION.TOP_RIGHT,
      })
   }

   const handleSubmit = async e => {
      e.preventDefault()

      try {
         const response = await axios.post(
            'http://localhost:5000/api/login',
            {
               email,
               password,
            },
            {
               withCredentials: true,
            }
         )

         if (response.status === 200) {
            showToastSuccess('Login successful')
            dispatch(setUser(response.data))
            navigate('/')
         } else {
            showToastError('Login failed')
         }
      } catch (error) {
         showToastError('Login failed')
      }
   }

   return (
      <div className='hero min-h-screen bg-base-200 px-[15%]'>
         <ToastContainer />
         <div className='hero-content flex-col lg:flex-row-reverse'>
            <div className='text-center lg:text-left'>
               <h1 className='text-5xl font-bold'>Login now!</h1>
               <p className='py-6'>
                  Elevate your healthcare experience with Tena: Seamless
                  appointments, expert doctors, and personalized care, all in
                  one app. Join us today and unlock a new level of convenience
                  and well-being.
               </p>
            </div>

            <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
               <div className='card-body'>
                  <form onSubmit={handleSubmit}>
                     <div className='form-control'>
                        <label className='label'>
                           <span className='label-text'>Email</span>
                        </label>
                        <input
                           type='text'
                           placeholder='email'
                           className='input input-bordered'
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                        />
                     </div>
                     <div className='form-control'>
                        <label className='label'>
                           <span className='label-text'>Password</span>
                        </label>
                        <input
                           type='password'
                           placeholder='password'
                           className='input input-bordered'
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                        />
                        <label className='label'>
                           <a
                              href='#'
                              className='label-text-alt link link-hover'
                           >
                              Forgot password?
                           </a>
                           <a
                              href='#'
                              className='label-text-alt link link-hover text-primary'
                           >
                              Signup instead
                           </a>
                        </label>
                     </div>
                     <div className='form-control mt-6'>
                        <button type='submit' className='btn btn-primary'>
                           Login
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default LoginPage
