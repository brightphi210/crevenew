import React, { useEffect, useState } from 'react'
import logo from '../Images/Creve1.png'
import { Link, useNavigate } from 'react-router-dom';
import { IoLogOutOutline, IoMailUnread, IoNotificationsOutline } from "react-icons/io5";
import { BiMessageSquare } from "react-icons/bi";

import { RxDashboard } from "react-icons/rx";
import { BsDashCircle } from "react-icons/bs";
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { FiSettings } from "react-icons/fi";
import { AiTwotoneEdit } from 'react-icons/ai';
import { GoDotFill } from 'react-icons/go';
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

        <Link to={'/user-dashboard-chat'}>
              <p className='text-xl relative cursor-pointer text-neutral-700 border border-neutral-300 flex rounded-full p-2 items-center justify-center '>
                  <IoMailUnread />
                  {/* {users?.length > 0 && (
                      <p className='absolute top-[-5px] right-[-5px] p-0 bg-white text-red-600  rounded-full text-lg'><GoDotFill /></p>
                  )} */}
              </p>
          </Link>

        <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className='bg-neutral-200 rounded-full w-9 h-9 overflow-hidden'>
                <img src={profileData.profile_pics} alt="" className='w-full h-full object-cover cursor-pointer'/>
            </div>
            <ul tabIndex={0} className="dropdown-content flex flex-col gap-4 absolute right-0 mt-4 bottom-[10rem] menu bg-base-100 rounded-lg z-[1] w-64 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Link to={'/creative-dashboard-profile'} className='w-fit flex m-auto'>
                    <p className='p-3 flex m-auto justify-center gap-3 items-center py-3 px-5 text-sm bg-neutral-100 border border-neutral-300 rounded-full text-black cursor-pointer'>Profile <AiTwotoneEdit /></p>
                </Link>
                
                <Link to={'/creative-dashboard-settings'} className='w-fit flex m-auto'>
                    <p className='p-3 flex m-auto justify-center gap-3 items-center py-3 px-5 text-sm bg-neutral-100 border border-neutral-300 rounded-full text-black cursor-pointer'>Edit Pics <AiTwotoneEdit /></p>
                </Link>
                <p onClick={logout} className='p-3 flex m-auto justify-center gap-3 items-center py-3 px-5 text-sm bg-neutral-900 border border-neutral-200 rounded-full text-white cursor-pointer'>Logout <IoLogOutOutline /></p>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default CreativeNavBarCom
