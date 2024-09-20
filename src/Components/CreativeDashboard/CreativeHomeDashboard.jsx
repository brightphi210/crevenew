import React, {useRef, useEffect, useState } from 'react'
import CreativeNavBarCom from './CreativeNavBarCom';
import CreativeSideBarCom from './CreativeSideBarCom';
import voucher from '../Images/vouvher.png'
import laptop from '../Images/laptop.png'
import community from '../Images/community2.png'
import logo from '../Images/Creve1.png'

import { IoNotificationsCircle } from "react-icons/io5";
import { GrUpgrade } from "react-icons/gr";
import { MdHelpCenter } from "react-icons/md";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaCheckCircle, FaEdit, FaRegCopy } from "react-icons/fa";

import {RiDashboardHorizontalLine, RiVerifiedBadgeFill } from "react-icons/ri";
import { IoNotificationsOffOutline } from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";

import completeImage from '../Images/Buffer-bro.png'
import { Link } from 'react-router-dom';


import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';


import empty1 from '../Images/No data-cuate.png'
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { TbAlertTriangle } from "react-icons/tb";
import { GoUnverified } from "react-icons/go";

import shss from '../Images/find-talent-2x.jpg'
import { Verified } from 'lucide-react';
import { VscUnverified } from 'react-icons/vsc';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';


const CreativeHomeDashboard = () => {
  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <div className='flex flex-row w-full bg-neutral-100'>
      <div className='w-full'>
        <CreativeSideBarCom show={show} />
      </div>
      <div className='w-full'>
        <CreativeNavBarCom show={show} handleShow={handleShow}/>
        <CreativeHome />
      </div>
    </div>
  )
}

export default CreativeHomeDashboard




