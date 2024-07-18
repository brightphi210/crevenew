import React from 'react'
import logo from  './Images/Creve.png'

import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    
    <div className=' lg:my-10 lg:rounded-lg text-white lg:p-20 p-10  lg:gap-0 gap-8 lg:mx-[10rem] 2xl:mx-[10rem] xl:mx-[10rem] bg-black'>
        

        <div className='flex lg:flex-row flex-col gap-8 justify-between pb-10'>
            <div className=''>

                <h2 className='font-semibold text-sm text-neutral-500'>Categories</h2>
                <ul className='flex flex-col gap-3 pt-7 2xl:text-lg xl:text-sm lg:text-sm text-lg'>
                    <Link to={'/' + 'allTalents'}><li>Mobile Dev</li></Link>
                    <Link to={'/' + 'allTalents'}><li>Furniture Making</li></Link>
                    <Link to={'/' + 'allTalents'}><li>Backend Dev</li></Link>
                    <Link to={'/' + 'allTalents'}><li>Cobbling</li></Link>
                    <Link to={'/' + 'allTalents'}><li>UI/UX</li></Link>
                    <Link to={'/' + 'allTalents'}><li>Photography</li></Link>
                </ul>
            </div>


            <div className=''>
                <h2 className='font-semibold text-sm text-neutral-500'>Client</h2>
                <ul className='flex flex-col gap-3 pt-7 2xl:text-lg xl:text-xs lg:text-xs text-lg'>
                    <li>Hire with ease</li>
                    <li>Report Talent</li>
                    <li>Become a talent</li>
                </ul>
            </div>


            <div className=''>
                <h2 className='font-semibold text-sm text-neutral-500'>Resources</h2>
                <ul className='flex flex-col gap-3 pt-7 2xl:text-lg xl:text-xs lg:text-xs text-lg'>
                    <Link to={'/'}><li>Help & Support</li></Link>
                    <Link to={'/' + 'blog'}><li>Blog</li></Link>
                    <Link to={''}><li>Community</li></Link>
                </ul>
            </div>


            <div className=''>
                <h2 className='font-semibold text-sm text-neutral-500'>Company</h2>
                <ul className='flex flex-col gap-3 pt-7 2xl:text-lg xl:text-xs lg:text-xs text-lg'>
                    <Link to={'/' + 'about'}><li>About us</li></Link>
                    <li>Careers</li>
                    <li>Contact us</li>
                </ul>
            </div>
        </div>

        <div className='flex lg:flex-row flex-col lg:items-center gap-10'>
            <p className='2xl:text-sm xl:text-xs lg:text-xs text-xs'>Follow Us</p>
            <ul className='flex gap-5 '>
                <li className='border border-neutral-200 p-2 cursor-pointer flex justify-center items-center rounded-full'><FaXTwitter className='2xl:text-sm xl:text-xs lg:text-xs text-xs'/></li>
                <li className='border border-neutral-200 p-2 cursor-pointer flex justify-center items-center rounded-full'><FaLinkedin className='2xl:text-sm xl:text-xs lg:text-xs text-xs'/></li>
                <li className='border border-neutral-200 p-2 cursor-pointer flex justify-center items-center rounded-full'><FaFacebook className='2xl:text-sm xl:text-sm lg:text-sm text-sm'/></li>
            </ul>

            <p className='lg:ml-auto 2xl:text-sm xl:text-xs lg:text-xs text-xs'>© Creve International Ltd. 2024</p>
        </div>

        
    </div>
  )
}

export default Footer