import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DoctorsList from '../layout/DoctorsList'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function HospitalPage() {
   const { id: hospitalId } = useParams()
   const [hospital, setHospital] = useState({})
   const [doctors, setDoctors] = useState([])
   const [isLoading, setIsLoading] = useState(true)
   const navigate = useNavigate()
   const { user } = useSelector(store => store.user)
   useEffect(() => {
      const fetchHospital = async () => {
         try {
            const response = await fetch(`/api/hospitals/${hospitalId}`)
            const data = await response.json()
            setHospital(data)
         } catch (error) {
            navigate('/')
         }
      }

      const fetchDoctors = async () => {
         try {
            const response = await fetch(`/api/doctors/hospital/${hospitalId}`)
            const data = await response.json()
            setDoctors(data)
            setIsLoading(false)
         } catch (error) {
            console.error('Error fetching doctors:', error)
            setIsLoading(false)
         }
      }

      fetchHospital()
      fetchDoctors()
   }, [hospitalId, navigate])

   return (
      <div className='min-h-screen pt-[5rem] px-[15%]'>
         <div className='border rounded-md bg-slate-100 p-8'>
            <div className='text-3xl font-semibold text-center'>
               {hospital.name}
            </div>
            <div>
               <img src='src/assets/hospital.jpg' alt='hospital image' />
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
            <table className='bg-white rounded-md shadow-md w-4/5 mx-auto p-8 overflow-x-auto'>
               <thead>
                  <tr className='py-2'>
                     <th className='font-semibold text-center'>Number</th>
                     <th className='font-semibold text-center'>Name</th>
                     <th className='font-semibold text-center'>Speciality</th>
                     {user?.accType === 'user' && (
                        <th className='font-semibold text-center'>
                           New Appointment
                        </th>
                     )}
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
         </div>
      </div>
   )
}

export default HospitalPage
