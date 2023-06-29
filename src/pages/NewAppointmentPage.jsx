import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function NewAppointmentPage() {
   const [date, setDate] = useState('')
   const [time, setTime] = useState('')
   const { id } = useParams()
   const navigate = useNavigate()

   const showToastSuccess = message => {
      toast.success(message, {
         position: toast.POSITION.TOP_RIGHT,
      })
   }

   const showToastError = errors => {
      errors.forEach(error => {
         toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
         })
      })
   }

   const handleSubmit = async e => {
      e.preventDefault()

      try {
         const appointmentData = {
            doctor: id,
            date,
            time,
            amount: 900,
         }

         const response = await axios.post(
            '/api/appointments',
            appointmentData,
            {
               withCredentials: true,
            }
         )

         if (response.status === 201) {
            showToastSuccess('Appointment successfully created.')
            // Reset form fields
            setDate('')
            setTime('')
            navigate('/')
         } else {
            showToastError(['Failed to create appointment.'])
         }
      } catch (error) {
         showToastError(error.response.data.errors)
      }
   }
   return (
      <div className='min-h-screen pt-[5rem] px-[15%]'>
         <ToastContainer />
         <form
            className='bg-slate-100 p-8 rounded-lg max-w-lg mx-auto'
            onSubmit={handleSubmit}
         >
            <div className='flex justify-between p-2'>
               <label htmlFor='date' className='text-gray-800 font-medium'>
                  Date
               </label>
               <input
                  type='date'
                  id='date'
                  className='border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
               />
            </div>
            <div className='flex justify-between p-2'>
               <label htmlFor='time' className='text-gray-800 font-medium'>
                  Time
               </label>
               <input
                  type='time'
                  id='time'
                  className='border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  required
               />
            </div>
            <div className='p-2 rounded-full text-center bg-white shadow-sm my-4'>
               Amount: 900 Birr
            </div>
            <button
               type='submit'
               className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
               Submit
            </button>
         </form>
      </div>
   )
}

export default NewAppointmentPage
