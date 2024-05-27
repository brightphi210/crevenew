import React from 'react'
import vd1 from '../Images/dribbble.mp4'
import { Link } from 'react-router-dom'
const LoginCom = () => {
  return (
    <div class="bg-white flex justify-center items-center h-screen">

      <div class="w-1/2 h-screen hidden lg:block">
        <video 
            src={vd1}
            autoPlay 
            controls={false} 
            muted loop
            preload="auto" 
            className='w-full object-cover h-full'

          />
      </div>

      <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 class="text-2xl font-semibold mb-4">Login</h1>

        <form  className='flex flex-col gap-5'>

        <div>
          <input type="text" placeholder="Enter Email" className="input input-bordered w-full text-xs py-6 rounded-md" required/>
        </div>

        <div>
          <input type="text" placeholder="Enter Password" className="input input-bordered w-full text-xs py-6 rounded-md" required/>
        </div>



        <div className='flex'>
          <button className="btn hover:bg-neutral-900 bg-black text-white w-full">Register</button>
        </div>
          <button className='mr-auto text-sm pt-5'>Dont have account? <Link to={'/register'}><span className='text-accent'> Register</span></Link> </button>

        </form>

      </div>

    </div>
  )
}

export default LoginCom