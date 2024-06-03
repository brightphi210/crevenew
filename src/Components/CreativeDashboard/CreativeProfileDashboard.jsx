import React, { useState } from 'react'
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
  return (
    <div className='lg:p-20 pt-20 lg:pl-[18rem] p-5'>
      <div>
        <div className='flex items-center py-5'>
            <h2>My Profile</h2>
            <button className='ml-auto flex items-center text-sm gap-2 underline'><MdModeEditOutline />Edit</button>
        </div>

        <div className='bg-black lg:p-8 p-5 rounded-lg text-white'>

            <div className='flex items-center gap-6'>
                <div className='border-2 border-white rounded-full'>
                    <img src={prof} alt="" className='lg:w-24  w-24'/>
                </div>

                <div>
                    <h2 className='text-sm'>Bright Philip</h2>
                    <p className='flex items-center gap-2 py-2 lg:text-sm text-xs'>12 Reviews <FaStar /><FaStar /><FaStar /></p>
                    <button className='bg-accent text-xs py-2 px-4 rounded-full flex items-center gap-2'><RiVerifiedBadgeFill />verified</button>
                </div>
            </div>

        </div>
      </div>

      <div className='flex gap-10 lg:flex-row flex-col-reverse mt-10'>
            <div className='lg:w-1/2 w-full border border-neutral-200 lg:p-10 p-5 rounded-md'>
                <h2 className='lg:text-lg text-sm pb-3'>General Informations</h2>
                <hr />

                <div className='py-4'>
                    <h2 className='text-sm'>Work Type</h2>
                    <p className='text-xs pt-4 flex items-center gap-2'><TbSmartHome className='text-accent text-sm'/>Remote</p>
                </div>

                <div className='py-4'>
                    <h2 className='text-sm'>Location</h2>
                    <p className='flex pt-4 items-center gap-2 text-xs'><FaLocationDot className='text-accent text-sm'/>64, Nanka street, Port Harcourt, Rivers State.</p>
                </div>

                <div className='py-4'>
                    <h2 className='text-sm'>Language</h2>
                    <p className='text-xs pt-4 flex items-center gap-2'> <HiLanguage className='text-accent text-sm'/>English</p>
                </div>

                <div className='py-4'>
                    <h2 className='text-sm'>Contact</h2>
                    <p className='text-xs pt-4 flex items-center gap-2'><TbBrandWhatsapp className='text-accent text-sm'/>Whatsapp</p>
                    <p className='text-xs pt-4 flex items-center gap-2'><MdOutlinePhoneInTalk className='text-accent text-sm'/>08094422807</p>
                    <p className='text-xs pt-4 flex items-center gap-2'><FaGlobe className='text-accent text-sm'/>website</p>
                </div>

            </div>

            <div className='lg:w-3/5 w-full border border-neutral-200 lg:p-10 p-5 rounded-md'>
                <h2 className=''>Details</h2>
                <hr />

                <div className='pt-5'>

                    <div className='flex lg:flex-row gap-3 flex-col lg:items-center'>
                        <h2 className='text-xl flex items-center gap-3'><FaToolbox />Senior Electrician</h2>
                        <p className='lg:ml-auto text-xs'>Starting Price : <strong>N5,000</strong></p>
                    </div>

                    <div className='flex flex-row flex-wrap gap-3 py-5 '>
                        <button className='border border-neutral-300 py-2 px-4 text-xs rounded-md'>Electrician</button>
                        <button className='border border-neutral-300 py-2 px-4 text-xs rounded-md'>Wirer</button>
                        <button className='border border-neutral-300 py-2 px-4 text-xs rounded-md'>Plumber</button>
                    </div>

                    <p className='text-xs pb-5 text-justify'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        Doloremque excepturi alias velit, aliquid aspernatur dolores sint dolorum 
                        soluta labore dicta enim, officiis nostrum eveniet repellat facere dolor, 
                    </p>

                    <div>
                        <PhotoProvider>

                            <PhotoView src={item1}>
                                <div className='w-full lg:h-[25rem] h-[10rem]  overflow-hidden lg:rounded-2xl rounded-md cursor-pointer bg-black'>
                                    <img src={item1} alt="" className='w-full'/>
                                </div>
                            </PhotoView>


                            <div className="lg:flex lg:flex-row gap-5 w-full mt-5 grid grid-cols-2 ">
                                <PhotoView  src={item6}>
                                    <div className='lg:h-[7rem] h-[4rem] overflow-hidden lg:w-1/4 w-full cursor-pointer rounded-lg bg-black'>
                                        <img src={item6} alt="" className='w-full hover:transform hover:scale-105 transition-all ease-linear'/>
                                    </div>
                                </PhotoView>

                                <PhotoView  src={item3}>
                                    <div className='lg:h-[7rem] h-[4rem] overflow-hidden lg:w-1/4 w-full cursor-pointer rounded-lg bg-black'>
                                        <img src={item3} alt="" className='w-full hover:transform hover:scale-105 transition-all ease-linear'/>
                                    </div>
                                </PhotoView>

                                <PhotoView  src={item4}>
                                    <div className='lg:h-[7rem] h-[4rem] overflow-hidden lg:w-1/4 w-full cursor-pointer rounded-lg bg-black'>
                                        <img src={item4} alt="" className='w-full hover:transform hover:scale-105 transition-all ease-linear'/>
                                    </div>
                                </PhotoView>

                                <PhotoView  src={item5}>
                                    <div className='lg:h-[7rem] h-[4rem] overflow-hidden lg:w-1/4 w-full cursor-pointer rounded-lg bg-black'>
                                        <img src={item5} alt="" className='w-full hover:transform hover:scale-105 transition-all ease-linear'/>
                                    </div>
                                </PhotoView>
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
  )
}
