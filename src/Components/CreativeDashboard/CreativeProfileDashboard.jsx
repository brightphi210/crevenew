import React, { useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'
import prof from '../Images/Avatars.png'
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { TbSmartHome } from "react-icons/tb";
import { FaGlobe } from "react-icons/fa";
import { TbBrandWhatsapp } from "react-icons/tb";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { HiLanguage } from "react-icons/hi2";
import { FaToolbox } from "react-icons/fa6";
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import item1 from '../Images/item1.jpg'
import item2 from '../Images/item2.jpg'
import item3 from '../Images/item3.jpg'
import item4 from '../Images/item4.jpg'
import item5 from '../Images/item5.jpg'
import item6 from '../Images/item6.jpg'

const CreativeProfileDashboard = () => {

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
        <CreativeProfile />
      </div>
    </div>
  )
}

export default CreativeProfileDashboard



export const CreativeProfile= () => {
  return (
    <div className='lg:p-20 pt-20 lg:pl-[18rem] p-5'>
      <div>
        <div className='flex items-center py-5'>
            <h2>My Profile</h2>
            <button className='ml-auto flex items-center text-sm gap-2 underline'><MdModeEditOutline />Edit</button>
        </div>

        <div className='bg-black p-8 rounded-md text-white'>

            <div className='flex items-center gap-6'>
                <div className='border-2 border-white rounded-full'>
                    <img src={prof} alt="" className='w-24'/>
                </div>

                <div>
                    <h2>Bright Philip</h2>
                    <p className='flex items-center gap-2 py-2 text-sm'>12 Reviews <FaStar /><FaStar /><FaStar /></p>
                    <p className='flex items-center gap-2 text-xs'><FaLocationDot className='text-accent'/>64, Nanka street, Port Harcourt, Rivers State.</p>
                </div>
            </div>

        </div>
      </div>

      <div className='flex gap-10 lg:flex-row mt-10'>
            <div className='w-1/2 border border-neutral-200 p-10 rounded-md'>
                <h2>General Informations</h2>
                <hr />

                <div className='py-4'>
                    <h2 className='text-sm'>Work Type</h2>
                    <p className='text-xs pt-3 flex items-center gap-2'><TbSmartHome className='text-accent text-lg'/>Remote</p>
                </div>

                <div className='py-4'>
                    <h2 className='text-sm'>Location</h2>
                    <p className='flex pt-3 items-center gap-2 text-xs'><FaLocationDot className='text-accent text-lg'/>64, Nanka street, Port Harcourt, Rivers State.</p>
                </div>

                <div className='py-4'>
                    <h2 className='text-sm'>Language</h2>
                    <p className='text-xs pt-3 flex items-center gap-2'> <HiLanguage className='text-accent text-lg'/>English</p>
                </div>

                <div className='py-4'>
                    <h2 className='text-sm'>Contact</h2>
                    <p className='text-xs pt-3 flex items-center gap-2'><TbBrandWhatsapp className='text-accent text-lg'/>Whatsapp</p>
                    <p className='text-xs pt-3 flex items-center gap-2'><MdOutlinePhoneInTalk className='text-accent text-lg'/>08094422807</p>
                    <p className='text-xs pt-3 flex items-center gap-2'><FaGlobe className='text-accent text-lg'/>website</p>
                </div>

            </div>

            <div className='w-full border border-neutral-200 p-10 rounded-md'>
                <h2>Details</h2>
                <hr />

                <div className='pt-5'>

                    <div className='flex items-center'>
                        <h2 className='text-xl flex items-center gap-3'><FaToolbox />Senior Electrician</h2>
                        <p className='ml-auto'>Starting Price : <strong>N5,000</strong></p>
                    </div>

                    <div className='flex flex-row flex-wrap gap-3 py-5 '>
                        <button className='border border-neutral-300 py-2 px-4 text-xs rounded-md'>Electrician</button>
                        <button className='border border-neutral-300 py-2 px-4 text-xs rounded-md'>Wirer</button>
                        <button className='border border-neutral-300 py-2 px-4 text-xs rounded-md'>Plumber</button>
                    </div>

                    <p className='text-xs pb-5'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        Doloremque excepturi alias velit, aliquid aspernatur dolores sint dolorum 
                        soluta labore dicta enim, officiis nostrum eveniet repellat facere dolor, 
                        placeat aperiam! Consequuntur!
                    </p>

                    <div>
                        <PhotoProvider>

                            <PhotoView src={item1}>
                                <div className='w-full h-[25rem]  overflow-hidden rounded-2xl cursor-pointer bg-black'>
                                    <img src={item1} alt="" className='w-full'/>
                                </div>
                            </PhotoView>


                            <div className="flex flex-row gap-5 w-full mt-5">
                                <PhotoView  src={item6}>
                                    <div className='h-[7rem] overflow-hidden w-1/4 cursor-pointer rounded-lg bg-black'>
                                        <img src={item6} alt="" className='w-full '/>
                                    </div>
                                </PhotoView>

                                <PhotoView  src={item3}>
                                    <div className='h-[7rem] overflow-hidden w-1/4 cursor-pointer rounded-lg bg-black'>
                                        <img src={item3} alt="" className='w-full'/>
                                    </div>
                                </PhotoView>

                                <PhotoView  src={item4}>
                                    <div className='h-[7rem] overflow-hidden w-1/4 cursor-pointer rounded-lg bg-black'>
                                        <img src={item4} alt="" className='w-full'/>
                                    </div>
                                </PhotoView>

                                <PhotoView  src={item5}>
                                    <div className='h-[7rem] overflow-hidden w-1/4 cursor-pointer rounded-lg bg-black'>
                                        <img src={item5} alt="" className='w-full'/>
                                    </div>
                                </PhotoView>
                            </div>
                        </PhotoProvider>
                    </div>
                </div>
            </div>
      </div>
    </div>
  )
}
