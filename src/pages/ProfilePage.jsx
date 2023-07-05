import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import axios from 'axios'

function ProfilePage() {
   const { id } = useParams()
   const { user: currentUser } = useSelector(store => store.user)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const [user, setUser] = useState(null)
   const [isLoading, setIsLoading] = useState(true)
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

   useEffect(() => {
      const fetchUser = async () => {
         try {
            let userData
            if (id) {
               const response = await fetch(`/api/doctors/${id}`)
               userData = await response.json()
            } else {
               const response = await fetch(`/api/users/${currentUser._id}`)
               userData = await response.json()
            }

            if (!userData) {
               // toast.error('User not found')
               navigate('/')
            } else {
               setUser(userData)
            }
            setIsLoading(false)
         } catch (error) {
            setIsLoading(false)
            navigate('/')
         }
      }

      fetchUser()
   }, [id, currentUser, navigate])

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

         let apiUrl = `http://localhost:5000/api/${currentUser.accType}s/me`

         const response = await axios.put(apiUrl, formObject, {
            withCredentials: true,
         })

         if (response.status === 201) {
            e.target.querySelector('input').value = ''
            showToastSuccess('Profile update successful')
            dispatch(setUser(response.data))
            navigate('/')
         } else {
            showToastErrors(['Profile update failed'])
         }
      } catch (error) {
         showToastErrors(error.response?.data?.errors)
      }
   }

   if (isLoading) {
      return (
         <div className='min-h-screen pt-[5rem] px-[15%]'>
            <div>Loading...</div>
         </div>
      )
   }
   const { name, email, speciality, accType } = user
   return (
      <div className='min-h-screen pt-[5rem] px-[15%]'>
         <div className='bg-slate-100 p-8 flex gap-6 rounded-2xl shadow-lg flex-col my-4  lg:flex-row'>
            <ToastContainer />
            <div className='basis-1/2 grow-0 rounded-lg overflow-hidden shadow-sm'>
               <img src='src/assets/hospital.jpg' alt='image' className='' />
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
                  <form onSubmit={handleSubmit} className=''>
                     <input
                        type='file'
                        placeholder='update picture'
                        name='speciality'
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
               <div className='flex p-4'>
                  <span className='basis-4/12 shrink-0 '>Account type</span>
                  <span className='basis-7/12 font-semibold capitalize'>
                     {accType}
                  </span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProfilePage
