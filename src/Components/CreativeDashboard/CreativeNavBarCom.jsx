import React, { useEffect, useState } from 'react'
import logo from '../Images/Creve1.png'
import { Link } from 'react-router-dom';
import { IoMailUnread, IoNotificationsOutline } from "react-icons/io5";
import { BiMessageSquare } from "react-icons/bi";

import { RxDashboard } from "react-icons/rx";
import { BsDashCircle } from "react-icons/bs";
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { FiSettings } from "react-icons/fi";
const CreativeNavBarCom = ({handleShow, show}) => {


  const [profileData, setProfileData] = useState({})

  let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
  const [isLoading, setIsLoading] = useState(false)
  const url =`${BASE_URL}/creativeprofile/${userToken.profile_id}/`

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

      console.log(data);
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
    <div className='flex flex-row items-center shadow-md fixed right-0 left-0 bg-white py-3 lg:px-20 px-5  z-50 backdrop-filter backdrop-blur-3xl bg-opacity-80'>

      <div className='cursor-pointer'>
        <Link to={'/'}>
          <img src={logo} alt="" className='w-7'/>
        </Link>
      </div>


      <div onClick={handleShow}>
        {show === false ? <p className='text-2xl block lg:hidden ml-5'><RxDashboard /></p> : <p className='text-2xl block lg:hidden ml-5'><BsDashCircle /></p>}
      </div>

      <div className='flex flex-row gap-5 ml-auto items-center'>
        <Link to={'/creative-dashboard-notificationAll'}>
          <p className='text-xl cursor-pointer text-neutral-700 border border-neutral-300 flex rounded-full p-2 items-center justify-center '><IoNotificationsOutline /></p>
        </Link>

        <Link to={'/creative-dashboard-chat'}>
          <p className='text-xl cursor-pointer text-neutral-700 border border-neutral-300 flex rounded-full p-2 items-center justify-center '><IoMailUnread /></p>
        </Link>

        <Link to={'/creative-dashboard-profile'}>
          <p className='text-xl cursor-pointer text-neutral-700 border border-neutral-300 flex rounded-full p-2 items-center justify-center '><FiSettings /></p>
        </Link>


        <div >
          <Link to={'/creative-dashboard-settings'}>
            <div className='bg-neutral-200 rounded-full w-8 h-8 overflow-hidden'>
              <img src={profileData.profile_pics} alt="" className='w-full h-full object-cover cursor-pointer'/>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CreativeNavBarCom
