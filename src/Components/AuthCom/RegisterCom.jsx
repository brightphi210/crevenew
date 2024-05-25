import React from 'react'
import vd1 from '../Images/integrations.mp4'
import { Link } from 'react-router-dom'

const RegisterCom = () => {
  return (
    <div className='w-full flex lg:flex-row flex-col  justify-between gap-[5rem] items-center lg:px-0 px-5 lg:pt-0 pt-14'>

      <div className='lg:w-3/4 lg:pl-[13rem] w-full'>


        <h2 className='pb-3 text-2xl'>Join Creve</h2>


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
            <input type="text" placeholder="Enter Fullname" className="input input-bordered w-full text-xs py-6 rounded-md" />
          </div>

          <div>
            <input type="text" placeholder="Enter Email" className="input input-bordered w-full text-xs py-6 rounded-md" />
          </div>

          <div>
            <input type="number" placeholder="Enter Number" className="input input-bordered w-full text-xs py-6 rounded-md" />
          </div>


          <div>
            <input type="password" placeholder="Enter Password" className="input input-bordered w-full text-xs py-6 rounded-md" />
          </div>

          <div className='flex'>
            <button className="btn hover:bg-neutral-900 bg-black text-white w-full">Register</button>
          </div>

          <button className='mr-auto text-sm'>Dont have account? <Link to={'/login'}><span className='text-accent'> Login</span></Link> </button>

          </form>
      </div>

      <div className='w-full h-screen overflow-hidden bg-slate-100 lg:block hidden'>
        <video 
          src={vd1}
          autoPlay 
          controls={false} 
          muted loop
          preload="auto" 
          className='w-full object-cover h-full'

        />

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