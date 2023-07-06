import { useEffect, useState } from 'react'
import axios from 'axios'
import AppointmentItem from '../layout/AppintmentItem'
import { useSelector } from 'react-redux'

function AppointmentPage() {
   const [appointments, setAppointments] = useState([])
   const { user } = useSelector(store => store.user)

   useEffect(() => {
      fetchAppointments()
   }, [])

   const fetchAppointments = async () => {
      try {
         const response = await axios.get('/api/appointments')
         if (response.status === 200) {
            setAppointments(response.data)
         }
      } catch (error) {
         console.error('Failed to fetch appointments:', error)
      }
   }

   return (
      <div className='min-h-screen pt-[5rem] px-[15%] '>
         <div className='flex flex-col bg-gray-100 rounded-lg'>
            <div className='overflow-x-auto shadow-lg min-h-[70vh]'>
               <div className='min-w-fullinline-block align-middle'>
                  <div className='rounded-t-lg'>
                     <table className='min-w-full divide-y  rounded-t-lg  divide-gray-200 dark:divide-gray-700'>
                        <thead className='bg-gray-300 rounded-t-lg '>
                           <tr>
                              <th
                                 scope='col'
                                 className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'
                              >
                                 Number
                              </th>
                              <th
                                 scope='col'
                                 className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'
                              >
                                 Date
                              </th>
                              <th
                                 scope='col'
                                 className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'
                              >
                                 Hospital
                              </th>
                              <th
                                 scope='col'
                                 className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'
                              >
                                 Doctor Name
                              </th>
                              <th
                                 scope='col'
                                 className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'
                              >
                                 Time
                              </th>
                              {user?.accType !== 'hospital' && (
                                 <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'
                                 >
                                    Message
                                 </th>
                              )}
                           </tr>
                        </thead>
                        <tbody>
                           {appointments.map((appointment, index) => (
                              <AppointmentItem
                                 key={appointment.id}
                                 number={index + 1}
                                 appointment={appointment}
                              />
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default AppointmentPage
