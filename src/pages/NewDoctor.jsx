import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

function NewDoctor() {
   const navigate = useNavigate()

   const showToastSuccess = message => {
      toast.success(message, {
         position: toast.POSITION.TOP_RIGHT,
      })
   }

   const showToastErrors = errors => {
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

         const apiUrl = 'http://localhost:5000/api/doctors'
         const response = await axios.post(apiUrl, formObject, {
            withCredentials: true,
         })

         if (response.status === 201) {
            showToastSuccess('Registration successful')
            navigate('/')
         } else {
            showToastErrors(['Registration failed'])
         }
      } catch (error) {
         showToastErrors(error.response.data.errors)
      }
   }

   return (
      <form id='registrationForm' className='pt-[4rem]' onSubmit={handleSubmit}>
         <ToastContainer />
         <div className='min-h-screen bg-slate-50 w-full px-[15%] flex items-center justify-center'>
            <div className='card gap-4 shadow-lg bg-white bg-opacity-80 p-8 w-1/2 max-w-2xl mt-[4rem]'>
               <div className='form-control flex-row'>
                  <label className='mr-auto label'>
                     <span className='label-text'>Full Name</span>
                  </label>
                  <input
                     type='text'
                     placeholder='name'
                     className='input input-bordered'
                     name='name'
                  />
               </div>
               <div className='form-control flex-row'>
                  <label className='mr-auto label'>
                     <span className='label-text'>Email</span>
                  </label>
                  <input
                     type='email'
                     placeholder='Email'
                     className='input input-bordered'
                     name='email'
                  />
               </div>
               <div className='form-control flex-row'>
                  <label className='mr-auto label'>
                     <span className='label-text'>Password</span>
                  </label>
                  <input
                     type='password'
                     placeholder='password'
                     className='input input-bordered'
                     name='password'
                  />
               </div>
               <div className='form-control flex-row'>
                  <label className='mr-auto label'>
                     <span className='label-text'>Specialty</span>
                  </label>
                  <input
                     type='text'
                     placeholder='speciality'
                     className='input input-bordered'
                     name='speciality'
                  />
               </div>

               <div className='form-control mt-6'>
                  <button className='btn btn-primary'>Create</button>
               </div>
            </div>
         </div>
      </form>
   )
}

export default NewDoctor
