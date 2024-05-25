import React from 'react'
import icon1 from '../Images/icon.png'
import icon2 from '../Images/icon1.png'
import icon3 from '../Images/icon2.png'

const HomeCompoTwo = () => {
  return (
    <div className='py-24'>
        <div className='flex items-center justify-between px-[13rem] gap-5'>
            <div className='text-center shadow-md w-full py-5'>
                <div className='bg-neutral-100 p-8 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                    <img src={icon2} alt="" className='w-14'/>
                </div>
                <h2 className='py-2 text-xl font-semibold'>Create Account</h2>
                <p className='text-neutral-500 text-sm'>First you have to create a account  here</p>
            </div>


            <div className='text-center shadow-md w-full py-5'>
                <div className='bg-neutral-100 p-8 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                    <img src={icon1} alt="" className='w-14'/>
                </div>
                <h2 className='py-2 text-xl font-semibold'>Search Creatives </h2>
                <p className='text-neutral-500 text-sm'>Search the best creatives work here</p>
            </div>


            <div className='text-center shadow-md w-full py-5'>
                <div className='bg-neutral-100 p-8 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                    <img src={icon3} alt="" className='w-14'/>
                </div>
                <h2 className='py-2 text-xl font-semibold'>Hire Creative</h2>
                <p className='text-neutral-500 text-sm'>Hire creative and get the best!</p>
            </div>


        </div>
    </div>
  )
}

export default HomeCompoTwo