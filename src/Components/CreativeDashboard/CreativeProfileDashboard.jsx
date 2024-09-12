import React, { useEffect, useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'
import { FaLocationDot } from "react-icons/fa6";
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
import comm from '../Images/hero.svg'


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../Auth/BaseUrl';
import { GoDotFill } from "react-icons/go";
import MyLoader from '../allLoadingState/MyLoader';


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
      const array = inputString.split(',').map(item => item.trim());
      setStringArray(array);
    }, [inputString]);


    const chatmessage = 'Hello, I would like to inquire about your services.'
    const formattedPhoneNumber = profileData.whatsapp_link && profileData.whatsapp_link.replace(/\D/g, ''); // Remove non-numeric characters
    const encodedMessage = encodeURIComponent(chatmessage || '');
    const whatsappURL = `https://wa.me/${formattedPhoneNumber}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
  return (

    <div>

        {isLoading === true ? (
            <MyLoader />
            ) : (

            <div className='lg:p-20 pt-20 lg:pl-[18rem] p-5'>
                <div>
                    <div className='flex items-center py-5'>
                        <h2 className='text-2xl font-bold'>My Profile</h2>
                        <Link to={'/creative-dashboard-profile-update'} className='ml-auto'>
                                <button className='ml-auto flex items-center text-sm gap-2 underline'>
                                <MdModeEditOutline />Edit
                            </button>
                        </Link>
                    </div>

                    <div className='color flex lg:p-8 p-5 rounded-lg text-white'>

                        <div className='flex items-center gap-3'>

                            <div className='relative'>
                                <div className='border-2 border-white rounded-full w-24 h-24 overflow-hidden '>
                                    <img src={profileData.profile_pics} alt="" className='lg:w-full h-full w-full object-cover'/>
                                </div>
                                
                                <div className='absolute top-1 right-0'>
                                        {profileData?.verification?.verified === true ? (
                                            <button className='bg-black text-2xl text-accent p-0 rounded-full flex items-center'><RiVerifiedBadgeFill /></button>
                                        ) : (
                                            
                                            <button className='bg-black text-red-400 text-2xl p-0 rounded-full flex items-center'><GoUnverified className='font-bold' /></button>
                                        )}
                                </div>
                            </div>

                            <div>
                                <h2 className='text-base'>{userToken.name} </h2>
                                <p className='text-xs text-neutral-300'>({userToken.role})</p>
                                <p className='flex items-center gap-2 py-2 lg:text-sm text-xs'>{profileData.reviewed && profileData.reviewed.length} Reviews</p>
                            </div>
                        </div>

                        <div className='ml-auto w-40 lg:block hidden'>
                            <img src={comm} alt="" />
                        </div>

                    </div>
                </div>

                <div className='flex gap-10 2xl:flex-row xl:flex-col flex-col-reverse mt-10'>
                    <div className='2xl:w-1/2 xl:w-full w-full border border-neutral-200 lg:p-10 p-3 rounded-md'>
                        <h2 className='lg:text-lg text-base pb-3'>General Informations</h2>
                        <hr />

                        <div className='py-4'>
                            <h2 className='text-sm font-semibold'>Work Type</h2>
                            <p className='text-sm pt-4 flex items-center gap-2'><TbSmartHome className='text-accent text-sm'/>{profileData.work_type}</p>
                        </div>

                        <div className='py-4'>
                            <h2 className='text-sm font-semibold'>Location</h2>
                            <p className='flex pt-4 items-center gap-2 text-sm'><FaLocationDot className='text-accent text-sm'/>{profileData.location}</p>
                        </div>

                        <div className='py-4'>
                            <h2 className='text-sm font-semibold'>Language</h2>
                            <p className='text-sm pt-4 flex items-center gap-2'> <HiLanguage className='text-accent text-sm'/>{profileData.language}</p>
                        </div>

                        <div className='py-4'>
                            <h2 className='text-sm pb-4 font-semibold'>Contact</h2>

                            {/* <a href={whatsappURL} target="_blank" rel="noopener noreferrer"> */}
                                <p className='text-sm mb-2 flex items-center gap-2'><TbBrandWhatsapp className='text-accent text-lg'/>{profileData.whatsapp_link}</p>
                            {/* </a> */}

                            {/* <Link to={profileData.whatsapp_link}>
                                <p className='text-sm mb-2 flex items-center gap-2'><TbBrandWhatsapp className='text-accent text-sm'/>whatsapp</p>
                            </Link> */}

                            <a href={`tel:${profileData.phone_number}`}>
                                <p className='text-sm py-2 flex items-center gap-2'><MdOutlinePhoneInTalk className='text-accent text-lg'/>
                                {profileData.phone_number}
                                </p>
                            </a>

                            <Link to={profileData.website_link}>
                                <p className='text-sm mt-2 flex items-center gap-2'><FaGlobe className='text-accent text-lg'/>website</p>
                            </Link>
                        </div>

                    </div>

                    <div className='2xl:w-3/5 xl:w-full w-full border border-neutral-200 lg:p-10 p-3 rounded-md'>
                        <h2 className=''>Details</h2>
                        <hr />

                        <div className='pt-5'>

                            <div className='flex lg:flex-row gap-3 flex-col lg:items-center'>
                                <h2 className='text-xl flex items-center gap-3'><FaToolbox />{profileData.display_name}</h2>
                                <p className='lg:ml-auto text-sm'>Starting Price : <strong>N{profileData.starting_price}</strong></p>
                            </div>

                            <div className='py-5 flex flex-wrap gap-3'>
                                {profileData.dskills &&
                                    profileData.dskills.map((skill, index) => (
                                    <button className='border border-neutral-300 py-2 px-4 text-xs rounded-md flex gap-1 items-center' key={index}>
                                        <GoDotFill className='mycolor'/>{skill.skill}
                                    </button>
                                ))}
                            </div>

                            <p className='text-xs pb-5 text-justify'>
                                {profileData.about}
                            </p>

                            <div>
                                <PhotoProvider>
                                    <PhotoView src={profileData.cover_image}>
                                        <div className='w-full 2xl:h-[10rem] xl:h-[10rem] lg:h-[10rem] h-[8rem] overflow-hidden  lg:rounded-lg rounded-md cursor-pointer bg-neutral-200'>
                                            <img src={profileData.cover_image} alt="" className='w-full h-full object-cover hover:transform hover:scale-105 transition-all ease-linear'/>
                                        </div>
                                    </PhotoView>

                                    <div className="2xl:grid 2xl:grid-cols-4 xl:grid xl:grid-cols-3 lg:grid lg:grid-cols-3 gap-5 w-full mt-5 grid grid-cols-2 ">
                                        {profileData.images && (
                                            <>
                                            
                                            {profileData.images.map((image)=>(
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
                                {profileData.reviewed && <>
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

                                    {profileData.reviewed.map((review)=> <>
                                        <SwiperSlide>
                                            <div>
                                                <div className='flex flex-row items-center gap-3 m-auto justify-center'>
                                                    <div className='border border-neutral-300 w-10 h-10 overflow-hidden rounded-full'>
                                                        <img src={review.reviewer.profile_pics} alt="" className='w-full h-full object-cover'/>
                                                    </div>
                                                    <h2>{review.reviewer.user.fullname}</h2>
                                                </div>
                                                <p className='text-xs text-center w-9/12 flex m-auto justify-center pt-4 mb-10'>{review.content}</p>
                                            </div>
                                        </SwiperSlide>
                                    </>)}
                                    </Swiper>
                                </div>
                                </>}
                            </div>
                            <>
                                {profileData.reviewed && profileData.reviewed.length <= 0 && <p className='text-center text-sm'>No Review Found</p>}
                            </>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}
