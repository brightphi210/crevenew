import React from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { FiBookmark } from "react-icons/fi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { MdOutlineCallMissedOutgoing } from "react-icons/md";


const UserSideBar = () => {
  return (
    <div className='fixed h-[80vh] p-10 px-5 text-white left-20 color w-[15rem] rounded-2xl'>
      <ul className='flex flex-col gap-10'>
        <li className='flex gap-2 items-center cursor-pointer font-bold bg-accent p-3 px-5 text-black rounded-3xl text-sm'><GrHomeRounded />Home</li>
        <li className='flex gap-2 items-center cursor-pointer font-bold px-3 text-sm'><MdOutlineCallMissedOutgoing />Creatives</li>
        <li className='flex gap-2 items-center cursor-pointer font-bold px-3 text-sm'><FiBookmark />Bookings</li>
        <li className='flex gap-2 items-center cursor-pointer font-bold px-3 text-sm'><MdOutlineMarkEmailUnread />Messages</li>
        <li className='flex gap-2 items-center cursor-pointer font-bold px-3 text-sm'><MdOutlineFavoriteBorder />Saved</li>
        <li className='flex gap-2 items-center cursor-pointer font-bold px-3 text-sm'><FiSettings />Settings</li>
      </ul>
    </div>
  )
}

export default UserSideBar
