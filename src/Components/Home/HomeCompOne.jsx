import React from 'react'
import hero from '../Images/hero.png'
import { FaArrowRightLong } from "react-icons/fa6";
import { MdMoving } from "react-icons/md";
const HomeCompOne = () => {
  return (
    <div className='bg-black lg:flex lg:px-[13rem] px-6 lg:py-[8rem] py-[6rem] pb-[4rem] items-center h-full'>
        
        <div className='w-full'>
            <h2 className='lg:text-5xl text-4xl font-bold text-white'>Hiring Made Easy !</h2>
            <h3 className='lg:text-3xl text-xl text-white py-5'>Hire an Expert or Be an Expert .</h3>
            <p className='lg:text-sm text-xs text-slate-300 lg:w-10/12 w-full'> 
                In the ever-evolving landscape of skills and knowledge, the choice between 
                hiring an expert or becoming one yourself is a pivotal decision.
            </p>
            
            <form action="" className='relative lg:w-[30rem]' >
                <input type="text" placeholder='Search here' 
                    className='py-4 px-5 border-none bg-white mt-5 w-full text-xs  outline-none rounded-lg'
                    required
                />

                <button className='rounde-lg bg-black text-white py-3 px-4 absolute right-1 top-6 rounded-lg'>
                    <FaArrowRightLong />
                </button>

            </form>
            {/* <div className='pt-8'>
                <p className='text-sm text-neutral-400 pb-3'>Popular Services</p>
                <div className='lg:flex grid grid-cols-2 text-white gap-3'>
                    
                    <button className='bg-neutral-900 lg:w-[10rem] w-full py-3 px-5 flex items-center rounded-md text-xs'>
                        Furniture <p className='flex  items-center justify-center bg-white p-2 text-black rounded-md ml-auto'><MdMoving /></p>
                    </button>

                    <button className='bg-neutral-900 lg:w-[10rem] w-full py-3 px-5 flex items-center rounded-md text-xs'>
                        Web Design <p className='flex  items-center justify-center bg-white p-2 text-black rounded-md ml-auto'><MdMoving /></p>
                    </button>

                    <button className='bg-neutral-900 lg:w-[10rem] w-full py-3 px-5 flex items-center rounded-md text-xs'>
                        Fashion <p className='flex  items-center justify-center bg-white p-2 text-black rounded-md ml-auto'><MdMoving /></p>
                    </button>

                </div>
            </div> */}

            <button className='bg-neutral-900 border-2 text-xs border-neutral-800 text-white py-4 cursor-pointer px-14 lg:mt-10 mt-6 rounded-md flex items-center gap-3'>
                Join For Free <FaArrowRightLong />
            </button>
        </div>

        <div className='w-3/5 ml-auto lg:block hidden'>
            <img src={hero} alt="" className='w-full'/>
        </div>
    </div>
  )
}

export default HomeCompOne