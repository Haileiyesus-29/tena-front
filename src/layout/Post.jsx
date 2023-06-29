import { Link } from 'react-router-dom'

function Post({ hospital }) {
   const { name, _id, address } = hospital

   return (
      <div className='flex flex-col md:flex-row p-4 md:p-8 max-w-2xl w-full shadow-lg rounded-2xl border md:aspect-video bg-white'>
         <div className='flex-shrink-0 md:w-2/5 md:max-w-xs rounded-3xl overflow-hidden'>
            <img
               className='w-full h-full object-cover'
               src='src/assets/hospital.jpg'
               alt='hospital image'
            />
         </div>
         <div className='md:pl-4 flex flex-col md:flex-grow'>
            <h1 className='text-3xl text-center md:text-left font-semibold text-gray-800 py-3'>
               {name}
            </h1>
            <p className='text-justify'>
               Lorem ipsum dolor sit, amet consectetur adipisicing elit.
               Possimus amet dolorem quae autem officia aut voluptatum tenetur
               et magni fugiat deleniti odit veritatis recusandae unde
               molestiae, optio, ullam iure culpa.
            </p>
            <div className='flex flex-col md:flex-row md:items-center'>
               <address className='md:mr-auto'>
                  <span className='font-semibold'>Address:</span> {address}
               </address>
               <div className='mt-4 md:mt-0'>
                  <Link
                     to={`/hospital/${_id}`}
                     className='btn btn-primary rounded-full py-2 px-4'
                  >
                     Visit
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Post
