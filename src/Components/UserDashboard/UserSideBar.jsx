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
import { FaLongArrowAltRight } from 'react-icons/fa';


const menuItems = [
  { label: 'Home', icon: <GrHomeRounded />, path: 'user-dashboard-home' },
  { label: 'Creatives', icon: <MdOutlineCallMissedOutgoing />, path: 'user-dashboard-creative' },
  { label: 'Request', icon: <BiMessageSquare />, path: 'user-dashboard-books' },
  { label: 'Messages', icon: <MdOutlineMarkEmailUnread />, path: 'user-dashboard-chat' },
  { label: 'Saved', icon: <MdOutlineFavoriteBorder />, path: 'user-dashboard-favourites' },
  { label: 'Profile', icon: <FiSettings />, path: 'user-dashboard-profile' },
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


    
    <div  className={show === false ? 'hidden z-30 bg-black lg:w-[13rem] w-full fixed h-screen lg:block  text-white pt-28' : 'pt-28 block bg-black lg:w-[13rem] w-full fixed h-screen lg:block  text-white z-50'}>
        <ul  className='UserSideBar flex flex-col 2xl:gap-5 xl:gap-7 lg:gap-7 gap-5 z-50 2xl:text-base xl:text-sm lg:text-sm text-base'>
        <p className='text-xs text-neutral-400 p-6 lg:pt-0 lg:p-6 pb-3 border-b-neutral-600 border-b flex items-center gap-3 '>Menu <FaLongArrowAltRight /></p>
            {menuItems.map((item, index) => (

              <div key={index} onClick={() => handleItemClick(index)}>
                    <li className={'flex gap-2 items-center cursor-pointer font-bold p-3 px-5'}>
                      {item.icon}{item.label}
                    </li>
              </div>
            ))}
            <li className='flex gap-2 items-center cursor-pointer font-bold px-5 mt-10' onClick={logout}><BiLogOutCircle />Logout</li>
        </ul>
    </div>

  )
}

export default UserSideBar
