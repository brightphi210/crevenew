import React from 'react'
import logo from './Images/Creve.png'
import logo1 from './Images/Creve1.png'
import { MdPeople } from "react-icons/md";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='' >
        <div className='lg:w-full z-10 fixed border border-slate-100 bg-white left-0 right-0 flex items-center m-auto py-3 lg:px-10 px-3 backdrop-filter backdrop-blur-3xl bg-opacity-80'>
            <div className='lg:block w-24 hidden'>
                <Link to={'/'}>
                    <img src={logo} alt="" className='cursor-pointer'/>
                </Link>
            </div>

            <div className='lg:hidden w-10 block'>
                <Link to={'/'}>
                    <img src={logo1} alt="" className='cursor-pointer'/>
                </Link>
            </div>

            <ul className='flex items-center ml-auto lg:gap-10 gap-3 text-xs'>
                <li className='cursor-pointer'>About</li>
                <li className='cursor-pointer'>Hire Now</li>
                <Link to={'/login'}>
                    <li className='cursor-pointer'>Login</li>
                </Link>
                <Link to={'/register'}>
                    <li className='cursor-pointer bg-black flex gap-2 items-center lg:py-3 lg:px-5 px-3 py-2 rounded-md text-white'>Join <MdPeople /></li>
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default Navbar