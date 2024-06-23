import React from 'react'
import a from '../Images/blogImg/a3.jpg'
import b from '../Images/blogImg/a2.jpg'
import c from '../Images/blogImg/a1.jpg'

const BlogCom = () => {
  return (
    <div className='2xl:pt-40 pt-32 lg:px-[10rem] text-ce 2xl:px-[20rem] xl:px-[10rem] px-5'>
      <div className=''>
        <h2 className='text-center lg:text-6xl text-3xl font-bold text-black'> Creve Blog</h2>
        <p className='text-center py-5'>Read updates on Creve's products, corporate initiatives, and <br className='lg:block hidden'/> partnerships to get insight into the world’s work marketplace.</p>
        <div className='relative lg:w-1/2 w-full flex m-auto'>
            <>
            <input type="text" placeholder="Search here . . ." className="input rounded-full text-sm input-bordered p-7 w-full flex m-auto " />
            <button className='absolute top-2 right-3 text-xs bg-black text-white py-3 px-5 rounded-full '>Search</button>
            </>
        </div>

      </div>


      <div className='grid lg:grid-cols-3 grid-cols-1 gap-20 items-start 2xl:pt-28 pt-10'>
        <div>
            <h2 className='text-xl font-bold lg:pb-10 pb-5'>Choose what to read</h2>
            <ul className='flex lg:flex-col flex-row flex-wrap  gap-3 pt-0 pl-5 border-l border-neutral-300'>
                <li className='text-sm cursor-pointer pr-3 border-r border-neutral-300'>Company News</li>
                <li className='text-sm cursor-pointer pr-3 border-r border-neutral-300'>Career & Success</li>
                <li className='text-sm cursor-pointer pr-3 border-r border-neutral-300'>Community</li>
                <li className='text-sm cursor-pointer pr-3 border-r border-neutral-300'>Product & Inovations</li>
            </ul>
        </div>

        <div className='col-span-2 ml-auto cursor-pointer'>
            <div className='flex lg:flex-row flex-col  lg:gap-10 gap-4 pb-5'>
                <div className='2xl:w-[23rem] w-full h-[15rem] overflow-hidden rounded-xl'>
                    <img src={c} alt="" className='w-full h-full rounded-xl object-cover'/>
                </div>

                <div className=''>
                    <p className='text-xs text-neutral-400 pb-3'>29.Jun.2021</p>
                    <h2 className='2xl:text-xl xl:text-base font-semibold'>Product & Innovation</h2>
                    <p className='text-xs py-5'>Many years ago, I worked for my parents who own a video production company.</p>
                    <p className='text-xs text-neutral-400'>By: Peter Rowardson</p>
                </div>
            </div>


            <div className='flex lg:flex-row flex-col  lg:gap-10 gap-4 pb-5'>
                <div className='2xl:w-[23rem] w-full h-[15rem] overflow-hidden rounded-xl'>
                    <img src={a} alt="" className='w-full h-full rounded-xl object-cover'/>
                </div>

                <div className=''>
                    <p className='text-xs text-neutral-400 pb-3'>29.Jun.2021</p>
                    <h2 className='2xl:text-xl xl:text-base font-semibold'>Product & Innovation</h2>
                    <p className='text-xs py-5'>Many years ago, I worked for my parents who own a video production company.</p>
                    <p className='text-xs text-neutral-400'>By: Peter Rowardson</p>
                </div>
            </div>


            <div className='flex lg:flex-row flex-col  lg:gap-10 gap-4 pb-5'>
                <div className='2xl:w-[23rem] w-full h-[15rem] overflow-hidden rounded-xl'>
                    <img src={b} alt="" className='w-full h-full rounded-xl object-cover'/>
                </div>

                <div className=''>
                    <p className='text-xs text-neutral-400 pb-3'>29.Jun.2021</p>
                    <h2 className='2xl:text-xl xl:text-base font-semibold'>Product & Innovation</h2>
                    <p className='text-xs py-5'>Many years ago, I worked for my parents who own a video production company.</p>
                    <p className='text-xs text-neutral-400'>By: Peter Rowardson</p>
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default BlogCom
