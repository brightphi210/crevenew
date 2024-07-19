import React, { useEffect, useState } from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { FiBookmark } from "react-icons/fi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { MdOutlineCallMissedOutgoing } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { BiLogOutCircle, BiMessageSquare } from 'react-icons/bi';


const menuItems = [
  { label: 'Home', icon: <GrHomeRounded />, path: 'user-dashboard-home' },
  { label: 'Creatives', icon: <MdOutlineCallMissedOutgoing />, path: 'user-dashboard-creative' },
  { label: 'Request', icon: <BiMessageSquare />, path: 'user-dashboard-books' },
  { label: 'Messages', icon: <MdOutlineMarkEmailUnread />, path: 'user-dashboard-home' },
  { label: 'Saved', icon: <MdOutlineFavoriteBorder />, path: 'user-dashboard-favourites' },
  { label: 'Settings', icon: <FiSettings />, path: 'user-dashboard-profile' },
];

const UserSideBar = ({show}) => {

    const navigate = useNavigate()
    const [token, setToken] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  
    const userToken = token?.access ? jwtDecode(token.access) : null;
  
    const logout = async (e) => {
        e.preventDefault()
        setToken(null)
        localStorage.removeItem('token')
        navigate('/')
    }



    const [activeIndex, setActiveIndex] = useState('');

    const handleItemClick = (index) => {
        setActiveIndex(index);
        navigate(`/${menuItems[index].path}`);
    };



  return (


    
    <div  className={show ? 'fixed block pt-28 h-[100vh] z-10 p-10 px-5 text-white left-0 color 2xl:w-[15rem] xl:w-[10rem] lg:w-[10rem] w-full lg:rounded-2xl rounded-none' : 'fixed lg:block hidden pt-28 h-[100vh] z-10 p-10 px-5 text-white left-0 color 2xl:w-[15rem] xl:w-[10rem] lg:w-[10rem] w-full rounded-none'}>
        <ul data-aos="fade-up" data-aos-duration="1000" className='UserSideBar flex flex-col 2xl:gap-5 xl:gap-7 lg:gap-7 gap-5 z-50 2xl:text-base xl:text-xs lg:text-[10px] text-base'>
            {menuItems.map((item, index) => (

              <div key={index} onClick={() => handleItemClick(index)}>
                    <li className={'flex gap-2 items-center cursor-pointer font-bold p-3 px-5'}>
                      {item.icon}{item.label}
                    </li>
              </div>
            ))}
            <li className='flex gap-2 items-center cursor-pointer font-bold px-3 mt-10' onClick={logout}><BiLogOutCircle />Logout</li>
        </ul>
    </div>

  )
}

export default UserSideBar
