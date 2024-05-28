import React from 'react'
import icon1 from '../Images/icon.png'
import icon2 from '../Images/icon1.png'
import icon3 from '../Images/icon2.png'
import hero2 from '../Images//hero2.png'

const HomeCompoTwo = () => {
  return (
    <div className=''>
        <div className='flex bg-black lg:py-20 py-20 lg:flex-row flex-col  justify-between lg:px-[10rem] px-5 lg:gap-5 gap-8'>
            <div className='text-center bg-white rounded-2xl shadow-md w-full py-5 pb-10'>
                <div className='bg-neutral-100 p-8 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                    <img src={icon2} alt="" className='lg:w-14 w-10'/>
                </div>
                <h2 className='py-2 lg:text-xl text-lg font-semibold'>Create Account</h2>
                <p className='text-neutral-500 lg:text-sm text-xs '>First you have to create a account  here</p>
            </div>


            <div className='text-center bg-slate-300 rounded-2xl shadow-md w-full py-5 pb-10'>
                <div className='bg-neutral-100 p-8 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                    <img src={icon1} alt="" className='lg:w-14 w-10'/>
                </div>
                <h2 className='py-2 lg:text-xl text-lg font-semibold'>Search Creatives </h2>
                <p className='text-neutral-500 lg:text-sm text-xs '>Search the best creatives work here</p>
            </div>


            <div className='text-center bg-white rounded-2xl shadow-md w-full py-5  pb-10'>
                <div className='bg-neutral-100 p-8 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                    <img src={icon3} alt="" className='lg:w-14 w-10'/>
                </div>
                <h2 className='py-2 lg:text-xl text-lg font-semibold'>Book Creative</h2>
                <p className='text-neutral-500 lg:text-sm text-xs '>Book a creative and get on call <br /> with him or her!</p>
            </div>


            <div className='text-center bg-slate-300 rounded-2xl shadow-md w-full py-5  pb-10'>
                <div className='bg-neutral-100 p-8 mb-4 m-auto flex justify-center items-center w-fit rounded-full'>
                    <img src={icon3} alt="" className='lg:w-14 w-10'/>
                </div>
                <h2 className='py-2 lg:text-xl text-lg font-semibold'>Hire Creative</h2>
                <p className='text-neutral-500 lg:text-sm text-xs '>Hire creative and get the best!</p>
            </div>


        </div>

        <div className='flex lg:flex-row flex-col-reverse py-14 gap-10 lg:px-[13rem] px-6 items-center bg-neutral-100'>

            <div className="join join-vertical lg:w-1/2 w-full">
                <h2 className='mb-10'>WHY CHOOSE US</h2> 
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" defaultChecked /> 
                    <div className="collapse-title lg:text-lg text-md font-medium">
                        Quick and easy hiring of creatives
                    </div>
                    <div className="collapse-content"> 
                        <p className='text-xs leading-loose'>
                            Looking for a quick and easy hiring process? Our platform 
                            simplifies candidate sourcing, saving you time and resources. 
                            Find the right talent swiftly and seamlessly, ensuring a smooth 
                            hiring experience from start 
                            to finish. Get started today and make hiring hassle-free!
                        </p>
                    </div>
                </div>
                
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" /> 
                    <div className="collapse-title lg:text-lg text-md font-medium">
                        Reviews/Ratings on clients
                    </div>
                    <div className="collapse-content"> 
                        <p className='text-xs leading-loose'>
                            Choosing us means partnering with a team dedicated to your success. 
                            Our commitment to excellence and customer satisfaction sets us apart. 
                            Here are some reasons why our clients trust us:
                        </p>
                    </div>
                </div>

                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" /> 
                    <div className="collapse-title lg:text-lg text-md font-medium">
                        Free onboarding as a Creative
                    </div>
                    <div className="collapse-content"> 
                    <p className='text-xs leading-loose'>
                            Looking for a quick and easy hiring process? Our platform 
                            simplifies candidate sourcing, saving you time and resources. 
                            Find the right talent swiftly and seamlessly, ensuring a smooth 
                            hiring experience from start 
                            to finish. Get started today and make hiring hassle-free!
                        </p>
                    </div>
                </div>
            </div>

            <div className='lg:w-2/5 ml-auto w-full'>
                <img src={hero2} alt="" className='w-full'/>
            </div>
        </div>
    </div>
  )
}

export default HomeCompoTwo