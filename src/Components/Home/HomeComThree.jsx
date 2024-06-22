import React from 'react'

import bg from '../Images/bg.png'
import bg2 from '../Images/bg2.png'



import { FaQuoteLeft } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";

import avatar from '../Images/Avatars.png'


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';


const HomeComThree = () => {
  return (
    <div className='lg:px-[10rem] 2xl:px-[20rem] xl:px-[10rem] px-5  py-[5rem]'>


        <div className='relative mt-10 lg:block hidden'>
            <img src={bg} alt="" className='w-full rounded-3xl'/>
            <div className='absolute flex justify-center items-center top-1/3 m-auto left-0 right-0 text-white'>
                <div>
                    <h2 className='text-4xl text-center font-bold'>Ready to Get Started ?</h2>
                    <p className='text-center py-5'>
                        Sign Up or Login to Explore Various Features that our Sellers & <br /> 
                        Freelancers Experience . It’s Just Free
                    </p>
                    <Link to={'/register'}>
                        <button className='bg-accent font-bold  m-auto flex py-3 px-10 rounded-md border-none'>Get Started for free</button>
                    </Link>
                </div>
            </div>
        </div>


        <div className='relative mt-0 block lg:hidden'>
            <img src={bg2} alt="" className='w-full rounded-xl'/>
            <div className='absolute flex justify-center items-center top-1/3 m-auto left-0 right-0 text-white'>
                <div className='px-5' data-aos="fade-up" data-aos-duration="1000">
                    <h2 className='text-xl text-center font-bold'>Ready to Get Started ?</h2>
                    <p className='text-center py-5 text-xs'>
                        Sign Up or Login to Explore Various Features that our Sellers &
                        Freelancers Experience . It’s Just Free
                    </p>
                    <button className='bg-accent font-bold m-auto flex py-4 px-10 text-sm rounded-md border-none'>Get Started for free</button>
                </div>
            </div>
        </div>





        <div className='pt-20'>
            <h2 className='pb-8 lg:text-3xl text-xl'>Thousands of people are getting <br className='lg:block hidden'/> their job done with Creve</h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={40}
                navigation={true}
                loop={true}
                // pagination={{
                //     clickable: true,
                // }}

                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 3,
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

                        <div className='flex gap-2 '>
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

                        <div className='flex gap-2 '>
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

                        <div className='flex gap-2 '>
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

                        <div className='flex gap-2'>
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

                        <div className='flex gap-2 '>
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