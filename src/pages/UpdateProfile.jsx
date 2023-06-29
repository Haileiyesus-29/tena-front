import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../store/reducers/userReducer'
import { useNavigate } from 'react-router-dom'

function UpdateProfile() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { user } = useSelector(store => store.user)
   const userType = user?.accType

   const showToastSuccess = message => {
      toast.success(message, {
         position: toast.POSITION.TOP_RIGHT,
      })
   }

   const showToastErrors = errors => {
      errors &&
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

         let apiUrl = `http://localhost:5000/api/${user.accType}s/me`

         const response = await axios.put(apiUrl, formObject, {
            withCredentials: true,
         })

         if (response.status === 201) {
            showToastSuccess('Profile update successful')
            dispatch(setUser(response.data))
            navigate('/')
         } else {
            showToastErrors(['Profile update failed'])
         }
      } catch (error) {
         showToastErrors(error.response.data.errors)
      }
   }

   return (
      <form
         id='updateProfileForm'
         className='pt-[4rem]'
         onSubmit={handleSubmit}
      >
         <ToastContainer />
         <div className='min-h-screen bg-slate-50 w-full px-[15%] flex items-center justify-center'>
            <div className='card gap-4 shadow-lg bg-white bg-opacity-80 p-8 w-1/2 max-w-2xl mt-[4rem]'>
               <div className='form-control flex-row'>
                  <label className='mr-auto label'>
                     <span className='label-text'>Full Name</span>
                  </label>
                  <input
                     type='text'
                     placeholder='Your name'
                     className='input input-bordered'
                     name='name'
                  />
               </div>
               <div className='form-control flex-row'>
                  <label className='mr-auto label'>
                     <span className='label-text'>Password</span>
                  </label>
                  <input
                     type='password'
                     placeholder='Your password'
                     className='input input-bordered'
                     name='password'
                  />
               </div>
               {userType === 'doctor' && (
                  <>
                     <div className='form-control flex-row'>
                        <label className='mr-auto label'>
                           <span className='label-text'>Speciality</span>
                        </label>
                        <input
                           type='text'
                           placeholder='Your speciality'
                           className='input input-bordered'
                           name='speciality'
                        />
                     </div>
                  </>
               )}
               {userType === 'hospital' && (
                  <>
                     <div className='form-control flex-row'>
                        <label className='mr-auto label'>
                           <span className='label-text'>Phone number</span>
                        </label>
                        <input
                           type='tel'
                           placeholder='Your phone number'
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
                           placeholder='Your address'
                           className='input input-bordered'
                           name='address'
                        />
                     </div>
                  </>
               )}
               <div className='form-control mt-6'>
                  <button className='btn btn-primary'>Update Profile</button>
               </div>
            </div>
         </div>
      </form>
   )
}

export default UpdateProfile
