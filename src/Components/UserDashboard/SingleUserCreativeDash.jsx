import React, { useEffect, useState } from 'react'
import img from '../Images/Avatars.png'
import { IoClose } from "react-icons/io5";


import { MdWorkOutline } from "react-icons/md";

import { GoUnverified } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { IoLanguage } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { MdOutlineWhatsapp } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdFavoriteBorder } from "react-icons/md";

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
import { IoShareSocialSharp } from "react-icons/io5";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

import validator from 'validator' 
import successImg from '../Images/gif1.gif'

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


    // console.log(creativeData);


    const navigate = useNavigate()
    const goBack = () =>{
      navigate(-1);
    }

    const url2 =`${BASE_URL}/bookcreatives/${id}/`

    const [isBooked, setIsBooked] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [phone, setPhone] = useState('')
    const [isLoading2, setIsLoading2] = useState(false)
    const [phoneErr, setPhoneErr] = useState('')

    const validatePhone = (e) => {
        setPhone(e.target.value)
      
        if (validator.isMobilePhone(phone)) {
           setPhoneErr('')
           setIsBooked(true)
        } else {
            setIsBooked(false)
           setPhoneErr('Enter valid Phone Number !')
        }
    }

    console.log(isBooked);



    const makeRequest = async (e) =>{
        e.preventDefault();
        setIsLoading2(true);

        try {
            const response = await fetch(url2, {
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${authUser.access}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "title": title,
                    "description": description,
                    "phone": phone,
                }),
            })
    
            if (response.ok || response.status === 200 || response.status === 2001) {
                console.log('Booked successfully');
                setTitle('');
                setDescription('');
                setPhone('');
                document.getElementById('my_modal_1').showModal()
                document.getElementById('my_modal_3').close()
                setIsLoading2(false);
            } else {
                console.log('Failed to book');
                setIsLoading2(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading2(false);
        }
    }
    const [copySuccess, setCopySuccess] = useState('');

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(
          () => setCopySuccess('Copied!'),
          (err) => setCopySuccess('Failed to copy!')
        );
    };



    const [content, setContent] = useState('')
    const url3 =`${BASE_URL}/reviews/${id}/`
    const dropReview = async (e) =>{
        e.preventDefault();
        setIsLoading2(true);
        try {
            const response = await fetch(url3, {
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${authUser.access}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "content": content,
                    "rating": 5,
                }),
            })
    
            if (response.ok || response.status === 200 || response.status === 2001) {
                // console.log('Booked successfully');

                setContent('');
                const review = await response.json();
                document.getElementById('my_modal_4').showModal()
                document.getElementById('my_modal_2').close()
                setIsLoading2(false);
            } else {
                console.log('Failed to book');
                setIsLoading2(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading2(false);
        }
    }

    const [showModal, setShowModal] = useState('')
      const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setIsFavorite(favorites.includes(creativeData.id));
    }, [creativeData.id]);
    
    const handleFavoritemClick = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      
      // Remove or add the id from the favorites array based on the current favorite status.
      const updatedFavorites = isFavorite
        ? favorites.filter((id) => id !== creativeData.id)
        : [...favorites, creativeData.id];
    
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);
      setShowModal(isFavorite ? false : true);

      setTimeout(() => {
        setShowModal('');
      }, 3000);

    };

    

    console.log('this is modal', showModal);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'bdc_82430c2e13ed42838148a7bf2b145370',
    });
    const center = useMemo(() => ({ lat: 5.420000076293945, lng: 73.856743 }), []);



    
  return (

    <div className=''>
        <div className='fixed z-50 w-full 2xl:px-[15rem] xl:px-[5rem] lg:px-[5rem] flex bg-black items-center text-white p-5 py-3'>
            <h2 className='lg:text-2xl text-lg'>Candidates Profile</h2>
            <p onClick={goBack} className='ml-auto items-center text-lg flex justify-center text-black bg-neutral-200 lg:p-3 p-2 rounded-full w-fit cursor-pointer'><IoClose className='cursor-pointer'/></p>
        </div>

        <div className={isLoading === true ? 'bg-neutral-100 pb-10 h-screen flex justify-center  px-0' : 'bg-neutral-100 pb-10 2xl:px-[15rem] xl:px-[5rem] lg:px-[5rem] h-full px-0'}>

            {showModal === true &&
            <div role="alert" data-aos="fade-up" data-aos-duration="500"  className="alert z-50 alert-success fixed text-green-700 lg:w-fit w-[80%] m-auto right-0 left-0  top-24 h-[3rem] flex justify-center items-center rounded-full bg-green-100 border border-green-500">
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
            <div role="alert" data-aos="fade-up" data-aos-duration="500"  className="alert z-50 alert-success fixed text-green-700 lg:w-fit w-[80%] m-auto right-0 left-0  top-24 h-[3rem] flex justify-center items-center rounded-full bg-green-100 border border-green-500">
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



            {isLoading === true ? <span className="loading loading-spinner loading-lg flex justify-center items-center m-auto "></span> : <>
            
                <div className='flex  relative lg:pt-[10rem] pt-[8rem] px-3'>
                    <div className=''>
                        <div className='flex  items-center gap-5'>
                            <div className='w-10 h-10 rounded-full overflow-hidden'>
                                <img src={creativeData.profile_pics} alt="" className='h-10 w-10 object-cover'/>
                            </div>

                            {creativeData.user && (

                                <div>
                                    <h2 className='text-sm'>{creativeData.user.fullname}</h2>
                                    <p className='text-xs'>{creativeData.display_name}</p>
                                </div>
                            )}

                            {/* <button className='mycolor2 rounded-full text-white font-bold text-sm gap-3 ml-auto w-fit flex items-center py-2 px-5'> <GoUnverified className=''/></button> */}
                        </div>
                    </div>

                    <div className='ml-auto flex items-center gap-1 '>
                        <p onClick={handleFavoritemClick} className='bg-white border border-neutral-300 py-3 lg:px-5 px-4 cursor-pointer rounded-full lg:text-sm text-xs  w-fit flex items-center gap-2'>{isFavorite ? 'remove' : 'Save'}</p>
                        {/* <p className='bg-white border 2xl:hidden block border-neutral-200 lg:p-3 p-2 cursor-pointer rounded-full lg:text-xl text-base'><MdOutlineMarkEmailUnread /></p> */}
                        {/* <p onClick={()=>document.getElementById('my_modal_3').showModal()} className='bg-white border 2xl:hidden block border-neutral-200 lg:p-3 p-2 cursor-pointer rounded-full lg:text-xl text-base'><RiSendPlane2Line /></p> */}
                        <button onClick={()=>document.getElementById('my_modal_3').showModal()} className='bg-black text-white py-3 lg:px-5 px-4 rounded-full lg:text-sm text-xs border border-neutral-200'>Get in touch</button>
                    </div>
                </div>

                <div>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-10 pt-10'>

                        <div className='lg:col-span-2'>
                            <div className='2xl:h-[40rem] xl:h-[30rem] lg:h-[25rem] h-[20rem] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-white overflow-hidden lg:rounded-2xl'>
                                <PhotoProvider>
                                    <PhotoView src={creativeData.cover_image}>
                                        <img src={creativeData.cover_image} alt="" className='w-full cursor-pointer hover:transform hover:scale-105 transition-all ease-linear h-full object-cover'/>
                                    </PhotoView>
                                </PhotoProvider>
                            </div>

                            {creativeData.images && (

                            <div className='lg:grid lg:grid-cols-4 grid grid-cols-2 items-center gap-4 pt-6 lg:px-0 px-5'>
                                {creativeData.images.map((Image)=>(

                                    <PhotoProvider>
                                    <div className='h-[13rem] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-white lg:w-full w-full overflow-hidden rounded-md'>
                                        <PhotoView src={Image.image}>
                                            <img src={Image.image} alt="" className='cursor-pointer h-[13rem] w-full object-cover hover:transform hover:scale-105 transition-all ease-linear'/>
                                        </PhotoView>
                                    </div>
                                    </PhotoProvider>
                                ))}
                            </div>

                            )}
                        </div>

                        <div className='bg-white border border-neutral-200  w-full lg:rounded-xl lg:p-10 p-5 h-fit'>

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


                            <div className='py-5 flex flex-wrap gap-3'>
                                {creativeData.dskills &&
                                    creativeData.dskills.map((skill, index) => (
                                    <button className='border border-neutral-300 py-2 px-4 text-xs rounded-md flex gap-1 items-center' key={index}>
                                        <GoDotFill className='mycolor'/>{skill.skill}
                                    </button>
                                ))}
                            </div>



                            <div className='pt-5'>
                                <p className='text-sm font-semibold'>Category</p>
                                <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm flex gap-2 items-center pt-2'>{creativeData.digital_skills}</p>
                                <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm flex gap-2 items-center pt-2'>{creativeData.nondigital_skills}</p>
                            </div>


                            <div className='pt-5'>
                                <p className='text-sm font-semibold '>Work Type</p>
                                <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm flex gap-2 items-center pt-2'><MdWorkOutline className='mycolor text-base'/>{creativeData.work_type}</p>
                            </div>

                            <div className='pt-5'>
                                <p className='text-sm font-semibold '>Language</p>
                                <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm flex gap-2 items-center pt-2'><IoLanguage className='mycolor text-base'/>{creativeData.language}</p>
                            </div>

                            
                            <div className='pt-5'>
                                <p className='text-sm font-semibold '>Location</p>
                                <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm flex gap-2 items-center pt-2'><GrLocation className='mycolor text-base'/>{creativeData.location}</p>
                            </div>

                            <div className='pt-5'>
                                <p className='text-sm font-semibold '>Contact</p>
                                <Link to={creativeData.whatsapp_link}>
                                    <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm pt-4 flex gap-2 items-center'><MdOutlineWhatsapp className='mycolor text-base'/>Whatsapp</p>
                                </Link>

                                <Link to={creativeData.website_link}>
                                    <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm pt-4 flex gap-2 items-center'><GrLanguage className='mycolor text-base'/>Website</p>
                                </Link>
                            </div>

                            <div className='flex gap-3'>
                                <button onClick={()=>document.getElementById('my_modal_2').showModal()} className='bg-accent py-3 px-5 mt-5 text-sm text-white rounded-md w-full'>Drop Reviews</button>
                                <button className='bg-black py-3 px-5 mt-5 text-sm text-white flex justify-center items-center m-auto gap-3 rounded-md w-full'>Share <IoShareSocialSharp /></button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='lg:w-[65%] w-[95%] lg:m-0 lg:mt-10 m-auto rounded-2xl  pt-5 lg:p-10 p-5 mt-5 bg-white'>
                    <h2 className='text-base py-3 text-center pb-8'> - Reviews -</h2>


                    <div className='w-full'>

                        {creativeData.reviewed && 
                            <>
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
                                    {creativeData.reviewed.map((review)=> <>
                                    <SwiperSlide>
                                        <div>
                                            <div className='flex flex-row items-center gap-3 m-auto justify-center'>
                                                <div className='border border-neutral-300 w-8 h-8 overflow-hidden rounded-full'>
                                                    <img src={review.reviewer.profile_pics} alt="" className='w-8 h-8 object-cover'/>
                                                </div>
                                                <h2>{review.reviewer.user.fullname}</h2>
                                            </div>

                                            <p className='text-xs text-center w-9/12 flex justify-center m-auto pt-4 mb-10'>{review.content}</p>
                                        </div>
                                    </SwiperSlide>
                                    </>)}

                                </Swiper>

                            </>
                        }

                        
                        <>
                            {creativeData.reviewed && creativeData.reviewed.length <= 0 && <p className='text-center text-sm'>No Review Found</p>}
                        </>
                    </div>
                </div>
            </>}


            <dialog id="my_modal_3" className="modal">
                <div className="modal-box rounded-md lg:p-10 p-8 lg:w-full w-[96%] lg:h-fit h-screen">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg pb-5 pt-10">Let's get your <br className='lg:hidden block'/> request  ready to send</h3>

                    <form action="" onSubmit={makeRequest}>

                        <div>
                            <p className="py-4 pb-2 text-sm">What are you looking to work on...</p>
                            <input 
                                type="text"  
                                required placeholder="e.g Funiture design, repairs, websites etc." 
                                className="input text-sm input-bordered w-full" 
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <p className="py-4 pb-2 text-sm">Provide you phone number...</p>
                            <input 
                                type="tel"  
                                required placeholder="Phone Number e.g 09086655698" 
                                className="input text-sm input-bordered w-full" 
                                value={phone}
                                onChange={validatePhone}
                            />
                            <p className='text-red-500 text-sm pt-3'>{phoneErr}</p>
                        </div>

                        <div>
                            <p className="py-6 pb-2 text-sm">Tell us more about the project</p>
                            <textarea 
                                required 
                                className="textarea textarea-bordered w-full min-w-full h-[13rem]" 
                                placeholder="I want to repair my car, or i need a site"
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className='flex items-center text-sm pt-5'>
                            <button className='underline' onClick={()=>document.getElementById('my_modal_3').close()}>Nevermind</button>
                            <button disabled={!isBooked} type='submit' className={`ml-auto py-2 px-4 color text-white rounded-full ${!isBooked ? 'opacity-50 cursor-not-allowed' : ''}`} >
                                {isLoading2 === true ? <span className="loading loading-spinner loading-sd"></span> : 'Send Request' }
                            </button>
                        </div>

                    </form>
                </div>
            </dialog>



            <dialog id="my_modal_2" className="modal">
                <div className="modal-box rounded-md lg:p-10 p-6 lg:w-full w-[96%] py-10">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg pb-5">Leave a review</h3>

                    <form action="" onSubmit={dropReview}>

                        <div>
                            <p className="py-1 pb-2 text-sm">Kindly leave a review for this creative</p>
                            <textarea 
                                required 
                                className="textarea textarea-bordered w-full min-w-full h-[13rem]" 
                                placeholder="He did a nice job for me"
                                value={content}
                                onChange={(e)=>setContent(e.target.value)}
                            ></textarea>
                        </div>

                        <div className='flex items-center text-sm pt-5'>
                            <button className='underline' onClick={()=>document.getElementById('my_modal_2').close()}>Nevermind</button>
                            <button className='ml-auto py-2 px-4 color text-white rounded-full'>{isLoading2 === true ? <span className="loading loading-spinner loading-sd"></span> : 'Send Review'}</button>
                        </div>

                    </form>
                </div>
            </dialog>



            <dialog id="my_modal_1" className="modal">
                <div className="modal-box rounded-2xl lg:p-10 p-6 py-10 lg:w-full w-[96%]">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='text-center'>
                        <div className='flex m-auto justify-center'>
                            <img src={successImg} alt="" className='w-28'/>
                        </div>
                        <h3 className="font-medium text-lg">Your message was Sent!</h3>
                        <h2 className='text-2xl py-3 pb-6 font-bold'>{creativeData.phone_number}</h2>
                        <a href={`tel:${creativeData.phone_number}`}>
                            <p className='text-white bg-black w-full rounded-full py-3 text-sm'>Call Now</p>
                        </a>
                        {/* <button className='text-white bg-black w-full rounded-full py-3 text-sm' onClick={()=>copyToClipboard(creativeData.phone_number)}>{copySuccess ? copySuccess : 'Copy Number to call'}</button> */}
                    </div>
                </div>
            </dialog>


            <dialog id="my_modal_4" className="modal">
                <div className="modal-box rounded-2xl lg:p-10 p-6 py-10 lg:w-full w-[96%]">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='text-center'>
                        <div className='flex m-auto justify-center'>
                            <img src={successImg} alt="" className='w-28'/>
                        </div>
                        <h3 className="font-medium text-lg">Your Review was Sent!</h3>
                        <button className='text-black bg-white border border-neutral-200 mt-5 w-full rounded-full py-3 text-sm' onClick={()=>document.getElementById('my_modal_4').close()}>Close</button>
                    </div>
                </div>
            </dialog>
        </div>
    </div>
  )
}

export default SingleUserCreativeDash
