import React from 'react'
import hero from './Images/hero.png'
import { FaArrowRightLong } from "react-icons/fa6";
import { MdMoving } from "react-icons/md";
const HomeComp = () => {
  return (
    <div className='bg-black flex px-[13rem] py-[8rem] items-center h-full'>
        
        <div className='w-full'>
            <h2 className='text-5xl font-bold text-white'>HIRING MADE EASY !</h2>
            <h3 className='text-3xl text-white py-5'>Hire an Expert or Be an Expert .</h3>
            <p className='text-sm text-slate-300'> 
                In the ever-evolving landscape of skills and knowledge, the choice between <br />
                hiring an expert or becoming one yourself is a pivotal decision.
            </p>
            
            <form action="" className='relative w-[30rem]' >
                <input type="text" placeholder='Search here' 
                    className='py-4 px-5 border-none bg-white mt-5 w-full  outline-none rounded-lg'
                    required
                />

                <button className='rounde-lg bg-black text-white py-4 px-5 absolute right-2 top-6 rounded-lg'>
                    <FaArrowRightLong />
                </button>

            </form>
            <div className='pt-8'>
                <p className='text-sm text-neutral-400 pb-3'>Popular Services</p>
                <div className='flex text-white gap-3'>
                    
                    <button className='bg-neutral-900 w-[10rem] py-3 px-5 flex items-center rounded-md text-xs'>
                        Furniture <p className='flex  items-center justify-center bg-white p-2 text-black rounded-md ml-auto'><MdMoving /></p>
                    </button>

                    <button className='bg-neutral-900 w-[10rem] py-3 px-5 flex items-center rounded-md text-xs'>
                        Web Design <p className='flex  items-center justify-center bg-white p-2 text-black rounded-md ml-auto'><MdMoving /></p>
                    </button>

                    <button className='bg-neutral-900 w-[10rem] py-3 px-5 flex items-center rounded-md text-xs'>
                        Fashion <p className='flex  items-center justify-center bg-white p-2 text-black rounded-md ml-auto'><MdMoving /></p>
                    </button>

                </div>
            </div>
        </div>


        <div className='w-3/5 ml-auto'>
            <img src={hero} alt="" className='w-full'/>
        </div>
    </div>
  )
}

export default HomeComp