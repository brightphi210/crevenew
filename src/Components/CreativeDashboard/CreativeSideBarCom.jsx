import React, { useState } from 'react'
import { MdOutlineDashboard } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { BiLogOutCircle, BiMessageSquare } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { FaQuestion } from "react-icons/fa6";
import { BsAppIndicator } from "react-icons/bs";
import { IoMailUnread } from "react-icons/io5";
import { Link } from 'react-router-dom';

const CreativeSideBarCom = ({show}) => {

  const navigate = useNavigate()
  const [token, setToken] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);

  const userToken = token?.access ? jwtDecode(token.access) : null;
  const logout = async (e) => {
      e.preventDefault()
      setToken(null)
      localStorage.removeItem('token')
      navigate('/')
  }

  return ( 
    <div className={show === false ? 'hidden z-30 bg-white lg:w-[15rem] w-full fixed h-screen lg:block  text-black ' : 'block bg-white lg:w-[15rem] w-full fixed h-screen lg:block  text-black z-50'}>
      <div className='pt-24 flex flex-col overflow-y-scroll h-screen'>
        <div>
            <p className='text-xs text-neutral-400 p-6 lg:pt-0 lg:p-6 pb-3 border-b-neutral-300 border-b flex items-center gap-3 '>Menu <FaLongArrowAltRight /></p>
            <ul className='flex flex-col gap-6 2xl:gap-6 xl:gap-6 lg:gap-6 md:gap-3 p-6 pb-10 2xl:pb-10 xl:pb-3 lg:pb-2'>
                <Link to={'/creative-dashboard-home'}>
                  <li className='text-sm hover:text-accent cursor-pointer flex items-center gap-3'><MdOutlineDashboard className=''/>Dashboard</li>
                </Link>

                <Link to={'/creative-dashboard-profile'}>
                  <li className='text-sm hover:text-accent cursor-pointer flex items-center gap-3'><CiUser className=''/> Profile Overview</li>
                </Link>

                <Link to={'/user-dashboard-chat'}>
                  <li className='text-sm hover:text-accent cursor-pointer flex items-center gap-3'><IoMailUnread className=''/> Messages</li>
                </Link>


                <Link to={'/creative-dashboard-bookingsAll'} >
                  <li className='text-sm hover:text-accent cursor-pointer flex items-center gap-3'><BiMessageSquare className=''/> Requests</li>
                </Link>

                
                <Link to={'/creative-dashboard-notificationAll'}>
                  <li className='text-sm hover:text-accent cursor-pointer flex items-center gap-3'><IoNotificationsOutline className=''/> Notifications</li>
                </Link>

                <Link to={'/creative-dashboard-FAQs'}>
                  <li className='text-sm hover:text-accent cursor-pointer flex items-center gap-3'><FaQuestion className=''/>FAQ</li>
                </Link>
            </ul>
        </div>

        <div>
            <ul className='flex flex-col gap-5 2xl:gap-8 xl:gap-5 lg:gap-3 md:gap-3 p-6'>
                <li className='text-sm text-neutral-400 cursor-default flex items-center gap-3'><FaLock className=''/> Creve Pro</li>
                <li className='text-sm hover:text-accent cursor-pointer flex items-center gap-3' onClick={logout}><BiLogOutCircle className=''/> Logout</li>
            </ul>
        </div>
      </div> 
    </div>
  )
}

export default CreativeSideBarCom
