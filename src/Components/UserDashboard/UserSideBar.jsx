import React, { useState } from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { FiBookmark } from "react-icons/fi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { MdOutlineCallMissedOutgoing } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { BiLogOutCircle } from 'react-icons/bi';


const UserSideBar = ({show}) => {

    const navigate = useNavigate()
    const [token, setToken] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  
    const userToken = token?.access ? jwtDecode(token.access) : null;
    console.log('This is the token', userToken);
  
    const logout = async (e) => {
        e.preventDefault()
        setToken(null)
        localStorage.removeItem('token')
        navigate('/')
    }

  return (

    <div className={ show === false ? 'fixed lg:block hidden pt-28  h-[100vh] z-10 p-10 px-5 text-white  left-0 color 2xl:w-[15rem] xl:w-[10rem] lg:w-[10rem]  w-full  rounded-none' : 'fixed block pt-28  h-[100vh] z-10 p-10 px-5 text-white  left-0 color 2xl:w-[15rem] xl:w-[10rem] lg:w-[10rem] w-full lg:rounded-2xl rounded-none'}>
        <ul className='flex flex-col 2xl:gap-10 xl:gap-7 lg:gap-7 gap-8 z-50 2xl:text-base xl:text-xs lg:text-[10px] text-lg'>
            <li className='flex gap-2 items-center cursor-pointer font-bold bg-accent p-3 px-5 text-black rounded-3xl '><GrHomeRounded />Home</li>
            <li className='flex gap-2 items-center cursor-pointer font-bold px-3'><MdOutlineCallMissedOutgoing />Creatives</li>
            <li className='flex gap-2 items-center cursor-pointer font-bold px-3'><FiBookmark />Bookings</li>
            <li className='flex gap-2 items-center cursor-pointer font-bold px-3'><MdOutlineMarkEmailUnread />Messages</li>
            <li className='flex gap-2 items-center cursor-pointer font-bold px-3'><MdOutlineFavoriteBorder />Saved</li>
            <li className='flex gap-2 items-center cursor-pointer font-bold px-3'><FiSettings />Settings</li>
            <li className='flex gap-2 items-center cursor-pointer font-bold px-3 mt-10' onClick={logout}><BiLogOutCircle />Logout</li>
        </ul>
    </div>

  )
}

export default UserSideBar
