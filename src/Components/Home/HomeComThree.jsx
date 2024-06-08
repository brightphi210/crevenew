import React from 'react'
import img1 from '../Images/Group 19.png'
import img2 from '../Images/Group 20.png'
import img3 from '../Images/Group 21.png'
import img4 from '../Images/Group 22.png'
import img5 from '../Images/Group 23.png'
import img6 from '../Images/Group 24.png'
import img7 from '../Images/Group 25.png'
import img8 from '../Images/Group 26.png'

import bg from '../Images/bg.png'
import bg2 from '../Images/bg2.png'


import prof1 from '../Images/prof1.png'
import prof2 from '../Images/prof2.png'
import prof3 from '../Images/prof3.jpg'
import prof4 from '../Images/prof4.jpg'

import { FaQuoteLeft } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";

import avatar from '../Images/Avatars.png'


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


const HomeComThree = () => {
  return (
    <div className='2xl:px-[7rem] xl:px-[5rem] lg:px-[5rem]  py-[5rem] px-6'>
        <h2 className='text-center text-lg pb-6'>Choose Different Category </h2>

        <div className='grid lg:grid-cols-4 grid-cols-2 gap-5'>
            <div className='relative  m-auto items-center'>
                <img src={img1} alt="" />
                <h2 className='absolute flex m-auto top-1/2 left-0 text-center justify-center right-0 text-neutral-200 text-sm '>Graphic Design</h2>
            </div>

            <div className='relative  m-auto items-center'>
                <img src={img2} alt="" />
                <h2 className='absolute flex m-auto top-1/2 left-0 text-center justify-center right-0 text-neutral-200 text-sm '>Cartoon Animations</h2>
            </div>

            <div className='relative  m-auto items-center'>
                <img src={img3} alt="" />
                <h2 className='absolute flex m-auto top-1/2 left-0 text-center justify-center right-0 text-neutral-200 text-sm '>Illustrations</h2>
            </div>

            <div className='relative  m-auto items-center'>
                <img src={img4} alt="" />
                <h2 className='absolute flex m-auto top-1/2 left-0 text-center justify-center right-0 text-neutral-200 text-sm '>Flyers Dsigns</h2>
            </div>

            <div className='relative  m-auto items-center'>
                <img src={img5} alt="" />
                <h2 className='absolute flex m-auto top-1/2 left-0 text-center justify-center right-0 text-neutral-200 text-sm '>Videography</h2>
            </div>


            <div className='relative  m-auto items-center'>
                <img src={img6} alt="" />
                <h2 className='absolute flex m-auto top-1/2 left-0 text-center justify-center right-0 text-neutral-200 text-sm '>Social Design</h2>
            </div>


            <div className='relative  m-auto items-center'>
                <img src={img7} alt="" />
                <h2 className='absolute flex m-auto top-1/2 left-0 text-center justify-center right-0 text-neutral-200 text-sm '>Article Writting</h2>
            </div>

            <div className='relative  m-auto items-center'>
                <img src={img8} alt="" />
                <h2 className='absolute flex m-auto top-1/2 left-0 text-center justify-center right-0 text-neutral-200 text-sm '>Logo Design </h2>
            </div>
        </div>

        <div className='relative mt-10 lg:block hidden'>
            <img src={bg} alt="" className='w-full rounded-3xl'/>
            <div className='absolute flex justify-center items-center top-1/3 m-auto left-0 right-0 text-white'>
                <div>
                    <h2 className='text-2xl text-center'>Ready to Get Started ?</h2>
                    <p className='text-center py-5'>
                        Sign Up or Login to Explore Various Features that our Sellers & <br /> 
                        Freelancers Experience . It’s Just Free
                    </p>
                    <button className='bg-neutral-800 m-auto flex py-3 px-10 rounded-md border-none'>Get Started for free</button>
                </div>
            </div>
        </div>


        <div className='relative mt-10 block lg:hidden'>
            <img src={bg2} alt="" className='w-full rounded-3xl'/>
            <div className='absolute flex justify-center items-center top-1/3 m-auto left-0 right-0 text-white'>
                <div className='px-5'>
                    <h2 className='text-xl text-center'>Ready to Get Started ?</h2>
                    <p className='text-center py-5 text-xs'>
                        Sign Up or Login to Explore Various Features that our Sellers &
                        Freelancers Experience . It’s Just Free
                    </p>
                    <button className='bg-neutral-800 m-auto flex py-4 px-10 text-sm rounded-md border-none'>Get Started for free</button>
                </div>
            </div>
        </div>


        <div className='pt-5'>
            <h2 className='py-5'>Top Creatives</h2>
            <div className='grid lg:grid-cols-4 grid-cols-1 lg:gap-5 gap-10'>
                <div >
                    <div className='rounded-lg overflow-hidden'>
                        <img src={prof1} alt="" className='rounded-lg object-cover'/>
                    </div>

                    <div className='flex pt-5 gap-3 items-center'>
                        <div className='w-8 overflow-hidden'>
                            <img src={avatar} className='w-10' alt="" />
                        </div>

                        <div>
                            <h2 className='2xl:text-sm xl:text-[10px] lg:text-[10px] text-sm'>John Doe</h2>
                            <p className='2xl:text-sm xl:text-[9px] lg:text-[9px] text-xs'>Fasion Designer</p>
                        </div>

                        <div className=' ml-auto'>
                            <button className='bg-white border border-gray-600 flex items-center gap-2 py-2 2xl:px-5 xl:px-2 lg:px-2 px-5 2xl:text-sm xl:text-[9px] lg:text-[9px] text-xs text-black rounded-md'>
                                View Profile 
                                <FaArrowRightLong />
                            </button>
                        </div>
                    </div>

                </div>


                <div >
                    <div className='rounded-lg overflow-hidden'>
                        <img src={prof2} alt="" className='rounded-lg object-cover'/>
                    </div>

                    <div className='flex pt-5 gap-3 items-center'>
                        <div className='w-8 overflow-hidden'>
                            <img src={avatar} className='w-10' alt="" />
                        </div>

                        <div>
                            <h2 className='2xl:text-sm xl:text-[10px] lg:text-[10px] text-sm'>John Doe</h2>
                            <p className='2xl:text-sm xl:text-[9px] lg:text-[9px] text-xs'>Fasion Designer</p>
                        </div>

                        <div className=' ml-auto'>
                            <button className='bg-white border border-gray-600 flex items-center gap-2 py-2 2xl:px-5 xl:px-2 lg:px-2 px-5 2xl:text-sm xl:text-[9px] lg:text-[9px] text-xs text-black rounded-md'>
                                View Profile 
                                <FaArrowRightLong />
                            </button>
                        </div>
                    </div>

                </div>



                <div >
                    <div className='rounded-lg overflow-hidden'>
                        <img src={prof3} alt="" className='rounded-lg object-cover'/>
                    </div>

                    <div className='flex pt-5 gap-3 items-center'>
                        <div className='w-8 overflow-hidden'>
                            <img src={avatar} className='w-10' alt="" />
                        </div>

                        <div>
                            <h2 className='2xl:text-sm xl:text-[10px] lg:text-[10px] text-sm'>John Doe</h2>
                            <p className='2xl:text-sm xl:text-[9px] lg:text-[9px] text-xs'>Fasion Designer</p>
                        </div>

                        <div className=' ml-auto'>
                            <button className='bg-white border border-gray-600 flex items-center gap-2 py-2 2xl:px-5 xl:px-2 lg:px-2 px-5 2xl:text-sm xl:text-[9px] lg:text-[9px] text-xs text-black rounded-md'>
                                View Profile 
                                <FaArrowRightLong />
                            </button>
                        </div>
                    </div>

                </div>


                <div >
                    <div className='rounded-lg overflow-hidden'>
                        <img src={prof4} alt="" className='rounded-lg object-cover'/>
                    </div>

                    <div className='flex pt-5 gap-3 items-center'>
                        <div className='w-8 overflow-hidden'>
                            <img src={avatar} className='w-10' alt="" />
                        </div>

                        <div>
                            <h2 className='2xl:text-sm xl:text-[10px] lg:text-[10px] text-sm'>John Doe</h2>
                            <p className='2xl:text-sm xl:text-[9px] lg:text-[9px] text-xs'>Fasion Designer</p>
                        </div>

                        <div className=' ml-auto'>
                            <button className='bg-white border border-gray-600 flex items-center gap-2 py-2 2xl:px-5 xl:px-2 lg:px-2 px-5 2xl:text-sm xl:text-[9px] lg:text-[9px] text-xs text-black rounded-md'>
                                View Profile 
                                <FaArrowRightLong />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <button className='bg-black 2xl:py-4 2xl:px-20 xl:px-10 lg:px-10  py-3 xl:py-2 lg:py-2 px-14 xl:text-[10px] lg:text-[10px] text-xs rounded-md border-none flex m-auto lg:mt-20 mt-2 text-white'>View More</button>
        </div>



        <div className='pt-20'>
            <h2 className='pb-8'>Thousands of people are getting <br /> their job done with Creve</h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                navigation={true}
                loop={true}
                pagination={{
                    clickable: true,
                }}

                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                }}
                modules={[Pagination, Autoplay, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='border border-slate-300 py-4 px-6 rounded-lg'>
                        <p className='text-3xl 2xl:text-3xl xl:text-xl lg:text-xl'><FaQuoteLeft /></p>
                        <p className='text-xs 2xl:text-sm xl:text-[9px] lg:text-[9px] py-5 leading-[1.4rem]'>
                            Lorem ipsum dolor sit amet, consectetur 
                            adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris
                        </p>

                        <div className='flex gap-2 items-center justify-center'>
                            <div className='w-10 h-10 xl:w-8 lg:w-8 xl:h-8 lg:h-8 flex overflow-hidden items-center rounded-full'>
                                <img src={avatar} alt="" className='w-10'/>
                            </div>
                            <div>
                                <p className='text-xs '>John Doe</p>
                                <div className='flex gap-2 text-[10px]'>
                                    <p><GoStarFill /></p>
                                    <p><GoStarFill /></p>
                                    <p><GoStarFill /></p>
                                    <p><GoStarFill /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                 <SwiperSlide>
                    <div className='border border-slate-300 py-4 px-6 rounded-lg'>
                        <p className='text-3xl 2xl:text-3xl xl:text-xl lg:text-xl'><FaQuoteLeft /></p>
                        <p className='text-xs 2xl:text-sm xl:text-[9px] lg:text-[9px] py-5 leading-[1.4rem]'>
                            Lorem ipsum dolor sit amet, consectetur 
                            adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris
                        </p>

                        <div className='flex gap-2 items-center justify-center'>
                            <div className='w-10 h-10 xl:w-8 lg:w-8 xl:h-8 lg:h-8 flex overflow-hidden items-center rounded-full'>
                                <img src={avatar} alt="" className='w-10'/>
                            </div>
                            <div>
                                <p className='text-xs '>John Doe</p>
                                <div className='flex gap-2 text-[10px]'>
                                    <p><GoStarFill /></p>
                                    <p><GoStarFill /></p>
                                    <p><GoStarFill /></p>
                                    <p><GoStarFill /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>


                <SwiperSlide>
                    <div className='border border-slate-300 py-4 px-6 rounded-lg'>
                        <p className='text-3xl 2xl:text-3xl xl:text-xl lg:text-xl'><FaQuoteLeft /></p>
                        <p className='text-xs 2xl:text-sm xl:text-[9px] lg:text-[9px] py-5 leading-[1.4rem]'>
                            Lorem ipsum dolor sit amet, consectetur 
                            adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris
                        </p>

                        <div className='flex gap-2 items-center justify-center'>
                            <div className='w-10 h-10 xl:w-8 lg:w-8 xl:h-8 lg:h-8 flex overflow-hidden items-center rounded-full'>
                                <img src={avatar} alt="" className='w-10'/>
                            </div>
                            <div>
                                <p className='text-xs '>John Doe</p>
                                <div className='flex gap-2 text-[10px]'>
                                    <p><GoStarFill /></p>
                                    <p><GoStarFill /></p>
                                    <p><GoStarFill /></p>
                                    <p><GoStarFill /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>



                <SwiperSlide>
                    <div className='border border-slate-300 py-4 px-6 rounded-lg'>
                        <p className='text-3xl 2xl:text-3xl xl:text-xl lg:text-xl'><FaQuoteLeft /></p>
                        <p className='text-xs 2xl:text-sm xl:text-[9px] lg:text-[9px] py-5 leading-[1.4rem]'>
                            Lorem ipsum dolor sit amet, consectetur 
                            adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris
                        </p>

                        <div className='flex gap-2 items-center justify-center'>
                            <div className='w-10 h-10 xl:w-8 lg:w-8 xl:h-8 lg:h-8 flex overflow-hidden items-center rounded-full'>
                                <img src={avatar} alt="" className='w-10'/>
                            </div>
                            <div>
                                <p className='text-xs '>John Doe</p>
                                <div className='flex gap-2 text-[10px]'>
                                    <p><GoStarFill /></p>
                                    <p><GoStarFill /></p>
                                    <p><GoStarFill /></p>
                                    <p><GoStarFill /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>



                <SwiperSlide>
                    <div className='border border-slate-300 py-4 px-6 rounded-lg'>
                        <p className='text-3xl 2xl:text-3xl xl:text-xl lg:text-xl'><FaQuoteLeft /></p>
                        <p className='text-xs 2xl:text-sm xl:text-[9px] lg:text-[9px] py-5 leading-[1.4rem]'>
                            Lorem ipsum dolor sit amet, consectetur 
                            adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris
                        </p>

                        <div className='flex gap-2 items-center justify-center'>
                            <div className='w-10 h-10 xl:w-8 lg:w-8 xl:h-8 lg:h-8 flex overflow-hidden items-center rounded-full'>
                                <img src={avatar} alt="" className='w-10'/>
                            </div>
                            <div>
                                <p className='text-xs '>John Doe</p>
                                <div className='flex gap-2 text-[10px]'>
                                    <p><GoStarFill /></p>
                                    <p><GoStarFill /></p>
                                    <p><GoStarFill /></p>
                                    <p><GoStarFill /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>


            </Swiper>
        </div>
    </div>
  )
}

export default HomeComThree