import React, { useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'
import { MdModeEditOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { FaRegCopy } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import { BsWhatsapp } from "react-icons/bs";

import data from '../Mock/data.json'

const CreativeBookingsDashboard = () => {

  const [show, setShow] = useState(false)
  
  const handleShow = () => {
    setShow(!show)
  }



  return (
  <div className='flex flex-row w-full bg-neutral-100 2xl:h-[100vh] xl:h-full lg:h-full'>
    <div className=''>
      <CreativeSideBarCom show={show} />
    </div>
    <div className='w-full'>
      <CreativeNavBarCom show={show} handleShow={handleShow}/>
      <CreativeBookings />
    </div>
  </div>
  )
}

export default CreativeBookingsDashboard




export const CreativeBookings = () => {


  const [showBoookingsDesc, setShowBoookingsDesc] = useState(false)


  const handleShowBoookingsDesc = () => {
    setShowBoookingsDesc(true)
  }


  return (
    <div className='2xl:p-20 2xl:pt-28 2xl:pl-[18rem] lg:pl-[18rem] p-5 pt-20'>
      <div>
        <div className='flex lg:flex-row flex-col gap-4 items-center'>
          <div className='w-full'>
            <h2>My Bookings</h2>
            <p className='text-xs pt-2'>List of all bookings from clients</p>
          </div>

          <div className='relative lg:w-1/2 w-full ml-auto'>
            <input type="text" placeholder="Search Bookings" className="input px-5 text-xs input-bordered w-full rounded-full" />
            <button className='absolute right-2 top-1 color text-white p-3 rounded-full '><LuSearch /></button>
          </div>
        </div>

        <div className='w-full lg:mt-10 mt-5 pt-5 gap-10 overflow-y-scroll h-[70vh]'>


          <div className='2xl:w-full grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 lg:gap-10 gap-4 w-full rounded-lg'>
            
            {data.map((eachData) =>(

              <label className='bg-white p-5 rounded-md cursor-pointer' drawer-conten  htmlFor="my-drawer-4">
                <div className='flex gap-3 items-center'>
                  <div className='rounded-full w-10 h-10 overflow-hidden'>
                    <img src={eachData.pics} className='w-full h-full ' alt="" />
                  </div>

                  <div>
                    <h2 className='text-sm'>{eachData.name}</h2>
                    <p className='text-xs'>{eachData.phone}</p>
                  </div>

                  <div className="drawer-content ml-auto">
                    <label htmlFor="my-drawer-4" className="drawer-button hover:bg-accent btn  btn-primary min-h-[2rem] max-h-[2rem] mycolor2 border-none text-[10px] px-5  font-medium rounded-md text-white">View</label>
                  </div>
                </div>

                <p className='text-xs pt-3'>{eachData.message.slice(0, 20)} . . .</p>
              </label>
            ))}

          </div>
        </div>
      </div>


      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full lg:w-[25%] w-[85%] p-6 pt-32">
            <div className='flex justify-center'>

              <div className='text-center'>
                  <div className='rounded-full flex justify-center m-auto w-20 h-20 overflow-hidden'>
                    <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" className='w-full h-full ' alt="" />
                  </div>

                  <div>
                    <h2 className='text-sm font-bold pt-5'>John Doe</h2>
                    <p className='text-xl font-bold text-neutral-500 py-3'>08094422799</p>

                    <p className='lg:text-sm text-xs text-center lg:leading-[30px] leading-[28px] font-light'>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                      Neque earum impedit atque molestias vitae deserunt aliquid sint, 
                      reiciendis ut ipsa, assumenda perferendis praesentium nostrum 
                      fugit accusantium. Cupiditate, quae. Architecto, accusamus.
                    </p>
                  </div>

                  <div className='mt-5 flex justify-center lg:gap-5 gap-3 lg:px-10 px-5 w-full'>
                    <button className="btn lg:w-1/2 w-fit hover:bg-accent border-none   min-h-[2.6rem] max-h-[2.6rem] mycolor2 text-xs text-white flex items-center gap-2"><BsWhatsapp />Whatsapp</button>
                    <button className="btn lg:w-1/2 w-fit btn-neutral text-xs  text-white min-h-[2.6rem] max-h-[2.6rem] flex items-center gap-2"><FaRegCopy />Copy Number</button>
                  </div>
              </div>
            </div>
          </ul>
        </div>
      </div>




      {/* {showBoookingsDesc === false ? 

<div className='bg-neutral-100 2xl:w-1/4 w-full p-5 2xl:pt-20 rounded-lg'>
      <p className='2xl:text-[8rem] text-[5rem] flex m-auto justify-center'><TbClick /></p>
      <h2 className='text-center pt-5'>Click to see details</h2>
  </div>:

<div className='bg-neutral-100 lg:w-1/4 w-full p-5 lg:pt-20 rounded-lg'>
    <div className='flex m-auto w-32'>
      <img src={prof} alt="" />
    </div>

    <div className='text-center pt-5'>
      <h2 className='font-semibold'>John Doe</h2>
      <p className='text-xs py-2 font-semibold'>johndoe@gmail.com</p>


      <p className='text-xs w-10/12 flex m-auto'>Lorem, ipsum dolor  neque explicabo eum iusto deleniti. Voluptatum, mollitia.</p>
    </div>

    <button className='flex m-auto w-9/12 justify-center bg-black mt-5 text-xs py-3 px-5 rounded-md text-white'>Contact Client</button>
</div>
} */}
    </div>
  )
}

