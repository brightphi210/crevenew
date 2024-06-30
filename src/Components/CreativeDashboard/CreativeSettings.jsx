import React, { useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'

const CreativeSettings = () => {

    const [show, setShow] = useState(false)
  
    const handleShow = () => {
      setShow(!show)
    }

    
  return (
    <div className='flex flex-row w-full bg-neutral-100 2xl:h-[100vh] xl:h-full lg:h-full'>
        <div className=''>
            <CreativeSideBarCom show={show} />
        </div>
        <div className='w-full'>
            <CreativeNavBarCom show={show} handleShow={handleShow}/>
            <CreativeSettingDashboard />
        </div>
    </div>
  )
}

export default CreativeSettings


export const CreativeSettingDashboard = () => {
    return (
        <div className='2xl:p-20 2xl:pt-28 2xl:pl-[18rem] lg:pl-[18rem] p-5 pt-20'>
            <h2>This is working</h2>
        </div>
    )
}