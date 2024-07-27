import React from 'react'
import icon1 from '../Images/icon.png'
import icon2 from '../Images/icon1.png'
import icon3 from '../Images/icon2.png'
import hero2 from '../Images//hero2.png'

import { PiHandshakeLight } from "react-icons/pi";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { IoFlashOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

import { Link } from 'react-router-dom'

const HomeCompoTwo = () => {
  return (
    <div className=''>


        <h2 className='text-center 2xl:text-4xl text-2xl pb-4 ' data-aos="fade-up" data-aos-duration="1000">A whole world of  <br /> <span className='mycolor font-bold'>talent</span> at your fingertips</h2>
        <div className='flex lg:py-10 py-5 2xl:grid 2xl:grid-cols-3 rounded-2xl xl:grid xl:grid-cols-3 lg:grid lg:grid-cols-2 flex-col lg:px-[10rem] 2xl:px-[20rem] xl:px-[10rem]  justify-between px-5 lg:gap-10 gap-5'>
           
           <div className='bg-neutral-100 p-5 rounded-lg' data-aos="fade-up" data-aos-duration="1000">
                <p className='text-3xl mb-5 flex items-center justify-center h-fit rounded-full p-3 bg-neutral-200 w-fit'><GoTasklist /></p>
                <h2 className='text-2xl pb-5'>Over 10 categories</h2>
                <p className='text-sm'>Get results from skilled freelancers from all over the world, for every task, at any price point.</p>
           </div>

           <div className='bg-neutral-100 p-5 rounded-lg' data-aos="fade-up" data-aos-duration="1000">
                <p className='text-3xl mb-5 flex items-center justify-center h-fit rounded-full p-3 bg-neutral-200 w-fit'><PiHandshakeLight /></p>
                <h2 className='text-2xl pb-5'>Quality work done faster</h2>
                <p className='text-sm'>Filter to find the right freelancers quickly and get great work delivered in no time, every time.</p>
           </div>

           <div className='bg-neutral-100 p-5 rounded-lg' data-aos="fade-up" data-aos-duration="1000">
                <p className='text-3xl mb-5 flex items-center justify-center h-fit rounded-full p-3 bg-neutral-200 w-fit'><IoFlashOutline /></p>
                <h2 className='text-2xl pb-5'>24/7 support system</h2>
                <p className='text-sm'>Chat with our team to get your questions answered or resolve any issues with your challenges</p>
           </div>

           <div className='bg-neutral-100 p-5 rounded-lg' data-aos="fade-up" data-aos-duration="1000">
                <p className='text-3xl mb-5 flex items-center justify-center h-fit rounded-full p-3 bg-neutral-200 w-fit'><IoCheckmarkDoneCircleOutline /></p>
                <h2 className='text-2xl pb-5'>Easy Hiring Process</h2>
                <p className='text-sm'>Hire approved talnets as easy as posible, send request and get your job done.</p>
           </div>
           
            {/* <div data-aos="fade-up" data-aos-duration="1000" className='text-center bg-white rounded-xl border border-neutral-200 w-full py-5 pb-10 flex justify-center items-center'>
                <div>
                    <div className='bg-neutral-100 p-5 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                        <img src={icon2} alt="" className='2xl:w-10 xl:w-10 lg:w-10 w-10'/>
                    </div>
                    <h2 className='py-2 2xl:text-sm lg:text-xl text-lg font-semibold'>Create Account</h2>
                    <p className='text-neutral-500 2xl:text-xs lg:text-sm text-xs '>First you have to create a account  here</p>
                </div>
            </div>


            <div data-aos="fade-up" data-aos-duration="1000" className='text-center color rounded-xl w-full py-5 pb-10 flex justify-center items-center'>
                <div className=''>
                    <div className='bg-neutral-100 p-5 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                        <img src={icon1} alt="" className='2xl:w-10 xl:w-10 lg:w-10 w-10'/>
                    </div>
                    <h2 className='py-2 2xl:text-sm lg:text-xl text-lg font-semibold text-white'>Search for Creatives </h2>
                    <p className='text-neutral-200 2xl:text-xs lg:text-sm text-xs '>Search the best creatives work here</p>
                </div>
            </div>


            <div data-aos="fade-up" data-aos-duration="1000" className='text-center bg-white rounded-xl border border-neutral-200  w-full py-5  pb-10 flex justify-center items-center'>
                <div>
                    <div className='bg-neutral-100 p-5 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                        <img src={icon3} alt="" className='2xl:w-10 xl:w-10 lg:w-10 w-10'/>
                    </div>
                    <h2 className='py-2 2xl:text-sm lg:text-xl text-lg font-semibold'>Hire Creative</h2>
                    <p className='text-neutral-800 2xl:text-xs lg:text-sm text-xs '>Book a creative, call, and hire</p>
                </div>
            </div> */}

        </div>

        <div className='lg:pt-20 lg:pb-16 py-5 lg:px-[10rem] 2xl:px-[20rem] w-full xl:px-[10rem] '>
            <h2></h2>
            <div className='lg:h-[40rem] h-[43rem] w-full overflow-hidden relative bg-black lg:rounded-2xl'>
                <div className='absolute top-[5rem] lg:left-10 px-5 z-10 lg:w-[90%] w-full'>
                    <p className='text-lg text-white pb-5'>For Client</p>
                    <h2 className=' lg:text-6xl text-5xl text-white font-bold pt-[2rem]'>Find talent <br className='lg:block hidden'/> your way</h2>
                    <p className='text-white lg:text-lg text-sm pt-5'>
                        Work with the largest network of <br /> 
                        independent  professionals and get things done—from <br className='lg:block hidden'/>
                        quick turnarounds to big transformations.
                    </p>

                    <div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-4 gap-2 pt-10 w-full'>

                        <Link to={'' + '/user-dashboard-creative/'}>
                        <div className='bg-accent text-white lg:p-5 p-4 rounded-xl' data-aos="fade-up" data-aos-duration="1000"> 
                            <h2 className='lg:text-2xl text-lg font-semibold'>Browse  talent <br className='lg:block hidden'/> of your choice</h2>
                            <p className='lg:pt-3 pt-2 flex items-center text-sm gap-3'>Continue <FaArrowRightLong /></p>
                        </div>
                        </Link>

                        <Link to={'' + '/user-dashboard-creative/'}>
                        <div className='bg-accent text-white lg:p-5 p-4 rounded-xl' data-aos="fade-up" data-aos-duration="1000"> 
                            <h2 className='lg:text-2xl text-lg font-semibold'>Send Request/ <br className='lg:block hidden'/>chat talent</h2>
                            <p className='lg:pt-3 pt-2 flex items-center text-sm gap-3'>Continue <FaArrowRightLong /></p>
                        </div>
                        </Link>

                        <Link to={'' + '/user-dashboard-creative/'}>
                        <div className='bg-accent text-white lg:p-5 p-4 rounded-xl' data-aos="fade-up" data-aos-duration="1000"> 
                            <h2 className='lg:text-2xl text-lg font-semibold'>Call talent/ <br className='lg:block hidden'/>await response</h2>
                            <p className='lg:pt-3 pt-2 flex items-center text-sm gap-3'>Continue <FaArrowRightLong /></p>
                        </div>
                        </Link>


                        <Link to={'' + '/user-dashboard-creative/'}>
                        <div className='bg-accent text-white lg:p-5 p-4 rounded-xl' data-aos="fade-up" data-aos-duration="1000"> 
                            <h2 className='lg:text-2xl text-lg font-semibold'>Hire talent & <br className='lg:block hidden'/> get your job done</h2>
                            <p className='lg:pt-3 pt-2 flex items-center text-sm gap-3'>Continue <FaArrowRightLong /></p>
                        </div>
                        </Link>
                    </div>
                </div>
                <img className='h-full object-cover w-full lg:rounded-2xl lg:opacity-55 opacity-30' src="https://res.cloudinary.com/dphb7gqus/image/upload/v1722104850/mypics/african-american-young-woman-sitting-restaurant-using-laptop_1_swvfpn.jpg" alt="" />
            </div>
        </div>

        <div className='lg:pt-16 lg:pb-16 py-5 lg:px-[10rem] 2xl:px-[20rem] xl:px-[10rem] px-5'>
            <h2 className='2xl:text-4xl text-xl'>Browse talent by category</h2>
            <p>Looking for work? <Link to={'/register'}><span className='text-green-500 underline'>Join Now</span></Link></p>

            <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-5 pt-6'>
                
                <div className='p-8 bg-neutral-100 rounded-xl cursor-pointer' data-aos="fade-up" data-aos-duration="1000">
                    <h2 className='text-xl'>Furniture Making</h2>
                    <div className='flex gap-10 pt-5'>
                        <p className='flex items-center gap-3'><FaStar className='text-green-600'/>4.58/5</p>
                        <p className=''>1657 skills</p>
                    </div>
                </div>

                <div className='p-8 bg-neutral-100 rounded-xl cursor-pointer' data-aos="fade-up" data-aos-duration="1000">
                    <h2 className='text-xl'>Fashion Desing</h2>
                    <div className='flex gap-10 pt-5'>
                        <p className='flex items-center gap-3'><FaStar className='text-green-600'/>4.58/5</p>
                        <p className=''>1657 skills</p>
                    </div>
                </div>

                <div className='p-8 bg-neutral-100 rounded-xl cursor-pointer' data-aos="fade-up" data-aos-duration="1000">
                    <h2 className='text-xl'>Web Development</h2>
                    <div className='flex gap-10 pt-5'>
                        <p className='flex items-center gap-3'><FaStar className='text-green-600'/>4.58/5</p>
                        <p className=''>1657 skills</p>
                    </div>
                </div>

                <div className='p-8 bg-neutral-100 rounded-xl cursor-pointer' data-aos="fade-up" data-aos-duration="1000">
                    <h2 className='text-xl'>Mobile dev</h2>
                    <div className='flex gap-10 pt-5'>
                        <p className='flex items-center gap-3'><FaStar className='text-green-600'/>4.58/5</p>
                        <p className=''>1657 skills</p>
                    </div>
                </div>


                <div className='p-8 bg-neutral-100 rounded-xl cursor-pointer' data-aos="fade-up" data-aos-duration="1000">
                    <h2 className='text-xl'>Cobbling Making</h2>
                    <div className='flex gap-10 pt-5'>
                        <p className='flex items-center gap-3'><FaStar className='text-green-600'/>4.58/5</p>
                        <p className=''>1657 skills</p>
                    </div>
                </div>

                <div className='p-8 bg-neutral-100 rounded-xl cursor-pointer' data-aos="fade-up" data-aos-duration="1000">
                    <h2 className='text-xl'>Electricals</h2>
                    <div className='flex gap-10 pt-5'>
                        <p className='flex items-center gap-3'><FaStar className='text-green-600'/>4.58/5</p>
                        <p className=''>1657 skills</p>
                    </div>
                </div>
            </div>
        </div>


        {/* <div className='lg:py-20 lg:px-[10rem] 2xl:px-[20rem] xl:px-[10rem] px-5'>
            <h2 className='py-5 text-center 2xl:text-3xl pb-5 text-xl'>Top Creatives</h2>

            <div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-10 2xl:mb-0 xl:mb-0 lg:mb-0 mb-10'>

                <div className=' '>
                    <div className='rounded-lg overflow-hidden w-full'>
                        <img src={prof2} alt="" className='rounded-lg object-cover w-full'/>
                    </div>

                    <div className='flex pt-5 gap-3 items-center'>
                        <div className='w-8 overflow-hidden'>
                            <img src={avatar} className='w-full h-full object-cover' alt="" />
                        </div>

                        <div>
                            <h2 className='2xl:text-[12px] xl:text-[10px] lg:text-[10px] text-sm'>John Doe</h2>
                            <p className='2xl:text-[11px] xl:text-[9px] lg:text-[9px] text-xs'>Fasion Designer</p>
                        </div>

                        <div className=' ml-auto'>
                            <button className='bg-white border  border-gray-300 flex items-center gap-2 py-2 2xl:px-5 xl:px-2 lg:px-2 px-5 2xl:text-sm xl:text-[9px] lg:text-[9px] text-xs text-black rounded-md'>
                                <FaArrowRightLong />
                            </button>
                        </div>
                    </div>

                </div>



                <div className=''>
                    <div className='rounded-lg overflow-hidden w-full'>
                        <img src={prof3} alt="" className='rounded-lg object-cover w-full'/>
                    </div>

                    <div className='flex pt-5 gap-3 items-center'>
                    <div className='w-8 overflow-hidden'>
                            <img src={avatar} className='w-full h-full object-cover' alt="" />
                        </div>

                        <div>
                            <h2 className='2xl:text-[12px] xl:text-[10px] lg:text-[10px] text-sm'>John Doe</h2>
                            <p className='2xl:text-[11px] xl:text-[9px] lg:text-[9px] text-xs'>Fasion Designer</p>
                        </div>

                        <div className=' ml-auto'>
                            <button className='bg-white border border-gray-300 flex items-center gap-2 py-2 2xl:px-5 xl:px-2 lg:px-2 px-5 2xl:text-sm xl:text-[9px] lg:text-[9px] text-xs text-black rounded-md'>
                                <FaArrowRightLong />
                            </button>
                        </div>
                    </div>

                </div>


                <div className=''>
                    <div className='rounded-lg overflow-hidden w-full'>
                        <img src={prof4} alt="" className='rounded-lg object-cover w-full'/>
                    </div>

                    <div className='flex pt-5 gap-3 items-center'>
                        <div className='w-8 overflow-hidden'>
                            <img src={avatar} className='w-full h-full object-cover' alt="" />
                        </div>

                        <div>
                            <h2 className='2xl:text-[12px] xl:text-[10px] lg:text-[10px] text-sm'>John Doe</h2>
                            <p className='2xl:text-[11px] xl:text-[9px] lg:text-[9px] text-xs'>Fasion Designer</p>
                        </div>

                        <div className=' ml-auto'>
                            <button className='bg-white border border-gray-300 flex items-center gap-2 py-2 2xl:px-5 xl:px-2 lg:px-2 px-5 2xl:text-sm xl:text-[9px] lg:text-[9px] text-xs text-black rounded-md'>
                                <FaArrowRightLong />
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <Link to={'/allTalents'}>
                <button className='bg-black lg:mt-10 2xl:py-4 2xl:px-20 xl:px-10 lg:px-10 text-sm  py-3 xl:py-2 lg:py-2 px-14 rounded-md border-none flex m-auto  mt-2 text-white items-center gap-2'>View More <FaArrowRightLong /></button>
            </Link>
        </div> */}

        <div className='grid lg:grid-cols-2 grid-cols-1 mt-16 2xl:mx-[20rem] lg:mx-[10rem] xl:mx-[10rem] color lg:rounded-md overflow-hidden'>
            <div className='lg:h-full h-[20rem] overflow-hidden'>
                <img  src={'https://res.cloudinary.com/dphb7gqus/image/upload/v1722103452/mypics/person_dksyle.webp'} alt="" className='lg:rounded-md w-full h-full object-cover'/>
            </div>
            <div className='text-white py-14 px-10 w-full' data-aos="fade-up" data-aos-duration="1000">
                <p>For talent</p>
                <h2 className='text-6xl font-semibold py-10'>Find great <br /> work</h2>
                <p>
                    Meet clients you’re excited to work with and take
                    <br className='lg:block hidden'/>your career or business to new heights.
                </p>


                <div className='2xl:pt-40 xl:pt-10 lg:pt-10 pt-10' data-aos="fade-up" data-aos-duration="1000">
                    <div className='flex gap-5 flex-wrap text-neutral-300 text-sm pt-3 border-t border-neutral-t-100'>
                        <p>Find opportunities for every <br className=''/> stage of your freelance career</p>
                        <p>Control when, where, <br className=''/> and how you work</p>
                        <p>Explore different <br className=''/> ways to earn</p>
                    </div>

                    <Link to={'/register'}>
                        <button className='mt-10 py-3 px-10 text-sm bg-white rounded-sm text-black hover:bg-neutral-200'>Get Started</button>
                    </Link>
                </div>
            </div>
        </div>


        <div className='flex lg:flex-row  rounded-lg w-fit flex-col-reverse py-14 gap-10 mt-20  2xl:mx-[20rem] lg:mx-[10rem] xl:mx-[10rem] 2xl:px-10 lg:px-10 xl:px-10 px-5 items-center bg-neutral-100'>

            <div className="join join-vertical lg:w-1/2 w-full">
                <h2 className='mb-10 text-3xl'>WHY CHOOSE US</h2> 
                <div data-aos="fade-right" data-aos-duration="1000" className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" defaultChecked /> 
                    <div className="collapse-title 2xl:text-lg xl:text-base lg:text-sm text-md font-medium">
                        Quick and easy hiring of creatives
                    </div>
                    <div className="collapse-content"> 
                        <p className='text-xs 2xl:text-xs xl:text-[10px] lg:text-[10px] leading-loose'>
                            Looking for a quick and easy hiring process? Our platform 
                            simplifies candidate sourcing, saving you time and resources. 
                            Find the right talent swiftly and seamlessly, ensuring a smooth 
                            hiring experience from start 
                            to finish. Get started today and make hiring hassle-free!
                        </p>
                    </div>
                </div>
                
                <div data-aos="fade-right" data-aos-duration="1000" className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" /> 
                    <div className="collapse-title 2xl:text-lg xl:text-base lg:text-sm text-md font-medium">
                        Reviews/Ratings on clients
                    </div>
                    <div className="collapse-content"> 
                        <p className='text-xs 2xl:text-xs xl:text-[10px] lg:text-[10px] leading-loose'>
                            Choosing us means partnering with a team dedicated to your success. 
                            Our commitment to excellence and customer satisfaction sets us apart. 
                            Here are some reasons why our clients trust us:
                        </p>
                    </div>
                </div>

                <div data-aos="fade-right" data-aos-duration="1000" className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" /> 
                    <div className="collapse-title 2xl:text-lg xl:text-base lg:text-sm text-md font-medium">
                        Free onboarding as a Creative
                    </div>
                    <div className="collapse-content"> 
                    <p className='text-xs 2xl:text-xs xl:text-[10px] lg:text-[10px] leading-loose'>
                            Looking for a quick and easy hiring process? Our platform 
                            simplifies candidate sourcing, saving you time and resources. 
                            Find the right talent swiftly and seamlessly, ensuring a smooth 
                            hiring experience from start 
                            to finish. Get started today and make hiring hassle-free!
                        </p>
                    </div>
                </div>
            </div>

            <div className='lg:w-2/5 ml-auto w-full' data-aos="fade-up" data-aos-duration="1000">
                <img src={hero2} alt="" className='w-full'/>
            </div>
        </div>


    </div>
  )
}

export default HomeCompoTwo