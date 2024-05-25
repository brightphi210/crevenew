import React from 'react'
import icon1 from '../Images/icon.png'
import icon2 from '../Images/icon1.png'
import icon3 from '../Images/icon2.png'

const HomeCompoTwo = () => {
  return (
    <div className='lg:py-20 py-10'>
        <div className='flex lg:flex-row flex-col items-center justify-between lg:px-[13rem] px-5 lg:gap-5 gap-8'>
            <div className='text-center shadow-md w-full py-5'>
                <div className='bg-neutral-100 p-8 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                    <img src={icon2} alt="" className='lg:w-14 w-10'/>
                </div>
                <h2 className='py-2 lg:text-xl text-lg font-semibold'>Create Account</h2>
                <p className='text-neutral-500 lg:text-sm text-xs '>First you have to create a account  here</p>
            </div>


            <div className='text-center shadow-md w-full py-5'>
                <div className='bg-neutral-100 p-8 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                    <img src={icon1} alt="" className='lg:w-14 w-10'/>
                </div>
                <h2 className='py-2 lg:text-xl text-lg font-semibold'>Search Creatives </h2>
                <p className='text-neutral-500 lg:text-sm text-xs '>Search the best creatives work here</p>
            </div>


            <div className='text-center shadow-md w-full py-5'>
                <div className='bg-neutral-100 p-8 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                    <img src={icon3} alt="" className='lg:w-14 w-10'/>
                </div>
                <h2 className='py-2 lg:text-xl text-lg font-semibold'>Hire Creative</h2>
                <p className='text-neutral-500 lg:text-sm text-xs '>Hire creative and get the best!</p>
            </div>


        </div>
    </div>
  )
}

export default HomeCompoTwo