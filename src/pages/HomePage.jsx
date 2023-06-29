import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Pagination from '../layout/Pagination'
import Post from '../layout/Post'
import SearchBox from '../layout/SearchBox'
import LandingPage from './LandingPage'
import { useSelector } from 'react-redux'

const HomePage = () => {
   const { isLoggedIn, user } = useSelector(store => store.user)
   const [hospitals, setHospitals] = useState([])

   useEffect(() => {
      const fetchHospitals = async () => {
         try {
            const response = await axios.get('/api/hospitals')
            setHospitals(response.data)
         } catch (error) {
            if (
               error.response &&
               error.response.data &&
               Array.isArray(error.response.data.errors)
            ) {
               // Display multiple errors using Toastify
               error.response.data.errors.forEach(errorMsg => {
                  toast.error(errorMsg)
               })
            } else {
               // Display a generic error message
               toast.error('An error occurred while fetching hospitals.')
            }
         }
      }

      fetchHospitals()
   }, [])

   return (
      <>
         {isLoggedIn ? (
            <div className='pt-[5rem] px-[2%] md:px-[15%] min-h-screen bg-slate-50 mb-8'>
               {/* <SearchBox /> */}
               <div className='flex flex-col items-center gap-3 flex-wrap'>
                  {hospitals.map(hospital => (
                     <Post key={hospital._id} hospital={hospital} />
                  ))}
                  {/* <Pagination /> */}
               </div>
            </div>
         ) : (
            <LandingPage />
         )}
      </>
   )
}

export default HomePage
