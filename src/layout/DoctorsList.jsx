import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function DoctorsList({ idx, doctor }) {
   const { name, speciality, _id: id } = doctor
   const { user } = useSelector(store => store.user)

   const showToastSuccess = message => {
      toast.success(message, {
         position: toast.POSITION.TOP_RIGHT,
      })
   }

   const showToastError = message => {
      toast.error(message, {
         position: toast.POSITION.TOP_RIGHT,
      })
   }

   const handleDelete = async () => {
      try {
         await axios.delete(`/api/doctors/${id}`)
         showToastSuccess('Doctor deleted successfully')
         // Handle success or perform any additional actions after deletion
      } catch (error) {
         console.error('Delete failed', error)
         showToastError('Failed to delete doctor')
         // Handle error
      }
   }

   return (
      <tr className='py-2'>
         <td className='text-center'>{idx + 1}</td>
         <td className='text-center'>{name}</td>
         <td className='text-center'>{speciality}</td>
         {user?.accType === 'user' && (
            <td className='text-center'>
               <Link
                  to={`/newapp/${id}`}
                  className='btn-sm btn-primary max-w-[5rem] cursor-pointer rounded-lg my-2 inline-block px-4 py-2 text-sm'
               >
                  Go
               </Link>
            </td>
         )}
         {user?.accType === 'hospital' && (
            <td className='text-center'>
               <button
                  className='btn-sm btn-primary bg-red-600 hover:bg-red-900 max-w-[5rem] cursor-pointer rounded-lg my-2 inline-block px-4 py-2 text-sm'
                  onClick={handleDelete}
               >
                  Delete
               </button>
            </td>
         )}
         <ToastContainer />
      </tr>
   )
}

export default DoctorsList
