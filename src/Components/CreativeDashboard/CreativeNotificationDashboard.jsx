import React, { useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'
import { IoNotifications } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { BiSolidNotification } from "react-icons/bi";

const CreativeNotificationDashboard = () => {

    const [show, setShow] = useState(false)
  
    const handleShow = () => {
      setShow(!show)
    }

  return (
    <div className='flex flex-row w-full'>

      <div className=''>
        <CreativeSideBarCom show={show} />
      </div>

      <div className='w-full'>
        <CreativeNavBarCom show={show} handleShow={handleShow}/>
        <CreativeNotificationHome />
      </div>

    </div>
  )
}

export default CreativeNotificationDashboard



export const CreativeNotificationHome = () => {
  return (
    <div className='lg:p-20 lg:pt-28 lg:pl-[18rem] p-5 pt-20'>
      <h2 className='flex items items-center gap-3ctext-lg font-semibold'><IoNotifications />List Notification</h2>

      <div className='flex lg:flex-row flex-col gap-2 lg:items-center py-5'>
        <p className='lg:text-sm text-xs '>180 Notifications</p>

        <div className='relative  lg:ml-auto '>
            <input type="text" placeholder="Search Notification" className="input input-bordered lg:w-[20rem] h-[3rem] pl-10 text-xs w-full" />
            <p className='absolute top-4 left-5'><LuSearch /></p>
        </div>
        
      </div>    


      <div>
        <div className='border border-y-neutral-200 my-4 flex lg:flex-row flex-col gap-2  lg:py-2 py-2 px-5 rounded-lg hover:bg-neutral-50 cursor-pointer'>
            <p className='flex items-center gap-2 text-xs'>Please to inform that your account has been verified</p>

            <div className='flex items-center lg:ml-auto lg:gap-10 gap-3'>
                <p className='text-xs'>Just Now</p>
                <p className='p-2 bg-neutral-100 lg:text-sm text-xs ml-auto  rounded-full text-red-500 cursor-pointer border-2 border-white'><MdDelete /></p>
            </div>
        </div>

        <div className='border border-y-neutral-200 my-4 flex lg:flex-row flex-col gap-2  lg:py-2 py-2 px-5 rounded-lg hover:bg-neutral-50 cursor-pointer'>
            <p className='flex items-center gap-2 text-xs'>Please to inform that your account has been verified</p>

            <div className='flex items-center lg:ml-auto lg:gap-10 gap-3'>
                <p className='text-xs'>Just Now</p>
                <p className='p-2 bg-neutral-100 lg:text-sm text-xs ml-auto rounded-full text-red-500 cursor-pointer border-2 border-white'><MdDelete /></p>
            </div>
        </div>
        
      </div>
    </div>

  )
}
