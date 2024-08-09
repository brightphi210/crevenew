import React from 'react'
import logo from  './Images/Creve.png'

import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { InstagramIcon } from 'lucide-react';

const Footer = () => {
  return (
    
    <div className='text-white lg:p-20 p-10  lg:gap-0 gap-8  bg-black'>
        

        <div className='flex lg:flex-row flex-col gap-8 justify-between pb-10'>
            <div className=''>

                <h2 className='font-semibold text-sm text-neutral-500'>Categories</h2>
                <ul className='flex flex-col gap-3 pt-7 2xl:text-lg xl:text-sm lg:text-sm text-sm'>
                    <Link to={'/' + 'allTalents'}><li>Digital</li></Link>
                    <Link to={'/' + 'allTalents'}><li>Non-DIgital</li></Link>
                </ul>
            </div>


            <div className=''>
                <h2 className='font-semibold text-sm text-neutral-500'>Client</h2>
                <ul className='flex flex-col gap-3 pt-7 2xl:text-lg xl:text-xs lg:text-xs text-sm'>
                    <Link to={'/allTalents'}><li>Hire with ease</li></Link>
                    <Link to={'/register'}><li>Become a talent</li></Link>
                    
                    
                </ul>
            </div>


            <div className=''>
                <h2 className='font-semibold text-sm text-neutral-500'>Resources</h2>
                <ul className='flex flex-col gap-3 pt-7 2xl:text-lg xl:text-xs lg:text-xs text-sm'>
                    <Link to={'https://chat.whatsapp.com/K3CgZedlHFhJQO7T3UsUd5'}><li>Help & Support</li></Link>
                    <Link to={'/' + 'blog'}><li>Blog</li></Link>
                    <Link to={'https://chat.whatsapp.com/KuOjvDVM1bfJLXBZYftDpK'}><li>Community</li></Link>
                </ul>
            </div>


            <div className=''>
                <h2 className='font-semibold text-sm text-neutral-500'>Company</h2>
                <ul className='flex flex-col gap-3 pt-7 2xl:text-lg xl:text-xs lg:text-xs text-sm'>
                    <Link to={'/' + 'about'}><li>About us</li></Link>
                    {/* <li>Careers</li> */}
                    {/* <li>Contact us</li> */}
                </ul>
            </div>
        </div>

        <div className='flex lg:flex-row flex-col lg:items-center gap-10'>
            <p className='2xl:text-sm xl:text-xs lg:text-xs text-xs'>Follow Us</p>
            <ul className='flex gap-5 '>
                <Link to={'https://x.com/africacreve'}>
                    <li className='border border-neutral-200 p-2 cursor-pointer flex justify-center items-center rounded-full'><FaXTwitter className='2xl:text-sm xl:text-xs lg:text-xs text-xs'/></li>
                </Link>

                <Link to={'https://www.linkedin.com/company/crevehq/'}>
                    <li className='border border-neutral-200 p-2 cursor-pointer flex justify-center items-center rounded-full'><FaLinkedin className='2xl:text-sm xl:text-xs lg:text-xs text-xs'/></li>
                </Link>

                <Link to={'https://www.instagram.com/creve_hq/'}>
                    <li className='border border-neutral-200 p-2 cursor-pointer flex justify-center items-center rounded-full'><FaInstagram className='2xl:text-sm xl:text-sm lg:text-sm text-sm'/></li>
                </Link>
            </ul>

            <p className='lg:ml-auto 2xl:text-sm xl:text-xs lg:text-xs text-xs'>© Creve International Ltd. 2024</p>
        </div>

        
    </div>
  )
}

export default Footer