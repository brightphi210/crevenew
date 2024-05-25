import React from 'react'
import logo from './Images/Creve.png'

const Navbar = () => {
  return (
    <div className='py-10 bg-black' >
        <div className='w-10/12 fixed bg-white left-0 right-0 flex m-auto py-5 px-10 rounded-lg'>
            <div className='w-20'>
                <img src={logo} alt="" className='cursor-pointer'/>
            </div>

            <ul className='flex ml-auto gap-10 text-xs'>
                <li className='cursor-pointer'>About</li>
                <li className='cursor-pointer'>Hire Creatives</li>
                <li className='cursor-pointer'>Login</li>
                <li className='cursor-pointer'>Join</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar