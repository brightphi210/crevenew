import React, { useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'
import { MdModeEditOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import prof from '../Images/Avatars.png'
import { TbClick } from "react-icons/tb";

const CreativeBookingsDashboard = () => {

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
    <div className='lg:p-20 lg:pt-28 lg:pl-[18rem] p-5 pt-20'>
      <div>
        <div className=''>
            <h2>My Bookings</h2>
            <p className='text-xs pt-2'>List of all bookings from clients</p>
        </div>

        <div className='w-full flex mt-5 gap-10'>


          <div className='w-9/12 h-[40rem] overflow-y-scroll bg-neutral-100 rounded-lg'>

            <div className=' p-10  grid grid-cols-3 gap-5'>

              <div className='flex gap-5 items-center bg-white w-fit p-5 rounded-xl drop-shadow-md' >
                <div className='w-24'>
                  <img src={prof} alt="" />
                </div>

                <div className='flex flex-col gap-1'>
                  <h2 className='font-semibold'>John Doe</h2>
                  <p className='text-xs'>johndoe@gmail.com</p>

                  <div className='flex gap-2 pt-1'>
                    <button className='mycolor3 text-xs px-5 py-2 font-semibold rounded-md'>Contact</button>
                    <button className='mycolor2 text-xs px-5 py-2 font-semibold rounded-md text-white' onClick={handleShowBoookingsDesc}>View</button>
                  </div>
                </div>
              </div>

              <div className='flex gap-5 items-center bg-white w-fit p-5 rounded-xl drop-shadow-md'>
                <div className='w-24'>
                  <img src={prof} alt="" />
                </div>

                <div className='flex flex-col gap-1'>
                  <h2 className='font-semibold'>John Doe</h2>
                  <p className='text-xs'>johndoe@gmail.com</p>

                  <div className='flex gap-2 pt-1'>
                    <button className='mycolor3 text-xs px-5 py-2 font-semibold rounded-md'>Contact</button>
                    <button className='mycolor2 text-xs px-5 py-2 font-semibold rounded-md text-white' onClick={handleShowBoookingsDesc}>View</button>
                  </div>
                </div>
              </div>


              <div className='flex gap-5 items-center bg-white w-fit p-5 rounded-xl drop-shadow-md'>
                <div className='w-24'>
                  <img src={prof} alt="" />
                </div>

                <div className='flex flex-col gap-1'>
                  <h2 className='font-semibold'>John Doe</h2>
                  <p className='text-xs'>johndoe@gmail.com</p>

                  <div className='flex gap-2 pt-1'>
                    <button className='mycolor3 text-xs px-5 py-2 font-semibold rounded-md'>Contact</button>
                    <button className='mycolor2 text-xs px-5 py-2 font-semibold rounded-md text-white' onClick={handleShowBoookingsDesc}>View</button>
                  </div>
                </div>
              </div>

              <div className='flex gap-5 items-center bg-white w-fit p-5 rounded-xl drop-shadow-md'>
                <div className='w-24'>
                  <img src={prof} alt="" />
                </div>

                <div className='flex flex-col gap-1'>
                  <h2 className='font-semibold'>John Doe</h2>
                  <p className='text-xs'>johndoe@gmail.com</p>

                  <div className='flex gap-2 pt-1'>
                    <button className='mycolor3 text-xs px-5 py-2 font-semibold rounded-md'>Contact</button>
                    <button className='mycolor2 text-xs px-5 py-2 font-semibold rounded-md text-white' onClick={handleShowBoookingsDesc}>View</button>
                  </div>
                </div>
              </div>

            </div>

          </div>




          {showBoookingsDesc === false ? 

            <div className='bg-neutral-100 w-1/4 p-5 pt-20 rounded-lg'>
              <div className='w-32 flex m-auto'>

              </div>
                <p className='text-[10rem] flex m-auto justify-center'><TbClick /></p>
                <h2 className='text-center pt-5'>Click to see details</h2>
            </div>:

            <div className='bg-neutral-100 w-1/4 p-5 pt-20 rounded-lg'>
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
          }
        </div>
      </div>
    </div>
  )
}

