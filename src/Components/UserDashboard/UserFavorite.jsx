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

const UserFavorite = () => {

    const [show, setShow] = useState(false)

    const handleShow = () => {
      setShow(!show)
    }

  return (
    <div>
        <UserNavbar show={show} handleShow={handleShow}/>
        <div className='flex bg-neutral-100 h-screen'>
            <div className='z-40'>
                <UserSideBar show={show} />
            </div>
            <UserFavoriteDashboard />
        </div>
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
    <div className='2xl:pl-[15rem] xl:pl-[15rem] lg:pl-[15rem] 2xl:pr-[5rem] xl:pr-[5rem] lg:pr-[3rem]  pt-28 px-5 w-full overflow-y-auto'>
      <h2 className='text-2xl pb-5'>Favorites Talents</h2>


      {isLoading === true ? <MyLoader /> : 
        <>
          {favoriteProfiles.length > 0 && 
            <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 2xl:gap-5 xl:gap-5 lg:gap-4 gap-5'>

              {favoriteProfiles.map((talent) =>(

                <div className='bg-white  rounded-xl cursor-pointer relative' key={talent.id}>

                  <Link to={'/' + `user-dashboard-single-creative/${talent.id}/`}>
                    <div className='2xl:h-[20rem] xl-h-[15rem] bg-neutral-50 lg:h-[12rem] h-[20rem] overflow-hidden rounded-md'>
                      <img src={talent.cover_image} alt="" className='w-full h-full object-cover'/>
                    </div>
                  </Link>

                  <div className='flex items-center pt-3 p-3'>

                    <div className='flex items-center gap-2'>
                      <div className='2xl:w-8 xl:w-6 lg:w-6 2xl:h-8 xl:h-6 lg:h-6 overflow-hidden w-7 h-7 rounded-full'>
                        <img src={talent.profile_pics} alt="" className='2xl:w-8 xl:w-6 lg:w-6 2xl:h-8 xl:h-6 lg:h-6 w-7 h-7 object-cover'/>
                      </div>

                      <div>
                        <h3 className='2xl:text-sm xl:text-xs lg:text-[10px] text-sm font-semibold'>{talent.user.fullname}</h3>
                        <p className='2xl:text-[10px] xl:text-[10px] lg:text-[10px] text-xs flex items-center gap-2'>{talent.display_name} <GoTools /></p>
                      </div>
                    </div>

                    <Link to={'/' + `user-dashboard-single-creative/${talent.id}/`} className='ml-auto'>
                      <button className=' bg-neutral-200 p-2 rounded-full text-black 2xl:text-md xl:text-sm lg:text-[10px]'><IoArrowForwardOutline /></button>
                    </Link>
                  </div>

                  <div className='flex items-center p-3 '>
                    <p className='text-xs flex items-center gap-2'><FaLocationDot className='text-accent'/>{talent.location.slice(0, 35)}. . .</p>
                    <p className='ml-auto text-xs '>{talent.work_type}</p>
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


