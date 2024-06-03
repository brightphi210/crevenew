import React, { useEffect, useState } from 'react'
import CreativeNavBarCom from './CreativeNavBarCom';
import CreativeSideBarCom from './CreativeSideBarCom';
import voucher from '../Images/vouvher.png'
import laptop from '../Images/laptop.png'
import prof from '../Images/Avatars.png'


import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { MdModeEditOutline } from "react-icons/md";
import { MdArrowOutward } from "react-icons/md";

import { IoNotificationsCircle } from "react-icons/io5";
import { GrUpgrade } from "react-icons/gr";
import { MdHelpCenter } from "react-icons/md";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

import completeImage from '../Images/Buffer-bro.png'



const CreativeHomeDashboard = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);

  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(true)

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <div className='flex flex-row w-full'>
      <div className='w-full'>
        <CreativeSideBarCom show={show} />
      </div>
      <div className='w-full'>
        <CreativeNavBarCom show={show} handleShow={handleShow}/>
        <CreativeHome />
        <ProfileModal showModal={showModal}/>
      </div>
    </div>
  )
}

export default CreativeHomeDashboard




export const CreativeHome = () => {

  // const [value, setValue] = useState('')
  // const [copied, setCopied] = useState(false)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };


  return (


    <div className='lg:p-16 pt-20 lg:pl-[18rem] p-5'>
      <div className='flex lg:flex-row flex-col gap-10'>

        <div className='lg:w-9/12 w-full bg-black rounded-xl text-white'>
          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            showDots={true}
            itemClass="carousel-item-padding-60-px"
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={50000}
            keyBoardControl={true}
            // containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", ]}
            dotListClass="custom-dot-list-style"
          >

            <div className='p-10 lg:px-20 px-8 flex lg:flex-row flex-col items-center'>
              <div className=''>
                <p className='lg:text-sm text-xs'>
                  Join Freelancer Plus now to unlock new features to help you <br className='lg:block hidden'/>
                  grow your network and market your skills.
                </p>
                <h2 className='lg:text-2xl text-lg py-3'>Get 80 Connects each month</h2>
                <button className='bg-cyan-500 mycolor2 py-3 px-10 rounded-md text-xs'>Learn More</button>
              </div>

              <div className='lg:ml-auto'>
                <img src={voucher} alt="" className='lg:w-40 lg:mt-0 w-1/2 mt-10'/>
              </div>
            </div>

            
            <div className='p-10 lg:px-20 px-8 flex lg:flex-row flex-col items-center'>
              <div className=''>
                <p className='lg:text-sm text-xs'>
                Creve 101 will guide you through the basics of our platform.
                </p>
                <h2 className='lg:text-2xl text-lg py-3'>Learn how to get started on Creve</h2>
                <button className='bg-cyan-500 mycolor2 py-3 px-10 rounded-md text-xs'>Learn More</button>
              </div>

              <div className='lg:ml-auto'>
                <img src={laptop} alt="" className='lg:w-40 lg:mt-0 w-10/12 mt-10 '/>
              </div>
            </div>
          </Carousel>
        </div>

        <div className='bg-neutral-200  w-full p-5 rounded-xl flex justify-center items-center'>

          <div className=''>
            <div className='border-2 border-white w-fit rounded-full flex m-auto'>
              <img src={prof} alt="" className='lg:w-16 w-14'/>
            </div>

            <div className='text-center pt-2'>
              <h2 className='lg:text-sm text-sm'>John Doe</h2>
              <p className='text-xs py-2'>Senior Electrician</p>
              <div className='flex items-center gap-2'>
                <progress className="progress progress-success " value="70" max="100"></progress>
                <p className='text-xs'>70%</p>
              </div>
              <button className='bg-black text-white rounded-md text-[0.6rem] py-2 px-3 flex  mt-2 gap-2'><MdModeEditOutline className='text-md'/>Edith Profile</button>
            </div>

          </div>
        </div>

      </div>

      <div className='mt-10 flex lg:flex-row flex-col  w-full gap-10'>
        <div className='bg-neutral-100 lg:w-9/12 w-full lg:p-5 py-5 px-2 rounded-xl'>
          <h2 className='text-xs'>Booked Messages</h2>

          <div className='p-3 my-5 rounded-md flex lg:flex-row gap-3 hover:bg-neutral-200 border-y border-neutral-200' >
            <div className='flex gap-4 items-center'>
              <div>
                <img src={prof} alt="" className='w-6'/>
              </div>
              <h2 className='text-xs'>Amadi John</h2>
              <p className='text-[0.6rem] text-cyan-400 mycolor'>5pm</p>
            </div>



            <div className='ml-auto flex gap-3'>
              <button className='lg:text-[0.7rem] text-xs border border-cyan-500 mycolor3 text-black bg-white py-2 px-4 rounded-md flex gap-1'>Whatsapp <MdArrowOutward /></button>
            </div>
          </div>


          <div className='p-3 my-5 rounded-md flex lg:flex-row gap-3 hover:bg-neutral-200 border-y border-neutral-200 ' >
            <div className='flex gap-4 items-center'>
              <div>
                <img src={prof} alt="" className='w-6'/>
              </div>
              <h2 className='text-xs'>Amadi John</h2>
              <p className='text-[0.6rem] text-cyan-400 mycolor'>5pm</p>
            </div>



            <div className='ml-auto flex gap-3'>
              <button className='lg:text-[0.7rem] text-xs border border-cyan-500 mycolor3 text-black bg-white py-2 px-4 rounded-md flex gap-1'>Whatsapp <MdArrowOutward /></button>
            </div>
          </div>



          <div className='p-3 my-5 rounded-md flex lg:flex-row gap-3 hover:bg-neutral-200 border-y border-neutral-200' >
            <div className='flex gap-4 items-center'>
              <div>
                <img src={prof} alt="" className='w-6'/>
              </div>
              <h2 className='text-xs'>Amadi John</h2>
              <p className='text-[0.6rem] text-cyan-400 mycolor'>5pm</p>
            </div>



            <div className='ml-auto flex gap-3'>
              <button className='lg:text-[0.7rem] text-xs border border-cyan-500 mycolor3 text-black bg-white py-2 px-4 rounded-md flex gap-1'>Whatsapp <MdArrowOutward /></button>
            </div>
          </div>

          <div className='p-3 my-5 rounded-md flex lg:flex-row gap-3 hover:bg-neutral-200 border-y border-neutral-200' >
            <div className='flex gap-4 items-center'>
              <div>
                <img src={prof} alt="" className='w-6'/>
              </div>
              <h2 className='text-xs'>Amadi John</h2>
              <p className='text-[0.6rem] text-cyan-400 mycolor'>5pm</p>
            </div>



            <div className='ml-auto flex gap-3'>
              <button className='lg:text-[0.7rem] text-xs border border-cyan-500 mycolor3 text-black bg-white py-2 px-4 rounded-md flex gap-1'>Whatsapp <MdArrowOutward /></button>
            </div>
          </div>

          <button className='bg-black text-xs px-5 py-3 text-white rounded-md w-full lg:w-fit'>See All</button>

        </div>


        <div className='lg:w-[22rem] w-full'>
          <div className='bg-neutral-100 p-5 w-full rounded-xl '>
            <p className='text-xs'>Notifications</p>  

            <div className=''>
            <div className='my-3 hover:bg-neutral-200 flex items-center gap-3 p-3 rounded-md'>
                <p className='text-cyan-500 mycolor text-4xl'><IoNotificationsCircle /></p>
                <div>
                  <h2 className='text-sm flex items-center gap-2'>Your account is verified</h2>
                  <p className='text-xs text-neutral-400'>2 days ago</p>
                </div>
                
              </div>

              <div className='my-3 hover:bg-neutral-200 flex items-center gap-3 p-3 rounded-md'>
                <p className='text-cyan-500 mycolor text-4xl'><IoNotificationsCircle /></p>
                <div>
                  <h2 className='text-sm flex items-center gap-2'>Login Successful</h2>
                  <p className='text-xs text-neutral-400'>2 days ago</p>
                </div>
                
              </div>

              <div className='my-3 hover:bg-neutral-200 flex items-center gap-3 p-3 rounded-md'>
                <p className='text-cyan-500 mycolor text-4xl'><IoNotificationsCircle /></p>
                <div>
                  <h2 className='text-sm flex items-center gap-2'>Login Successful</h2>
                  <p className='text-xs text-neutral-400'>2 days ago</p>
                </div>
                
              </div>

              <button className='bg-black text-xs px-5 py-2 text-white w-full rounded-md'>See All</button>

            </div>
          </div>

          <div className='bg-neutral-100 p-5 w-full rounded-xl mt-3 flex flex-col gap-5'>
            <p className='text-xs flex items-center gap-5 cursor-pointe'>Upgrade to creve pro <FaUnlockKeyhole /></p>
            <p className='text-xs flex items-center gap-5 cursor-pointer'>Help Center <MdHelpCenter /></p>
            <p className='text-xs flex items-center gap-5 cursor-pointer'>Join Community <GrUpgrade /></p>
          </div>
        </div>



      </div>
    </div>
  )
}


export const ProfileModal = ({showModal}) => {


  useEffect(() => {
    if(showModal){
      document.getElementById('my_modal_3').showModal();
    }else{
      document.getElementById('my_modal_3').close();
    }
  },[])
  return (
    <div>


      <dialog id="my_modal_3" className="modal">
        <div className="modal-box  p-0 rounded-md lg:height " >
          <button onClick={()=>{document.getElementById('my_modal_3').close()}} 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white text-black hover:text-white">✕</button>


          <div className='mycolor2 h-[15rem] overflow-hidden'>
            <img src={completeImage} alt="" />
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

            <button className='mt-3 mycolor2 text-white w-full p-3 rounded-md lg:text-sm text-xs'>Complete your profile</button>
          </div>
        </div>
      </dialog>


    </div>
  )
}
