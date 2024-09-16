import React, { useEffect, useState } from 'react'

import { GoDotFill, GoTools } from "react-icons/go";
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import noData from '../Images/nodata2.png'
import { FaForward, FaLocationDot } from "react-icons/fa6";
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { RiMedalFill } from "react-icons/ri";
import { TiMediaFastForward } from "react-icons/ti";
import { FaBackward, FaFastForward } from 'react-icons/fa';



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
        
            <div className='lg:grid flex flex-col 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3  gap-5 pb-10'>
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

            <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 2xl:gap-4 xl:gap-4 lg:gap-4 gap-5 pt-0 lg:px-0 mb-10'>
            {filteredItems.length > 0 &&
                <>
                    {filteredItems.filter(talent => talent.images.length !==0 && talent.dskills.length !==0).map((talent) => (
                        <div className='bg-white relative border border-neutral-300 rounded-xl p-5 cursor-pointer' key={talent.id}>

                                <div className='absolute flex gap-2 items-center right-10 top-10'>
                                    {talent?.verification?.verified === true && 
                                        <p className='text-xl text-green-500 bg-white shadow-lg flex rounded-full items-center'><RiVerifiedBadgeFill /></p>
                                    }
                                    <p className='text-xl flex items-center justify-center text-orange-600 rounded-full'><RiMedalFill /></p>
                                </div>

                                <div className='mb-3'>
                                    <div className='flex flex-col justify-center items-center gap-4'>
                                        <div className='h-[6.5rem] w-[6.5rem] overflow-hidden border-4 shadow-lg bg-white border-white rounded-full'>
                                            <img src={talent.profile_pics} alt="" loading='lazy' className='w-[6.5rem] h-[6.5rem] object-cover'/>
                                        </div>
                                        <div className=''>
                                            <h2 className='text-base uppercase font-bold flex gap-2 items-center'>{talent.user.fullname}</h2>
                                            <p className='text-xs flex w-fit m-auto rounded-lg text-green-800 py-2 items-center gap-1'>{talent.display_name} <GoTools /></p>
                                        </div>
                                    </div>
                                </div>


                                <div className=''>
                                    <ul className='flex justify-center flex-wrap items-center gap-2 text-[10px]'>
                                        {talent.dskills &&
                                            talent.dskills.slice(0, 2).map((skill, index) => (
                                                <li className='py-2 px-4 rounded-full bg-gray-100' key={index}>{skill?.skill}</li>
                                            ))
                                        }
                                    </ul>
                                </div>

                                <div className='pt-5'>

                                    <p className='text-xs flex justify-center m-auto gap-2 pb-3'><FaLocationDot className='text-green-700'/>{talent.city}</p>
                                    
                                    <Link to={'/' + `user-dashboard-single-creative/${talent.id}/`} className=''>
                                        <p className='text-xs py-3 rounded-full flex justify-center m-auto text-center w-full bg-green-950 text-white'>View Profile</p>
                                    </Link>
                                </div>
                        </div>
                        ))}                 

                    {/* <div className='flex rounded-sm gap-2 justify-center m-auto my-10 w-full p-2'>
                        <button className='bg-white py-2 px-4 rounded-sm flex m-auto justify-center items-center gap-2 text-xs'>Previous <FaBackward /></button>
                        <button className='bg-white py-2 px-4 rounded-sm flex m-auto justify-center items-center gap-2 text-xs'>Next <FaForward /></button>
                    </div> */}
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
