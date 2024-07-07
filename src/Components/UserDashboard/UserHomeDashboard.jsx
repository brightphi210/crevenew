import React, { useEffect, useState } from 'react'
import UserNavbar from './UserNavbar';
import UserSideBar from './UserSideBar';
import logo from '../Images/Creve1.png'

import { talentsData } from '../Mock/allTalents';
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoMdArrowForward } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';

const UserHomeDashboard = () => {

  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <div>
      <UserNavbar show={show} handleShow={handleShow}/>

      <div className='flex lg:pt-24 bg-neutral-100 h-screen'>
        <UserSideBar show={show} />
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
    <div className='2xl:pl-[25rem] xl:pl-[18rem] lg:pl-[18rem] 2xl:pr-[10rem] xl:pr-[5rem] lg:pr-[5rem] 2xl:py-10 lg:py-5 pt-28 w-full overflow-y-scroll'>

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
        <div role="alert" className="alert z-50 alert-success text-green-700 lg:w-fit w-[80%] m-auto right-0 left-0  top-24 h-[3rem] flex justify-center items-center rounded-full bg-green-100 border border-green-500 absolute">
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
        <div role="alert" className="alert z-50 alert-success text-green-700 lg:w-fit w-[80%] m-auto right-0 left-0  top-24 h-[3rem] flex justify-center items-center rounded-full bg-green-100 border border-green-500 absolute">
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

      <div className='bg-white lg:p-10 p-5 mt-5 lg:w-full w-[95%] m-auto grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 2xl:gap-10 lg:gap-5 gap-5 items-center lg:rounded-3xl rounded-md'>

        <div className='bg-neutral-50 p-5 rounded-xl'>
          <p className='text-sm'>Welcome to </p>
          <div className='flex items-center gap-2 py-3'>
            <img src={logo} alt="" className='w-5 h-5'/>
            <h2 className='text-xl font-semibold'>Creve</h2>
          </div>
          <p className='2xl:text-sm xl:text-xs lg:text-[10px] text-sm'>You are highly welcome to creve, you can now browse creatives/talents around your locaton and hire at ease</p>
        </div>

        <div className='lg:bg-white sect p-5 rounded-xl relative w-full h-full overflow-hidden' >
          <div className='relative isolate'>
            <h2 className='2xl:text-3xl xl:text-xl lg:text-lg text-lg text-purple-800 font-bold'>Become a Talent</h2>
            <p className='py-3 text-sm'>Become a talent and earn</p>
            <button className='bg-white mt-5 py-2 px-5 rounded-full font-semibold border border-purple-200 text-xs'>Get Started</button>
          </div>
        </div>

        
        <div className='bg-white sect1 p-5 rounded-xl relative w-full h-full overflow-hidden' >
          <div className='relative isolate '>
            <h2 className='2xl:text-3xl xl:text-xl lg:text-lg text-lg text-orange-700 font-bold'>Our  Blog</h2>
            <p className='py-3 text-sm '>Browse our and get latest update</p>
            <button className='bg-white mt-5 py-2 px-5 rounded-full font-semibold border border-orange-200 text-xs'>Browser</button>
        </div>
        </div>

        
        <div className='bg-white sect2 p-5 rounded-xl relative w-full h-full overflow-hidden' >
          <div className='relative isolate'>
            <h2 className='2xl:text-3xl xl:text-xl lg:text-lg text-lg text-lime-800 font-bold'>Community</h2>
            <p className='py-3 text-sm '>Join  community of like minds </p>
            <button className='bg-white mt-5 py-2 px-5 rounded-full font-semibold border border-lime-200 text-xs'>Join Now</button>
        </div>
        </div>
      </div>

      <div className='pt-10 lg:px-0 px-5'>

        <div className='py-5 flex items-center'>
          <h2 className='text-2xl '>Top Creatives</h2>
          <button className='ml-auto flex items-center gap-2 underline'>Browse All <IoMdArrowForward /></button>
        </div>


        {isLoading === true ? <span className="loading loading-spinner loading-lg flex justify-center items-center m-auto mt-20"></span> : 
          <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-8'>

            {allTalents.map((talent) =>(

              <div className='bg-white  rounded-xl cursor-pointer relative' key={talent.id}>

                <div  className='absolute right-5 top-5 bg-white p-2 flex justify-center items-center rounded-full text-lg hover:bg-neutral-200 hover:transition-all hover:ease-linear'>
                  {show[talent.id] ? 
                  <p onClick={() => handleShow1(talent.id)}><MdFavorite className='text-green-700'/></p> 
                  : <p onClick={() => handleShow2(talent.id)} className='text-green-700'><MdFavoriteBorder /></p>}
                </div>

                <div className='2xl:h-[18rem] xl-h-[15rem] lg:h-[20rem] h-[20rem] overflow-hidden rounded-xl'>
                  <img src={talent.cover_image} alt="" className='w-full h-full object-cover'/>
                </div>

                <div className='flex items-center pt-3 p-3'>

                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 overflow-hidden rounded-full'>
                      <img src={talent.profile_pics} alt="" className='w-8 h-8 object-cover'/>
                    </div>

                    <div>
                      <h3 className='text-sm font-semibold'>{talent.name}</h3>
                      <p className='text-xs'>{talent.display_name}</p>
                    </div>
                  </div>

                  <button className='ml-auto bg-black p-2 rounded-md text-white text-lg'><IoArrowForwardOutline /></button>
                </div>

              </div>
            ))}
          </div>
        }

      </div>
    </div>
  )
}

