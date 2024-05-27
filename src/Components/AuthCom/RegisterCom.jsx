import React from 'react'
import vd1 from '../Images/integrations.mp4'
import { Link } from 'react-router-dom'

const RegisterCom = () => {
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
      <h1 class="text-2xl font-semibold mb-4">Register</h1>

      <form action="" className=' flex flex-col gap-5 w-full'>

        <div className='flex gap-3 items-end'>

          <span className='flex lg:w-full w-full text-sm cursor-pointer items-center gap-3 border border-neutral-200 py-3 px-3 rounded-md text-black'>
            Creative <input type="radio" name="radio-2" className="radio radio-accent w-[1.1rem] ml-auto h-[1.1rem] " checked />
          </span>


          <span className='flex lg:w-full w-full text-sm cursor-pointer items-center gap-2 border border-neutral-200 py-3 px-3 rounded-md text-black'>
            Client 
            <input type="radio" name="radio-2" className="radio radio-accent w-[1.1rem] ml-auto h-[1.1rem] " />
          </span>

        </div>


        <div>
          <input type="text" placeholder="Enter Fullname" className="input input-bordered w-full text-xs py-6 rounded-md" required/>
        </div>

        <div>
          <input type="text" placeholder="Enter Email" className="input input-bordered w-full text-xs py-6 rounded-md" required/>
        </div>

        <div>
          <input type="number" placeholder="Enter Number" className="input input-bordered w-full text-xs py-6 rounded-md" required/>
        </div>


        <div>
          <input type="password" placeholder="Enter Password" className="input input-bordered w-full text-xs py-6 rounded-md" required/>
        </div>

        <div className='flex'>
          <button className="btn hover:bg-neutral-900 bg-black text-white w-full">Register</button>
        </div>

        <button className='mr-auto text-sm'>Dont have account? <Link to={'/login'}><span className='text-accent'> Login</span></Link> </button>

      </form>
    </div>

  </div>
  )
}

export default RegisterCom

{/* <video src={videoFile} 
autoPlay 
controls={false} 
muted loop
preload="auto">

</video> */}




















