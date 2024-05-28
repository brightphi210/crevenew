import React from 'react'
import hero from '../Images/hero.png'
import { FaArrowRightLong } from "react-icons/fa6";
// import { MdMoving } from "react-icons/md";
const HomeCompOne = () => {
  return (
    <div className='bg-white bgUrl lg:flex flex justify-center items-center h-screen'>
        
        <div className='w-full lg:px-0 px-6 lg:pt-0 lg:pb-0 pt-[8rem] pb-16'>
            <div className=' text-black text-center'>
                <h2 className='lg:text-5xl text-4xl font-bold'>Discover Best Talents <br className='lg:block hidden'/> Around You</h2>
                <p className='lg:text-sm text-xs text-slate-700 py-5  w-full'> 
                    In the ever-evolving landscape of skills and knowledge, the choice between  <br className='lg:block hidden'/>
                    hiring an expert or becoming one yourself is a pivotal decision.
                </p>
                
                <form action="" className='relative lg:w-1/3 w-full m-auto' >
                    <input type="text" placeholder='Search here' 
                        className='py-4 px-5 border border-slate-300  mt-0 w-full text-xs  outline-none rounded-lg'
                        required
                    />


                    <button className='rounde-lg py-3 border-none bg-neutral-700 text-white px-4 absolute right-1 top-1 rounded-lg'>
                        <FaArrowRightLong />
                    </button>

                </form>

                <div className='flex gap-2 justify-center m-auto lg:mt-3 mt-0'>
                    <button className='bg-neutral-900 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] text-xs  text-white py-4 cursor-pointer px-8 lg:mt-3 mt-6 rounded-md flex items-center gap-3'>
                        Join For Free <FaArrowRightLong />
                    </button>

                    <button className='bg-white shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] border text-xs border-neutral-800 text-black py-4 cursor-pointer px-8 lg:mt-3 mt-6 rounded-md flex items-center gap-3'>
                        Login <FaArrowRightLong />
                    </button>
                </div>
            </div>

            <div className='w-full lg:hidden pt-5'>
                <img src={hero} alt="" className='w-full'/>
            </div>
        </div>
    </div>
  )
}

export default HomeCompOne