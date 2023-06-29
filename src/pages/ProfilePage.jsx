import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

function ProfilePage() {
   const { id } = useParams()
   const { user: currentUser } = useSelector(store => store.user)
   const navigate = useNavigate()
   const [user, setUser] = useState(null)
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const fetchUser = async () => {
         try {
            let userData
            if (id) {
               const response = await fetch(`/api/doctors/${id}`)
               userData = await response.json()
            } else {
               userData = currentUser
            }

            if (!userData) {
               toast.error('User not found')
               navigate('/')
            } else {
               setUser(userData)
            }
            setIsLoading(false)
         } catch (error) {
            setIsLoading(false)
         }
      }

      fetchUser()
   }, [id, currentUser, navigate])

   if (isLoading) {
      return (
         <div className='min-h-screen pt-[5rem] px-[15%]'>
            <div>Loading...</div>
         </div>
      )
   }
   if (user) {
      const { name, email, speciality, accType } = user
      if (!name || !email || !accType) {
         toast.error('User not found')
         navigate('/')
      }
      return (
         <div className='min-h-screen pt-[5rem] px-[15%]'>
            <div className='md:p-10 p-4 shadow-bg border flex gap-4'>
               <ToastContainer />
               {/* <div className='grow-0 fshirink-0 basis-1/3 p-4'>
                  <img src='./src/assets/hospital.jpg' alt='profile img' />
               </div> */}
               <div className='flex flex-col gap-4 grow basis-2/3 lg:border-l-2 p-4'>
                  <div className='text-2xl font-bold'>{name}</div>
                  <div className='flex'>
                     <span className='basis-1/3 shirink-0'>Email</span>
                     <span>{email}</span>
                  </div>
                  {accType === 'doctor' && (
                     <div className='flex'>
                        <span className='basis-1/3 shirink-0'>Speciality</span>
                        <span>{speciality}</span>
                     </div>
                  )}
                  <div className='p-4 my-6 flex justify-center'>
                     <Link to={'/update'} className='btn btn-secondary'>
                        Update profile
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className='min-h-screen pt-[5rem] px-[15%]'>
         <div>Error loading user.</div>
      </div>
   )
}

export default ProfilePage
