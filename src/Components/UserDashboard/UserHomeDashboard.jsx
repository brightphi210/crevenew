import React, { useEffect, useState } from 'react'
import UserNavbar from './UserNavbar';
import UserSideBar from './UserSideBar';
import logo from '../Images/Creve1.png'

import { talentsData } from '../Mock/allTalents';
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoMdArrowForward } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { GoTools } from "react-icons/go";
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

const UserHomeDashboard = () => {

  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <div>
      <UserNavbar show={show} handleShow={handleShow}/>

      <div className='flex bg-neutral-100 h-screen'>
        <div className='z-40'>
          <UserSideBar show={show} />
        </div>
        <UserHomeDashboardHome />
      </div>
    </div>
  )
}

export default UserHomeDashboard



export const UserHomeDashboardHome = () => {
  

  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState('')
  
  const handleShow1 = (id) => {
    setShow((prev) => ({
      ...prev,
      [id]: false,
    }));

    setShowModal(false);
    setTimeout(() => {
      setShowModal('');
    }, 3000);
  };


  const handleShow2 = (id) => {
    setShow((prev) => ({
      ...prev,
      [id]: true,
    }));

    setShowModal(true);
    setTimeout(() => {
      setShowModal('');
    }, 3000);
  };


  const [allTalents, setAllTalents] = useState([])
  let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
  const [isLoading, setIsLoading] = useState(false)
  const url =`${BASE_URL}/creativeprofile/`

  const fetchTalents = async() => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${authUser.access}`,
        },
      })
      if (!response.ok) {
          setIsLoading(false);
          throw new Error('Network response was not ok');
      }
      const data = await response.json();

      console.log(data);
      setAllTalents(data)

      } catch (error) {
          console.log(error);
      } finally {
      setIsLoading(false);
      }
  }


  useEffect(() => {
    fetchTalents();
  }, []);


  console.log('this is ', allTalents);

  return (
    <div className='2xl:pl-[20rem] xl:pl-[13rem] lg:pl-[13rem] 2xl:pr-[5rem] xl:pr-[5rem] lg:pr-[3rem]  pt-28 w-full overflow-y-scroll'>

      <div className='lg:flex items-center block px-5'>
        <h2 className='text-2xl pb-3 lg:p-0'>Hi, Bright!</h2>

        <div className='relative 2xl:w-4/12  xl:w-1/2  lg:w-1/2 w-full flex ml-auto'>
            <>
            <input type="text" placeholder="Search here . . ." className="input rounded-full text-sm input-bordered 2xl:p-7 xl:p-5 lg:p-5 w-full flex m-auto " />
            <button className='absolute lg:top-2 top-1.5 right-3 text-xs bg-black text-white 2xl:py-3 xl:py-2 lg:py-2 px-4 py-2.5 rounded-full '>Search</button>
            </>
        </div>
      </div>

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

      <div className='bg-white 2xl:p-10 xl:p-5 lg:p-5 p-5 mt-5 lg:w-full w-[95%] m-auto grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 grid-cols-1 2xl:gap-10 lg:gap-5 gap-5 items-center 2xl:rounded-3xl xl:rounded-xl lg:rounded-xl rounded-md'>

        <div className='bg-neutral-50 p-5 rounded-xl'>
          <p className='text-sm'>Welcome to </p>
          <div className='flex items-center gap-2 py-3'>
            <img src={logo} alt="" className='w-5 h-5'/>
            <h2 className='text-xl font-semibold'>Creve</h2>
          </div>
          <p className='2xl:text-sm xl:text-xs lg:text-[10px] text-sm'>You are highly welcome to creve, you can now browse creatives/talents around your locaton and hire at ease</p>
        </div>

        <div className='lg:bg-white sect p-5 rounded-xl relative w-full h-full overflow-hidden' >
          <div className='relative isolate z-20'>
            <h2 className='2xl:text-3xl xl:text-xl lg:text-lg text-lg text-purple-800 font-bold'>Become a Talent</h2>
            <p className='py-3 text-sm'>Become a talent and earn</p>
            <button className='bg-white mt-5 py-2 px-5 rounded-full font-semibold border border-purple-200 text-xs '>Get Started</button>
          </div>
        </div>

        
        <div className='bg-white sect1 p-5 rounded-xl relative w-full h-full overflow-hidden' >
          <div className='relative isolate z-20 '>
            <h2 className='2xl:text-3xl xl:text-xl lg:text-lg text-lg text-orange-700 font-bold'>Our  Blog</h2>
            <p className='py-3 text-sm '>Browse our and get latest update</p>
            <button className='bg-white mt-5 py-2 px-5 rounded-full font-semibold border border-orange-200 text-xs'>Browser</button>
        </div>
        </div>

        
        <div className='bg-white sect2 p-5 rounded-xl relative w-full h-full overflow-hidden' >
          <div className='relative isolate z-20'>
            <h2 className='2xl:text-3xl xl:text-xl lg:text-lg text-lg text-lime-800 font-bold'>Community</h2>
            <p className='py-3 text-sm '>Join  community of like minds </p>
            <button className='bg-white mt-5 py-2 px-5 rounded-full font-semibold border border-lime-200 text-xs'>Join Now</button>
        </div>
        </div>
      </div>

      <div className='pt-10 lg:px-0 px-7 pb-20'>

        <div className='py-5 pb-10 flex items-center'>
          <h2 className='text-xl '>Top Creatives</h2>

          <div className='ml-auto flex items-center gap-10'>
            {/* <div className='flex items-center gap-2'>
              <button className='bg-white py-2 px-5 rounded-full border border-neutral-300 text-xs '>Digital</button>
              <button className='bg-white py-2 px-5 rounded-full border border-neutral-300 text-xs '>Non-Digital</button>
            </div> */}
            <button className='flex items-center gap-2 underline'>Browse All <IoMdArrowForward /></button>
          </div>
        </div>


        {isLoading === true ? <span className="loading loading-spinner loading-lg flex justify-center items-center m-auto mt-20"></span> : 
          <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 2xl:gap-5 xl:gap-5 lg:gap-4 gap-5'>

            {allTalents.map((talent) =>(

              <div className='bg-white  rounded-xl cursor-pointer relative' key={talent.id}>

                <div  className='absolute right-5 top-5 bg-white p-2 flex justify-center items-center rounded-full text-lg hover:bg-neutral-200 hover:transition-all hover:ease-linear'>
                  {show[talent.id] ? 
                  <p onClick={() => handleShow1(talent.id)}><MdFavorite className='text-green-700'/></p> 
                  : <p onClick={() => handleShow2(talent.id)} className='text-green-700'><MdFavoriteBorder /></p>}
                </div>

                <Link to={'/' + `user-dashboard-single-creative/${talent.id}/`}>
                  <div className='2xl:h-[20rem] xl-h-[15rem] bg-neutral-50 lg:h-[12rem] h-[20rem] overflow-hidden rounded-md'>
                    <img src={talent.cover_image} alt="" className='w-full h-full object-cover'/>
                  </div>
                </Link>

                <div className='flex items-center pt-3 p-3'>

                  <div className='flex items-center gap-2'>
                    <div className='2xl:w-8 xl:w-6 lg:w-6 2xl:h-8 xl:h-6 lg:h-6 overflow-hidden w-7 h-7 rounded-full'>
                      <img src={talent.profile_pics} alt="" className='2xl:w-8 xl:w-6 lg:w-6 2xl:h-8 xl:h-6 lg:h-6 w-7 h-7 object-cover'/>
                    </div>

                    <div>
                      <h3 className='2xl:text-sm xl:text-xs lg:text-[10px] text-sm font-semibold'>{talent.user.fullname}</h3>
                      <p className='2xl:text-[10px] xl:text-[10px] lg:text-[10px] text-xs flex items-center gap-2'>{talent.display_name} <GoTools /></p>
                    </div>
                  </div>

                  <button className='ml-auto bg-neutral-200 p-2 rounded-full text-black 2xl:text-md xl:text-sm lg:text-[10px]'><IoArrowForwardOutline /></button>
                </div>

              </div>
            ))}
          </div>
        }

      </div>
    </div>
  )
}

