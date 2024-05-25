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


import avatar from '../Images/Avatars.png'

const HomeComThree = () => {
  return (
    <div className='lg:px-[10rem]  py-[5rem] px-6'>
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


        <div className='pt-10'>
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
                            <h2 className='text-sm'>John Doe</h2>
                            <p className='text-xs'>Fasion Designer</p>
                        </div>

                        <div className=' ml-auto'>
                            <button className='bg-black py-2 px-5 text-xs text-white rounded-md'>View Profile</button>
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
                            <h2 className='text-sm'>John Doe</h2>
                            <p className='text-xs'>Fasion Designer</p>
                        </div>

                        <div className=' ml-auto'>
                            <button className='bg-black py-2 px-5 text-xs text-white rounded-md'>View Profile</button>
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
                            <h2 className='text-sm'>John Doe</h2>
                            <p className='text-xs'>Fasion Designer</p>
                        </div>

                        <div className=' ml-auto'>
                            <button className='bg-black py-2 px-5 text-xs text-white rounded-md'>View Profile</button>
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
                            <h2 className='text-sm'>John Doe</h2>
                            <p className='text-xs'>Fasion Designer</p>
                        </div>

                        <div className=' ml-auto'>
                            <button className='bg-black py-2 px-5 text-xs text-white rounded-md'>View Profile</button>
                        </div>
                    </div>

                </div>
            </div>
            <button className='bg-black lg:py-4 lg:px-20 py-3 px-14 text-xs rounded-md border-none flex m-auto lg:mt-20 mt-10 text-white'>View More</button>
        </div>
    </div>
  )
}

export default HomeComThree