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
  console.log('This is the token', userToken);

  const logout = async (e) => {
      e.preventDefault()
      setToken(null)
      localStorage.removeItem('token')
      navigate('/')
  }


  return (
    <div className={show === false ? 'hidden bg-black lg:w-[15rem] w-full fixed h-screen lg:block  text-white ' : 'block bg-black lg:w-[15rem] w-full fixed h-screen lg:block  text-white z-50'}>
      <div className='pt-24 flex flex-col overflow-y-scroll h-screen'>
        <div>
            <p className='text-xs text-neutral-400 p-6 lg:pt-0 lg:p-6 pb-3 border-b-neutral-600 border-b flex items-center gap-3 '>Menu <FaLongArrowAltRight /></p>
            <ul className='flex flex-col gap-8 2xl:gap-8 xl:gap-6 lg:gap-6 md:gap-3 p-6 pb-10 2xl:pb-10 xl:pb-3 lg:pb-2'>
                <Link to={'/creative-dashboard-home'}>
                  <li className='2xl:text-base xl:text-xs lg:text-xs text-base hover:text-accent cursor-pointer flex items-center gap-3'><MdOutlineDashboard className=''/>Dashboard</li>
                </Link>

                <Link to={'/creative-dashboard-chat'}>
                  <li className='2xl:text-base xl:text-xs lg:text-xs text-base hover:text-accent cursor-pointer flex items-center gap-3'><IoMailUnread className=''/> Messages</li>
                </Link>


                <Link to={'/creative-dashboard-bookingsAll'} >
                  <li className='2xl:text-base xl:text-xs lg:text-xs text-base hover:text-accent cursor-pointer flex items-center gap-3'><BiMessageSquare className=''/> Requests</li>
                </Link>

                
                <Link to={'/creative-dashboard-notificationAll'}>
                  <li className='2xl:text-base xl:text-xs lg:text-xs text-base hover:text-accent cursor-pointer flex items-center gap-3'><IoNotificationsOutline className=''/> Notifications</li>
                </Link>

                <Link to={'/creative-dashboard-profile'}>
                  <li className='2xl:text-base xl:text-xs lg:text-xs text-base hover:text-accent cursor-pointer flex items-center gap-3'><CiUser className=''/> Account</li>
                </Link>

                <Link to={'/creative-dashboard-FAQs'}>
                  <li className='2xl:text-base xl:text-xs lg:text-xs text-base hover:text-accent cursor-pointer flex items-center gap-3'><FaQuestion className=''/>FAQ</li>
                </Link>
            </ul>
        </div>

        <div>
            <p className='text-xs text-neutral-400 p-6 pb-3 border-b-neutral-600 border-b flex items-center gap-3'>Preference <FaLongArrowAltRight /></p>
            <ul className='flex flex-col gap-5 2xl:gap-8 xl:gap-5 lg:gap-3 md:gap-3 p-6'>

                <Link to={'/' + 'creative-dashboard-settings'}>
                  <li className='2xl:text-base xl:text-[10px] lg:text-[10px] text-base hover:text-accent cursor-pointer flex items-center gap-3'><IoSettingsSharp className=''/> Settings</li>
                </Link>
                <li className='2xl:text-base xl:text-[10px] lg:text-[10px] text-base text-neutral-400 cursor-default flex items-center gap-3'><FaLock className=''/> Creve Pro</li>
                <li className='2xl:text-base xl:text-[10px] lg:text-[10px] text-base hover:text-accent cursor-pointer flex items-center gap-3' onClick={logout}><BiLogOutCircle className=''/> Logout</li>
            </ul>
        </div>

      </div> 
    </div>
  )
}

export default CreativeSideBarCom
