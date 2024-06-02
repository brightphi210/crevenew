import React from 'react'
import { IoNotificationsCircle } from "react-icons/io5";
import logo from '../Images/Creve1.png'
import prof from '../Images/Avatars.png'
const CreativeNavBarCom = () => {
  return (
    <div className='flex flex-row items-center shadow-md fixed right-0 left-0 bg-white py-3 px-10 pl-[17rem] z-10'>
      <div className='cursor-pointer'>
        <img src={logo} alt="" className='w-7'/>
      </div>

      <div className='flex flex-row gap-3 ml-auto items-center'>
        <p className='text-3xl cursor-pointer text-cyan-600'><IoNotificationsCircle /></p>
        <div >
          <img src={prof} alt="" className='w-7 cursor-pointer'/>
        </div>
      </div>
    </div>
  )
}

export default CreativeNavBarCom
