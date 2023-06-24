function LoginPage() {
   return (
      <div className='hero min-h-screen bg-base-200 px-[15%]'>
         <div className='hero-content flex-col lg:flex-row-reverse'>
            <div className='text-center lg:text-left'>
               <h1 className='text-5xl font-bold'>Login now!</h1>
               <p className='py-6'>
                  Elevate your healthcare experience with Tena: Seamless
                  appointments, expert doctors, and personalized care, all in
                  one app. Join us today and unlock a new level of convenience
                  and well-being.
               </p>
            </div>
            <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
               <div className='card-body'>
                  <div className='form-control'>
                     <label className='label'>
                        <span className='label-text'>Email</span>
                     </label>
                     <input
                        type='text'
                        placeholder='email'
                        className='input input-bordered'
                     />
                  </div>
                  <div className='form-control'>
                     <label className='label'>
                        <span className='label-text'>Password</span>
                     </label>
                     <input
                        type='text'
                        placeholder='password'
                        className='input input-bordered'
                     />
                     <label className='label'>
                        <a href='#' className='label-text-alt link link-hover'>
                           Forgot password?
                        </a>
                        <a
                           href='#'
                           className='label-text-alt link link-hover text-primary'
                        >
                           Signup instead
                        </a>
                     </label>
                  </div>
                  <div className='form-control mt-6'>
                     <button className='btn btn-primary'>Login</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default LoginPage
