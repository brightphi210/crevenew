import React, { useEffect, useState } from 'react'
import UserNavbar from './UserNavbar';

import { IoMdArrowForward } from "react-icons/io";
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

import locationImage from '../Images/loca.jpg'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CreativeCompo from './CreativeCompo';
import Footer from '../Footer';

const UserHomeDashboard = () => {

  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <div>
      <UserNavbar show={show} handleShow={handleShow}/>
      <div className='bg-neutral-50 h-full'>
        <UserHomeDashboardHome />
      </div>
      <Footer />
    </div>
  )
}

export default UserHomeDashboard



export const UserHomeDashboardHome = () => {
  const [showModal, setShowModal] = useState('')
  let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
  const [isLoading, setIsLoading] = useState(false)


  const [profileData, setProfileData] = useState({})
  const url2 =`${BASE_URL}/userprofile/${userToken.profile_id}/`
  
  const fetchProfile = async () => {

      setIsLoading(true);

      try {

      const respose = await fetch(url2, {
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
    <div className='2xl:px-[10rem] xl:px-[5rem] lg:px-[5rem]  pt-28 w-full'>
      {showModal === true &&
        <div role="alert" data-aos="fade-up" data-aos-duration="500"  className="alert z-50 alert-success text-green-700 lg:w-fit w-[80%] m-auto right-0 left-0  top-24 h-[3rem] flex justify-center items-center rounded-full bg-green-100 border border-green-500 absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          
          <span>Saved Succesfully</span>
        </div>
        } 

        { showModal === false &&
        <div role="alert" data-aos="fade-up" data-aos-duration="500"  className="alert z-50 alert-success text-green-700 lg:w-fit w-[80%] m-auto right-0 left-0  top-24 h-[3rem] flex justify-center items-center rounded-full bg-green-100 border border-green-500 absolute">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          <span>Removed Succesfully</span>
        </div>
      }

      <div className=''>
        <p className='text-center text-black 2xl:text-6xl lg:text-4xl px-3 text-4xl font-bold lg:pt-20 pt-5 lg:pb-10 pb-5'>
          Hire the best  <br className='lg:block hidden'/>
          <span className='bg-gradient-to-r from-sky-600 to-teal-700 bg-clip-text text-transparent'>Talents</span> Around you
        </p>
      </div>

      <div className='pt-4 lg:px-0 px-3 pb-5 '>
        <div className='py-5 flex items-center'>
          <h2 className='text-xl '>Top Creatives</h2>

          <div className='ml-auto flex items-center gap-10'>
            <Link to={'/' + 'user-dashboard-creative'}>
              <button className='flex items-center gap-2 underline'>Browse All <IoMdArrowForward /></button>
            </Link>
          </div>
        </div>
        <CreativeCompo />
      </div>


      <dialog id="my_modal_3" className="modal">
          <div className="modal-box lg:max-w-[35%] w-[95%] p-0 2xl:h-[70%] xl:h-[70%] lg:h-[70%] h-[60%] flex rounded-md">

            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>


            <div className='overflow-y-scroll h-[90%] w-full lg:mt-5 p-7 lg:pt-5 mt-8'>

                <div className='w-[50%] flex justify-center m-auto rounded-lg'>
                  <img src={locationImage} alt="" className='w-full rounded-lg'/>
                </div>

                <div className='pt-5'>
                  <h2 className='text-xl font-bold text-center'>Add Location</h2>
                  <p className='pt-3 text-center text-sm'>Add your location to get talents nearest to you </p>

                  <Link to={'/user-dashboard-profile'}>
                    <button className='bg-black text-white lg:w-[50%] flex justify-center m-auto w-full rounded-full p-3 mt-10'>Add Location</button>
                  </Link>
                </div>
            </div>
          </div>
      </dialog>
    </div>
  )
}

