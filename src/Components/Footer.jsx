import React from 'react'
import logo from  './Images/Creve.png'

import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";

const Footer = () => {
  return (
    <div className='flex lg:flex-row flex-col justify-between lg:gap-0 gap-8 lg:px-[10rem] 2xl:px-[20rem] xl:px-[10rem] px-5 bg-neutral-100 py-10'>
        <div className=''>
            <img src={logo} alt="" className='w-14'/>
            <p className='pt-2 lg:text-sm text-xs'>Home of best talents</p>
        </div>


        <div className=''>
            <h2 className='pb-2 text-sm'>Social Medials</h2>
            <div className='flex gap-3 text-sm'>
                <p><FaXTwitter /></p>
                <p><FaLinkedin /></p>
                <p><CiFacebook /></p>
            </div>
        </div>


        <div className=''>
            <h2 className='pb-2 text-sm'>Help Center</h2>
            <p className='lg:text-sm text-xs'>creve@gmail.com</p>
        </div>
    </div>
  )
}

export default Footer