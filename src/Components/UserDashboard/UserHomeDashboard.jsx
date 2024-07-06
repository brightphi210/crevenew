import React, { useState } from 'react'
import UserNavbar from './UserNavbar';
import UserSideBar from './UserSideBar';
import logo from '../Images/Creve1.png'

import first from '../Images/first-step-card-pattern-1.svg'
import second from '../Images/first-step-card-pattern-2.svg'
import third from '../Images/first-step-card-pattern-3.svg'

const UserHomeDashboard = () => {

  const [token, setToken] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  return (
    <div>
      <UserNavbar />

      <div className='flex pt-24 bg-neutral-100 h-screen'>
        <UserSideBar />
        <UserHomeDashboardHome />
      </div>
    </div>
  )
}

export default UserHomeDashboard



export const UserHomeDashboardHome = () => {
  return (
    <div className='pl-[25rem] pr-[10rem] pt-10 w-full overflow-y-scroll'>

      <div>
        <h2 className='text-2xl'>Hi, Bright!</h2>
      </div>

      <div className='bg-white p-10 mt-3 w-full grid grid-cols-4 gap-10 items-center rounded-3xl'>

        <div className='bg-neutral-50 p-5 rounded-xl'>
          <p className='text-sm'>Welcome to </p>
          <div className='flex items-center gap-2 py-3'>
            <img src={logo} alt="" className='w-5 h-5'/>
            <h2 className='text-xl font-semibold'>Creve</h2>
          </div>
          <p className='text-sm'>You are highly welcome to creve, you can now browse creatives/talents around your locaton and hire at ease</p>
        </div>

        <div className='lg:bg-white sect p-5 rounded-xl relative w-full h-full overflow-hidden' >
          <div className='relative isolate z-50'>
            <h2 className='text-3xl text-purple-800 font-bold'>Become a Talent</h2>
            <p className='py-3 text-sm '>Become a talent and earn</p>
            <button className='bg-white mt-5 py-2 px-5 rounded-full font-semibold border border-purple-200 text-xs'>Get Started</button>
          </div>
        </div>

        
        <div className='bg-white sect1 p-5 rounded-xl relative w-full h-full overflow-hidden' >
          <div className='relative isolate z-50'>
            <h2 className='text-3xl text-orange-700 font-bold'>Our  Blog</h2>
            <p className='py-3 text-sm '>Browse our and get latest update</p>
            <button className='bg-white mt-5 py-2 px-5 rounded-full font-semibold border border-orange-200 text-xs'>Browser</button>
        </div>
        </div>

        
        <div className='bg-white sect2 p-5 rounded-xl relative w-full h-full overflow-hidden' >
          <div className='relative isolate z-50'>
            <h2 className='text-3xl text-lime-800 font-bold'>Community</h2>
            <p className='py-3 text-sm '>Join  community of like minds </p>
            <button className='bg-white mt-5 py-2 px-5 rounded-full font-semibold border border-lime-200 text-xs'>Join Now</button>
        </div>
        </div>
      </div>


      <div>
        <h2>Creatives</h2>
      </div>
    </div>
  )
}

