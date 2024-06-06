import React, { useState } from 'react'
import { MdOutlineDashboard } from "react-icons/md";
import { IoBookmark } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { BiLogOutCircle } from "react-icons/bi";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
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
    <div className={show === false ? 'hidden bg-black lg:w-[15rem] w-full fixed h-screen lg:block  text-white z-50' : 'block bg-black lg:w-[15rem] w-full fixed h-screen lg:block  text-white z-50'}>
      <div className='pt-10 flex flex-col'>
        <div>
            <p className='text-xs text-neutral-400 p-6 pt-10 lg:p-6 pb-3 border-b-neutral-600 border-b flex items-center gap-3 '>Menu <FaLongArrowAltRight /></p>
            <ul className='flex flex-col gap-5 p-6 pb-10'>
                <Link to={'/creative-dashboard-home'}>
                  <li className='text-sm bg-cyan-500 mycolor2 px-3 py-2 rounded-md w-fit text-white hover:bg-white hover:text-black cursor-pointer flex items-center gap-3'><MdOutlineDashboard className=''/>Dashboard</li>
                </Link>

                <li className='text-sm hover:text-accent cursor-pointer flex items-center gap-3'><IoBookmark className=''/> Bookings</li>
                
                <Link to={'/creative-dashboard-notificationAll'}>
                  <li className='text-sm hover:text-accent cursor-pointer flex items-center gap-3'><IoNotifications className=''/> Notifications</li>
                </Link>
                
                <Link to={'/creative-dashboard-profile'}>
                  <li className='text-sm hover:text-accent cursor-pointer flex items-center gap-3'><CgProfile className=''/> Profile</li>
                </Link>
            </ul>
        </div>

        <div>
            <p className='text-xs text-neutral-400 p-6 pb-3 border-b-neutral-600 border-b flex items-center gap-3'>Preference <FaLongArrowAltRight /></p>
            <ul className='flex flex-col gap-5 p-6'>
                <li className='text-sm hover:text-accent cursor-pointer flex items-center gap-3'><IoSettingsSharp className=''/> Settings</li>
                <li className='text-sm text-neutral-400 cursor-default flex items-center gap-3'><FaLock className=''/> Creve Pro</li>
                <li className='text-sm hover:text-accent cursor-pointer flex items-center gap-3' onClick={logout}><BiLogOutCircle className=''/> Logout</li>
            </ul>
        </div>

      </div> 
    </div>
  )
}

export default CreativeSideBarCom
