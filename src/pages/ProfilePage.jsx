import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { setUser } from '../store/reducers/userReducer'
import axios from 'axios'

function ProfilePage() {
   const { user: currentUser } = useSelector(store => store.user)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const [
      {
         name: updateName,
         password: updatePassword,
         speciality: updateSpeciality,
         picture: updatePicture,
      },
      setShowUpdate,
   ] = useState({
      name: false,
      password: false,
      speciality: false,
      picture: false,
   })

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

         let apiUrl = `/api/${currentUser.accType}s/me`

         const response = await axios.put(apiUrl, formObject, {
            withCredentials: true,
         })

         if (response.status === 201) {
            e.target.querySelector('input').value = ''
            showToastSuccess('Profile update successful')
            dispatch(setUser(response.data))
         } else {
            showToastErrors(['Profile update failed'])
         }
      } catch (error) {
         showToastErrors(error.response?.data?.errors)
      }
   }

   const handlePictureUpdate = async e => {
      e.preventDefault()
      try {
         const form = e.target
         const formData = new FormData(form)
         formData.append('image', formData.get('image')[0]) // Retrieve the picture file from the form data

         const response = await axios.put('/api/profile', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
         })

         if (response.status === 200) {
            e.target.reset()
            showToastSuccess('Profile update successful')
            dispatch(setUser(response.data))
         } else {
            showToastErrors(['Profile update failed'])
         }
      } catch (error) {
         showToastErrors(error.response?.data?.errors)
      }
   }

   const { name, email, speciality, image } = currentUser
   return (
      <div className='min-h-screen pt-[5rem] px-[15%]'>
         <div className='bg-slate-100 p-8 flex gap-6 rounded-2xl shadow-lg flex-col my-4  lg:flex-row'>
            <ToastContainer />
            <div className='basis-1/2 grow-0 rounded-lg overflow-hidden shadow-sm'>
               <img
                  src={
                     image
                        ? `/api/profile/${image}`
                        : 'src/assets/default_user.png'
                  }
                  alt='image'
                  className=''
               />
               <div
                  className='link hover:link-primary text-lg p-4'
                  onClick={() =>
                     setShowUpdate(prev => {
                        return { ...prev, picture: !prev.picture }
                     })
                  }
               >
                  change profile picture
               </div>
               {updatePicture && (
                  <form onSubmit={handlePictureUpdate} className=''>
                     <input
                        type='file'
                        placeholder='update picture'
                        name='image'
                        accept='image/jpeg, image/jpg, image/png, image/gif'
                        className='file-input file-input-sm mx-4'
                     />
                     <input
                        type='submit'
                        className='btn btn-sm bg-slate-300 hover:bg-primary mx-4 my-2 hover:text-white'
                        value='Update'
                     />
                  </form>
               )}
            </div>
            <div className='grow'>
               <div className='text-2xl font-semibold text-center capitalize'>
                  {name}
               </div>
               <div className='flex p-4'>
                  <span className='basis-4/12 shrink-0 '>Email</span>
                  <span className='basis-7/12 font-semibold'>{email}</span>
               </div>
               <div className='flex p-4'>
                  <span className='basis-4/12 shrink-0 '>Name</span>
                  <span
                     className='basis-7/12 link hover:link-primary'
                     onClick={() =>
                        setShowUpdate(prev => {
                           return { ...prev, name: !prev.name }
                        })
                     }
                  >
                     change name
                  </span>
               </div>
               {updateName && (
                  <form onSubmit={handleSubmit} className=''>
                     <input
                        type='text'
                        placeholder='update name'
                        name='name'
                        className='input input-group-sm input-sm mx-4'
                     />
                     <input
                        type='submit'
                        className='btn btn-sm bg-slate-300 hover:bg-primary hover:text-white mx-4 my-2'
                        value='Update'
                     />
                  </form>
               )}

               {speciality && (
                  <>
                     <div className='flex p-4'>
                        <span className='basis-4/12 shrink-0 '>Speciality</span>
                        <span className='basis-7/12 font-semibold'>
                           {speciality}
                        </span>
                        <span
                           className='basis-1/12 link hover:link-primary'
                           onClick={() =>
                              setShowUpdate(prev => {
                                 return {
                                    ...prev,
                                    speciality: !prev.speciality,
                                 }
                              })
                           }
                        >
                           edit
                        </span>
                     </div>
                     {updateSpeciality && (
                        <form onSubmit={handleSubmit} className=''>
                           <input
                              type='text'
                              placeholder='update speciality'
                              name='speciality'
                              className='input input-group-sm input-sm mx-4'
                           />
                           <input
                              type='submit'
                              className='btn btn-sm bg-slate-300 hover:bg-primary hover:text-white mx-4 my-2'
                              value='Update'
                           />
                        </form>
                     )}
                  </>
               )}

               <div className='flex p-4'>
                  <span className='basis-4/12 shrink-0 '>Password</span>
                  <span
                     className='basis-7/12 link hover:link-primary'
                     onClick={() =>
                        setShowUpdate(prev => {
                           return { ...prev, password: !prev.password }
                        })
                     }
                  >
                     change password
                  </span>
               </div>
               {updatePassword && (
                  <form onSubmit={handleSubmit} className=''>
                     <input
                        type='password'
                        placeholder='update passsword'
                        name='password'
                        className='input input-group-sm input-sm mx-4'
                     />
                     <input
                        type='submit'
                        className='btn btn-sm bg-slate-300 hover:bg-primary hover:text-white mx-4 my-2'
                        value='Update'
                     />
                  </form>
               )}
               {currentUser.accType === 'hospital' && (
                  <div className='flex p-4'>
                     <Link
                        to={`/hospital/${currentUser._id}`}
                        className='btn-sm btn shadow-sm'
                     >
                        Go to account
                     </Link>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default ProfilePage
