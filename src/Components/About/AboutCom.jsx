import React from 'react'
import me from '../Images/me.png'
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { CiFacebook } from 'react-icons/ci'

const AboutCom = () => {
  return (
    <div className='2xl:pt-40 pt-32 lg:px-[10rem] text-ce 2xl:px-[10rem] xl:px-[10rem] px-5'>
        <h2 className='text-center 2xl:text-5xl xl:text-4xl lg:text-4xl text-3xl font-bold text-black'> We’re Building <br /> a 
            <span className='bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent'>Thriving</span>  Ecosystem
        </h2>


        <div className='2xl:px-[15rem] xl:px-[1rem] lg:px-[1rem] px-5 lg:pt-20 pt-10'>
            <p className='border-b border-green-500 pb-2 mb-3 w-fit text-lg'>About Us</p>
            <h2 className='text-justify 2xl:text-lg xl:text-sm lg:text-sm text-sm'>
                Creve was born out of a simple idea: to create a space where talents of 
                all kinds could thrive. Our founders envisioned a platform that would break 
                down barriers and provide equal opportunities for individuals to showcase 
                their skills and for clients to discover exceptional talent.
            </h2>


            <div className='lg:py-20 py-10'>
                <h2 className='border-b border-green-500 pb-2 mb-3 w-fit text-lg'>Meet Team</h2>
                <div className='pt-5 grid lg:grid-cols-3 grid-cols-1 lg:gap-6 gap-5'>

                    <div>
                        <div className='rounded-lg'>
                            <img src={me} alt="" className='rounded-lg'/>
                        </div>
                        <div className='flex items-center pt-4'>
                            <div>
                                <h2 className='text-sm'>Bright Philip</h2>
                                <p className='text-[11px]'>Co-Founder & CEO</p>
                            </div>
                            <ul className='flex gap-2 ml-auto '>
                                <li className='border border-neutral-200 p-1 cursor-pointer flex justify-center items-center rounded-full'><FaXTwitter className='text-md'/></li>
                                <li className='border border-neutral-200 p-1 cursor-pointer flex justify-center items-center rounded-full'><FaLinkedin className='text-md'/></li>
                                <li className='border border-neutral-200 p-1 cursor-pointer flex justify-center items-center rounded-full'><CiFacebook className='text-md'/></li>
                            </ul>
                        </div>
                    </div>


                    <div>
                        <div className='rounded-lg'>
                            <img src={me} alt="" className='rounded-lg'/>
                        </div>
                        <div className='flex items-center pt-4'>
                            <div>
                                <h2 className='text-sm'>Emeka Akwa</h2>
                                <p className='text-[11px]'>Co-Founder & CTO</p>
                            </div>
                            <ul className='flex gap-2 ml-auto '>
                                <li className='border border-neutral-200 p-1 cursor-pointer flex justify-center items-center rounded-full'><FaXTwitter className='text-md'/></li>
                                <li className='border border-neutral-200 p-1 cursor-pointer flex justify-center items-center rounded-full'><FaLinkedin className='text-md'/></li>
                                <li className='border border-neutral-200 p-1 cursor-pointer flex justify-center items-center rounded-full'><CiFacebook className='text-md'/></li>
                            </ul>
                        </div>
                    </div>


                    <div>
                        <div className='rounded-lg'>
                            <img src={me} alt="" className='rounded-lg'/>
                        </div>
                        <div className='flex items-center pt-4'>
                            <div>
                                <h2 className='text-sm'>Zainab O.</h2>
                                <p className='text-[11px]'>Product Lead</p>
                            </div>
                            <ul className='flex gap-2 ml-auto '>
                                <li className='border border-neutral-200 p-1 cursor-pointer flex justify-center items-center rounded-full'><FaXTwitter className='text-md'/></li>
                                <li className='border border-neutral-200 p-1 cursor-pointer flex justify-center items-center rounded-full'><FaLinkedin className='text-md'/></li>
                                <li className='border border-neutral-200 p-1 cursor-pointer flex justify-center items-center rounded-full'><CiFacebook className='text-md'/></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            <p className='border-b border-green-500 pb-2 mb-3 w-fit text-sm'>Why Choose Us?</p>
            <div className='flex lg:flex-row flex-col gap-5'>
                <h2 className='bg-neutral-100 2xl:text-sm xl:text-xs lg:text-xs p-3 roundedlg:text-lg'>
                    Diverse Opportunities: Whether you're 
                    working with code or with your hands, 
                    find projects that match your skills and interests.
                </h2>

                <h2 className='bg-neutral-100 2xl:text-sm xl:text-xs lg:text-xs p-3 roundedlg:text-lg'>
                    Trusted Community: Join a network 
                    of professionals and clients who 
                    are committed to quality and integrity.
                </h2>

                
                <h2 className='bg-neutral-100 2xl:text-sm xl:text-xs lg:text-xs p-3 roundedlg:text-lg'>
                    User-Friendly Platform: Our intuitive platform 
                    makes it easy to showcase your portfolio, #
                    communicate with clients, and manage your projects.
                </h2>

            </div>

            
            <p className='border-b border-green-500 lg:pt-20 pt-10 pb-2 mb-3 w-fit'>For Digital Talents:</p>
            <h2 className='2xl:text-sm xl:text-xs lg:text-xs text-sm'>
            
                Harness the potential of your digital skills and connect 
                with clients who value your expertise. Whether you are a web developer, 
                graphic designer, digital marketer, content creator, or any other digital 
                professional, our platform offers you the chance to showcase your work, 
                find exciting projects, and grow your career.
            </h2>


            <p className='border-b border-green-500 lg:py-20 py-10  pb-2 mb-3 w-fit'>For Non-Digital Talents:</p>
            <h2 className='2xl:text-sm xl:text-xs lg:text-xs text-sm pb-20'>
                We celebrate the art of traditional skills and craftsmanship. 
                From artisans and musicians to personal trainers and event planners, 
                our platform provides a space for non-digital professionals to shine. 
                Connect with clients looking for your unique talents and take your 
                craft to new heights.
            </h2>


        </div>

    </div>
  )
}

export default AboutCom
