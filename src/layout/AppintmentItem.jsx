function AppintmentItem() {
   return (
      <tr className='hover:bg-slate-100 cursor-pointer'>
         <td className='px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap'>
            1
         </td>
         <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
            Jone Doe
         </td>
         <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
            jonne62@gmail.com
         </td>
         <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
            <a className='text-green-500 hover:text-green-700' href='#'>
               Edit
            </a>
         </td>
         <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
            <a className='text-red-500 hover:text-red-700' href='#'>
               Delete
            </a>
         </td>
      </tr>
   )
}

export default AppintmentItem
