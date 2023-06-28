function ProfilePage() {
   return (
      <div className='min-h-screen pt-[5rem] px-[15%]'>
         <div className='p-10 shadow-bg border flex gap-4'>
            <div className='grow-0 fshirink-0 basis-1/3 p-4'>
               <img src='./src/assets/hospital.jpg' alt='profile img' />
            </div>
            <div className='flex flex-col gap-4 grow basis-2/3 lg:border-l-2 p-4'>
               <div className='text-2xl font-bold'>John Doe</div>
               <div className='flex'>
                  <span className='basis-1/3 shirink-0'>Email</span>
                  <span>email@email.com</span>
               </div>
               <div className='flex'>
                  <span className='basis-1/3 shirink-0'> Address</span>
                  <span>123 fake street, Addis Ababa</span>
               </div>
               <div className='flex'>
                  <span className='basis-1/3 shirink-0'> Contact</span>
                  <span>+251987654321</span>
               </div>
               <div className='flex'>
                  <span className='basis-1/3 shirink-0'> Speciality</span>
                  <span>Neuron Sergeon</span>
               </div>
               <div className='link text-primary'>Edit profile</div>
            </div>
         </div>
      </div>
   )
}

export default ProfilePage
