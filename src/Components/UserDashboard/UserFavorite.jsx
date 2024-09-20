import React, { useEffect, useState } from 'react'
import UserNavbar from './UserNavbar'
import UserSideBar from './UserSideBar'
import { FaLocationDot } from "react-icons/fa6";
import { IoArrowForwardOutline } from "react-icons/io5";
import { GoTools } from "react-icons/go";
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import MyLoader from '../allLoadingState/MyLoader';
import NoData from '../allLoadingState/NoData';
import { RiMedalFill, RiVerifiedBadgeFill } from 'react-icons/ri';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Footer from '../Footer';

const UserFavorite = () => {

    const [show, setShow] = useState(false)

    const handleShow = () => {
      setShow(!show)
    }

  return (
    <div>
        <UserNavbar show={show} handleShow={handleShow}/>
        <div className='flex bg-neutral-100 h-screen'>
            <UserFavoriteDashboard />
        </div>
        <Footer />
    </div>
  )
}

export default UserFavorite



export const UserFavoriteDashboard = () => {

    const [allTalents, setAllTalents] = useState([])
    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
    const [isLoading, setIsLoading] = useState(false)
    const url =`${BASE_URL}/creativeprofile/`
  
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
  
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    }, []);
  
    const favoriteProfiles = allTalents.filter((profile) =>
      favorites.includes(profile.id)
    );

  return (
      <div className='2xl:px-[10rem] xl:px-[5rem] lg:px-[5rem] py-28 px-3 w-full overflow-y-auto'>
      <h2 className='text-2xl pb-5'>All Saved Talents</h2>


      {isLoading === true ?             
        <div className='lg:grid flex flex-col 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3  gap-5 pt-10'>
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
          {favoriteProfiles.length > 0 && 
            <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 2xl:gap-5 xl:gap-5 lg:gap-4 gap-5'>

              {favoriteProfiles.map((talent) =>(
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
                      <p className='text-xs flex justify-center m-auto gap-2 pb-3'><FaLocationDot className='text-green-700'/>{talent?.city && talent?.city}</p>
                      
                      <Link to={'/' + `user-dashboard-single-creative/${talent.id}/`} className=''>
                          <p className='text-xs py-3 rounded-full flex justify-center m-auto text-center w-full bg-green-950 text-white'>View Profile</p>
                      </Link>
                  </div>
                </div>
              ))}
            </div>
          }


          {favoriteProfiles.length <= 0 && (
              <NoData />
            )}

        </>
        }
    </div>
  )
}


