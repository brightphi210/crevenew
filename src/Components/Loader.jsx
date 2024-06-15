import React from 'react'
import vd1 from '../Components/Images/Untitled design.mp4'

const Loader = () => {
  return (
    <div>

        <div className='flex justify-center items-center h-screen'>
            <video autoPlay muted width={150}>
                <source src={vd1} type="video/mp4" aut/>
            </video>
        </div>
    </div>
  )
}

export default Loader
