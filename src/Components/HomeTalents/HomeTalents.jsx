import React from 'react'
import m1 from '../Images/allTalents/am (1).png'
import m2 from '../Images/allTalents/am (2).png'
import m3 from '../Images/allTalents/am (3).png'
import m4 from '../Images/allTalents/am (4).png'
import m5 from '../Images/allTalents/am (5).png'
import m6 from '../Images/allTalents/am (6).png'
import m7 from '../Images/allTalents/am (7).png'
import m8 from '../Images/allTalents/am (8).png'
import prof from '../Images/Avatars.png'

import { IoArrowForwardSharp } from "react-icons/io5";

const HomeTalents = () => {
  return (
    <div className='lg:pt-40 pt-32 lg:px-[10rem] text-ce 2xl:px-[10rem] xl:px-[10rem] px-5'>
        <div className='flex justify-center'>
            <div>
                <h2 className='text-center lg:text-6xl text-3xl font-bold text-black'>Hire the best <br /> <span className='bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent'>Talents</span> Around you</h2>
                <p className='text-center text-lg text-black py-5'>Discover the best talents around you and beyound by just few clicks</p>

                <div className='relative'>
                    <input type="text" placeholder="Search here . . ." className="input rounded-full text-sm input-bordered p-7 w-full flex m-auto max-full" />
                    <button className='absolute top-2 right-3 text-xs bg-black text-white py-3 px-5 rounded-full '>Search</button>
                </div>


                <div className='flex gap-3 mt-10 flex-wrap'>
                    <button className='bg-neutral-100 py-2 px-5 rounded-lg text-sm hover:bg-neutral-200 hover:transition-all hover:ease-in-out hover:delay-75'>Furniture</button>
                    <button className='bg-neutral-100 py-2 px-5 rounded-lg text-sm hover:bg-neutral-200 hover:transition-all hover:ease-in-out hover:delay-75'>Graphics</button>
                    <button className='bg-neutral-100 py-2 px-5 rounded-lg text-sm hover:bg-neutral-200 hover:transition-all hover:ease-in-out hover:delay-75'>Web Dev</button>
                    <button className='bg-neutral-100 py-2 px-5 rounded-lg text-sm hover:bg-neutral-200 hover:transition-all hover:ease-in-out hover:delay-75'>Mobile Dev</button>
                    <button className='bg-neutral-100 py-2 px-5 rounded-lg text-sm hover:bg-neutral-200 hover:transition-all hover:ease-in-out hover:delay-75'>Backend De</button>
                    <button className='bg-neutral-100 py-2 px-5 rounded-lg text-sm hover:bg-neutral-200 hover:transition-all hover:ease-in-out hover:delay-75'>Fashion Design</button>
                </div>
            </div>

        </div>





        <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-5 py-32'>
            <div className=''>
                <div className='w-full  overflow-hidden rounded-2xl'>
                    <img src={m1} alt="" className='w-full h-full object-cover'/>
                </div>
                <div className='flex items-center gap-3 pt-5'>
                    <div className='w-8 overflow-hidden rounded-full'>
                        <img src={prof} alt=""  className='w-full object-cover h-full'/>
                    </div>
                    <div>
                        <h2 className='text-sm'>John Doe</h2>
                        <p className='text-[11px]'>Snr. Engineer</p>
                    </div>
                    <button className='ml-auto border border-neutral-300 py-2 px-4 rounded-md'><IoArrowForwardSharp /></button>
                </div>

            </div>


            <div className=''>
                <div className='w-full'>
                    <img src={m2} alt="" className='w-full'/>
                </div>
                <div className='flex items-center gap-3 pt-5'>
                    <div className='w-8 overflow-hidden rounded-full'>
                        <img src={prof} alt=""  className='w-full object-cover h-full'/>
                    </div>
                    <div>
                        <h2 className='text-sm'>John Doe</h2>
                        <p className='text-[11px]'>Snr. Engineer</p>
                    </div>
                    <button className='ml-auto border border-neutral-300 py-2 px-4 rounded-md'><IoArrowForwardSharp /></button>
                </div>

            </div>



            <div className=''>
                <div className='w-full'>
                    <img src={m3} alt="" className='w-full'/>
                </div>
                <div className='flex items-center gap-3 pt-5'>
                    <div className='w-8 overflow-hidden rounded-full'>
                        <img src={prof} alt=""  className='w-full object-cover h-full'/>
                    </div>
                    <div>
                        <h2 className='text-sm'>John Doe</h2>
                        <p className='text-[11px]'>Snr. Engineer</p>
                    </div>
                    <button className='ml-auto border border-neutral-300 py-2 px-4 rounded-md'><IoArrowForwardSharp /></button>
                </div>

            </div>



            <div className=''>
                <div className='w-full'>
                    <img src={m4} alt="" className='w-full'/>
                </div>
                <div className='flex items-center gap-3 pt-5'>
                    <div className='w-8 overflow-hidden rounded-full'>
                        <img src={prof} alt=""  className='w-full object-cover h-full'/>
                    </div>
                    <div>
                        <h2 className='text-sm'>John Doe</h2>
                        <p className='text-[11px]'>Snr. Engineer</p>
                    </div>
                    <button className='ml-auto border border-neutral-300 py-2 px-4 rounded-md'><IoArrowForwardSharp /></button>
                </div>

            </div>


            <div className=''>
                <div className='w-full'>
                    <img src={m5} alt="" className='w-full'/>
                </div>
                <div className='flex items-center gap-3 pt-5'>
                    <div className='w-8 overflow-hidden rounded-full'>
                        <img src={prof} alt=""  className='w-full object-cover h-full'/>
                    </div>
                    <div>
                        <h2 className='text-sm'>John Doe</h2>
                        <p className='text-[11px]'>Snr. Engineer</p>
                    </div>
                    <button className='ml-auto border border-neutral-300 py-2 px-4 rounded-md'><IoArrowForwardSharp /></button>
                </div>

            </div>



            <div className=''>
                <div className='w-full'>
                    <img src={m6} alt="" className='w-full'/>
                </div>
                <div className='flex items-center gap-3 pt-5'>
                    <div className='w-8 overflow-hidden rounded-full'>
                        <img src={prof} alt=""  className='w-full object-cover h-full'/>
                    </div>
                    <div>
                        <h2 className='text-sm'>John Doe</h2>
                        <p className='text-[11px]'>Snr. Engineer</p>
                    </div>
                    <button className='ml-auto border border-neutral-300 py-2 px-4 rounded-md'><IoArrowForwardSharp /></button>
                </div>

            </div>



            <div className=''>
                <div className='w-full'>
                    <img src={m7} alt="" className='w-full'/>
                </div>
                <div className='flex items-center gap-3 pt-5'>
                    <div className='w-8 overflow-hidden rounded-full'>
                        <img src={prof} alt=""  className='w-full object-cover h-full'/>
                    </div>
                    <div>
                        <h2 className='text-sm'>John Doe</h2>
                        <p className='text-[11px]'>Snr. Engineer</p>
                    </div>
                    <button className='ml-auto border border-neutral-300 py-2 px-4 rounded-md'><IoArrowForwardSharp /></button>
                </div>

            </div>



            <div className=''>
                <div className='w-full'>
                    <img src={m8} alt="" className='w-full'/>
                </div>
                <div className='flex items-center gap-3 pt-5'>
                    <div className='w-8 overflow-hidden rounded-full'>
                        <img src={prof} alt=""  className='w-full object-cover h-full'/>
                    </div>
                    <div>
                        <h2 className='text-sm'>John Doe</h2>
                        <p className='text-[11px]'>Snr. Engineer</p>
                    </div>
                    <button className='ml-auto border border-neutral-300 py-2 px-4 rounded-md'><IoArrowForwardSharp /></button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default HomeTalents
