import React from 'react'
import icon1 from '../Images/icon.png'
import icon2 from '../Images/icon1.png'
import icon3 from '../Images/icon2.png'
import hero2 from '../Images//hero2.png'

import hero5 from '../Images/nnb.png'

const HomeCompoTwo = () => {
  return (
    <div className=''>

        <h2 className='text-center 2xl:text-4xl pb-10' data-aos="fade-up" data-aos-duration="1000">A whole world of  <br /> <span className='mycolor'>talent</span> at your fingertips</h2>
        <div className='flex bg-neutral-200 lg:py-20 py-10 2xl:grid 2xl:grid-cols-4 2xl:mx-[10rem] mx-5  2xl:px-20 rounded-2xl xl:grid xl:grid-cols-3 lg:grid lg:grid-cols-2 flex-col  justify-between lg:px-[10rem] px-5 lg:gap-5 gap-8'>
           
           
            <div data-aos="fade-up" data-aos-duration="1000" className='text-center bg-white rounded-2xl shadow-md w-full py-5 pb-10 flex justify-center items-center'>
                <div>
                    <div className='bg-neutral-100 p-5 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                        <img src={icon2} alt="" className='2xl:w-10 xl:w-10 lg:w-10 w-10'/>
                    </div>
                    <h2 className='py-2 2xl:text-sm lg:text-xl text-lg font-semibold'>Create Account</h2>
                    <p className='text-neutral-500 2xl:text-xs lg:text-sm text-xs '>First you have to create a account  here</p>
                </div>
            </div>


            <div data-aos="fade-up" data-aos-duration="1000" className='text-center mycolor2 rounded-2xl shadow-md w-full py-5 pb-10 flex justify-center items-center'>
                <div className=''>
                    <div className='bg-neutral-100 p-5 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                        <img src={icon1} alt="" className='2xl:w-10 xl:w-10 lg:w-10 w-10'/>
                    </div>
                    <h2 className='py-2 2xl:text-sm lg:text-xl text-lg font-semibold text-white'>Search Creatives </h2>
                    <p className='text-neutral-200 2xl:text-xs lg:text-sm text-xs '>Search the best creatives work here</p>
                </div>
            </div>


            <div data-aos="fade-up" data-aos-duration="1000" className='text-center bg-white rounded-2xl shadow-md w-full py-5  pb-10 flex justify-center items-center'>
                <div>
                    <div className='bg-neutral-100 p-5 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                        <img src={icon3} alt="" className='2xl:w-10 xl:w-10 lg:w-10 w-10'/>
                    </div>
                    <h2 className='py-2 2xl:text-sm lg:text-xl text-lg font-semibold'>Book Creative</h2>
                    <p className='text-neutral-800 2xl:text-xs lg:text-sm text-xs '>Book a creative and get on call <br /> with him or her!</p>
                </div>
            </div>


            <div data-aos="fade-up" data-aos-duration="1000" className='text-center mycolor2 rounded-2xl shadow-md w-ful flex justify-center items-center py-5  pb-10'>
                <div>
                    <div className='bg-neutral-100  p-5 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                        <img src={icon3} alt="" className='2xl:w-10 xl:w-10 lg:w-10 w-10'/>
                    </div>
                    <h2 className='py-2 2xl:text-sm lg:text-xl text-lg font-semibold text-white'>Hire Creative</h2>
                    <p className='text-neutral-200 2xl:text-xs lg:text-sm text-xs '>Hire creative and get the best!</p>
                </div>
            </div>


        </div>


        <div className='flex lg:flex-row flex-col-reverse py-14 gap-10 2xl:px-[15rem] mt-20 xl:px-[5rem] lg:px-[5rem] px-6 items-center bg-neutral-100'>

            <div className="join join-vertical lg:w-1/2 w-full">
                <h2 className='mb-10'>WHY CHOOSE US</h2> 
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