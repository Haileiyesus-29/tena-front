import { useEffect, useState } from 'react'
import DoctorsList from '../layout/DoctorsList'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Hospital() {
   const { user } = useSelector(store => store.user)
   const [hospital, setHospital] = useState({})
   const [doctors, setDoctors] = useState([])
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      setHospital(user)

      const fetchDoctors = async () => {
         try {
            const response = await fetch(`/api/doctors/hospital/${user._id}`)
            const data = await response.json()
            setDoctors(data)
            setIsLoading(false)
         } catch (error) {
            setIsLoading(false)
         }
      }

      fetchDoctors()
   }, [])

   return (
      <div className='min-h-screen pt-[5rem] md:px-[15%] px-[5%] my-10'>
         <div className='border rounded-md bg-slate-100 p-8'>
            <div className='text-3xl font-semibold text-center'>
               {hospital.name}
            </div>
            <div>
               <img
                  src={hospital.image || 'src/assets/hospital.jpg'}
                  alt='hospital image'
               />
            </div>
            <div className='py-6 text-center'>
               {hospital.description ||
                  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid repudiandae eum mollitia magni, id fuga nobis voluptatibus error dolor facere quam tempore molestiae aspernatur repellendus rem ab non ratione cupiditate ea ipsum iste deleniti? Quaerat, autem architecto? Autem repellat nihil cum natus! Laboriosam, iure nostrum rem est magni illum impedit recusandae cupiditate dolor officiis! Nihil?'}
            </div>
            <div className='max-w-lg mx-auto border rounded-lg bg-white p-4 my-6'>
               <div className='flex justify-center gap-10 py-2 font-semibold'>
                  <div className='text-end basis-1/2 shirink-0 '>Address</div>
                  <div className=' basis-1/2 shirink-0 '>
                     {hospital.address}
                  </div>
               </div>
               <div className='flex justify-center gap-10 py-2 font-semibold'>
                  <div className='text-end basis-1/2 shirink-0 '>
                     Contact Number
                  </div>
                  <div className=' basis-1/2 shirink-0 '>
                     {hospital.contact}
                  </div>
               </div>
               <div className='flex justify-center gap-10 py-2 font-semibold'>
                  <div className='text-end basis-1/2 shirink-0 '>Email</div>
                  <div className='basis-1/2 shirink-0 '>{hospital.email}</div>
               </div>
            </div>
            <div className='flex justify-center my-8'>
               <div className='rounded-full w-3/5 text-center shadow-md p-4 bg-white text-2xl font-semibold opacity-70'>
                  Our doctors
               </div>
            </div>
            <table className='bg-white rounded-md shadow-md md:w-4/5 w-[98%] mx-auto p-8'>
               <thead>
                  <tr className='py-2'>
                     <th className='font-semibold text-center'>Number</th>
                     <th className='font-semibold text-center'>Name</th>
                     <th className='font-semibold text-center'>Speciality</th>
                     <th className='font-semibold text-center'> Action </th>
                  </tr>
               </thead>
               <tbody>
                  {isLoading ? (
                     <tr>
                        <td colSpan='3' className='text-center'>
                           Loading...
                        </td>
                     </tr>
                  ) : doctors.length === 0 ? (
                     <tr>
                        <td colSpan='3' className='text-center'>
                           No doctors available.
                        </td>
                     </tr>
                  ) : (
                     doctors.map((doctor, idx) => (
                        <DoctorsList
                           key={doctor._id}
                           doctor={doctor}
                           idx={idx}
                        />
                     ))
                  )}
               </tbody>
            </table>
            <div className='flex md:gap-8 gap-4 justify-center my-4'>
               <Link to={'/newdoctor'} className='md:btn btn-sm btn-primary'>
                  register new doctor
               </Link>
               <Link to={'/update'} className='md:btn btn-sm btn-secondary'>
                  update profile
               </Link>
            </div>
         </div>
      </div>
   )
}

export default Hospital
