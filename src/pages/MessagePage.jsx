import { useEffect, useState } from 'react'
import MessageItem from '../layout/MessageItem'

function MessagePage() {
   const [contacts, setContacts] = useState([])
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const fetchContacts = async () => {
         try {
            const response = await fetch('/api/messages')
            const data = await response.json()
            setContacts(data)
            setIsLoading(false)
         } catch (error) {
            setIsLoading(false)
         }
      }

      fetchContacts()
   }, [])

   return (
      <div className='min-h-screen pt-[5rem] px-[15%] pb-[6rem]'>
         <div className='border bg-slate-100 min-h-[80vh] relative rounded-lg'>
            <div className='bg-slate-200 text-gray-900 p-4 text-center text-lg rounded-t-lg'>
               All messages
            </div>
            {isLoading ? (
               <div className='flex items-center justify-center h-64'>
                  Fetching messages...
               </div>
            ) : contacts.length === 0 ? (
               <div className='flex items-center justify-center h-64'>
                  No messages found.
               </div>
            ) : (
               <div className='flex flex-col gap-1'>
                  {contacts.map(contact => (
                     <MessageItem key={contact._id} contact={contact} />
                  ))}
               </div>
            )}
         </div>
      </div>
   )
}

export default MessagePage
