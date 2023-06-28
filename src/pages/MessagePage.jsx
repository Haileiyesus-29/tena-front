import Pagination from '../layout/Pagination'
import MessageItem from '../layout/messageItem'

function MessagePage() {
   return (
      <div className='min-h-screen pt-[5rem] px-[15%] pb-[6rem]'>
         <div className='border bg-slate-100 min-h-[80vh] relative '>
            <div className='bg-primary text-white p-4 text-center text-lg'>
               Al messages
            </div>
            <div className='flex flex-col'>
               <table className='min-w-full divide-y divide-gray-200 max-w-full overflow-hidden'>
                  <tbody className='bg-white divide-y divide-gray-200'>
                     <MessageItem />
                     <MessageItem />
                     <MessageItem />
                     <MessageItem />
                     <MessageItem />
                     <MessageItem />
                     <MessageItem />
                     <MessageItem />
                  </tbody>
               </table>
            </div>
            <div className='absolute -bottom-[4rem] w-full flex justify-center'>
               <Pagination />
            </div>
         </div>
      </div>
   )
}

export default MessagePage
