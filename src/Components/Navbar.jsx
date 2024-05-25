import React from 'react'
import logo from './Images/Creve.png'
import logo1 from './Images/Creve1.png'
import { MdPeople } from "react-icons/md";

const Navbar = () => {
  return (
    <div className='py-10 bg-black' >
        <div className='lg:w-10/12 w-11/12 fixed z-10 bg-white left-0 right-0 flex items-center m-auto py-3 lg:px-10 px-3 rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-90'>
            <div className='lg:block w-24 hidden'>
                <img src={logo} alt="" className='cursor-pointer'/>
            </div>

            <div className='lg:hidden w-10 block'>
                <img src={logo1} alt="" className='cursor-pointer'/>
            </div>

            <ul className='flex items-center ml-auto lg:gap-10 gap-3 text-xs'>
                <li className='cursor-pointer'>About</li>
                <li className='cursor-pointer'>Hire Now</li>
                <li className='cursor-pointer'>Login</li>
                <li className='cursor-pointer bg-black flex gap-2 items-center lg:py-3 lg:px-5 px-3 py-2 rounded-md text-white'>Join <MdPeople /></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar