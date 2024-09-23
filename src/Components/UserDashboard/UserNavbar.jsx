import React, {useState, useEffect} from 'react'
import logo from '../Images/Creve1.png'
import { Link, useNavigate } from 'react-router-dom';
import { IoMailUnread, IoNotificationsOutline } from "react-icons/io5";
import { MdFavoriteBorder, MdOutlineCallMissedOutgoing, MdOutlineFavoriteBorder, MdOutlineMarkEmailUnread } from "react-icons/md";

import { RxDashboard } from "react-icons/rx";
import { BsDashCircle } from "react-icons/bs";
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';

import { AiTwotoneEdit } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { GoDotFill } from 'react-icons/go';
import { GrHomeRounded } from 'react-icons/gr';
import { BiMessageSquare } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

const UserNavbar = ({handleShow, show}) => {
    const [profileData, setProfileData] = useState({})
    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
    const [isLoading, setIsLoading] = useState(false)
    const url =`${BASE_URL}/userprofile/${userToken.profile_id}/`
  
   const fetchProfile = async () => {
  
        setIsLoading(true);
  
        try {
  
        const respose = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${authUser.access}`,
            },
        })
        if (!respose.ok) {
            setIsLoading(false);
            throw new Error('Network response was not ok');
        }
        const data = await respose.json();
  
        setProfileData(data)
  
        } catch (error) {
            console.log(error);
        } finally {
        setIsLoading(false);
        }
    };
  
    useEffect(() => {
        fetchProfile();
    }, []);


    const navigate = useNavigate()
    const [token, setToken] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  
    const logout = async (e) => {
        e.preventDefault()
        setToken(null)
        localStorage.removeItem('token')
        navigate('/')
    }



    const [users, setUsers] = useState([]);
    const url5 =`${BASE_URL}/chat/`
    const fetchMessages = async () => {
        try {
        const response = await fetch(url5, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${authUser.access}`,
            },
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data)

        } catch (error) {
            console.log(error);
        } finally {
        }
    }
    useEffect(() => {
        fetchMessages();
    }, []);



    const menuItems = [
        { label: 'Home', path: 'user-dashboard-home' },
        // { label: 'Creatives',path: 'user-dashboard-creative' },
        { label: 'Bookings',path: 'user-dashboard-books' },
        { label: 'Saved', path: 'user-dashboard-favourites' },
        { label: 'Profile', path: 'user-dashboard-profile' },
    ];


    const [activeIndex, setActiveIndex] = useState('');

    const handleItemClick = (index) => {
        setActiveIndex(index);
        navigate(`/${menuItems[index].path}`);
    };

  return (
    <div>
        <div className={'flex flex-row items-center shadow-sm fixed right-0 left-0 bg-white py-4 2xl:px-[5rem] xl:px-[5rem] lg:px-[5rem] px-5  z-50 backdrop-filter backdrop-blur-3xl bg-opacity-80'}>

            <Link to={'/'} className='hidden lg:block'>
                <img src={logo} alt="" className='w-7'/>
            </Link>


            <div className='cursor-pointer lg:relative fixed lg:bg-transparent bg-black lg:h-fit h-[100vh] w-[80%] top-0 right-0 z-40 lg:flex hidden items-center'>
                <ul className='flex lg:flex-row items-center flex-col pl-10 lg:gap-10 gap-5 z-50 2xl:text-sm xl:text-sm lg:text-sm text-base'>
                    {menuItems.map((item, index) => (
                        <div key={index} onClick={() => handleItemClick(index)}>
                            <li className={'flex gap-2 items-center cursor-pointer font-bold'}>{item.label}</li>
                        </div>
                    ))}
                    <button onClick={logout} className='bg-black text-white text-sm rounded-full py-2.5 px-5'>Logout</button>
                </ul>
            </div>

            <div onClick={handleShow}>
                {show === false ? <p className='text-2xl block lg:hidden '><RxDashboard /></p> : <p className='text-2xl block lg:hidden'><IoMdClose /></p>}
            </div>

            <div className={`cursor-pointer lg:relative fixed transition-transform duration-500 ${show ? 'translate-x-0' : 'translate-x-full'} 
                transform top-0 right-0 z-40 lg:hidden flex bg-neutral-100 h-[100vh] w-[80%] lg:h-fit backdrop-filter backdrop-blur-3xl bg-opacity-100`}>
                {show && (
                    <ul className="flex lg:flex-row flex-col pl-10 pt-10 gap-10 z-50 2xl:text-sm xl:text-sm lg:text-sm text-base">
                    {menuItems.map((item, index) => (
                        <li
                        key={index}
                        onClick={() => handleItemClick(index)}
                        className="flex gap-2 items-center cursor-pointer font-bold"
                        >
                        {item.label}
                        </li>
                    ))}

                    <button onClick={logout} className='bg-black text-white text-sm rounded-full py-2.5 px-5'>Logout</button>
                    </ul>
                )}
            </div>

            <div className='flex flex-row gap-5 ml-auto items-center'>

                <Link to={'/user-dashboard-chat'}>
                    <p className='text-xl relative cursor-pointer text-neutral-700 border border-neutral-300 flex rounded-full p-2 items-center justify-center '>
                        <IoMailUnread />
                    </p>
                </Link>

                <Link to={'/user-dashboard-favourites'}>
                    <p className='text-xl cursor-pointer p-2 border border-neutral-200 rounded-full  text-neutral-700'><MdFavoriteBorder /></p>
                </Link>


                <Link to={'/user-dashboard-profile'} className='w-fit flex m-auto'>
                    <div tabIndex={0} role="button" className='bg-neutral-200 rounded-full w-9 h-9 overflow-hidden'>
                        <img src={profileData.profile_pics} alt="" className='w-full h-full object-cover cursor-pointer'/>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default UserNavbar
