function Post() {
   return (
      <div className='flex p-8 max-w-2xl w-full shadow-lg rounded-2xl border aspect-video bg-white'>
         <div className='flex-shirink-0 basis-2/5 rounded-3xl overflow-hidden'>
            <img
               className='w-full h-full object-cover'
               src='src/assets/hospital.jpg'
               alt='hospital image'
            />
         </div>
         <div className='basis-3/5 px-4 flex flex-col'>
            <h1 className='text-3xl text-center font-semibold text-gray-800 py-3'>
               Menilik Hospital
            </h1>
            <p className='text-justify'>
               Lorem ipsum dolor sit, amet consectetur adipisicing elit.
               Possimus amet dolorem quae autem officia aut voluptatum tenetur
               et magni fugiat deleniti odit veritatis recusandae unde
               molestiae, optio, ullam iure culpa.
            </p>
            <address>
               <span>Addresss</span> 123 street, some kilo, Addis Ababa
            </address>
            <div className='btn rounded-full btn-primary mt-auto'>Visit</div>
         </div>
      </div>
   )
}

export default Post
