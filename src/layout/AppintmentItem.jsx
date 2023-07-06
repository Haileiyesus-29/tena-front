import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function formatDate(dateString) {
   const options = { year: 'numeric', month: 'long', day: 'numeric' }
   const date = new Date(dateString)
   return date.toLocaleDateString('en-US', options)
}

function AppointmentItem({ number, appointment }) {
   const { date, time, doctor, hospital, doctorId, userId } = appointment
   const formattedDate = formatDate(date)
   const { user } = useSelector(store => store.user)

   return (
      <tr className='odd:bg-white even:bg-gray-100 hover:bg-gray-100'>
         <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
            {number}
         </td>
         <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
            {formattedDate}
         </td>
         <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
            {hospital}
         </td>
         <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
            {doctor || 'deleted account'}
         </td>
         <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
            {time}
         </td>
         {user?.accType !== 'hospital' && (
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
               {doctor ? (
                  <Link
                     to={`/messages/${
                        user._id == doctorId ? userId : doctorId
                     }`}
                     className='text-blue-500 hover:text-blue-700 link '
                  >
                     Message
                  </Link>
               ) : (
                  ''
               )}
            </td>
         )}
      </tr>
   )
}

export default AppointmentItem
