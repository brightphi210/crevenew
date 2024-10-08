import React from 'react'
import me from '../Images/CEO/c (1).png'
import me1 from '../Images/CEO/c (2).png'
import me2 from '../Images/CEO/c (3).png'
import me3 from '../Images/CEO/c4.png'
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const AboutCom = () => {
  return (
    <div className='2xl:pt-40 pt-32 lg:px-[10rem] text-ce 2xl:px-[10rem] xl:px-[10rem] px-0'>
        <h2 className='text-center 2xl:text-5xl xl:text-4xl lg:text-4xl text-3xl font-bold text-black'> We’re Building <br /> a 
            <span className='bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent'>Thriving</span>  Ecosystem
        </h2>


        <div className='2xl:px-[15rem] xl:px-[1rem] lg:px-[1rem] px-5 lg:pt-20 pt-10'>
            <p className='border-b border-green-500 pb-2 mb-3 w-fit text-2xl'>About Us</p>
            <h2 className='text-justify 2xl:text-xk xl:text-lg lg:text-lg text-sm'>
                Creve was born out of a simple idea: to create a 
                space where customers could connect with vetted artisans.

                Creve was birthed to solve the problem of not finding professional Artisans to delivers your task
    
                <br />
                <br />
                Our mission is to make every client happy by helping, solve there needs easily and securely.
            </h2>



            <p className='border-b border-green-500 pb-2 mb-3 w-fit text-2xl pt-10'>Why Choose Us?</p>
            <div className='flex lg:flex-row flex-col gap-5 pt-5'>

                <h2 className='bg-neutral-100 2xl:text-lg xl:text-lg lg:text-lg p-5 rounded-lg text-sm'>
                    Trusted Community: Join a network 
                    of professionals and clients who 
                    are committed to quality and integrity.
                </h2>

                
                <h2 className='bg-neutral-100 2xl:text-lg xl:text-lg lg:text-lg p-5 rounded-lg text-sm'>
                    User-Friendly Platform: Our intuitive platform 
                    makes it easy to showcase your portfolio, #
                    communicate with clients, and manage your projects.
                </h2>

            </div>


            <div className='lg:py-20 py-10'>
                <h2 className='border-b border-green-500 pb-2 mb-3 w-fit text-2xl'>Meet Our Team</h2>
                <div className='pt-5 grid lg:grid-cols-3 grid-cols-1 lg:gap-6 gap-5'>

                    <div>
                        <div className='rounded-lg h-[20rem] w-full overflow-hidden'>
                            <img src={me} alt="" className='rounded-lg w-full h-full object-cover'/>
                        </div>
                        <div className='flex items-center pt-4'>
                            <div>
                                <h2 className='text-base'>Bright Philip</h2>
                                <p className='text-sm'>Co-Founder & CEO</p>
                            </div>
                            <ul className='flex gap-2 ml-auto '>
                                <Link to={'https://x.com/chibuzorphilip7'}>
                                    <li className='border border-neutral-200 p-2 cursor-pointer flex justify-center items-center rounded-full'><FaXTwitter className='text-lg'/></li>
                                </Link>
                                
                                <Link to={'https://www.linkedin.com/in/chibuzor-philip12/'}>
                                    <li className='border border-neutral-200 p-2 cursor-pointer flex justify-center items-center rounded-full'><FaLinkedin className='text-lg'/></li>
                                </Link>
                            </ul>
                        </div>
                    </div>


                    <div>
                        <div className='rounded-lg h-[20rem] w-full overflow-hidden'>
                            <img src={me1} alt="" className='rounded-lg w-full h-full object-cover'/>
                        </div>
                        <div className='flex items-center pt-4'>
                            <div>
                                <h2 className='text-base'>Emeka Awa</h2>
                                <p className='text-sm'>Co-Founder & CTO</p>
                            </div>
                            <ul className='flex gap-2 ml-auto '>
                                <Link to={'https://x.com/Mictovic'}>
                                    <li className='border border-neutral-200 p-2 cursor-pointer flex justify-center items-center rounded-full'><FaXTwitter className='text-lg'/></li>
                                </Link>
                                
                                <Link to={'https://www.linkedin.com/in/awa-michael-2059a3230'}>
                                    <li className='border border-neutral-200 p-2 cursor-pointer flex justify-center items-center rounded-full'><FaLinkedin className='text-lg'/></li>
                                </Link>
                            </ul>
                        </div>
                    </div>


                    <div>
                        <div className='rounded-lg h-[20rem] w-full overflow-hidden'>
                            <img src={me2} alt="" className='rounded-lg w-full h-full object-cover'/>
                        </div>
                        <div className='flex items-center pt-4'>
                            <div>
                                <h2 className='text-base'>Richard Kenneth</h2>
                                <p className='text-sm'>Co-Founder & COO</p>
                            </div>
                            <ul className='flex gap-2 ml-auto '>
                                <Link to={''}>
                                    <li className='border border-neutral-200 p-2 cursor-pointer flex justify-center items-center rounded-full'><FaXTwitter className='text-lg'/></li>
                                </Link>
                                
                                <Link to={'https://www.linkedin.com/in/richard-kenneth-17b058302/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'}>
                                    <li className='border border-neutral-200 p-2 cursor-pointer flex justify-center items-center rounded-full'><FaLinkedin className='text-lg'/></li>
                                </Link>
                            </ul>
                        </div>
                    </div>



                    <div>
                        <div className='rounded-lg h-[20rem] w-full overflow-hidden'>
                            <img src={me3} alt="" className='rounded-lg w-full h-full object-cover'/>
                        </div>
                        <div className='flex items-center pt-4'>
                            <div>
                                <h2 className='text-base'>Iyowuna Jaja</h2>
                                <p className='text-sm'>Graphic/Content Designer</p>
                            </div>
                            <ul className='flex gap-2 ml-auto '>
                                <Link to={''}>
                                    <li className='border border-neutral-200 p-2 cursor-pointer flex justify-center items-center rounded-full'><FaXTwitter className='text-lg'/></li>
                                </Link>
                                
                                <Link to={'https://www.linkedin.com/in/richard-kenneth-17b058302/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'}>
                                    <li className='border border-neutral-200 p-2 cursor-pointer flex justify-center items-center rounded-full'><FaLinkedin className='text-lg'/></li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>



            
            <p className='border-b border-green-500 lg:pt-5 pt-5 pb-2 mb-3 w-fit text-2xl'>For Talents:</p>

            <h2 className='2xl:text-lg xl:text-lg lg:text-lg text-sm pb-20'>
                We celebrate the art of traditional skills and craftsmanship. 
                our platform provides a space for professionals to shine. 
                Connect with clients looking for your unique talents and take your 
                craft to new heights.
            </h2>


        </div>

    </div>
  )
}

export default AboutCom
