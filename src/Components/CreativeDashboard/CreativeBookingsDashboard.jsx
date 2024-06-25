import React, { useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'
import { MdModeEditOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import prof from '../Images/Avatars.png'
import { TbClick } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";

import data from '../Mock/data.json'

const CreativeBookingsDashboard = () => {

  const [show, setShow] = useState(false)
  
  const handleShow = () => {
    setShow(!show)
  }



  return (
    <div className='flex flex-row w-full bg-neutral-100'>
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
        <div className=''>
            <h2>My Bookings</h2>
            <p className='text-xs pt-2'>List of all bookings from clients</p>
        </div>

        <div className='w-full flex 2xl:flex-row lg:flex-col-reverse flex-col-reverse mt-5 gap-10'>


          <div className='2xl:w-full w-full h-[40rem] overflow-y-scroll overflow-x-auto bg-white rounded-lg'>

            {/* <div className='myGrid myGridtwo myGridthree  2xl:p-10 p-5 lg:grid-cols-2 grid grid-cols-1 gap-5 '>

              <div className='flex gap-5 items-center bg-white lg:w-full w-full p-6 rounded-md drop-shadow-sm' >
                <div className='w-24'>
                  <img src={prof} alt="" />
                </div>

                <div className='flex flex-col gap-1'>
                  <h2 className='font-semibold'>John Doe</h2>
                  <p className='text-xs'>johndoe@gmail.com</p>

                  <div className='flex gap-2 pt-1'>
                    <button className='mycolor3 text-[10px] px-5 py-2 font-medium rounded-md'>Contact</button>
                    <button className='mycolor2 text-[10px] px-5 py-2 font-medium rounded-md text-white' onClick={handleShowBoookingsDesc}>View</button>
                  </div>
                </div>
              </div>


              <div className='flex gap-5 items-center bg-white lg:w-full w-full p-6 rounded-md drop-shadow-sm' >
                <div className='w-24'>
                  <img src={prof} alt="" />
                </div>

                <div className='flex flex-col gap-1'>
                  <h2 className='font-semibold'>John Doe</h2>
                  <p className='text-xs'>johndoe@gmail.com</p>

                  <div className='flex gap-2 pt-1'>
                    <button className='mycolor3 text-[10px] px-5 py-2 font-medium rounded-md'>Contact</button>
                    <button className='mycolor2 text-[10px] px-5 py-2 font-medium rounded-md text-white' onClick={handleShowBoookingsDesc}>View</button>
                  </div>
                </div>
              </div>

              <div className='flex gap-5 items-center bg-white lg:w-full w-full p-6 rounded-md drop-shadow-sm' >
                <div className='w-24'>
                  <img src={prof} alt="" />
                </div>

                <div className='flex flex-col gap-1'>
                  <h2 className='font-semibold'>John Doe</h2>
                  <p className='text-xs'>johndoe@gmail.com</p>

                  <div className='flex gap-2 pt-1'>
                    <button className='mycolor3 text-[10px] px-5 py-2 font-medium rounded-md'>Contact</button>
                    <button className='mycolor2 text-[10px] px-5 py-2 font-medium rounded-md text-white' onClick={handleShowBoookingsDesc}>View</button>
                  </div>
                </div>
              </div>


              <div className='flex gap-5 items-center bg-white lg:w-full w-full p-6 rounded-md drop-shadow-sm' >
                <div className='w-24'>
                  <img src={prof} alt="" />
                </div>

                <div className='flex flex-col gap-1'>
                  <h2 className='font-semibold'>John Doe</h2>
                  <p className='text-xs'>johndoe@gmail.com</p>

                  <div className='flex gap-2 pt-1'>
                    <button className='mycolor3 text-[10px] px-5 py-2 font-medium rounded-md'>Contact</button>
                    <button className='mycolor2 text-[10px] px-5 py-2 font-medium rounded-md text-white' onClick={handleShowBoookingsDesc}>View</button>
                  </div>
                </div>
              </div>

            </div> */}

            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Pics</th>
                    <th>Name</th>
                    <th>Message</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {console.log('This is ', data)}

                  {data.map((eachData) => (
                    <tr>

                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-8 w-8">
                              <img
                                src={eachData.pics}
                                alt="Avatar Tailwind CSS Component" />
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                            <p className="text-xs">{eachData.name}</p>
                      </td>


                      <td className='text-xs'>{eachData.message.slice(0, 10)} . . . .</td>
                      <td className='text-xs'>{eachData.time}</td>
                      <td>
                        {/* <button className='mycolor2 text-[10px] px-5 py-2 font-medium rounded-md text-white' onClick={handleShowBoookingsDesc}>View</button> */}
                        <div className="drawer-content">
                          <label htmlFor="my-drawer-4" className="drawer-button hover:bg-accent btn  btn-primary min-h-[2rem] max-h-[2rem] mycolor2 border-none text-[10px] px-5  font-medium rounded-md text-white">View</label>
                        </div>
                      </td>
    
                    </tr>
                  ))}


                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>


      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full lg:w-[25%] w-[80%] p-4 pt-20">
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
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

