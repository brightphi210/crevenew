import React from 'react'
import { IoNotificationsCircle } from "react-icons/io5";
import logo from '../Images/Creve1.png'
import prof from '../Images/Avatars.png'
import { MdMenu } from "react-icons/md";
import { RiCloseLargeLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { IoNotificationsOutline } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";

import { RxDashboard } from "react-icons/rx";
import { BsDashCircle } from "react-icons/bs";
const CreativeNavBarCom = ({handleShow, show}) => {
  return (
    <div className='flex flex-row items-center shadow-md fixed right-0 left-0 bg-white py-3 lg:px-20 px-5  z-50'>

      <div className='cursor-pointer'>
        <Link to={'/'}>
          <img src={logo} alt="" className='w-7'/>
        </Link>
      </div>


      <div onClick={handleShow}>
        {show === false ? <p className='text-2xl block lg:hidden ml-5'><RxDashboard /></p> : <p className='text-2xl block lg:hidden ml-5'><BsDashCircle /></p>}
      </div>

      <div className='flex flex-row gap-5 ml-auto items-center'>
        <p className='text-2xl cursor-pointer text-neutral-700'><IoNotificationsOutline /></p>
        <p className='text-2xl cursor-pointer text-neutral-700'><IoBookmarkOutline /></p>
        <div >
          <Link to={'/creative-dashboard-profile'}>
            <img src={prof} alt="" className='w-7 cursor-pointer'/>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CreativeNavBarCom
