import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

function ChatPage() {
   const [messages, setMessages] = useState([])
   const [receiver, setReceiver] = useState({})
   const { user } = useSelector(store => store.user)
   const { id } = useParams()
   useEffect(() => {
      const fetchMessages = async () => {
         const response = await axios.get(`/api/messages/${id}`, {
            withCredentials: true,
         })
         if (response.status !== 200) toast.error('error fetching messages')
         else setMessages(response.data)
      }
      const fetchReceiver = async () => {
         const response = await axios.get(
            user.accType == 'user' ? `/api/doctors/${id}` : `/api/users/${id}`
         )
         if (response.status !== 200) toast.error('error loading receiver')
         else setReceiver(response.data)
      }
      fetchReceiver()
      fetchMessages()
   }, [id, user.accType])

   async function submitHanlder(e) {
      e.preventDefault()
      const form = e.target
      const formData = new FormData(form)
      const formObject = {}
      for (let [name, value] of formData.entries()) {
         formObject[name] = value
      }

      const response = await axios.post(`/api/messages/${id}`, formObject, {
         withCredentials: true,
      })
      if (response.status !== 201)
         return console.log('failed to send a message')
      setMessages(prev => [...prev, response.data])
      form.querySelector('input').value = ''
   }
   // console.log(receiver)
   return (
      <div className='pt-[5rem] px-[2%] md:px-[15%] min-h-screen bg-slate-50 mb-8'>
         <div className='flex flex-col flex-grow w-full max-w-xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden'>
            <ToastContainer />
            <div className='w-full bg-slate-100 p-4 text-center text-xl font-semibold'>
               {receiver?.name}
            </div>
            <div className='flex flex-col flex-grow h-0 p-4 min-h-[70vh] overflow-auto'>
               {messages.length ? (
                  ''
               ) : (
                  <div className='h-full w-full flex justify-center items-center'>
                     No messages yet
                  </div>
               )}
               {messages.map(message => {
                  return message.receiver !== id ? (
                     <div
                        key={message._id}
                        className='flex w-full mt-2 space-x-3 max-w-xs'
                     >
                        <div className='flex-shrink-0 h-10 w-10 rounded-full bg-gray-300'></div>
                        <div>
                           <div className='bg-gray-300 p-3 rounded-r-lg rounded-bl-lg'>
                              <p className='text-sm'>{message.content}</p>
                           </div>
                        </div>
                     </div>
                  ) : (
                     <div
                        key={message._id}
                        className='flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end'
                     >
                        <div>
                           <div className='bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg'>
                              <p className='text-sm'>{message.content}</p>
                           </div>
                        </div>
                        <div className='flex-shrink-0 h-10 w-10 rounded-full bg-gray-300'></div>
                     </div>
                  )
               })}
            </div>

            <form
               onSubmit={submitHanlder}
               className='bg-gray-300 p-4 flex items-center gap-1'
            >
               <input
                  className='flex items-center h-10 w-full rounded px-3 text-sm'
                  type='text'
                  name='content'
                  placeholder='Type your message…'
               />
               <input
                  type='submit'
                  className='btn btn-sm bg-blue-600 hover:bg-blue-400'
                  value='send'
               />
            </form>
         </div>
      </div>
   )
}

export default ChatPage