export const CreativeHome = () => {

  const [messages, setMessages] = useState('a')
  const [notification, setNotification] = useState(null)



  const [profileData, setProfileData] = useState({})

  let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
  const [isLoading, setIsLoading] = useState(false)
  const url =`${BASE_URL}/creativeprofile/${userToken.profile_id}/`

  const [showModal, setShowModal] = useState(false)
  const [isVerified, setIsVerified] = useState(() => {
    const savedIsVerified = localStorage.getItem('isVerified');
    return savedIsVerified ? JSON.parse(savedIsVerified) : false;
  });


  // ================Fetch Profile ========================

  const fetchProfile = async () => {
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

        if (
          data?.display_name === null ||
          data?.phone_number === null ||
          data?.dskills?.length === 0 ||
          data?.images?.length === 0
        ) {
          setShowModal(true);
        } else if (data?.verification?.verified === true) {
          setIsVerified(true);
          localStorage.setItem('isVerified', 'true'); // Set verified state in local storage
        } else {
          setIsVerified(false);
          localStorage.setItem('isVerified', 'false'); // Set verified state in local storage
        }


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


  // ======================= Update Profile =================
  const [showSuccess, setShowSuccess] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  const updateBookingStatus = async (bookingId) => {
    setIsUpdateLoading(true);
    try {
      const response = await fetch(`https://creve.store/approve-request/${bookingId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${authUser.access}`,
        },
        body: JSON.stringify({ status: true }),
      });

      if (response.ok) {
        fetchProfile();
        document.getElementById('my-drawer-4').checked = false;
        setIsUpdateLoading(false);
        setShowSuccess(true);
      } else {
        console.error('Failed to update booking status');
        setIsUpdateLoading(false);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      setIsUpdateLoading(false);
    }
  };



  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [showSuccess]);

  // ==================== Select a particular booking ===================
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleClick = (book) => {
    setSelectedRequest(book);
  };


  const [completeMessage, setCompleteMessage] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showModal === true) {
        setCompleteMessage(true);
      } else {
        setCompleteMessage(false);
      }
    }, 2000); 


    return () => clearTimeout(timer);
  }, [showModal]);
  

  // console.log('All Request', profileData);

  return (

    <div className='lg:p-16  lg:pl-[18rem] p-5 px-3 pt-20 lg:pt-28 relative'>

      {showSuccess === true && 
        <div role="alert" className="alert alert-success fixed bg-green-50 text-green-900 text-sm top-28 left-0 right-0 m-auto w-fit justify-center flex z-50">
          <>
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
          <span className=''>You have Successfully Approved Request</span>
          </>
        </div>
      }


      <div className='flex 2xl:flex-row flex-col xl:flex-row lg:flex-col gap-10'>
        <div className='w-full bg-black  rounded-xl text-white'>

          <Swiper
            cssMode={true}
            navigation={true}
            pagination={{
              clickable: true,
              // dynamicBullets: true,
            }}
            mousewheel={true}
            loop={true}
            keyboard={true}
            autoplay={{
              delay: 10500,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className='p-5 lg:px-10 px-5 flex 2xl:flex-row lg:flex-row flex-col items-center'>
                <div className=''>
                  <p className='2xl:text-sm lg:text-sm xl:text-[12px] text-xs'>
                    Join Freelancer Plus now to unlock new features to help you <br className='lg:block hidden'/>
                    grow your network and market your skills.
                  </p>
                  <h2 className='2xl:text-2xl lg:text-2xl xl:text-xl text-lg py-3'>Get 80 Connects each month</h2>
                  <button onClick={()=>document.getElementById('my_modal_5').showModal()} className=' mycolor2 text-white py-3 px-10 rounded-md text-xs'>Learn More</button>
                </div>

                <div className='lg:ml-auto lg:block hidden'>
                  <img src={voucher} alt="" className='lg:w-40 lg:mt-0 w-1/2 mt-10'/>
                </div>
              </div>

            </SwiperSlide>
            <SwiperSlide>
              <div className='p-5 lg:px-10 px-5 flex lg:flex-row flex-col items-center'>
                <div className=''>
                  <p className='2xl:text-sm lg:text-sm text-xs xl:text-[12px]'>
                    Creve 101 will guide you through the basics of our platform.
                  </p>
                  <h2 className='2xl:text-2xl lg:text-2xl xl:text-xl text-lg py-3'>Learn how to get started on Creve</h2>
                  <button onClick={()=>document.getElementById('my_modal_6').showModal()} className='mycolor2 text-white py-3 px-10 rounded-md text-xs'>Learn More</button>
                </div>

                <div className='lg:ml-auto lg:block hidden'>
                  <img src={laptop} alt="" className='lg:w-40 lg:mt-0 w-10/12 mt-10 '/>
                </div>
              </div>
            </SwiperSlide>

          </Swiper>
        </div>
      </div>


      <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-2 mt-5 lg:gap-5 gap-3'>
  
        <div className='gap-3 bg-white lg:p-5 lg:px-8 p-5 rounded-xl relative'>
          <div className=''>
            <div className='border-2 flex  border-neutral-200 bg-neutral-200 w-16 h-16 rounded-full overflow-hidden'>
              <img src={profileData.profile_pics} alt="" className='w-full h-full object-cover'/>
            </div>
          </div>
          <div className=''>
            <h2 className='lg:text-sm py-2 text-sm font-semibold'>{userToken.name}</h2>
            <p className='text-xs'>{profileData.display_name}</p>
          </div>
          
          <Link to={'/creative-dashboard-profile-update'}>
            <p className='absolute  cursor-pointer lg:text-lg text-sm lg:top-5 lg:right-5 top-3 right-3 p-3 flex items-center bg-gray-500 text-white rounded-full'><FaEdit /></p>
          </Link>
        </div>

        <div className=' bg-white lg:p-5 lg:px-8 p-5 rounded-xl flex flex-col gap-3'>
          <p className='bg-blue-700 flex items-center rounded-full p-3 lg:text-2xl text-lg text-white w-fit '><RiDashboardHorizontalLine /></p>
          <p className='lg:text-base text-sm'>Total Requests</p>
          <h2 className='lg:text-2xl text-lg font-semibold'>{profileData?.books && profileData?.books?.length}</h2>
        </div>

        <div className=' bg-white lg:p-5 lg:px-8 p-5 rounded-xl flex flex-col gap-3'>
          <p className='bg-green-700 flex items-center rounded-full p-3 lg:text-2xl text-lg text-white w-fit '><MdOutlinePendingActions /></p>
          <p className='lg:text-base text-sm'>Pending Requests</p>
          <h2 className='lg:text-2xl text-lg font-semibold'>{profileData?.books && profileData?.books?.filter((book) => book?.status === false).length}</h2>
        </div>

        <div className=' bg-white lg:p-5 lg:px-8  p-5 rounded-xl flex flex-col gap-3'>
          <p className='bg-purple-700 flex items-center rounded-full p-3 lg:text-2xl text-lg text-white w-fit '><IoMdCheckmarkCircleOutline /></p>
          <p className='lg:text-base text-sm'>Approved Requests</p>
          <h2 className='lg:text-2xl text-lg font-semibold'>{profileData?.books && profileData?.books?.filter((book) => book?.status === true).length}</h2>
        </div>

      </div>

      <div className='mt-10 flex 2xl:flex-row xl:flex-row lg:flex-col flex-col  w-full gap-10'>
        <div className=' bg-white 2xl:w-[77%] xl:w-[70%] lg:w-full lg:p-5 py-5 px-2 rounded-xl'>
          <h2 className='text-sm font-semibold'>Pending Request</h2>

          {isLoading === true ?
          <div className='pt-20 flex justify-center items-center'>
            <span className="loading loading-spinner loading-sm"></span>  
          </div>
           : <>

          {profileData.books && profileData.books.length <= 0 ? 
            <div className='flex justify-center items-center h-full'>
              <div className='p-5'>
                <img src={empty1} alt="" className='w-[8rem] 2xl:w-[10rem] flex m-auto '/>
                <h2 className='text-sm text-center text-neutral-300'>Nothing Here!!</h2>
              </div>
            </div> :
            <div>
              {profileData?.books &&  
              <>
                <div className='grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 items-center gap-3 ' >

                  {profileData.books.filter((book) => book.status === false).length > 0 ? 
                  
                  (
                    profileData.books.filter((book) => book.status === false).map((book)=>
                      <div className='bg-white border border-neutral-200 p-5 my-5 rounded-lg '>
                        <div className=''>
                          <div className='flex gap-2 items-center'>
                            <div className='w-8 h-8 justify-center items-center flex rounded-full overflow-hidden'>
                              <img src={book.client_profile.profile_pics} alt="" className='w-8 h-8 object-cover'/>
                            </div>
                            <div>
                              <h2 className='2xl:text-sm xl:text-sm lg:text-sm text-sm'>{book.client_profile.user.fullname}</h2>
                              <p className='text-[10px]'>{book.datetime}</p>
                            </div>
                          </div>

                          <div className='p-3 bg-neutral-100 my-5 rounded-md'>
                            <h2 className='text-sm font-semibold pb-2'>{book.title}</h2>
                            <p className='text-xs'>{book.description.slice(0, 30)}. . .</p>
                          </div>

                          <div>
                            <label onClick={() => handleClick(book)} className='mycolor2 text-white p-2 px-5 text-sm text-center m-auto rounded-full w-full block cursor-pointer' drawer-conten  htmlFor="my-drawer-4">View Request</label>
                          </div>

                        </div>
                      </div>
                    ) 
                  ) : 
                    <div className='p-5 col-span-3'>
                      <img src={empty1} alt="" className='w-[8rem] 2xl:w-[10rem] flex m-auto '/>
                      <h2 className='text-sm text-center text-neutral-300'>No Pending Request</h2>
                    </div>
                  }
                </div>
              </>
              }

            </div>
          }
          </>}

        </div>


        <div className=' 2xl:w-[23%] xl:w-[30%] lg:w-full w-full'>
          <div className='bg-white p-5 w-full rounded-xl '>
            <p className='text-sm font-semibold'>Notifications</p>  
            
            {notification === null ? 
            
            (

              <div className='p-5  '>
                <div className='flex items-center justify-center p-5 my-3 bg-white m-auto w-fit rounded-full'>
                  <p className='mycolor text-5xl'><IoNotificationsOffOutline /></p>
                </div>
                  <h2 className='text-lg  text-center text-neutral-300'>No Notification Yet</h2>
              </div>
            ) : 

            (

              <div className=''>
              <div className='my-3 hover:bg-neutral-200 flex items-center gap-3 p-3 rounded-md'>
                  <p className='text-cyan-500 mycolor text-4xl'><IoNotificationsCircle /></p>
                  <div>
                    <h2 className='text-sm flex items-center gap-2 2xl:text-xs'>Your account is verified</h2>
                    <p className='text-xs text-neutral-400'>2 days ago</p>
                  </div>
                  
                </div>

                <div className='my-3 hover:bg-neutral-200 flex items-center gap-3 p-3 rounded-md'>
                  <p className='text-cyan-500 mycolor text-4xl'><IoNotificationsCircle /></p>
                  <div>
                    <h2 className='text-sm flex items-center gap-2 2xl:text-xs'>Login Successful</h2>
                    <p className='text-xs text-neutral-400'>2 days ago</p>
                  </div>
                  
                </div>

                <div className='my-3 hover:bg-neutral-200 flex items-center gap-3 p-3 rounded-md'>
                  <p className='text-cyan-500 mycolor text-4xl'><IoNotificationsCircle /></p>
                  <div>
                    <h2 className='text-sm flex items-center gap-2 2xl:text-xs'>Login Successful</h2>
                    <p className='text-xs text-neutral-400'>2 days ago</p>
                  </div>
                  
                </div>

                <Link to={'/creative-dashboard-notificationAll'}>
                  <button className='bg-black text-xs px-5 py-3 text-white 2xl:w-full w-full lg:w-fit rounded-md'>See All</button>
                </Link>

              </div>
            )}
          </div>

          <div className='color p-5 w-full text-white rounded-xl mt-3 flex flex-col gap-5'>
            <p className='text-sm flex items-center gap-5 cursor-pointe text-neutral-400'>Upgrade to pro <FaUnlockKeyhole /></p>
            <Link to={'/' + 'help'}>
              <p className='text-sm flex items-center gap-5 cursor-pointer'>Help Center <MdHelpCenter /></p>
            </Link>
            <p className='text-sm flex items-center gap-5 cursor-pointer' onClick={()=>document.getElementById('my_modal_3').showModal()}>Join Community <GrUpgrade /></p>
          </div>
        </div>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box 2xl:w-[25rem] lx:w-[25rem] p-0 lg:w-[25rem] w-[90%]  2xl:h-[50vh] xl:h-[50vh] lg:h-[50vh] h-fit rounded-lg">
            

            <div className='w-full 2xl:block xl:hidden lg:hidden '>
              <img src={community} alt="" className='w-full 2xl:h-fit h-[15rem] object-cover' />
            </div>

            <div className='p-5 pt-10'>
              <h2>Welcome to your dashboard 👋 </h2>
              <p className='text-xs py-5'>We’re glad to have you onboard. join our unique community to get latest updates from us.</p>

              <div className='flex gap-3 mt-4'>
                <button className='mycolor3 py-3 px-5 text-xs rounded-md w-full' onClick={()=>{document.getElementById('my_modal_3').close()}}>Close</button>
                <Link to={'https://chat.whatsapp.com/FNQzOFlRnIKK3ChV8iOHWx'} className='w-full'>
                  <p className='mycolor2 text-white py-3 px-5 text-xs rounded-md text-center'>Join Now</p>
                </Link>
              </div>
            </div>
            
            
            <button onClick={()=>{document.getElementById('my_modal_3').close()}} 
              className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 bg-white text-black hover:text-white">✕
            </button>

          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div> 

      <ProfileModal showModal={showModal}/>

      <div className="drawer drawer-end">
        <input 
          id="my-drawer-4" 
          type="checkbox" 
          className="drawer-toggle" 
        />
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-4" 
            aria-label="close sidebar" 
            className="drawer-overlay z-50">
          </label>
          <ul className="menu z-50 bg-base-200 text-base-content min-h-full 2xl:w-[25%] xl:w-[40%] lg:w-[40%] md:w-[80%] w-[90%] lg:p-10 p-5 2xl:pt-20 xl:pt-20 lg:pt-16 pt-16">
            <div className='flex justify-center'>
              {selectedRequest  && 
              <div className='text-center'>
                  <div className='rounded-full flex justify-center m-auto bg-neutral-200 w-14 h-14 overflow-hidden'>
                    <img src={selectedRequest.client_profile.profile_pics} className='w-full h-full object-cover' alt="" />
                  </div>

                  <div className=''>
                    <h2 className='text-sm font-bold pt-2'>{selectedRequest.client_profile.user.fullname}</h2>
                    <p className='text-xs font-bold text-neutral-500 py-2'>{selectedRequest.datetime}</p>
                  </div>

                  <div className='bg-white p-5 rounded-lg mt-5'>
                    <p className='text-lg pt-3 font-semibold'>{selectedRequest.title}</p>
                    <p className='lg:text-sm text-sm  text-center lg:leading-[30px] leading-[28px] font-light'>{selectedRequest.description}</p>
                  </div>

                  <div className='mt-5 flex flex-col justify-center lg:gap-5 gap-3 lg:px-10 px-5 w-full'>
                    <p onClick={()=>updateBookingStatus(selectedRequest.id)} className='text-white cursor-pointer bg-black rounded-full py-2.5 text-sm px-10'>
                      {isUpdateLoading === true ? 'Approving..' : 'Approve Request'}
                    </p>
                  </div>

                  <p className='absolute 2xl:bottom-10 xl:bottom-10 lg:bottom-5 bottom-20 m-auto right-0 left-0 flex justify-center w-fit text-xs gap-2'>Need any help ? 
                    
                    <Link to={'https://wa.link/tdyb88'}>
                      <span className='text-blue-500 underline cursor-pointer'>Contact us</span>
                    </Link>
                  </p>
              </div>
              }
            </div>
          </ul>
        </div>
      </div>

      <dialog id="my_modal_5" className="modal">
          <div className="modal-box h-[20rem] flex justify-center items-center">

            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>


            <div>
                <div className='flex justify-center items-center m-auto mb-5'>
                  <img src={logo} alt=""  className='w-14 h-14'/>
                </div>
                <h3 className="font-light lg:text-base text-sm text-center">Hello👋 Creve Pro Feature is coming soon, <br className='lg:block hidden'/> do well to stay updated</h3>
                <p className="py-4 2xl:text-2xl text-lg text-center font-bold">Comming Soon</p>
                <button onClick={()=>document.getElementById('my_modal_5').close()} className='bg-green-950 lg:w-fit w-full flex m-auto justify-center px-10 py-3 rounded-full text-white text-xs'>Close</button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>

        </dialog>

        <dialog id="my_modal_6" className="modal">
          <div className="modal-box lg:max-w-[40%] w-[95%] p-0 h-[90%] flex rounded-md">

            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div className='overflow-y-scroll h-[90%] w-full lg:mt-5 p-7 lg:pt-5 mt-8'>

                <div className='w-full rounded-lg'>
                  <img src={shss} alt="" className='w-full rounded-lg'/>
                </div>

                <h2 className="py-4 pt-8 2xl:text-3xl text-lg font-bold pb-3 border-b border-neutral-200">101 Guide for New Creative</h2>
                <div className='pt-5'>
                  <h2 className='text-xl font-bold'>Why Complete Your Profile?</h2>
                  <p className='pt-3'>
                    A complete profile is your digital resume. It increases your visibility, 
                    helps you connect with others, and makes it easier for potential clients 
                    or employers to find you.
                  </p>


                  <div className='pt-3 mt-5 border-t border-neutral-200 '>
                    <h2 className='text-lg font-semibold pb-5'>How to Optimize Your Profile</h2>

                    <ol className='list-decimal flex flex-col gap-8'>
                      <li>
                        <span className='font-bold'>Complete Basic Information: </span> 
                        Fill out all required 
                        fields in the basic information section of your profile. This includes your name, 
                        location, and any relevant contact details.
                      </li>

                      <li>
                        <span className='font-bold'>Upload a Striking Cover Image: </span>
                        Choose a visually appealing image that represents your 
                        professional brand or the type of work you do. This is the 
                        first thing people will see, so make it count.
                      </li>

                      <li>
                        <span className='font-bold'>Showcase Your Work: </span>  
                        Use the "Collection" tab to upload examples 
                        of your previous work. This demonstrates your skills and abilities to potential clients.
                      </li>

                      <li>
                        <span className='font-bold'>Upload a Clear Profile Picture: </span>  
                        A professional headshot is essential 
                        for building trust. Make sure your profile picture is clear and high-quality.
                      </li>

                      <li>
                        <span className='font-bold'>Highlight Your Skills: </span>  
                        Use the "Skills" tab to list your expertise and areas of knowledge. 
                        This helps people find you when searching for specific skills.
                      </li>

                      <li>
                        <span className='font-bold'>Get Verified: </span>  
                        Upload your National Identification Number (NIN) 
                        document to verify your identity. This adds credibility to your profile.
                      </li>
                    </ol>
                  </div>
                </div>
            </div>
          </div>
        </dialog>
    </div>
  )
}


export const ProfileModal = ({showModal}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showModal === true) {
        document.getElementById('my_modal_1').showModal();
      } else {
        document.getElementById('my_modal_1').close();
      }
    }, 2000); 


    return () => clearTimeout(timer);
  }, [showModal]);

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box  p-0 rounded-md 2xl:h-[80%] 2xl:max-w-[60%] xl:max-w-[80%] w-[95%]" >
          <button onClick={()=>{document.getElementById('my_modal_1').close()}} 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white text-black hover:text-white">✕</button>


          <div className='flex lg:flex-row flex-col h-full'>

            <div className='bg-neutral-200 2xl:block xl:block lg:hidden w-full lg:h-full h-[15rem] overflow-hidden'> 
              <img src={completeImage} alt="" className='w-full h-full object-cover'/>
            </div>

            <div className='p-5 pt-10'>
              <h3 className="font-medium lg:text-2xl text-xl pb-3">Complete Your Profile</h3>
              <p className='lg:text-sm text-xs lg:pb-10 pb-5'>
                Completing your profile boosts visibility, and networking opportunities. 
                It ensures you can be easily found.
              </p>

              <hr />
              <p className="py-2 lg:text-sm text-xs flex items-center gap-3 "><FaCheckCircle className='text-accent'/>
                Complete Neccessary Details in the Basic Tabs
              </p>
              <p className="py-2 lg:text-sm text-xs flex items-center gap-3 "><FaCheckCircle className='text-accent'/>Upload a stricking cover image </p>
              <p className="py-2 lg:text-sm text-xs flex items-center gap-3 "><FaCheckCircle className='text-accent'/>
                Upload previous works, on Collection Tab to get hired quickly 
              </p>
              <p className="py-2 lg:text-sm text-xs flex items-center gap-3 "><FaCheckCircle className='text-accent'/>upload a clear profile picture </p>
              <p className="py-2 lg:text-sm text-xs flex items-center gap-3 "><FaCheckCircle className='text-accent'/>Add your skills in the skills Tabs</p>
              <p className="py-2 lg:text-sm text-xs flex items-center gap-3 "><FaCheckCircle className='text-accent'/>Upload NIN Document, to get verified</p>


              <p className="pt-10 text-center text-xs ">Once the steps above is done your good to go 😊</p>

              <Link to={'/creative-dashboard-profile-update'}><button className='mt-3 mycolor2 text-white w-full p-3 py-3 lg:text-sm text-sm rounded-full'>Complete profile</button></Link>
            </div>

          </div>
        </div>
      </dialog>
    </div>
  )
}
