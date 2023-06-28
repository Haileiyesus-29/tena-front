import React from 'react'
import AppintmentItem from '../layout/AppintmentItem'

function AppointmentPage() {
   return (
      <div className='min-h-screen pt-[5rem] px-[15%]'>
         <div className='flex flex-col'>
            <div className='overflow-x-auto'>
               <div className='p-1.5 w-full inline-block align-middle'>
                  <div className='overflow-hidden border rounded-lg'>
                     <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                           <tr>
                              <th
                                 scope='col'
                                 className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
                              >
                                 Appointment
                              </th>
                              <th
                                 scope='col'
                                 className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
                              >
                                 Name
                              </th>
                              <th
                                 scope='col'
                                 className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
                              >
                                 Doctor
                              </th>
                              <th
                                 scope='col'
                                 className='px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase '
                              >
                                 Schedule
                              </th>
                              <th
                                 scope='col'
                                 className='px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase '
                              >
                                 Delete
                              </th>
                           </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                           <AppintmentItem />
                           <AppintmentItem />
                           <AppintmentItem />
                           <AppintmentItem />
                           <AppintmentItem />
                           <AppintmentItem />
                           <AppintmentItem />
                           <AppintmentItem />
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
