import React, { useEffect, useState } from 'react'
import img from '../Images/Avatars.png'
import { IoClose } from "react-icons/io5";
import img2 from '../Images/Group 25.png'
import img3 from '../Images/Group 22.png'
import img4 from '../Images/Group 21.png'
import img5 from '../Images/Group 26.png'
import img6 from '../Images/Group 23.png'


import { MdWorkOutline } from "react-icons/md";

import { GoUnverified } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { IoLanguage } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { MdOutlineWhatsapp } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import prof from '../Images/Avatars.png'
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate, useNavigation, useParams } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi2';
import { RiSendPlane2Line } from "react-icons/ri";

const SingleUserCreativeDash = () => {


    const {id} = useParams()
    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
    const [isLoading, setIsLoading] = useState(false)

    const [creativeData, setCreativeData] = useState({})

    const url =`${BASE_URL}/creativeprofile/${id}/`
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
        setCreativeData(data);

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
    const goBack = () =>{
      navigate(-1);
    }
  

  return (
    <div className={isLoading === true ? 'bg-neutral-100 pb-10 h-screen flex justify-center  px-0' : 'bg-neutral-100 pb-10 2xl:px-[15rem] xl:px-[5rem] lg:px-[5rem] h-full px-0'}>
        <p onClick={goBack} className='text-lg flex bg-neutral-200 p-2 rounded-full absolute lg:right-[15rem] right-5 z-40  top-5 lg:top-20 cursor-pointer'><IoClose className='cursor-pointer'/></p>


        {isLoading === true ? <span className="loading loading-spinner loading-lg flex justify-center items-center m-auto "></span> : <>
            <div className='flex relative lg:pt-[8rem] pt-20 px-5'>
                <div className=''>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full overflow-hidden'>
                            <img src={creativeData.profile_pics} alt="" className='h-10 w-10 object-cover'/>
                        </div>

                        {creativeData.user && (

                            <div>
                                <h2 className='text-sm'>{creativeData.user.fullname}</h2>
                                <p className='text-xs'>{creativeData.display_name}</p>
                            </div>
                        )}

                        {/* <button className='mycolor2 rounded-full text-white font-bold text-sm p-1'> <GoUnverified className=''/></button> */}
                    </div>
                </div>

                <div className='ml-auto flex items-center gap-2'>
                    <p className='bg-white border border-neutral-200 lg:p-3 p-2 cursor-pointer rounded-full lg:text-xl text-base'><MdFavoriteBorder /></p>
                    <p className='bg-white border 2xl:hidden block border-neutral-200 lg:p-3 p-2 cursor-pointer rounded-full lg:text-xl text-base'><MdOutlineMarkEmailUnread /></p>
                    <p onClick={()=>document.getElementById('my_modal_3').showModal()} className='bg-white border 2xl:hidden block border-neutral-200 lg:p-3 p-2 cursor-pointer rounded-full lg:text-xl text-base'><RiSendPlane2Line /></p>
                    <button onClick={()=>document.getElementById('my_modal_3').showModal()} className='bg-black 2xl:block hidden text-white py-3 px-5 rounded-full text-sm border border-neutral-200'>Get in touch</button>
                </div>
            </div>

            <div>
                <div className='grid lg:grid-cols-3 grid-cols-1 gap-10 pt-10'>

                    <div className='lg:col-span-2 '>
                        <div className='lg:h-[30rem] h-[18rem] bg-white overflow-hidden lg:rounded-md'>
                            <PhotoProvider>
                                <PhotoView src={creativeData.cover_image}>
                                    <img src={creativeData.cover_image} alt="" className='w-full cursor-pointer hover:transform hover:scale-105 transition-all ease-linear h-full object-cover'/>
                                </PhotoView>
                            </PhotoProvider>
                        </div>

                        {creativeData.images && (

                        <div className='lg:flex grid grid-cols-2 items-center gap-4 pt-6 lg:px-0 px-5'>
                            {creativeData.images.map((Image)=>(

                                <PhotoProvider>
                                <div className='h-[9rem] bg-white lg:w-[15rem] w-full overflow-hidden rounded-md'>
                                    <PhotoView src={Image.image}>
                                        <img src={Image.image} alt="" className='cursor-pointer h-[9rem] w-full object-cover hover:transform hover:scale-105 transition-all ease-linear'/>
                                    </PhotoView>
                                </div>
                                </PhotoProvider>
                            ))}
                        </div>

                        )}
                    </div>

                    <div className='bg-white  w-full lg:rounded-xl lg:p-10 p-5'>

                        <div className='flex items-center '>
                            <h2 className='font-bold 2xl:text-sm xl:text-xs lg:text-xs text-sm '>Details</h2>
                            <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm  font-semibold ml-auto'><span className='font-normal'>Starting Price </span>: {creativeData.starting_price}</p>
                        </div>



                        
                        <div className='pt-5 '>
                            <p className='text-sm text-justify 2xl:text-sm xl:text-xs lg:text-xs'>{creativeData.about}</p>
                        </div>

                        <div className='flex items-center gap-2 pt-5'>
                            <p className='bg-neutral-200  p-2 rounded-full'><PiPhoneCallFill /></p>
                            <button className='font-semibold '>{creativeData.phone_number}</button>
                        </div>


                        <div className='py-5'>
                            {creativeData.dskills &&
                                creativeData.dskills.map((skill, index) => (
                                <button className=' flex flex-row flex-wrap items-center gap-2  ' key={index}>
                                    {skill.skill.split(',').map((item, idx) => (
                                    <span className='border border-neutral-300 py-2 px-4 text-xs rounded-md flex gap-1 items-center' key={idx}><GoDotFill className='mycolor'/>{item.trim()}</span>
                                    ))}
                                </button>
                            ))}
                        </div>



                        <div className='pt-5'>
                            <p className='text-xs '>Work Type</p>
                            <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm flex gap-2 items-center pt-2'><MdWorkOutline className='mycolor text-base'/>{creativeData.work_type}</p>
                        </div>

                        <div className='pt-5'>
                            <p className='text-xs '>Language</p>
                            <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm flex gap-2 items-center pt-2'><IoLanguage className='mycolor text-base'/>{creativeData.language}</p>
                        </div>

                        
                        <div className='pt-5'>
                            <p className='text-xs '>Location</p>
                            <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm flex gap-2 items-center pt-2'><GrLocation className='mycolor text-base'/>{creativeData.location}</p>
                        </div>

                        <div className='pt-5'>
                            <p className='text-xs '>Contact</p>
                            <Link to={creativeData.whatsapp_link}>
                                <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm pt-4 flex gap-2 items-center'><MdOutlineWhatsapp className='mycolor text-base'/>Whatsapp</p>
                            </Link>

                            <Link to={creativeData.website_link}>
                                <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm pt-4 flex gap-2 items-center'><GrLanguage className='mycolor text-base'/>Website</p>
                            </Link>
                        </div>

                        <div>
                            <button onClick={()=>document.getElementById('my_modal_2').showModal()} className='bg-accent py-3 px-5 mt-5 text-sm text-white rounded-md w-full'>Drop Reviews</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className='lg:w-[65%] w-[95%] lg:m-0 lg:mt-10 m-auto rounded-2xl  pt-5 lg:p-10 p-5 mt-5 bg-white'>
                <h2 className='text-base py-3 text-center pb-8'> - Reviews -</h2>

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
        </>}


        <dialog id="my_modal_3" className="modal">
            <div className="modal-box rounded-md p-10 lg:w-full w-[96%]">
                <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg pb-5">Let's get your request ready to send</h3>

                <form action="">

                    <div>
                        <p className="py-4 pb-2 text-sm">What are you looking to work on...</p>
                        <input type="text"  required placeholder="e.g Funiture design, repairs, websites etc." className="input text-sm input-bordered w-full" />
                    </div>

                    <div>
                        <p className="py-6 pb-2 text-sm">Tell us more about the project</p>
                        <textarea required className="textarea textarea-bordered w-full min-w-full h-[13rem]" placeholder="I want to repair my car, or i need a site"></textarea>
                    </div>

                    <div className='flex items-center text-sm pt-5'>
                        <button className='underline' onClick={()=>document.getElementById('my_modal_3').close()}>Nevermind</button>
                        <button className='ml-auto py-2 px-4 color text-white rounded-full' >Send Request</button>
                    </div>

                </form>
            </div>
        </dialog>



        <dialog id="my_modal_2" className="modal">
            <div className="modal-box rounded-md p-10 lg:w-full w-[96%]">
                <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg pb-5">Leave a review</h3>

                <form action="">

                    <div>
                        <p className="py-1 pb-2 text-sm">Kindly leave a review for this creative</p>
                        <textarea required className="textarea textarea-bordered w-full min-w-full h-[13rem]" placeholder="He did a nice job for me"></textarea>
                    </div>

                    <div className='flex items-center text-sm pt-5'>
                        <button className='underline' onClick={()=>document.getElementById('my_modal_2').close()}>Nevermind</button>
                        <button className='ml-auto py-2 px-4 color text-white rounded-full'>Send Review</button>
                    </div>

                </form>
            </div>
        </dialog>
    </div>
  )
}

export default SingleUserCreativeDash
