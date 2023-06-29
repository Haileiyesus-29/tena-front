import React from 'react'
import { Link } from 'react-router-dom'

function MessageItem({ contact }) {
   const { _id: id, name } = contact

   return (
      <Link to={`/messages/${id}`} className='w-full'>
         <tr className='hover:bg-primary hover:bg-opacity-10 cursor-pointer'>
            <td className='px-6 py-4'>
               <div className='flex items-center'>
                  <div className='h-10 w-10'>
                     <img
                        className='h-10 w-10 rounded-full'
                        src='./src/assets/hospital.jpg'
                        alt=''
                     />
                  </div>
                  <div className='ml-4 max-w-[90%] overflow-hidden'>
                     <div className='text-sm font-medium text-gray-900'>
                        {name}
                     </div>
                  </div>
               </div>
            </td>
         </tr>
      </Link>
   )
}

export default MessageItem
