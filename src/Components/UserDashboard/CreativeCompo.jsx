import React, { useEffect, useState } from 'react'

import { GoTools } from "react-icons/go";
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import noData from '../Images/nodata2.png'
import { FaLocationDot } from "react-icons/fa6";
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const CreativeCompo = () => {
    const [allTalents, setAllTalents] = useState([])
    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
    const [isLoading, setIsLoading] = useState(false)
    const url =`${BASE_URL}/creativeprofile/`


    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = allTalents.filter(item => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
          (item.location && item.location.toLowerCase().includes(searchTermLower)) ||
          (item.category && item.category.toLowerCase().includes(searchTermLower)) ||
          (item.digital_skills && item.digital_skills.toLowerCase().includes(searchTermLower)) ||
          (item.work_type && item.work_type.toLowerCase().includes(searchTermLower)) ||
          (item.display_name && item.display_name.toLowerCase().includes(searchTermLower))||
          (item.user.fullname && item.user.fullname.toLowerCase().includes(searchTermLower))
        );
      });

    const fetchTalents = async() => {
        setIsLoading(true);
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${authUser.access}`,
            },
          })
          if (!response.ok) {
              setIsLoading(false);
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
    
          setAllTalents(data)
    
          } catch (error) {
              console.log(error);
          } finally {
          setIsLoading(false);
          }
      }
    
      useEffect(() => {
        fetchTalents();
    }, []);
    

  return (
    <div>

        {isLoading === true ? 
        
            <div className='lg:grid flex flex-col 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3  gap-5'>
                <span className='loadera w-full col-span-1'></span>
                <span className='loadera w-full col-span-1'></span>
                <span className='loadera w-full col-span-1'></span>
                <span className='loadera w-full col-span-1'></span>
                <span className='loadera w-full col-span-1'></span>
                <span className='loadera w-full col-span-1'></span>
                <span className='loadera w-full col-span-1'></span>
                <span className='loadera w-full col-span-1'></span>
            </div> : 
        <>

            <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 2xl:gap-5 xl:gap-5 lg:gap-4 gap-5 pt-0 lg:px-0'>
            {filteredItems.length > 0 &&
            <>
                {filteredItems.filter(talent => talent.location !== null && talent.cover_image !== 'https://creve.store/media/coverimage.png' && talent.images.length !==0).map((talent) => (
                    <div data-aos="fade-up" data-aos-duration="1000" className='bg-white  rounded-md cursor-pointer hover:transition-all hover:ease-in-out hover:bg-neutral-50 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] relative  p-3' key={talent.id}>
                        <Link to={'/' + `user-dashboard-single-creative/${talent.id}/`}>

                        <div className='relative'>

                            <div className=' bg-neutral-300 lg:h-[5rem] h-[5rem] overflow-hidden rounded-sm'>
                                {/* <LazyLoadImage
                                    alt={talent.cover_image}
                                    src={talent.cover_image}
                                    placeholderSrc={talent.cover_image}
                                    effect='blur'
                                    loading='lazy'
                                /> */}
                                <img src={talent.cover_image} alt="" loading='lazy' className='w-full h-full object-cover'/>
                            </div>


                            <div className='absolute right-0 left-0 m-auto flex top-10 h-[75px] w-[75px] overflow-hidden border-4 shadow-lg bg-white border-white rounded-full'>
                                <img src={talent.profile_pics} alt="" loading='lazy' className='w-[75px] h-[75px] object-cover'/>
                            </div>

                            
                        </div>

                        <div className='text-center pt-14'>
                            <h2 className='text-lg uppercase font-bold flex items-center m-auto justify-center gap-1'>{talent.user.fullname}
                                {talent?.verification?.verified === true && 
                                    <p className='text-xl text-green-500 bg-white shadow-lg flex rounded-full items-center'><RiVerifiedBadgeFill /></p>
                                }
                            </h2>
                        </div>
                        
                        <div className='flex items-center gap-3 w-full m-auto justify-center '>
                            <p className='text-xs flex w-fit rounded-full text-green-800 bg-green-100 py-2 px-5 my-2  items-center gap-1'>{talent.display_name} <GoTools /></p>
                            <p className='text-xs bg-neutral-100 rounded-full py-2 px-5 '>{talent.work_type}</p>
                        </div>
                        <p className='shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-white
                            text-black flex justify-center w-[80%] m-auto font-bold p-3 px-5  rounded-full text-center text-sm mt-4 cursor-pointer'>
                            Hire {talent?.user?.fullname}
                        </p>

                        <div className='flex m-auto justify-center items-center gap-4 py-5'>
                            <p className='text-sm flex items-center gap-2'><FaLocationDot className='text-green-500'/>{talent?.location?.slice(0, 30)}. . .</p>
                        </div>
                    </Link>


                    </div>
                    ))}                 
                </> 
            }
            </div>

            {filteredItems.length <= 0 && (
                <div className='flex items-center w-fit justify-center m-auto h-[50vh] text-center'>
                    <div className=''>
                        <img src={noData} alt="" className='w-[15rem] flex m-auto opacity-70'/>
                        <h2 className='text-xl font-bold'>No results found</h2>
                        <p className='text-xs'>It seems we can’t find any results <br /> based on your search.</p>
                    </div>
                </div>
            )}
        </>
        }
    </div>
  ) 
}

export default CreativeCompo
