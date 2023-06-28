function MessageItem() {
   return (
      <tr className='hover:bg-primary hover:bg-opacity-10 cursor-pointer'>
         <td className='px-6 py-4'>
            <div className='flex items-center'>
               <div className=' h-10 w-10'>
                  <img
                     className='h-10 w-10 rounded-full'
                     src='./src/assets/hospital.jpg'
                     alt=''
                  />
               </div>
               <div className='ml-4 max-w-[90%] overflow-hidden'>
                  <div className='text-sm font-medium text-gray-900'>
                     John Doe
                  </div>
                  <div className='text-sm text-gray-500 '>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     In, nulla quo accusantium
                  </div>
               </div>
            </div>
         </td>
      </tr>
   )
}

export default MessageItem
