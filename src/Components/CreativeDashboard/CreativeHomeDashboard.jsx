import React, {useRef, useEffect, useState } from 'react'
import CreativeNavBarCom from './CreativeNavBarCom';
import CreativeSideBarCom from './CreativeSideBarCom';
import voucher from '../Images/vouvher.png'
import laptop from '../Images/laptop.png'
import prof from '../Images/Avatars.png'
import community from '../Images/community2.png'


import { MdModeEditOutline } from "react-icons/md";
import { MdArrowOutward } from "react-icons/md";

import { IoNotificationsCircle } from "react-icons/io5";
import { GrUpgrade } from "react-icons/gr";
import { MdHelpCenter } from "react-icons/md";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

import { RiNotificationOffLine } from "react-icons/ri";
import { IoNotificationsOffOutline } from "react-icons/io5";


import completeImage from '../Images/Buffer-bro.png'
import { Link } from 'react-router-dom';


import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';


import empty1 from '../Images/No data-cuate.png'
import empty2 from '../Images/No data-rafiki.png'
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';


import Footer from '../Footer'



const CreativeHomeDashboard = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);

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

        if (data.display_name === null || data.phone_number === null) {
          setShowModal(true);
        }

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

  
  return (


    <div className='lg:p-16  lg:pl-[18rem] p-5 pt-20 lg:pt-28'>
      <div className='flex 2xl:flex-row flex-col xl:flex-row lg:flex-col gap-10'>

        <div className='2xl:w-9/12 xl:w-[70%] lg:w-full w-full bgNew  rounded-xl text-white'>

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
              <div className='p-10 lg:px-20 px-8 flex 2xl:flex-row lg:flex-row flex-col items-center'>
                <div className=''>
                  <p className='2xl:text-sm lg:text-sm xl:text-[12px] text-xs'>
                    Join Freelancer Plus now to unlock new features to help you <br className='lg:block hidden'/>
                    grow your network and market your skills.
                  </p>
                  <h2 className='2xl:text-2xl lg:text-2xl xl:text-xl text-lg py-3'>Get 80 Connects each month</h2>
                  <button className=' mycolor2 text-white py-3 px-10 rounded-md text-xs'>Learn More</button>
                </div>

                <div className='lg:ml-auto'>
                  <img src={voucher} alt="" className='lg:w-40 lg:mt-0 w-1/2 mt-10'/>
                </div>
              </div>

            </SwiperSlide>
            <SwiperSlide>
              <div className='p-10 lg:px-20 px-8 flex lg:flex-row flex-col items-center'>
                <div className=''>
                  <p className='2xl:text-sm lg:text-sm text-xs xl:text-[12px]'>
                  Creve 101 will guide you through the basics of our platform.
                  </p>
                  <h2 className='2xl:text-2xl lg:text-2xl xl:text-xl text-lg py-3'>Learn how to get started on Creve</h2>
                  <button className='mycolor2 text-white py-3 px-10 rounded-md text-xs'>Learn More</button>
                </div>

                <div className='lg:ml-auto'>
                  <img src={laptop} alt="" className='lg:w-40 lg:mt-0 w-10/12 mt-10 '/>
                </div>
              </div>
            </SwiperSlide>

          </Swiper>
        </div>

        <div className='bg-white text-black  w-full xl:w-[30%] lg:w-full p-5 rounded-xl flex justify-center items-center'>

          <div className=''>
            <div className='border-2 border-neutral-200 bg-neutral-200 w-20 h-20 rounded-full overflow-hidden flex m-auto'>
              <img src={profileData.profile_pics} alt="" className='w-full h-full object-cover'/>
            </div>

            <div className='text-center pt-2'>
              <h2 className='lg:text-sm text-sm'>{userToken.name} <span className='text-xs text-neutral-500'>({userToken.role})</span></h2>
              <p className='text-xs py-2'>{profileData.display_name}</p>
              <div className='flex items-center gap-2'>
                <progress className="progress progress-accent bg-white " value="70" max="100"></progress>
              </div>

              <Link to={'/creative-dashboard-profile-update'}>
                <button className=' text-white rounded-full color text-sm py-2 px-3 flex justify-center m-auto  mt-2 gap-2'><MdModeEditOutline className='text-lg'/>Edit</button>
              </Link>
            </div>

          </div>
        </div>

      </div>

      <div className='mt-10 flex 2xl:flex-row xl:flex-row lg:flex-col flex-col  w-full gap-10'>
        <div className=' bg-white 2xl:w-[77%] xl:w-[70%] lg:w-full lg:p-5 py-5 px-2 rounded-xl'>
          <h2 className='text-sm font-semibold'>Messages</h2>

          {isLoading === true ?
          <div className='pt-20 flex justify-center items-center'>
            <span className="loading loading-spinner loading-sm"></span>  
          </div>
           : <>

          {profileData.books && profileData.books.length <= 0 ? 
            <div className='flex justify-center items-center h-full'>
              <div className='p-5'>
                <img src={empty1} alt="" className='w-[8rem] 2xl:w-[15rem] flex m-auto '/>
                <h2 className='text-lg  text-center text-neutral-300'>No Messages Yet</h2>
              </div>
            </div> :
            <div>
              {profileData.books && 
              <Link to={'/creative-dashboard-bookingsAll'}>
              <div className='lg:flex-row items-center gap-3 ' >
                {profileData.books.slice(0, 4).map((book)=>
                <div className='bg-neutral-100 p-4 my-5 rounded-md '>
                  <h2 className='text-lg font-semibold pb-2 mb-4 border-b border-b-neutral-200'>{book.title.slice(0, 25)}. .</h2>

                  <div className='flex items-center'>
                  <div className='flex gap-2 items-center'>
                    <div className='w-8 h-8 justify-center items-center flex rounded-full'>
                      <img src={book.client_profile.profile_pics} alt="" className='w-8'/>
                    </div>
                    <h2 className='2xl:text-sm xl:text-sm lg:text-sm text-sm'>{book.client_profile.user.fullname}</h2>
                  </div>
                  <div className='ml-auto flex '>
                    <button className='lg:text-xs text-xs mycolor2  text-white py-2 px-3 rounded-md flex gap-1' onClick={()=>document.getElementById('my_modal_2').showModal()}>View <MdArrowOutward /></button>
                  </div>
                  </div>
                </div>)}
              </div>
              </Link>
              }

              <Link to={'/creative-dashboard-bookingsAll'}>
                <button className='bg-white text-xs px-5 py-3 text-black border border-neutral-300 rounded-md w-full 2xl:w-fit lg:w-fit'>See All</button>
              </Link>

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
            <p className='text-sm flex items-center gap-5 cursor-pointer'>Help Center <MdHelpCenter /></p>
            <p className='text-sm flex items-center gap-5 cursor-pointer' onClick={()=>document.getElementById('my_modal_3').showModal()}>Join Community <GrUpgrade /></p>
          </div>
        </div>

          <dialog id="my_modal_2" className="modal">
            <div className="modal-box 2xl:w-[25rem] lx:w-[25rem]  lg:w-[25rem] w-[90%] absolute 2xl:right-10 2xl:top-20 xl:right-10 xl:top-20 lg:right-10 lg:top-20 2xl:h-[55vh] 2xl:max-h-[h-55vh] xl:h-[70vh] xl:max-h-[h-70vh] lg:max-h-[h-70vh] lg:h-[70vh] rounded-lg z-auto overflow-y-scroll">
              <button onClick={()=>{document.getElementById('my_modal_2').close()}} 
                className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 bg-white text-black hover:text-white">✕
              </button>

              <div className=' py-5 px-3'>
                <div className='w-24 flex justify-center m-auto'>
                  <img src={prof} alt="" />
                </div>

                <div className='text-center'>
                  <h2 className='text-sm'>John Doe</h2>
                  <p className='text-xs py-2'>john@gmail.com</p>
                  <p className='text-xs'>Time: 5pm</p>


                  <p className='bg-neutral-100 p-5 text-xs mt-3 text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus nisi sint asperiores, quibusdam, natus sequi rerum qui architecto est repellat incidunt facilis magnam eligendi aut eos laudantium earum, quidem deleniti?</p>
                  <button className="btn btn-active hover:bg-black bg-black w-full text-xs px-5 py-3 rounded-md mt-5 text-white ">Contact</button>
                </div>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>

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
                  <Link to={'https://t.me/+nflgbLBXe5xlMjI8'} className='w-full'>
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

    </div>
  )
}


export const ProfileModal = ({showModal}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showModal === true) {
        document.getElementById('my_modal_1').showModal();
      } else {
        document.getElementById('my_modal_2').close();
      }
    }, 3000); 


    return () => clearTimeout(timer);
  }, [showModal]);

  return (
    <div>


      <dialog id="my_modal_1" className="modal">
        <div className="modal-box  p-0 rounded-md 2xl:h-fit lg:max-w-[50%] w-[95%]" >
          <button onClick={()=>{document.getElementById('my_modal_1').close()}} 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white text-black hover:text-white">✕</button>


          <div className='flex lg:flex-row flex-col'>

            <div className='bg-neutral-100 2xl:block xl:hidden lg:hidden w-full lg:h-full h-[20rem] overflow-hidden'>
              <img src={completeImage} alt="" className='w-full h-full object-cover'/>
            </div>

            <div className='p-5'>
              <h3 className="font-medium lg:text-2xl text-xl pb-3">Complete Your Profile</h3>
              <p className='text-xs lg:pb-10 pb-5'>
                Completing your profile boosts visibility, and networking opportunities. 
                It ensures you can be easily found.
              </p>

              <hr />
              <p className="py-2 lg:text-sm text-xs flex items-center gap-3 "><FaCheckCircle className='text-accent'/>Upload a stricking cover image </p>
              <p className="py-2 lg:text-sm text-xs flex items-center gap-3 "><FaCheckCircle className='text-accent'/>Upload previous works, to get hired quickly </p>
              <p className="py-2 lg:text-sm text-xs flex items-center gap-3 "><FaCheckCircle className='text-accent'/>upload a clear profile picture </p>
              <p className="py-2 lg:text-sm text-xs flex items-center gap-3 "><FaCheckCircle className='text-accent'/>Fill your profile details</p>


              <p className="pt-10 text-center text-xs ">Once the steps above is done your good to go 😊</p>

              <Link to={'/creative-dashboard-profile-update'}><button className='mt-3 mycolor2 text-white w-full p-3 py-3 lg:text-sm text-lg rounded-full'>Complete profile</button></Link>
            </div>

          </div>
        </div>
      </dialog>


    </div>
  )
}
