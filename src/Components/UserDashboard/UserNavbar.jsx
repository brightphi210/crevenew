import React, {useState, useEffect} from 'react'
import logo from '../Images/Creve1.png'
import { Link } from 'react-router-dom';
import { IoNotificationsOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";

import { RxDashboard } from "react-icons/rx";
import { BsDashCircle } from "react-icons/bs";
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';

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
    
  return (
    <div>
        <div className={'flex flex-row items-center shadow-sm fixed right-0 left-0 bg-white py-4 lg:px-20 px-5  z-50 backdrop-filter backdrop-blur-3xl bg-opacity-80'}>

            <div className='cursor-pointer'>
            <Link to={'/'}>
                <img src={logo} alt="" className='w-7'/>
            </Link>
            </div>


            <div onClick={handleShow}>
            {show === false ? <p className='text-2xl block lg:hidden ml-5'><RxDashboard /></p> : <p className='text-2xl block lg:hidden ml-5'><BsDashCircle /></p>}
            </div>

            <div className='flex flex-row gap-5 ml-auto items-center'>
            <Link to={'/user-dashboard-home'}>
                <p className='text-xl cursor-pointer p-2 border border-neutral-200 rounded-full  text-neutral-700'><IoNotificationsOutline /></p>
            </Link>

            <Link to={'/user-dashboard-home'}>
                <p className='text-xl cursor-pointer p-2 border border-neutral-200 rounded-full  text-neutral-700'><MdFavoriteBorder /></p>
            </Link>


            <div >
                <Link to={'/user-dashboard-home'}>
                <div className='bg-neutral-200 rounded-full w-8 h-8 overflow-hidden'>
                    <img src={profileData.profile_pics} alt="" className='w-full h-full object-cover cursor-pointer'/>
                </div>
                </Link>
            </div>
            </div>
        </div>
    </div>
  )
}

export default UserNavbar
