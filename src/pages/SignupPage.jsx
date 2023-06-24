function SignupPage() {
   return (
      <div className='min-h-screen bg-slate-50 w-full px-[15%] flex items-center justify-center'>
         <div className='card gap-4 shadow-lg bg-white bg-opacity-80 p-8 w-1/2 max-w-2xl mt-[4rem]'>
            <div className='form-control flex-row'>
               <label className='mr-auto label'>
                  <span className='label-text'>Full Name</span>
               </label>
               <input
                  type='text'
                  placeholder='your name'
                  className='input input-bordered'
               />
            </div>
            <div className='form-control flex-row'>
               <label className='mr-auto label'>
                  <span className='label-text'>your email</span>
               </label>
               <input
                  type='email'
                  placeholder='email'
                  className='input input-bordered'
               />
            </div>
            <div className='form-control flex-row'>
               <label className='mr-auto label'>
                  <span className='label-text'>Password</span>
               </label>
               <input
                  type='password'
                  placeholder='your password'
                  className='input input-bordered'
               />
            </div>
            <div className='form-control flex-row'>
               <label className='mr-auto label'>
                  <span className='label-text'>Account Type</span>
               </label>
               <select className='input input-bordered'>
                  <option selected>User</option>
                  <option>Hospital</option>
               </select>
            </div>
            <div className='form-control flex-row'>
               <label className='mr-auto label'>
                  <span className='label-text'>Phone number</span>
               </label>
               <input
                  type='tel'
                  placeholder='phone number'
                  className='input input-bordered'
               />
            </div>
            <div className='form-control flex-row'>
               <label className='mr-auto label'>
                  <span className='label-text'>Address</span>
               </label>
               <input
                  type='text'
                  placeholder='address'
                  className='input input-bordered'
               />
            </div>
            <label className='mr-auto label'>
               <a
                  href='#'
                  className='label-text-alt link link-hover text-primary'
               >
                  Already have an account? Login
               </a>
            </label>
            <div className='form-control mt-6'>
               <button className='btn btn-primary'>Signup</button>
            </div>
         </div>
      </div>

      // <div className='hero min-h-screen bg-base-200 px-[15%]'>
      //    <div className='hero-content '>
      //       <div className='rounded-lg  w-full max-w-3xl shadow-2xl bg-base-100'>
      //          <div className='card-body w-full'>
      //             <div className='form-control flex-row'>
      //                <label className='mr-auto label'>
      //                   <span className='label-text'>Email</span>
      //                </label>
      //                <input
      //                   type='text'
      //                   placeholder='email'
      //                   className='input input-bordered'
      //                />
      //             </div>
      //             <div className='form-control flex-row'>
      //                <label className='mr-auto label'>
      //                   <span className='label-text'>Password</span>
      //                </label>
      //                <input
      //                   type='text'
      //                   placeholder='password'
      //                   className='input input-bordered'
      //                />
      //             </div>
      //             <label className='mr-auto label'>
      //                <a
      //                   href='#'
      //                   className='label-text-alt link link-hover text-primary'
      //                >
      //                   Already have an account? Login
      //                </a>
      //             </label>
      //             <div className='form-control mt-6'>
      //                <button className='btn btn-primary'>Signup</button>
      //             </div>
      //          </div>
      //       </div>
      //    </div>
      // </div>
   )
}

export default SignupPage
