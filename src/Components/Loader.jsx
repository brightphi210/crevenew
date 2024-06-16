import React from 'react'
import vd1 from '../Components/Images/Untitled design.mp4'
import gif from '../Components/Images/gif2.gif'

const Loader = () => {
  return (
    <div>

        <div className='flex justify-center items-center h-screen bg-gradient-to-b from-teal-50 to-cyan-50'>
          <div>
            <img src={gif} alt="" className='w-40'/>
          </div>
        </div>
    </div>
  )
}

export default Loader
