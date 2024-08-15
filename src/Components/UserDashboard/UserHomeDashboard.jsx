import React, { useEffect, useState } from 'react'
import UserNavbar from './UserNavbar';
import UserSideBar from './UserSideBar';
import logo from '../Images/Creve1.png'

import { FaLocationDot } from "react-icons/fa6";
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoMdArrowForward } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { GoTools } from "react-icons/go";
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

import noData from '../Images/nodata2.png'
import MyLoader from '../allLoadingState/MyLoader';

const UserHomeDashboard = () => {

  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <div>
      <UserNavbar show={show} handleShow={handleShow}/>

      <div className='flex bg-neutral-100 h-full'>
        <div className='z-40'>
          <UserSideBar show={show} />
        </div>
        <UserHomeDashboardHome />
      </div>
    </div>
  )
}

export default UserHomeDashboard



export const UserHomeDashboardHome = () => {
  

  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState('')


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



  const [profileData, setProfileData] = useState({})
  const url2 =`${BASE_URL}/userprofile/${userToken.profile_id}/`
  
   const fetchProfile = async () => {
  
        setIsLoading(true);
  
        try {
  
        const respose = await fetch(url2, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${authUser.access}`,
            },
        })
        if (!respose.ok) {
            setIsLoading(false);
            throw new Error('Network response was not ok');
        }
        const data = await respose.json();
  
        setProfileData(data)
  
        } catch (error) {
            console.log(error);
        } finally {
        setIsLoading(false);
        }
    };
  
    useEffect(() => {
        fetchProfile();
    }, []);


  const [searchTermInput, setSearchTermInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInput = (event) => {
    setSearchTermInput(event.target.value);
  };


  const [showSide, setShowSide] = useState(true);
  const handleButtonClick = (e) => {
    e.preventDefault();
    setSearchTerm(searchTermInput); 
    // setShowSide(false)
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


  const [location, setLocation] = useState({ lat : null, lng:null});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);


  const apiKey1 = 'AIzaSyA_HnIpk-nlGgMh-G1Evi-WX2T_wwqTmGs';

  const [address, setAddress] = useState('');
  const getAddress = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey1}`
      );
      const data = await response.json();

      console.log('This is the datas', data);
      
      
      if (data.results && data.results.length > 0) {
        const formattedAddress = data.results[5]?.formatted_address;
        setAddress(formattedAddress);
        // console.log('Formatted Address:', formattedAddress);
      } else {
        console.warn('No results found in geocode response.');
      }
      
      
    } catch (error) {
      console.error('Error getting address: ', error);
    }
  };

  useEffect(() => {
    if (location.lat !== null && location.lng !== null) {
      getAddress();
    }
  }, [location]);
  
  return (
    <div className='2xl:pl-[16rem] xl:pl-[15rem] lg:pl-[15rem] 2xl:pr-[3rem] xl:pr-[5rem] lg:pr-[3rem]  pt-28 w-full'>

      <div className='lg:flex items-center block px-5'>

        <div className='flex items-center'>
          <h2 className='text-2xl pb-3 lg:p-0'>Hi, {isLoading === true ? '- - - - -' : <>{profileData.user && profileData.user.fullname}! </>} </h2>
        </div>

        {/* <div className='flex items-center gap-3 ml-auto'>
            <FaLocationDot size={18} className='text-green-600'/>
            <span className='text-sm'>{isLoading === true ? '- - -' : <>{address}</>}</span>
        </div> */}
        {/* <div className='relative 2xl:w-4/12  xl:w-1/2  lg:w-1/2 w-full flex ml-auto'>
            <>
            <input onChange={handleSearchInput} value={searchTermInput} type="text" placeholder="Search here . . ." className="input rounded-full text-sm input-bordered 2xl:p-7 xl:p-5 lg:p-5 w-full flex m-auto " />
            <button onClick={handleButtonClick} className='absolute lg:top-2 top-1.5 right-3 text-xs bg-black text-white 2xl:py-3 xl:py-2 lg:py-2 px-4 py-2.5 rounded-full '>Search</button>
            </>
        </div> */}
      </div>

      {showModal === true &&
        <div role="alert" data-aos="fade-up" data-aos-duration="500"  className="alert z-50 alert-success text-green-700 lg:w-fit w-[80%] m-auto right-0 left-0  top-24 h-[3rem] flex justify-center items-center rounded-full bg-green-100 border border-green-500 absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          
          <span>Saved Succesfully</span>
        </div>
        } 

        { showModal === false &&
        <div role="alert" data-aos="fade-up" data-aos-duration="500"  className="alert z-50 alert-success text-green-700 lg:w-fit w-[80%] m-auto right-0 left-0  top-24 h-[3rem] flex justify-center items-center rounded-full bg-green-100 border border-green-500 absolute">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          <span>Removed Succesfully</span>
        </div>
      }

      <div className='shadow-[rgba(7,_65,_210,_0.03)_0px_9px_30px] bg-white 2xl:p-10 xl:p-5 lg:p-5 p-5 mt-5 lg:w-full w-[95%] m-auto grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 grid-cols-1 2xl:gap-10 lg:gap-5 gap-5 items-center 2xl:rounded-3xl xl:rounded-xl lg:rounded-xl rounded-md'>

        <div className='bg-neutral-50 p-5 rounded-xl border border-neutral-200'>
          <p className='text-sm'>Welcome to </p>
          <div className='flex items-center gap-2 py-3'>
            <img src={logo} alt="" className='w-5 h-5'/>
            <h2 className='text-xl font-semibold'>Creve</h2>
          </div>
          <p className='2xl:text-sm xl:text-sm lg:text-[10px] text-sm'>You are highly welcome to creve, you can now browse creatives/talents around your locaton and hire at ease</p>
        </div>

        <div className='lg:bg-white sect p-5 rounded-xl relative w-full h-full overflow-hidden border border-l-purple-200' >
          <div className='relative isolate z-20'>
            <h2 className='2xl:text-3xl xl:text-xl lg:text-lg text-lg text-purple-800 font-bold'>Become a Talent</h2>
            <p className='py-3 lg:text-sm text-base'>Become a talent and earn</p>
            <Link to={'/register'}>
              <button className='bg-white mt-5 py-2 px-5 rounded-full font-semibold border border-purple-200 text-xs '>Get Started</button>
            </Link>
          </div>
        </div>

        
        <div className='bg-white sect1 p-5 rounded-xl relative w-full h-full overflow-hidden border border-orange-200' >
          <div className='relative isolate z-20 '>
            <h2 className='2xl:text-3xl xl:text-xl lg:text-lg text-lg text-orange-700 font-bold'>Our  Blog</h2>
            <p className='py-3 lg:text-sm text-base '>Browse our and get latest update</p>
            <Link to={'/' + 'blog'}>
              <button className='bg-white mt-5 py-2 px-5 rounded-full font-semibold border border-orange-200 text-xs'>Browser</button>
            </Link>
        </div>
        </div>

        
        <div className='bg-white sect2 p-5 rounded-xl relative w-full h-full overflow-hidden border border-lime-200' >
          <div className='relative isolate z-20'>
            <h2 className='2xl:text-3xl xl:text-xl lg:text-lg text-lg text-lime-800 font-bold'>Community</h2>
            <p className='py-3 lg:text-sm text-base '>Join  community of like minds </p>

            <Link to={'https://t.me/+nflgbLBXe5xlMjI8'}>
              <button className='bg-white mt-5 py-2 px-5 rounded-full font-semibold border border-lime-200 text-xs'>Join Now</button>
            </Link>
        </div>
        </div>
      </div>

      <div className='pt-10 lg:px-0 px-7 pb-20 '>

        <div className='py-5 pb-10 flex items-center'>
          <h2 className='text-xl '>Top Creatives</h2>

          <div className='ml-auto flex items-center gap-10'>
            <Link to={'/' + 'user-dashboard-creative'}>
              <button className='flex items-center gap-2 underline'>Browse All <IoMdArrowForward /></button>
            </Link>
          </div>
        </div>


        {isLoading === true ? <MyLoader /> : 
        <>
          {filteredItems.length > 0 && 

          <div>
            <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 2xl:gap-5 xl:gap-5 lg:gap-4 gap-5'>
              {filteredItems.slice(0, 12).map((talent) =>(

                <div className='bg-white  rounded-xl cursor-pointer relative' key={talent.id}>

                  <Link to={'/' + `user-dashboard-single-creative/${talent.id}/`}>
                    <div className='2xl:h-[20rem] xl-h-[17rem] bg-neutral-50 lg:h-[15rem] h-[20rem] overflow-hidden rounded-md'>
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
                    {talent.location &&
                      <p className='text-xs flex items-center gap-2'><FaLocationDot className='text-accent'/>{talent.location.slice(0, 35)}. . .</p>
                    }
                    <p className='ml-auto text-xs '>{talent.work_type}</p>
                  </div>

                </div>
              ))}
            </div>

            {filteredItems.length > 12 &&
                <div className='flex items-center justify-center mt-20'>
                  <button className='bg-black text-sm text-white p-3 px-10 rounded-full'>See More</button>
                </div>
              }
            </div>
          }


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
    </div>
  )
}

