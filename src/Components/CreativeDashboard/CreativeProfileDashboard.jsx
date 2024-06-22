import React, { useEffect, useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'
import prof from '../Images/Avatars.png'
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { TbSmartHome } from "react-icons/tb";
import { FaGlobe } from "react-icons/fa";
import { TbBrandWhatsapp } from "react-icons/tb";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { HiLanguage } from "react-icons/hi2";
import { FaToolbox } from "react-icons/fa6";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GoUnverified } from "react-icons/go";

import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import item1 from '../Images/item1.jpg'
import item3 from '../Images/item3.jpg'
import item4 from '../Images/item4.jpg'
import item5 from '../Images/item5.jpg'
import item6 from '../Images/item6.jpg'


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../Auth/BaseUrl';
import Loader from '../Loader';
import { GoDotFill } from "react-icons/go";


const CreativeProfileDashboard = () => {

    const [show, setShow] = useState(false)
  
    const handleShow = () => {
      setShow(!show)
    }


  return (
    <div className='flex flex-row w-full'>
      <div className=''>
        <CreativeSideBarCom show={show} />
      </div>
      <div className='w-full'>
        <CreativeNavBarCom show={show} handleShow={handleShow}/>
        <CreativeProfile />
      </div>
    </div>
  )
}

export default CreativeProfileDashboard



