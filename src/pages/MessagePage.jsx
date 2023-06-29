import React, { useEffect, useState } from 'react'
import Pagination from '../layout/Pagination'
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
            console.log(error)
            setIsLoading(false)
         }
      }

      fetchContacts()
   }, [])

   return (
      <div className='min-h-screen pt-[5rem] px-[15%] pb-[6rem]'>
         <div className='border bg-slate-100 min-h-[80vh] relative'>
            <div className='bg-primary text-white p-4 text-center text-lg'>
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
               <div className='flex flex-col'>
                  <div className='bg-white divide-gray-200'>
                     {contacts.map(contact => (
                        <MessageItem key={contact._id} contact={contact} />
                     ))}
                  </div>
               </div>
            )}
            <div className='absolute -bottom-[4rem] w-full flex justify-center'>
               <Pagination />
            </div>
         </div>
      </div>
   )
}

export default MessagePage
