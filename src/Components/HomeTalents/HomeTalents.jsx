import React, { useEffect, useState } from 'react'
import noData from '../Images/nodata2.png'

import { IoArrowForwardSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'

const HomeTalents = () => {


    // https://creve.store/tcreativeprofile/

    const [allTalents, setAllTalents] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchTalent = async () =>{
        setLoading(true)

        try {
            const response  = await fetch('https://creve.store/creative/', {
                method: 'GET',
            })

            const data = await response.json()
            
            if (response.ok) {
                console.log('Successfully fetched');
                setAllTalents(data)
                setLoading(false)
            }

            else{
                console.log('Network response was not ok');
                setLoading(true)
            }
        } catch (error) {
            console.log('This is an error', error);
        }
    } 

    useEffect(()=>{
        fetchTalent();
    },[])


    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
        
    };


    const handleFilter = (term) => {
        setSearchTerm(term.toLowerCase());
    };

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



    console.log(allTalents);
  return (
    <div className='lg:pt-40 pt-32 lg:px-[10rem] bg-neutral-100 text-ce 2xl:px-[10rem] xl:px-[10rem] px-5'>
        <div className='flex justify-center'>
            <div>
                <h2 className='text-center lg:text-6xl text-3xl font-bold text-black'>Hire the best <br /> <span className='bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent'>Talents</span> Around you</h2>
                <p className='text-center text-lg text-black py-5'>Discover the best talents around you and beyound by just few clicks</p>

                <div className='relative'>
                    <input 
                        type="text" 
                        placeholder="Search here . . ." 
                        className="input rounded-full text-sm input-bordered p-7 w-full flex m-auto max-full" 
                        onChange={handleSearchInput}
                        value={searchTerm}
                    />
                    {/* <button className='absolute top-2 right-3 text-xs bg-black text-white py-3 px-5 rounded-full '>Search</button> */}
                </div>


                <div className='flex gap-3 mt-10 flex-wrap'>
                    <button onClick={() => handleFilter('')} className='bg-white py-2 px-5 rounded-lg text-sm hover:bg-neutral-200 hover:transition-all hover:ease-in-out hover:delay-75'>All</button>
                    <button onClick={() => handleFilter('Furniture')} className='bg-white py-2 px-5 rounded-lg text-sm hover:bg-neutral-200 hover:transition-all hover:ease-in-out hover:delay-75'>Furniture</button>
                    <button onClick={() => handleFilter('Graphics')} className='bg-white py-2 px-5 rounded-lg text-sm hover:bg-neutral-200 hover:transition-all hover:ease-in-out hover:delay-75'>Graphics</button>
                    <button onClick={() => handleFilter('Front')} className='bg-white py-2 px-5 rounded-lg text-sm hover:bg-neutral-200 hover:transition-all hover:ease-in-out hover:delay-75'>Frontend Dev</button>
                    <button onClick={() => handleFilter('Mobile')} className='bg-white py-2 px-5 rounded-lg text-sm hover:bg-neutral-200 hover:transition-all hover:ease-in-out hover:delay-75'>Mobile Dev</button>
                    <button onClick={() => handleFilter('Backend')} className='bg-white py-2 px-5 rounded-lg text-sm hover:bg-neutral-200 hover:transition-all hover:ease-in-out hover:delay-75'>Backend Dev</button>
                    <button onClick={() => handleFilter('Fashion')} className='bg-white py-2 px-5 rounded-lg text-sm hover:bg-neutral-200 hover:transition-all hover:ease-in-out hover:delay-75'>Fashion Design</button>
                </div>
            </div>

        </div>




        {loading === true ? 
            <div className='grid lg:grid-cols-4 grid-cols-1 gap-6 lg:py-32 py-20'>
                <div className='bg-neutral-200 h-[20rem] rounded-2xl'></div>
                <div className='bg-neutral-200 h-[20rem] rounded-2xl'></div>
                <div className='bg-neutral-200 h-[20rem] rounded-2xl'></div>
                <div className='bg-neutral-200 h-[20rem] rounded-2xl'></div>
            </div> : 

            <>
                {filteredItems.length > 0 ? 

                    <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-5 lg:py-32 py-20'>
                        {filteredItems.map((talents)=> (
                            <Link to={'/user-dashboard-creative/'}>
                            <div className='bg-white rounded-xl border border-neutral-200'>
                                <div className='w-full 2xl:h-[20rem] xl:h-[15rem] lg:h-[15rem] h-[20rem]  overflow-hidden rounded-xl'>
                                    <img src={talents.cover_image} alt="" className='w-full h-full object-cover'/>
                                </div>
                                <div className='flex items-center gap-3 p-5' >
                                    <div className='w-8 h-8 overflow-hidden rounded-full'>
                                        <img src={talents.profile_pics} alt=""  className='w-full object-cover h-full'/>
                                    </div>
                                    {talents.user && <>
                                        <div>
                                            <h2 className='text-sm'>{talents.user.fullname}</h2>
                                            <p className='text-[11px]'>{talents.display_name}</p>
                                        </div>
                                        <Link to={'/user-dashboard-creative/'} className='ml-auto'><button className=' border border-neutral-300 py-2 px-4 rounded-md'><IoArrowForwardSharp /></button></Link>
                                    </>}
                                </div>
                            </div>
                            </Link>
                        ))}
                        
                    </div> : 

                    <div className='flex items-center w-full justify-center m-auto h-[50vh] text-center'>
                        <div className=''>
                        <img src={noData} alt="" className='w-[15rem] flex m-auto opacity-70'/>
                        <h2 className='text-xl font-bold'>No results found</h2>
                        <p className='text-xs'>It seems we can’t find any results <br /> based on your search.</p>
                        </div>
                    </div>
                }
            </>
        }
    </div>
  )
}

export default HomeTalents