export const CreativeProfile= () => {

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



    const [inputString, setInputString] = useState('');
    const [stringArray, setStringArray] = useState([]);
  
    useEffect(() => {
      // Split the input string by commas and trim whitespace
      const array = inputString.split(',').map(item => item.trim());
      setStringArray(array);
    }, [inputString]);


  return (

    <div>

        {isLoading === true ? (
            <Loader />
        ) : (

            <div className='lg:p-20 pt-20 lg:pl-[18rem] p-5'>
            <div>
                <div className='flex items-center py-5'>
                    <h2>My Profile</h2>
                    <Link to={'/creative-dashboard-profile-update'} className='ml-auto'>
                            <button className='ml-auto flex items-center text-sm gap-2 underline'>
                            <MdModeEditOutline />Edit
                        </button>
                    </Link>
                </div>

                <div className='bg-black lg:p-8 p-5 rounded-lg text-white'>

                    <div className='flex items-center gap-6'>
                        <div className='border-2 border-white rounded-full w-24 overflow-hidden'>
                            <img src={profileData.profile_pics} alt="" className='lg:w-28  w-28'/>
                        </div>

                        <div>
                            <h2 className='text-sm'>{userToken.name} <span className='text-xs text-neutral-300'>({userToken.role})</span></h2>
                            <p className='flex items-center gap-2 py-2 lg:text-sm text-xs'>12 Reviews <FaStar /><FaStar /><FaStar /></p>

                            {profileData.verified === true ? (
                                <button className='bg-accent text-xs py-2 px-4 rounded-full flex items-center gap-2'><RiVerifiedBadgeFill />verified</button>
                            ) : (
                                
                                <button className='bg-accent text-xs py-2 px-4 rounded-full flex items-center gap-2'><GoUnverified className='font-bold' />Unverified</button>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <div className='flex gap-10 2xl:flex-row xl:flex-col flex-col-reverse mt-10'>
                    <div className='2xl:w-1/2 xl:w-full w-full border border-neutral-200 lg:p-10 p-5 rounded-md'>
                        <h2 className='lg:text-lg text-sm pb-3'>General Informations</h2>
                        <hr />

                        <div className='py-4'>
                            <h2 className='text-sm'>Work Type</h2>
                            <p className='text-xs pt-4 flex items-center gap-2'><TbSmartHome className='text-accent text-sm'/>{profileData.work_type}</p>
                        </div>

                        <div className='py-4'>
                            <h2 className='text-sm'>Location</h2>
                            <p className='flex pt-4 items-center gap-2 text-xs'><FaLocationDot className='text-accent text-sm'/>{profileData.location}</p>
                        </div>

                        <div className='py-4'>
                            <h2 className='text-sm'>Language</h2>
                            <p className='text-xs pt-4 flex items-center gap-2'> <HiLanguage className='text-accent text-sm'/>{profileData.language}</p>
                        </div>

                        <div className='py-4'>
                            <h2 className='text-sm'>Contact</h2>

                            <Link to={profileData.whatsapp_link}>
                                <p className='text-xs pt-4 flex items-center gap-2'><TbBrandWhatsapp className='text-accent text-sm'/>whatsapp</p>
                            </Link>
                            <p className='text-xs pt-4 flex items-center gap-2'><MdOutlinePhoneInTalk className='text-accent text-sm'/>{profileData.phone_number}</p>

                            <Link to={profileData.website_link}>
                                <p className='text-xs pt-4 flex items-center gap-2'><FaGlobe className='text-accent text-sm'/>website</p>
                            </Link>
                        </div>

                    </div>

                    <div className='2xl:w-3/5 xl:w-full w-full border border-neutral-200 lg:p-10 p-5 rounded-md'>
                        <h2 className=''>Details</h2>
                        <hr />

                        <div className='pt-5'>

                            <div className='flex lg:flex-row gap-3 flex-col lg:items-center'>
                                <h2 className='text-xl flex items-center gap-3'><FaToolbox />{profileData.display_name}</h2>
                                <p className='lg:ml-auto text-xs'>Starting Price : <strong>N{profileData.starting_price}</strong></p>
                            </div>

                            <div className='py-5'>
                                {profileData.dskills &&
                                    profileData.dskills.map((skill, index) => (
                                    <button className=' flex flex-row flex-wrap items-center gap-2  ' key={index}>
                                        {skill.skill.split(',').map((item, idx) => (
                                        <span className='border border-neutral-300 py-2 px-4 text-xs rounded-md flex gap-1 items-center' key={idx}><GoDotFill className='mycolor'/>{item.trim()}</span>
                                        ))}
                                    </button>
                                ))}
                            </div>

                            <p className='text-xs pb-5 text-justify'>
                                {profileData.about}
                            </p>

                            <div>
                                <PhotoProvider>

                                    <PhotoView src={profileData.cover_image}>
                                        <div className='w-full 2xl:h-[20rem] xl:h-[15rem] lg-[15rem] overflow-hidden  lg:rounded-lg rounded-md cursor-pointer bg-neutral-200'>
                                            <img src={profileData.cover_image} alt="" className='w-full h-full object-cover hover:transform hover:scale-105 transition-all ease-linear'/>
                                        </div>
                                    </PhotoView>


                                    <div className="2xl:grid 2xl:grid-cols-4 xl:grid xl:grid-cols-3 lg:grid lg:grid-cols-3 gap-5 w-full mt-5 grid grid-cols-2 ">
                                        {profileData.images && (
                                            <>
                                            
                                            {profileData.images.map((image)=>(
                                                // console.log(image.image)
                                                <PhotoView  src={image.image}>
                                                    <div className='2xl:h-[8rem] xl:h-[8rem] lg:h-[8rem] h-[8rem] overflow-hidden w-full cursor-pointer rounded-md bg-neutral-200'>
                                                        <img src={image.image} alt="" className='w-full h-full object-cover hover:transform hover:scale-105 transition-all ease-linear'/>
                                                    </div>
                                                </PhotoView>
                                            ))}
                                            </>
                                        )}
                                    </div>
                                </PhotoProvider>
                            </div>

                            <div className='w-full max-w-full pt-5'>
                                <h2 className='text-sm py-3'>Reviews</h2>

                                <div className='w-full'>
                                    <Swiper
                                        cssMode={true}
                                        navigation={true}
                                        pagination={true}
                                        mousewheel={true}
                                        loop={true}
                                        keyboard={true}
                                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                                        className="mySwiper"
                                    >
                                        <SwiperSlide>
                                            <div>
                                                <div className='flex flex-row items-center gap-3 m-auto justify-center'>
                                                    <div className='border border-neutral-300 w-10 rounded-full'>
                                                        <img src={prof} alt="" className='w-10'/>
                                                    </div>
                                                    <h2>Jane Doe</h2>
                                                </div>

                                                <p className='text-xs text-center w-9/12 flex m-auto pt-4 mb-10'>
                                                    Hi, I’m Cassie, Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                </p>
                                            </div>
                                        </SwiperSlide>
                                        

                                        <SwiperSlide>
                                            <div>
                                                <div className='flex flex-row items-center gap-3 m-auto justify-center'>
                                                    <div className='border border-neutral-300 w-10 rounded-full'>
                                                        <img src={prof} alt="" className='w-10'/>
                                                    </div>
                                                    <h2>Jane Doe</h2>
                                                </div>

                                                <p className='text-xs text-center w-9/12 flex m-auto pt-4 mb-10'>
                                                    Hi, I’m Cassie, Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                </p>
                                            </div>
                                        </SwiperSlide>



                                            <SwiperSlide>
                                            <div>
                                                <div className='flex flex-row items-center gap-3 m-auto justify-center'>
                                                    <div className='border border-neutral-300 w-10 rounded-full'>
                                                        <img src={prof} alt="" className='w-10'/>
                                                    </div>
                                                    <h2>Jane Doe</h2>
                                                </div>

                                                <p className='text-xs text-center w-9/12 flex m-auto pt-4 mb-10'>
                                                    Hi, I’m Cassie, Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                </p>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        )}
    </div>
  )
}
