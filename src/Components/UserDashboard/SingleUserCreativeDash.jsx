import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaLocationDot } from "react-icons/fa6";


import { MdWorkOutline } from "react-icons/md";
import { GoTools, GoUnverified } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { IoLanguage } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { MdOutlineWhatsapp } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate, useNavigation, useParams } from 'react-router-dom';
import { useMemo } from "react";

import validator from 'validator' 
import successImg from '../Images/gif1.gif'
import UserNavbar from './UserNavbar';
import { TbAlertTriangle } from 'react-icons/tb';
import Pusher from "pusher-js";
import MyLoader from '../allLoadingState/MyLoader';
import { MdVerified } from "react-icons/md";
import { BsChat } from 'react-icons/bs';
import Footer from '../Footer'
import { useLoadScript } from '@react-google-maps/api';
import { PiWarningCircleFill } from "react-icons/pi";



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
    }, [id]);


    const [show, setShow] = useState(false)

    const handleShow = () => {
      setShow(!show)
    }

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
                setIsLoading2(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading2(false);
        }
    }

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
                setContent('');
                const review = await response.json();
                document.getElementById('my_modal_4').showModal()
                document.getElementById('my_modal_2').close()
                setIsLoading2(false);
            } else {
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


    const baseUrl = window.location.origin;
    const profileUrl = `${baseUrl}/user-dashboard-single-creative/${id}/`;
    const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Check out this Talent on creve',
              text: 'This Talent is good and reliable to work with',
              url: profileUrl
            });
            console.log('Content shared successfully');
          } catch (error) {
            console.error('Error sharing content:', error);
          }
        } else {
          console.error('Web Share API not supported in this browser');
        }
    };

    const [allTalents, setAllTalents] = useState([])
    const url5 =`${BASE_URL}/creativeprofile/`
    const fetchTalents = async() => {
        setIsLoading(true);
        try {
        const response = await fetch(url5, {
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

        // console.log(data);
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


    // ================================= MESAAGES ====================================

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        // Pusher.logToConsole = true;

        const pusher = new Pusher('ffd0f41c2f813018fb0d', {
            cluster: 'mt1'
        });

        const channel = pusher.subscribe(`Chat_between_${userToken?.profile_id}_and_${id}`);
        channel.bind('connected', function (data) {
            // console.log('Received message:', data.message);
        });
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        try {
            const response = await fetch(`${BASE_URL}/chat/${id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser.access}`,
                },
                body: JSON.stringify({
                    'body':message
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
                setIsSending(false);
            }

            const data = await response.json();

            if(response.ok || response.status === 200) {
                document.getElementById('my_modal_6').showModal()
                document.getElementById('my_modal_5').close()
                console.log('Sent message response: ', data);
                setIsSending(false);
            }

            setMessage('');
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setIsSending(false);
        }
    };



    // ======================= Filtered Talents ==============================
    const [filteredTalents, setFilteredTalents] = useState([])
    const [isFilteredLoaded, setIsFilteredLoaded] = useState(false)
    const fetchFilteredTalents = async () => {
        setIsFilteredLoaded(true);
        try {
            const response = await fetch(`${BASE_URL}/talents/${id}/`, {
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${authUser.access}`,
                },
            })
            if (!response.ok) {
                setIsFilteredLoaded(false);
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFilteredTalents(data);
        }
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            setIsFilteredLoaded(false);
        }
    }    

    useEffect(() => {
        fetchFilteredTalents();
    }, []);



    const [showWorks, setShowWorks] = useState(true);
    const [showSkills, setShowSkills] = useState(false);
    const [showBio, setShowBio] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [showFAQs, setShowFQAs] = useState(false);


    const handleShowWorks = () => {
        setShowWorks(true);
        setShowSkills(false);
        setShowBio(false);
        setShowReviews(false);
        setShowFQAs(false);
    }

    const handleShowSkills = () => {
        setShowWorks(false);
        setShowSkills(true);
        setShowBio(false);
        setShowReviews(false);
        setShowFQAs(false);
    }

    const handleShowBio = () => {
        setShowWorks(false);
        setShowSkills(false);
        setShowBio(true);
        setShowReviews(false);
        setShowFQAs(false);
    }

    const handleShowReviews = () => {
        setShowWorks(false);
        setShowSkills(false);
        setShowBio(false);
        setShowReviews(true);
        setShowFQAs(false);
    }

    const handleShowFAQs = () => {
        setShowWorks(false);
        setShowSkills(false);
        setShowBio(false);
        setShowReviews(false);
        setShowFQAs(true);
    }

  return (

    <div className='bg-white h-full'>
        <div>
            <UserNavbar show={show} handleShow={handleShow}/>
        </div>

        <div className=''>

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


            <div className='text-white bg-gradient-to-b  from-gray-950 to-teal-950 flex justify-center lg:h-[8rem] h-[8rem] lg:pt-[4rem] pt-[4rem] items-center w-full'>
                {isLoading === false &&
                    <div>
                        <p className='text-xs flex gap-2 items-start pt-2'>
                            <GrLocation className='text-green-400 text-xl'/>{creativeData.city}
                        </p>
                    </div>
                }
            </div>


            {isLoading === true ? <MyLoader /> : 
                <div className='lg:px-[5rem] px-5 lg:grid lg:grid-cols-5 flex flex-col lg:gap-10 gap-5'>
                    <div className='relative 2xl:col-span-1 xl:col-span-1 lg:col-span-1'>
                        
                        <div className='flex'>
                            <div className='w-28 h-28 absolute top-[-10px] rounded-full border-4 border-white bg-white overflow-hidden'>
                                <img src={creativeData.profile_pics} alt="" className='w-28 h-28 object-cover'/>
                            </div>

                            <button onClick={goBack} className='bg-white lg:hidden text-black flex items-center justify-center gap-3 border border-neutral-300 rounded-full py-2 px-6 text-sm ml-auto mt-5'><FaArrowLeft/>Back</button>
                        </div>


                        {creativeData.user && (
                            <div className='lg:pt-32 pt-16'>
                                <h2 className='text-lg font-bold flex gap-2 items-center'>{creativeData.user.fullname}
                                    {creativeData?.verification?.verified === true ? <MdVerified className='text-green-500'/>  : <GoUnverified className='text-red-500 font-bold'/> }
                                </h2>
                                <p className='text-sm'>{creativeData.display_name} <span className='text-xs text-neutral-400'></span></p>
                            </div>
                        )}

                        <div className='py-5 border-b border-b-neutral-300'>
                            <p className='text-sm pt-3'><b>{creativeData.experience}</b> yrs. of experience</p>
                        </div>


                        <div className='flex flex-col w-full gap-3 pt-5 '>
                            <button onClick={()=>document.getElementById('my_modal_3').showModal()} 
                                className='bg-black text-white py-3 lg:px-5 w-full px-4 rounded-full lg:text-sm text-sm font-semibold border border-neutral-200'>
                                Hire Now
                            </button>
                            
                            <button onClick={()=>document.getElementById('my_modal_5').showModal()} 
                                className='bg-green-50 w-full justify-center flex text-sm m-auto gap-3 items-center border border-green-500 text-green-950 p-2.5 rounded-full'>
                                <BsChat /> Message
                            </button>

                            <p onClick={handleFavoritemClick} 
                                className='bg-white border w-full border-neutral-300 text-sm p-2.5 cursor-pointer rounded-full flex m-auto justify-center items-center gap-2'>
                                {isFavorite ? <p className='flex items-center text-sm gap-3'><MdOutlineFavorite className='text-green-950'/> Saved</p> : 
                                <p className='flex items-center text-sm gap-3'><MdFavoriteBorder className='text-green-950'/>Save</p>}
                            </p>

                        </div>
                        
                        <div className=''>

                        <div className='mt-5 pt-2 border-t  border-t-neutral-200'>
                            <p className='text-sm font-semibold'>Category</p>
                            <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm flex gap-2 items-center pt-2'>{creativeData.digital_skills}</p>
                            <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm flex gap-2 items-center pt-2'>{creativeData.nondigital_skills}</p>
                        </div>

                        <div className='pt-5 flex items-center'>
                            <p className='2xl:text-sm xl:text-xs lg:text-xs text-sm flex gap-2 items-center'><IoLanguage className='text-green-500 text-base'/>{creativeData.language}</p>
                            <p className='text-xs font-light text-neutral-400'>- Language</p>
                        </div>

                        </div>
                    </div>


                    <div className='2xl:col-span-4 xl:col-span-4 lg:col-span-4 lg:pt-10'>

                        <button onClick={goBack} className='bg-white hidden  text-black lg:flex items-center justify-center gap-3 border border-neutral-300 rounded-full py-2 px-6 text-sm ml-auto mt-5'><FaArrowLeft/>Back</button>

                        <div className='py-10'>
                            <ul className='flex mb-5 border-b gap-4 border-b-neutral-300 text-sm relative'>
                                <li onClick={handleShowWorks} className={`hover:border-b-2 hover:transition-all ease-linear ${showWorks === true && 'border-b-2 border-neutral-500'} pb-3 border-neutral-300 cursor-pointer`}>Works</li>
                                <li onClick={handleShowBio} className={`hover:border-b-2 hover:transition-all ease-linear ${showBio === true && 'border-b-2 border-neutral-500'} pb-3 border-neutral-300 cursor-pointer`}>Bio</li>
                                <li onClick={handleShowSkills} className={`hover:border-b-2 hover:transition-all ease-linear ${showSkills === true && 'border-b-2 border-neutral-500'} pb-3 border-neutral-300 cursor-pointer`}>Skills</li>
                                <li onClick={handleShowFAQs} className={`hover:border-b-2 hover:transition-all ease-linear ${showFAQs === true && 'border-b-2 border-neutral-500'} pb-3 border-neutral-300 cursor-pointer`}>FAQs</li>
                                <li onClick={handleShowReviews} className={`hover:border-b-2 hover:transition-all ease-linear ${showReviews === true && 'border-b-2 border-neutral-500'} pb-3 border-neutral-300 cursor-pointer`}>Reviews ({creativeData?.reviewed?.length})</li>
                            </ul>

                            {showWorks === true && 
                            <>
                                {creativeData?.images?.length === 0 && <p className='text-center text-sm py-5'>No Data Found</p>}

                                {creativeData.images && (
                                    <div className='lg:grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 grid grid-cols-2 items-center lg:gap-4 gap-2 pt-3 lg:px-0'>
                                        {creativeData.images.map((Image)=>(

                                            <PhotoProvider>
                                                <div className='lg:h-[15rem] h-[10rem]  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-white lg:w-full w-full overflow-hidden rounded-md'>
                                                    <PhotoView src={Image.image}>
                                                        <img src={Image.image} loading='lazy' alt="" className='cursor-pointer h-full w-full object-cover hover:transform hover:scale-105 transition-all ease-linear'/>
                                                    </PhotoView>
                                                </div>
                                            </PhotoProvider>
                                        ))}
                                    </div>
                                )}
                            </>}

                            {showBio === true && 
                            (<div className='bg-neutral-100 p-4'>
                                <div className='mt-5'>
                                    <p className='text-sm font-bold pb-3'>Bio</p>
                                    <p className='text-sm text-justify 2xl:text-sm xl:text-sm lg:text-sm'>{creativeData.about}</p>

                                </div>
                            </div>)}

                            {showSkills === true && 
                                <div className='py-5 pt-3 flex flex-wrap gap-3'>
                                    {creativeData.dskills &&
                                        creativeData.dskills.map((skill, index) => (
                                        <button className='border border-neutral-300 py-2 px-4 text-xs rounded-md flex gap-1 items-center' key={index}>
                                            <GoDotFill className='mycolor'/>{skill.skill}
                                        </button>
                                    ))}
                                </div>
                            }

                            {showFAQs === true && 
                            <div className='bg-neutral-100 border border-neutral-200 rounded-lg text-black mt-5 p-3'>
                                    {creativeData?.questions?.length === 0 ? 
                                    
                                        <><p className='text-center text-xs py-5'>No FAQs Added yet</p></>
                                    : 
                                        
                                    <div>
                                        {creativeData.questions && 
                                            creativeData.questions.map((faq, index) =>(
                                                
                                                <div className="collapse bg-white text-black h-fit collapse-arrow rounded-md  mb-2" key={index}>
                                                    <input type="checkbox" />
                            
                                                    <div className="collapse-title lg:text-sm text-sm font-medium bg-neutral-10">{faq.question}</div>
                                                    <div className="collapse-content border-t border-t-neutral-200">
                                                        <p className='lg:w-1/2 w-full text-justify text-sm pt-3'>{faq.answer}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    }
                            </div>
                            }


                            {showReviews === true && (
                                <div className='lg:w-[100%] w-[100%] lg:m-0 lg:mt-10 m-auto rounded-md  pt-5 lg:p-10 p-5 mt-5 bg-neutral-100'>
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
                                                    {creativeData?.reviewed.map((review)=> <>
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
                                            {creativeData?.reviewed && creativeData?.reviewed.length <= 0 && <p className='text-center text-sm'>No Review Found</p>}
                                        </>
                                    </div>
                                </div> 
                            )}
                        

                            <div className='flex gap-3 pt-3 mt-5 border-t border-t-neutral-200'>
                                <button onClick={()=>document.getElementById('my_modal_1').showModal()} className='bg-green-700 py-3 lg:px-10 mt-5 text-sm text-white rounded-full lg:w-fit w-full'>Drop Review</button>
                                <button onClick={handleShare} className='bg-black mt-5 text-sm text-center text-white gap-3 py-3 lg:px-10 rounded-full lg:w-fit w-full'>Share</button>
                            </div>

                        </div>
                    </div>
                </div>
            }


            <dialog id="my_modal_3" className="modal">
                <div className="modal-box rounded-md lg:p-10 p-5 lg:w-full w-[96%] lg:h-fit h-screen">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-xl pb-5 pt-10">Let's get your request ready to send</h3>

                    <form action="" onSubmit={makeRequest}>

                        <div>
                            <p className="py-4 pb-2 text-sm font-semibold">What are you looking to work on...</p>
                            <input 
                                type="text"  
                                required placeholder="e.g Funiture design, repairs, websites etc." 
                                className="input text-sm py-7 input-bordered w-full" 
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <p className="py-3 pb-2 text-sm font-semibold">Tell us more about the project</p>
                            <textarea 
                                required 
                                className="textarea textarea-bordered w-full min-w-full h-[13rem]" 
                                placeholder="I want to repair my car, or i need a site"
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className='flex items-center text-sm pt-5'>
                            <p className='underline' onClick={()=>document.getElementById('my_modal_3').close()}>Nevermind</p>
                            <button disabled={title === '' || description === ''} type='submit' 
                                className={`ml-auto py-3 px-4 color text-white rounded-full ${title === '' && description === '' ? 'opacity-50 cursor-not-allowed' : ''}`} >
                                {isLoading2 === true ? <span className="loading loading-spinner loading-sd"></span> : 'Send Request' }
                            </button>
                        </div>

                    </form>
                </div>
            </dialog>

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box rounded-md lg:p-10 p-5 lg:w-full w-[96%] py-10">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl pb-3">Leave a review</h3>

                    <form action="" onSubmit={dropReview}>

                        <div>
                            <p className="py-1 pb-2 text-sm font-semibold">Kindly leave a review for this creative</p>
                            <textarea 
                                required 
                                className="textarea textarea-bordered w-full min-w-full h-[13rem]" 
                                placeholder="He did a nice job for me"
                                value={content}
                                onChange={(e)=>setContent(e.target.value)}
                            ></textarea>
                        </div>

                        <div className='flex items-center text-sm pt-5'>
                            <p className='underline' onClick={()=>document.getElementById('my_modal_2').close()}>Nevermind</p>
                            <button className='ml-auto py-3 px-5 color text-xs text-white rounded-full'>{isLoading2 === true ? <span className="loading loading-spinner loading-sd"></span> : 'Send Review'}</button>
                        </div>
                    </form>
                </div>
            </dialog>

            

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box rounded-2xl lg:p-10 px-3 lg:py-10 py-10 lg:w-full w-[96%]">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='text-center px-4'>

                        <p className='bg-red-100 text-red-600 rounded-lg p-3 text-xs flex'>
                            Do not send money directly to a talent, make your payment through the platform to avoid being scarmed
                        </p>
                        <div className='flex m-auto justify-center'>
                            <img src={successImg} alt="" className='w-28'/>
                        </div>
                        
                        <h3 className="font-medium text-xl pb-2">Your booking request was sent!</h3>
                        <p className='text-gray-600 text-sm'>We will get back to you shortly.</p>

                        <div className='flex gap-3 pt-10 w-full '>
                        
                            <Link to={'/user-dashboard-books'} className='w-full'>
                                <button className='text-white bg-black w-full  rounded-full py-2.5 text-sm'>View Booking</button>
                            </Link>
                        </div>

                        {/* <div className='flex gap-3'>
                            <Link to={`tel:${creativeData.phone_number}`} className='w-full'>
                                <p className='text-white bg-black  rounded-full py-2.5 text-sm'>Call Now</p>
                            </Link>
                            <button className='text-black bg-white border border-neutral-400 w-full rounded-full py-2 text-sm' onClick={()=>copyToClipboard(creativeData.phone_number)}>{copySuccess ? copySuccess : 'Copy'}</button>
                        </div> */}

                        {/* <p className='text-green-600 bg-green-50 flex justify-center m-auto items-center mt-10 p-2.5 text-sm rounded-lg gap-3 border border-green-600'><TbAlertTriangle />Copy Talents number to call </p> */}

                        <Link to={'https://chat.whatsapp.com/K3CgZedlHFhJQO7T3UsUd5'} className='w-fit'>
                            <p className='m-auto flex justify-center w-fit text-xs gap-2 mt-10'>If you need any help, <span className='text-blue-500 underline cursor-pointer'>Please Contact us</span></p>
                        </Link>
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


            <dialog id="my_modal_6" className="modal">
                <div className="modal-box rounded-2xl lg:p-10 p-6 py-10 lg:w-full w-[96%]">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='text-center'>
                        <div className='flex m-auto justify-center'>
                            <img src={successImg} alt="" className='w-28'/>
                        </div>
                        <h3 className="font-medium text-lg">Your Message was Sent!</h3>
                        <Link to={'/user-dashboard-chat'}>
                            <button className='text-black bg-white border border-neutral-200 mt-5 w-full rounded-full py-3 text-sm'>Continue Chat</button>
                        </Link>
                    </div>
                </div>
            </dialog>

            
            <dialog id="my_modal_5" className="modal">
                <div className="modal-box rounded-md lg:p-10 p-5 lg:w-full w-[96%] lg:h-fit h-screen">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-xl pb-3 pt-5">Start chatting with talent</h3>
                    <p className='pb-5'>Send talent a message and await response or send them a request and await a call</p>
                    <form action="" onSubmit={submit}>
                        <div>
                            <input 
                                type="text"  
                                required placeholder="e.g Funiture design, repairs, websites etc." 
                                className="input h-[5rem] text-sm py-7 input-bordered w-full" 
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                        </div>
                        <div className='flex items-center text-sm pt-5'>
                            <button type='submit' className={`w-full py-3 px-4 color text-white rounded-full }`} >
                                {isSending === true ? <span className="loading loading-spinner loading-sd"></span> : 'Send Message' }
                            </button>
                        </div>

                        <div>
                            {messages.map((msg, index) => (
                                <div key={index}>{msg.body}</div>
                            ))}
                        </div>
                    </form>
                </div>
            </dialog>
        </div>

        <Footer />
    </div>
  )
}

export default SingleUserCreativeDash
