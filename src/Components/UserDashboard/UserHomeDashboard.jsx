import React, { useEffect, useState } from 'react'
import UserNavbar from './UserNavbar';
import UserSideBar from './UserSideBar';
import logo from '../Images/Creve1.png'

import { FaLocationDot } from "react-icons/fa6";
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoMdArrowForward } from "react-icons/io";
import { MdFavoriteBorder, MdVerified } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { GoTools } from "react-icons/go";
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

import noData from '../Images/nodata2.png'
import MyLoader from '../allLoadingState/MyLoader';
import locationImage from '../Images/loca.jpg'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const UserHomeDashboard = () => {

  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <div>
      <UserNavbar show={show} handleShow={handleShow}/>

      <div className='flex bg-neutral-100 h-full'>
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

  const [searchTerm, setSearchTerm] = useState('');



  const filteredItems = allTalents.filter(item => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (item.location && item.location.toLowerCase().includes(searchTermLower)) ||
      (item.category && item.category.toLowerCase().includes(searchTermLower)) ||
      (item.digital_skills && item.digital_skills.toLowerCase().includes(searchTermLower)) ||
      (item.work_type && item.work_type.toLowerCase().includes(searchTermLower)) ||
      (item.display_name && item.display_name.toLowerCase().includes(searchTermLower))||
      (item.user.fullname && item.user.fullname.toLowerCase().includes(searchTermLower))
    );
  });

  return (
    <div className='2xl:pl-[16rem] xl:pl-[15rem] lg:pl-[15rem] 2xl:pr-[3rem] xl:pr-[5rem] lg:pr-[3rem]  pt-28 w-full'>

      <div className='lg:flex items-center block px-5'>

        <div className='flex items-center'>
          <h2 className='text-2xl pb-3 lg:p-0'>Hi, {isLoading === true ? '- - - - -' : <>{profileData.user && profileData.user.fullname}! </>} </h2>
        </div>

        {/* <button onClick={()=>document.getElementById('my_modal_3').showModal()}>Show Modal</button> */}

        <div className='flex items-center gap-3 ml-auto'>
            <FaLocationDot size={18} className='text-green-600'/>
            <span className='text-sm'>{isLoading === true ? '- - -' : <>{profileData.address}</>}</span>
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

      <div className='shadow-[rgba(7,_65,_210,_0.03)_0px_9px_30px] bg-white 2xl:p-5 xl:p-5 lg:p-5 p-0 mt-5 lg:w-full w-[95%] m-auto  items-center 2xl:rounded-md xl:rounded-md lg:rounded-md rounded-md'>
          <Swiper
                slidesPerView={1}
                spaceBetween={40}
                navigation={true}
                loop={true}
                pagination={{
                    clickable: true,
                }}

                autoplay={{
                    delay: 15000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },

                900: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },


                1024: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                }}
                modules={[Pagination, Autoplay, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='bg-black text-white p-5 rounded-xl border w-full 2xl:h-[12rem] xl:h-[15rem] lg:h-[18rem] h-[12rem] border-neutral-200'>
                      <p className='text-sm'>Welcome to </p>
                      <div className='flex items-center gap-2 py-3'>
                        <img src={logo} alt="" className='w-5 h-5'/>
                        <h2 className='text-xl font-semibold'>Creve</h2>
                      </div>
                      <p className='2xl:text-sm xl:text-sm lg:text-[10px] text-sm'>You are highly welcome to creve, you can now browse creatives/talents around your locaton and hire at ease</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='bg-purple-500 text-white sect p-5 rounded-xl relative w-full 2xl:h-[12rem] xl:h-[15rem] lg:h-[18rem] h-[12rem] overflow-hidden border border-purple-200' >
                      <div className='relative isolate z-20'>
                        <h2 className='2xl:text-xl xl:text-xl lg:text-lg text-lg font-bold'>Become a Talent</h2>
                        <p className='py-3 lg:text-sm text-base'>Join other talents and earn</p>
                        <Link to={'/register'}>
                          <button className='bg-white  text-purple-800 mt-5 py-2 px-5 rounded-full font-semibold border border-purple-200 text-sm '>Get Started</button>
                        </Link>
                      </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='bg-blue-600 text-white sect1 p-5 rounded-xl relative w-full 2xl:h-[12rem] xl:h-[15rem] lg:h-[18rem] h-[12rem] overflow-hidden border border-orange-200' >
                      <div className='relative isolate z-20 '>
                        <h2 className='2xl:text-xl xl:text-xl lg:text-lg text-lg  font-bold'>Our  Blog</h2>
                        <p className='py-3 lg:text-sm text-base '>Browse our and get latest update</p>
                        <Link to={'/' + 'blog'}>
                          <button className='bg-white text-blue-500 mt-5 py-2 px-5 rounded-full font-semibold border border-blue-200 text-sm'>Browser</button>
                        </Link>
                      </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className='bg-lime-800 text-white sect2 p-5 rounded-xl relative w-full 2xl:h-[12rem] xl:h-[15rem] lg:h-[18rem] h-[12rem] overflow-hidden border border-lime-200' >
                    <div className='relative isolate z-20'>
                      <h2 className='2xl:text-xl xl:text-xl lg:text-lg text-lg font-bold'>Community</h2>
                      <p className='py-3 lg:text-sm text-base '>Join  community of like minds </p>

                      <Link to={'https://chat.whatsapp.com/F0782triuIhDgblx0YW1Mj'}>
                        <button className='bg-white text-lime-600 mt-5 py-2 px-5 rounded-full font-semibold border border-lime-200 text-xs'>Join Now</button>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>


        </Swiper>
      </div>

      <div className='pt-4 lg:px-0 px-5 pb-5 '>

        <div className='py-5 flex items-center'>
          <h2 className='text-xl '>Top Creatives</h2>

          <div className='ml-auto flex items-center gap-10'>
            <Link to={'/' + 'user-dashboard-creative'}>
              <button className='flex items-center gap-2 underline'>Browse All <IoMdArrowForward /></button>
            </Link>
          </div>
        </div>


        {isLoading === true ? <MyLoader /> : 
        <>
          {filteredItems.length > 0 && 

            <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 2xl:gap-5 xl:gap-5 lg:gap-4 gap-5 pt-0 lg:px-0'>
            {filteredItems.length > 0 &&
              <>
                {filteredItems.filter(talent => talent.location !== null && talent.cover_image !== 'https://creve.store/media/coverimage.png').map((talent) => (
                  <div className='bg-white  rounded-xl cursor-pointer relative border border-neutral-100' key={talent.id}>
                    <Link to={'/' + `user-dashboard-single-creative/${talent.id}/`}>
                      <div className='2xl:h-[20rem] relative xl-h-[15rem] bg-neutral-50 lg:h-[12rem] h-[20rem] overflow-hidden rounded-md'>
                        <img src={talent.cover_image} alt="" loading='lazy' className='w-full h-full object-cover'/>
                      </div>
                    </Link>

                    <div className='flex items-center pt-3 p-3'>

                      <div className='flex items-start gap-2'>
                        <div className='2xl:w-8 xl:w-6 lg:w-6 2xl:h-8 xl:h-6 lg:h-6 overflow-hidden border border-neutral-200 w-7 h-7 rounded-full'>
                          <img src={talent.profile_pics} alt="" className='2xl:w-8 xl:w-6 lg:w-6 2xl:h-8 xl:h-6 lg:h-6 w-7 h-7 object-cover'/>
                        </div>

                        <div>
                          <h3 className='2xl:text-sm xl:text-xs lg:text-[10px] text-sm font-semibold flex gap-2'>
                            {talent.user.fullname}
                            <div className=''>
                              {talent.verified === true && 
                                <button className='flex gap-2 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] bg-white text-green-600 text-lg rounded-full justify-center items-center'><MdVerified className=''/></button>
                                }
                            </div>
                          </h3>
                          <p className='2xl:text-[10px] xl:text-[10px] lg:text-[10px] text-xs flex items-center gap-2'>{talent.display_name} <GoTools /></p>
                        </div>

                  
                      </div>

                      <Link to={'/' + `user-dashboard-single-creative/${talent.id}/`} className='ml-auto'>
                  
                        <button className=' bg-neutral-200 p-2 rounded-full text-black 2xl:text-md xl:text-sm lg:text-[10px]'><IoArrowForwardOutline /></button>
                      </Link>
                    </div>
                    
                    <div className='flex items-center p-3 '>
                      <p className='text-xs flex items-center gap-2'><FaLocationDot className='text-accent'/>{talent?.location?.slice(0, 35)}. . .</p>
                      <p className='ml-auto text-xs '>{talent.work_type}</p>
                    </div>

                  </div>
                ))}
              </> 
            }
            </div>
          }


          {filteredItems.length <= 0 && (
              <div className='flex items-center w-fit justify-center m-auto h-[50vh] text-center'>
                <div className=''>
                  <img src={noData} alt="" className='w-[15rem] flex m-auto opacity-70'/>
                  <h2 className='text-xl font-bold'>No results found</h2>
                  <p className='text-xs'>It seems we can’t find any results <br /> based on your search.</p>
                </div>
              </div>
            )}

        </>
        }

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

