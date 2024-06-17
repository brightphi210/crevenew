import React from 'react'
import vd1 from '../Components/Images/Untitled design.mp4'
import gif from '../Components/Images/gif2.gif'

const Loader = () => {
  return (
    <div>

        <div className='flex justify-center items-center h-screen bg-white'>
          <div>
            <img src={gif} alt="" className='w-32'/>
          </div>
        </div>
    </div>
  )
}

export default Loader
