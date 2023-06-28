import { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/reducers/userReducer'

function SignupPage() {
   const dispatch = useDispatch()
   const [userType, setUserType] = useState('User')

   const userTypeHandler = e => {
      setUserType(e.target.value.toString())
   }
   const showToastSuccess = message => {
      toast.success(message, {
         position: toast.POSITION.TOP_RIGHT,
      })
   }
   const showToastErrors = errors => {
      errors.forEach(error => {
         toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
         })
      })
   }

   useEffect(() => {
      // Define the effect to be triggered when the form is submitted
      const handleSubmit = async e => {
         e.preventDefault()
         // Perform the form submission logic here, such as fetching to the server
         // Update the state based on the response received from the server

         try {
            // Create the form data object with the input values
            const formData = new FormData(e.target)
            const formObject = Object.fromEntries(formData.entries())

            // Determine the API endpoint based on the account type
            const apiUrl =
               userType === 'User'
                  ? 'http://localhost:5000/api/users'
                  : 'http://localhost:5000/api/hospitals'

            // Send the POST request to the appropriate API endpoint
            const response = await axios.post(apiUrl, formObject)

            // Handle the response based on the status or data received
            if (response.status === 201) {
               showToastSuccess('Registration successful')
               dispatch(setUser(response.data))
            } else {
               showToastErrors(['Registration failed'])
               // Handle the error or display an error message
            }
         } catch (error) {
            showToastErrors([error])
         }
      }

      // Attach the form submission event listener
      document
         .querySelector('#registrationForm')
         .addEventListener('submit', handleSubmit)

      // Clean up the event listener when the component unmounts
      return () => {
         document
            .querySelector('#registrationForm')
            .removeEventListener('submit', handleSubmit)
      }
   }, [userType])

   return (
      <form id='registrationForm' className='pt-[4rem]'>
         <ToastContainer />
         <div className='min-h-screen bg-slate-50 w-full px-[15%] flex items-center justify-center'>
            <div className='card gap-4 shadow-lg bg-white bg-opacity-80 p-8 w-1/2 max-w-2xl mt-[4rem]'>
               <div className='form-control flex-row'>
                  <label className='mr-auto label'>
                     <span className='label-text'>Full Name</span>
                  </label>
                  <input
                     type='text'
                     placeholder='your name'
                     className='input input-bordered'
                     name='name'
                  />
               </div>
               <div className='form-control flex-row'>
                  <label className='mr-auto label'>
                     <span className='label-text'>your email</span>
                  </label>
                  <input
                     type='email'
                     placeholder='email'
                     className='input input-bordered'
                     name='email'
                  />
               </div>
               <div className='form-control flex-row'>
                  <label className='mr-auto label'>
                     <span className='label-text'>Password</span>
                  </label>
                  <input
                     type='password'
                     placeholder='your password'
                     className='input input-bordered'
                     name='password'
                  />
               </div>
               <div className='form-control flex-row'>
                  <label className='mr-auto label'>
                     <span className='label-text'>Account Type</span>
                  </label>
                  <select
                     className='input input-bordered'
                     onChange={userTypeHandler}
                  >
                     <option value='User'>User</option>
                     <option value='Hospital'>Hospital</option>
                  </select>
               </div>
               {userType === 'Hospital' && (
                  <>
                     <div className='form-control flex-row'>
                        <label className='mr-auto label'>
                           <span className='label-text'>Phone number</span>
                        </label>
                        <input
                           type='tel'
                           placeholder='phone number'
                           className='input input-bordered'
                           name='contact'
                        />
                     </div>
                     <div className='form-control flex-row'>
                        <label className='mr-auto label'>
                           <span className='label-text'>Address</span>
                        </label>
                        <input
                           type='text'
                           placeholder='address'
                           className='input input-bordered'
                           name='addess'
                        />
                     </div>
                  </>
               )}
               <label className='mr-auto label'>
                  <a
                     href='#'
                     className='label-text-alt link link-hover text-primary'
                  >
                     Already have an account? Login
                  </a>
               </label>
               <div className='form-control mt-6'>
                  <button className='btn btn-primary'>Signup</button>
               </div>
            </div>
         </div>
      </form>
   )
}

export default SignupPage
