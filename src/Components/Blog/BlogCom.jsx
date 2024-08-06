import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../Auth/BaseUrl'
import { IoArrowForwardSharp } from "react-icons/io5";
import { RxDotsHorizontal } from "react-icons/rx";
import a from '../Images/blogImg/a1.jpg'
import MyLoader from '../allLoadingState/MyLoader';


const BlogCom = () => { 

    const [blogData, setBlogData] = useState([])
    const [eachBlog, setEachBlog] = useState({})
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
    console.log('This is each blog data', eachBlog);
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
                <div className='text-center  pb-10'>
                    <span class="loader3"></span>
                </div>
            : 
                <div className='col-span-2 lg:ml-auto cursor-pointer'>
                    {blogData.map((blog)=>(
                        <div className='flex lg:flex-row flex-col  lg:gap-10 gap-4 pb-5 mb-20' onClick={()=>{document.getElementById('my_modal_3').showModal(); setEachBlog(blog)}}>
                            <div className='w-full  border border-neutral-200 2xl:h-[18rem] xl:h-[18rem] lg:h-[18rem]  h-[15rem] md:h-[30rem] overflow-hidden rounded-xl'>
                                <img src={blog?.image} alt="" className='w-full h-full rounded-xl object-cover'/>
                            </div>

                            <div className='lg:w-[80%] w-full'>
                                <p className='text-xs text-neutral-400 pb-3'>29.Jun.2021</p>
                                <h2 className='2xl:text-xl xl:text-base font-semibold'>{blog?.title}</h2>
                                <p className='text-sm py-5 text-justify'>{blog?.description.slice(0, 150)}   .  .  .</p>
                                <p className='text-sm text-neutral-600'>By: {blog?.author}</p>
                                <button onClick={()=>{document.getElementById('my_modal_3').showModal(); setEachBlog(blog)}} className='bg-white-800 text-black border border-neutral-300 lg:w-fit w-full lg:py-3 py-3 lg:px-6 mt-5 rounded-full text-sm flex justify-center gap-2 items-center'>
                                    View Blog <IoArrowForwardSharp />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>


        <dialog id="my_modal_3" className="modal">
            <div className="modal-box lg:max-w-[90%] w-[98%] lg:max-h-[98%] max-h-[96%] rounded-md lg:p-20 2xl:px-[25rem] xl:px-[15rem] lg:px-[15rem] p-5 py-10">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <div className='flex w-full justify-center items-center m-auto'>
                    <div className=''>
                        <div className=' mb-5 pb-3 '>
                            <h2 className='lg:text-4xl text-2xl font-semibold pb-3 text-green-900'>{eachBlog?.title}</h2>
                            <p className='text-sm'>Author : <span className='font-bold'>{eachBlog?.author}</span></p>
                        </div>

                        <div className='w-full overflow-hidden lg:h-[30rem] h-[20%] rounded-lg border border-neutral-200'>
                            <img src={eachBlog?.image} alt="" className='w-full h-full rounded-lg object-cover'/>
                        </div>

                        <div className='flex items-center gap-3 pt-10 pb-5' >
                            <h3 className='text-green-600 underline cursor-pointer'>Blog</h3>
                            <p className='text-sm font-bold'>{eachBlog?.title}</p>
                        </div>

                        <p className=' lg:leading-[40px] leading-[30px] lg:text-base text-sm text-justify'>{eachBlog?.description}</p>
                        <div className='flex items-center gap-2 mt-6 pt-4 border-t border-neutral-300'>
                            <button className='bg-green-900 text-sm lg:w-[30%] w-full  text-white py-3 px-6 rounded-full'>Share</button>
                            <button onClick={()=>document.getElementById('my_modal_3').close()} className='border border-neutral-300 text-sm lg:w-[20%] w-full text-gray-800 py-3 px-6 rounded-full'>Close</button>
                        </div>
                    </div>
                </div>

            </div>
        </dialog>
    </div>
  )
}

export default BlogCom
