import React from 'react'
import { IoNotificationsCircle } from "react-icons/io5";
import logo from '../Images/Creve1.png'
import prof from '../Images/Avatars.png'
import { MdMenu } from "react-icons/md";
import { RiCloseLargeLine } from "react-icons/ri";
const CreativeNavBarCom = ({handleShow, show}) => {
  return (
    <div className='flex flex-row items-center shadow-md fixed right-0 left-0 bg-white py-3 px-5 lg:pl-[17rem] lg:z-10 z-50'>

      <div onClick={handleShow}>
        {show === false ? <p className='text-xl block lg:hidden mr-3'><MdMenu /></p> : <p className='text-xl block lg:hidden mr-3'><RiCloseLargeLine /></p>}
      </div>
      <div className='cursor-pointer'>
        <img src={logo} alt="" className='w-7'/>
      </div>

      <div className='flex flex-row gap-3 ml-auto items-center'>
        <p className='text-3xl cursor-pointer text-cyan-600 mycolor'><IoNotificationsCircle /></p>
        <div >
          <img src={prof} alt="" className='w-7 cursor-pointer'/>
        </div>
      </div>
    </div>
  )
}

export default CreativeNavBarCom
