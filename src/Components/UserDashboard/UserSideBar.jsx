import React from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { FiBookmark } from "react-icons/fi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { MdOutlineCallMissedOutgoing } from "react-icons/md";


const UserSideBar = ({show}) => {
  return (

    <>

            <div className={ show === false ? 'fixed lg:block hidden pt-28 2xl:h-[85vh] lg:h-[80vh] h-[100vh] z-10 p-10 lg:pt-10 px-5 text-white lg:left-20 left-0 color 2xl:w-[15rem] xl:w-[10rem] lg:w-[10rem]  w-full lg:rounded-2xl rounded-none' : 'fixed block pt-28 2xl:h-[85vh] lg:h-[80vh] h-[100vh] z-10 p-10 lg:pt-10 px-5 text-white lg:left-20 left-0 color 2xl:w-[15rem] xl:w-[10rem] lg:w-[10rem] w-full lg:rounded-2xl rounded-none'}>
            <ul className='flex flex-col 2xl:gap-10 xl:gap-7 lg:gap-7 gap-5 z-50 2xl:text-base xl:text-xs lg:text-[10px] text-sm'>
                <li className='flex gap-2 items-center cursor-pointer font-bold bg-accent p-3 px-5 text-black rounded-3xl text-sm'><GrHomeRounded />Home</li>
                <li className='flex gap-2 items-center cursor-pointer font-bold px-3 text-sm'><MdOutlineCallMissedOutgoing />Creatives</li>
                <li className='flex gap-2 items-center cursor-pointer font-bold px-3 text-sm'><FiBookmark />Bookings</li>
                <li className='flex gap-2 items-center cursor-pointer font-bold px-3 text-sm'><MdOutlineMarkEmailUnread />Messages</li>
                <li className='flex gap-2 items-center cursor-pointer font-bold px-3 text-sm'><MdOutlineFavoriteBorder />Saved</li>
                <li className='flex gap-2 items-center cursor-pointer font-bold px-3 text-sm'><FiSettings />Settings</li>
            </ul>
            </div>


    </>
  )
}

export default UserSideBar
