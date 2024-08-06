import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../Auth/BaseUrl'
import { IoArrowForwardSharp } from "react-icons/io5";

const BlogCom = () => { 

    const [blogData, setBlogData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const url = `${BASE_URL}/blog/`

    const fetchData = async() => {
        setIsLoading(true)
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers : {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            setBlogData(data)
            setIsLoading(false)
            
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])


    console.log('This is blog data', blogData);
  return (
    <div className='2xl:pt-40 pt-32 text-ce 2xl:px-[20rem] xl:px-[8rem] lg:px-[8rem] px-5'>
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


      <div className='grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-20 items-start 2xl:pt-28 pt-10'>
        <div>
            <h2 className='text-xl font-bold lg:pb-10 pb-5'>Choose what to read</h2>
            <ul className='flex lg:flex-col flex-row flex-wrap  gap-3 pt-0 pl-5 border-l border-neutral-300'>
                <li className='text-sm cursor-pointer pr-3 border-r border-neutral-300'>Company News</li>
                <li className='text-sm cursor-pointer pr-3 border-r border-neutral-300'>Career & Success</li>
                <li className='text-sm cursor-pointer pr-3 border-r border-neutral-300'>Community</li>
                <li className='text-sm cursor-pointer pr-3 border-r border-neutral-300'>Product & Inovations</li>
            </ul>
        </div>

        {isLoading === true ? 
            <div className='col-span-2 flex lg:flex-row flex-col items-center lg:gap-10 gap-3 w-full mb-10'>
                <div className='bg-neutral-300 rounded-xl w-[100%] h-[18rem]'></div>
                <div className='bg-neutral-300 rounded-xl lg:w-[70%] w-full lg:h-[18rem] h-[6rem]'></div>
            </div>
        : 
            <div className='col-span-2 lg:ml-auto cursor-pointer'>
                {blogData.map((blog)=>(
                    <div className='flex lg:flex-row flex-col  lg:gap-10 gap-4 pb-5'>
                        <div className='w-full  border border-neutral-200 2xl:h-[18rem] xl:h-[18rem] lg:h-[18rem]  h-[15rem] md:h-[30rem] overflow-hidden rounded-xl'>
                            <img src={blog?.image} alt="" className='w-full h-full rounded-xl object-cover'/>
                        </div>

                        <div className='lg:w-[80%] w-full'>
                            <p className='text-xs text-neutral-400 pb-3'>29.Jun.2021</p>
                            <h2 className='2xl:text-xl xl:text-base font-semibold'>{blog?.title}</h2>
                            <p className='text-xs py-5 text-justify'>{blog?.description.slice(0, 200)}   .  .  .</p>
                            <p className='text-sm text-neutral-600'>By: {blog?.author}</p>
                            <button className='bg-black text-white lg:w-fit w-full py-3 lg:px-6 mt-5 rounded-full text-sm flex gap-2 items-center'>
                                View Blog <IoArrowForwardSharp />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        }
      </div>
    </div>
  )
}

export default BlogCom
