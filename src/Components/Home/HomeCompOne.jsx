import React from 'react'
import hero from '../Images/hero.png'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
// import { MdMoving } from "react-icons/md";
const HomeCompOne = () => {
  return (
    <div className='bg-white bgUrl lg:flex flex justify-center items-center h-screen'>
        
        <div className='w-full lg:px-0 px-6 lg:pt-0 lg:pb-0 pt-[8rem] pb-10'>
            <div className=' text-black text-center' data-aos="fade-up" data-aos-duration="1000">
                <h2 className='2xl:text-6xl xl:text-3xl lg:text-3xl text-4xl font-bold 2xl:leading-[80px] leading-snug'>Discover Best <br className='lg:block hidden'/>  <span className='bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent'>Talents</span>  Around You</h2>
                <p className='2xl:text-lg xl:text-xs lg:text-xs text-xs text-slate-700 py-5  w-full'> 
                    In the ever-evolving landscape of skills and knowledge, the choice between  <br className='lg:block hidden'/>
                    hiring an expert or becoming one yourself is a pivotal decision.
                </p>
                
                <form action="" className='relative lg:w-1/3 w-full m-auto' >
                    <input type="text" placeholder='Search here' 
                        className='2xl:py-4 xl:py-3 lg:py-3 px-5 py-4 border border-slate-300  mt-0 w-full text-xs  outline-none rounded-lg'
                        required
                    />


                    <button className='rounde-lg 2xl:py-3 xl:py-2 lg:py-2 py-3 border-none bg-neutral-700 text-white px-4 absolute right-1 top-1 rounded-lg'>
                        <FaArrowRightLong />
                    </button>

                </form>

                <div className='flex gap-2 justify-center m-auto lg:mt-3 mt-0'>
                    
                    <Link to={'/allTalents'}>
                        <button className='bg-gradient-to-r from-sky-500 to-teal-500 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] text-xs  text-white py-4 2xl:text-lg xl:py-3 lg:py-3 cursor-pointer px-8 lg:mt-3 mt-6 rounded-md flex items-center gap-3'>
                            Hire Now <FaArrowRightLong />
                        </button>
                    </Link>


                    <Link to={'/register'}>
                    
                        <button className='bg-white shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] border text-xs border-neutral-800 2xl:text-lg text-black py-4 xl:py-3 lg:py-3 cursor-pointer px-8 lg:mt-3 mt-6 rounded-md flex items-center gap-3'>
                            Join for free <FaArrowRightLong />
                        </button>
                    </Link>

                </div>
            </div>

            <div className='w-full 2xl:hidden xl:hidden lg:hidden md:hidden pt-5'>
                <img src={hero} alt="" className='w-full'/>
            </div>
        </div>
    </div>
  )
}

export default HomeCompOne