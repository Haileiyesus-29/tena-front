import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/reducers/userReducer'
import { useNavigate } from 'react-router-dom'

function SignupPage() {
   const dispatch = useDispatch()
   const [userType, setUserType] = useState('User')
   const navigate = useNavigate()

   const userTypeHandler = e => {
      setUserType(e.target.value.toString())
   }

   const showToastSuccess = message => {
      toast.success(message, {
         position: toast.POSITION.TOP_RIGHT,
      })
   }

   const showToastErrors = errors => {
      errors.forEach(message => {
         toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
         })
      })
   }

   const handleSubmit = async e => {
      e.preventDefault()

      try {
         const form = e.target
         const formData = new FormData(form)
         const formObject = {}

         // Iterate over form elements and assign their values to the form object
         for (let [name, value] of formData.entries()) {
            formObject[name] = value
         }

         const apiUrl =
            userType === 'User'
               ? 'http://localhost:5000/api/users'
               : 'http://localhost:5000/api/hospitals'

         const response = await axios.post(apiUrl, formObject, {
            withCredentials: true,
         })

         if (response.status === 201) {
            showToastSuccess('Registration successful')
            dispatch(setUser(response.data))
            navigate('/')
         } else {
            showToastErrors(['Registration failed'])
         }
      } catch (error) {
         showToastErrors(error.response.data.errors)
      }
   }

   return (
      <div className='hero min-h-screen bg-base-200 px-[15%]'>
         <ToastContainer />
         <div className='hero-content flex-col lg:flex-row-reverse'>
            <div className='text-center lg:text-left'>
               <h1 className='text-5xl font-bold'>Join Tena today!</h1>
               <p className='py-6'>
                  Elevate your healthcare experience with Tena: Seamless
                  appointments, expert doctors, and personalized care, all in
                  one app. Join us today and unlock a new level of convenience
                  and well-being.
               </p>
            </div>

            <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
               <div className='card-body'>
                  <form id='registrationForm' onSubmit={handleSubmit}>
                     <div className='form-control'>
                        <label className='label'>
                           <span className='label-text'>Full Name</span>
                        </label>
                        <input
                           type='text'
                           placeholder='your name'
                           className='input input-bordered'
                           name='name'
                        />
                     </div>
                     <div className='form-control'>
                        <label className='label'>
                           <span className='label-text'>Your Email</span>
                        </label>
                        <input
                           type='email'
                           placeholder='email'
                           className='input input-bordered'
                           name='email'
                        />
                     </div>
                     <div className='form-control'>
                        <label className='label'>
                           <span className='label-text'>Password</span>
                        </label>
                        <input
                           type='password'
                           placeholder='your password'
                           className='input input-bordered'
                           name='password'
                        />
                     </div>
                     <div className='form-control'>
                        <label className='label'>
                           <span className='label-text'>Account Type</span>
                        </label>
                        <select
                           className='input input-bordered'
                           onChange={userTypeHandler}
                        >
                           <option defaultChecked value='User'>
                              User
                           </option>
                           <option value='Hospital'>Hospital</option>
                        </select>
                     </div>
                     {userType === 'Hospital' && (
                        <>
                           <div className='form-control'>
                              <label className='label'>
                                 <span className='label-text'>
                                    Phone number
                                 </span>
                              </label>
                              <input
                                 type='tel'
                                 placeholder='phone number'
                                 className='input input-bordered'
                                 name='contact'
                              />
                           </div>
                           <div className='form-control'>
                              <label className='label'>
                                 <span className='label-text'>Address</span>
                              </label>
                              <input
                                 type='text'
                                 placeholder='address'
                                 className='input input-bordered'
                                 name='address'
                              />
                           </div>
                           <div className='form-control'>
                              <label className='label'>
                                 <span className='label-text'>Description</span>
                              </label>
                              <textarea
                                 placeholder='description'
                                 className='input input-bordered'
                                 name='description'
                              ></textarea>
                           </div>
                        </>
                     )}
                     <div className='form-control mt-6'>
                        <button className='btn btn-primary'>Signup</button>
                     </div>
                  </form>
                  <label className='label'>
                     <a
                        href='#'
                        className='label-text-alt link link-hover text-primary'
                     >
                        Already have an account? Login
                     </a>
                  </label>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SignupPage
