import React, { useEffect, useState } from 'react'
import UserNavbar from './UserNavbar'
import UserSideBar from './UserSideBar'


import { FaLocationDot } from "react-icons/fa6";
import { IoArrowForwardOutline } from "react-icons/io5";
import { GoTools } from "react-icons/go";
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

import { IoFilter } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";


import noData from '../Images/nodata2.png'
import MyLoader from '../allLoadingState/MyLoader';
import { LuSearch } from 'react-icons/lu';

const UserCreativeDashboard = () => {

    const [show, setShow] = useState(false)

    const handleShow = () => {
      setShow(!show)
    }


  return (
    <div>
        <UserNavbar show={show} handleShow={handleShow}/>
        <div className='flex bg-white'>
            <div className='z-40'>
                <UserSideBar show={show} />
            </div>
            <UserCreativeDashboardCom />
        </div>
    </div>
  )
}

export default UserCreativeDashboard



export const UserCreativeDashboardCom = () => {

  const [showOne, setShowOne] = useState(true);
  const [showTwo, setShowTwo] = useState(false);
  const [showThree, setShowThree] = useState(false);

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

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
    
  };

  const [showSide, setShowSide] = useState(true);
  const handleFilter = (term) => {
    setSearchTerm(term.toLowerCase());
};

  const filteredItems = allTalents.filter(item => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (item.location && item.location.toLowerCase().includes(searchTermLower)) ||
      (item.category && item.category.toLowerCase().includes(searchTermLower)) ||
      (item.digital_skills && item.digital_skills.toLowerCase().includes(searchTermLower)) ||
      (item.nondigital_skills && item.nondigital_skills.toLowerCase().includes(searchTermLower)) ||
      (item.work_type && item.work_type.toLowerCase().includes(searchTermLower)) ||
      (item.display_name && item.display_name.toLowerCase().includes(searchTermLower))||
      (item.user.fullname && item.user.fullname.toLowerCase().includes(searchTermLower))
    );
  });


  const [selectedOption, setSelectedOption] = useState('');
  const handleRadioChange = (event) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
    setSearchTerm(newOption);
  };


  const [address, setAddress] = useState('')
  const urla =`${BASE_URL}/userprofile/${userToken.profile_id}/`
    const fetchProfile = async () => {
      setIsLoading(true);
      try {

      const respose = await fetch(urla, {
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

      setAddress(data.address)
      console.log(data);


      } catch (error) {
          console.log(error);
      } finally {  
      setIsLoading(false);
      }
  };

  useEffect(() => {
      fetchProfile();
  }, []);


  console.log('These are talents', allTalents);
  

  return (
    <div className='2xl:pl-[16rem] xl:pl-[15rem] lg:pl-[15rem] 2xl:pr-[3rem] xl:pr-[3rem] lg:pr-[3rem]  py-28 w-full'>
      <div className='flex items-center px-4'>

      <div className="flex items-center gap-3 lg:w-full">
        <button
          onClick={() => {
            handleFilter('')
            setShowOne(true);
            setShowTwo(false);
            setShowThree(false);
          }}
          className={`${
            showOne ? 'bg-black text-white' : 'bg-neutral-100 text-black'
          } py-2 lg:px-4 px-3 border rounded-full lg:text-sm text-xs`}
        >
          All
        </button>

        <button
          onClick={() => {
            handleFilter('Digital');
            setShowOne(false);
            setShowTwo(true);
            setShowThree(false);
          }}
          className={`${
            showTwo ? 'bg-black text-white' : 'bg-neutral-100 text-black'
          } py-2 lg:px-4 px-3 border rounded-full lg:text-sm text-xs`}
        >
          Tech
        </button>
        
        <button
          onClick={() => {
            handleFilter('Non-Digital');
            setShowOne(false);
            setShowTwo(false);
            setShowThree(true);
          }}
          className={`${
            showThree ? 'bg-black text-white' : 'bg-neutral-100 text-black'
          } py-2 lg:px-4 px-3 border rounded-full lg:text-sm text-xs`}
        >
          Artisans
        </button>
      </div>

        

        <div className='ml-auto flex items-center lg:w-full lg:gap-4 gap-2'>
          <div className='relative 2xl:w-full  xl:w-full  lg:w-full w-full lg:flex hidden ml-auto'>
              <form className='relative w-full'>
                <input type="text" 
                  value={searchTerm}
                  onChange={handleSearchInput}
                  placeholder="Search Talent by Category, Location, Service etc . ." 
                  className="input rounded-full text-sm input-bordered pl-14 w-full flex m-auto " />
                  <p className='absolute top-4 left-7'><LuSearch /></p>
              </form>
          </div>

          <label htmlFor="my-drawer-4" className='cursor-pointer drawer-content lg:flex hidden items-center gap-3 border border-neutral-300 bg-white text-sm py-3 px-5 rounded-full'>
            <p><IoFilter /></p>
            <p>Filter</p>
          </label>

          <label onClick={()=>setShowSide(true)} htmlFor="my-drawer-4" className='drawer-content text-sm flex lg:hidden items-center justify-center p-3 rounded-full bg-white border border-neutral-300'><IoFilter /></label>
        </div>
      </div>

      <div className='relative  w-[95%] lg:hidden flex m-auto mt-5'>
          <>
            <input 
              type="text" 
              value={searchTerm}
              onChange={handleSearchInput}
              placeholder="Search here . . ." 
              className="input rounded-full text-xs input-bordered  w-full flex m-auto " />
            {/* <button onClick={handleButtonClick} className='absolute lg:top-2 top-1.5 right-2 text-sm flex items-center gap-2 bg-black text-white  p-2 px-4 rounded-full '>search</button> */}
          </>
      </div>

      {isLoading === true ? <MyLoader /> :
          <>
            <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 2xl:gap-5 xl:gap-5 lg:gap-4 gap-5 pt-10 lg:px-0 px-5'>
              {filteredItems.length > 0 &&
                <>
                  {filteredItems.filter(talent => talent.location !== null && talent.cover_image !== 'https://creve.store/media/coverimage.png').map((talent) => (
                    <div className='bg-white  rounded-xl cursor-pointer relative border border-neutral-100' key={talent.id}>
                      <Link to={'/' + `user-dashboard-single-creative/${talent.id}/`}>
                        <div className='2xl:h-[20rem] relative xl-h-[15rem] bg-neutral-50 lg:h-[12rem] h-[20rem] overflow-hidden rounded-md'>
                          <img src={talent.cover_image} alt="" className='w-full h-full object-cover'/>

                     
                        </div>
                      </Link>

                      <div className='flex items-center pt-3 p-3'>

                        <div className='flex items-start gap-2'>
                          <div className='2xl:w-8 xl:w-6 lg:w-6 2xl:h-8 xl:h-6 lg:h-6 overflow-hidden border border-neutral-200 w-7 h-7 rounded-full'>
                            <img src={talent.profile_pics} alt="" className='2xl:w-8 xl:w-6 lg:w-6 2xl:h-8 xl:h-6 lg:h-6 w-7 h-7 object-cover'/>
                          </div>

                          <div>
                            <h3 className='2xl:text-sm xl:text-xs lg:text-[10px] text-sm font-semibold flex gap-2'>
                              {talent.user.fullname}
                              <div className=''>
                                {talent.verified === true && 
                                  <button className='flex gap-2 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] bg-white text-green-600 text-lg rounded-full justify-center items-center'><MdVerified className=''/></button>
                                  }
                              </div>
                            </h3>
                            <p className='2xl:text-[10px] xl:text-[10px] lg:text-[10px] text-xs flex items-center gap-2'>{talent.display_name} <GoTools /></p>
                          </div>

                     
                        </div>

                        <Link to={'/' + `user-dashboard-single-creative/${talent.id}/`} className='ml-auto'>
                     
                          <button className=' bg-neutral-200 p-2 rounded-full text-black 2xl:text-md xl:text-sm lg:text-[10px]'><IoArrowForwardOutline /></button>
                        </Link>
                      </div>
                      
                      <div className='flex items-center p-3 '>
                        <p className='text-xs flex items-center gap-2'><FaLocationDot className='text-accent'/>{talent?.location?.slice(0, 35)}. . .</p>
                        <p className='ml-auto text-xs '>{talent.work_type}</p>
                      </div>

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


      {showSide === true ? (
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-white text-base-content min-h-full overflow-y-scroll lg:w-[25rem] w-[20rem] lg:p-10 lg:pt-28 p-5 pt-28">

              <li className='lg:pb-8 pb-3 lg:text-sm text-sm font-semibold'>Filter Creatives with options below</li>

              <ul className='flex flex-col gap-4 lg:pt-0 pt-5'>


              <h2 className='p-2 pl-5 bg-green-50 border border-green-300 rounded-full'>My Location</h2>
                <div className='flex items-center gap-4'>
                  <li>Location </li>
                  <input 
                    type="radio" 
                    value={address}
                    checked={selectedOption === address}
                    onChange={handleRadioChange}
                    className="radio h-[1.2rem] w-[1.2rem] rounded-full border border-neutral-400 ml-auto" />
                </div>
             

                <h2 className='p-2 pl-5 bg-green-50 border border-green-300 rounded-full'>Work Type</h2>
                <div className='flex items-center gap-4'>
                  <li>Hybrid </li>
                  <input 
                    type="radio" 
                    value="Hybrid"
                    checked={selectedOption === 'Hybrid'}
                    onChange={handleRadioChange}
                    className="radio h-[1.2rem] w-[1.2rem] rounded-full border border-neutral-400 ml-auto" />
                </div>

                <div className='flex items-center gap-4'>
                  <li>Onsite </li>
                  <input 
                    type="radio" 
                    value="On-site"
                    checked={selectedOption === 'On-site'}
                    onChange={handleRadioChange}
                    className="radio h-[1.2rem] w-[1.2rem] rounded-full border border-neutral-400 ml-auto" />
                </div>

                <div className='flex items-center gap-4'>
                  <li>Remote </li>
                  <input 
                    type="radio" 
                    value="Remote"
                    checked={selectedOption === 'Remote'}
                    onChange={handleRadioChange}
                    className="radio h-[1.2rem] w-[1.2rem] rounded-full border border-neutral-400 ml-auto" />
                </div>


                <h2 className='p-2 bg-red-50 border border-red-300 rounded-full pl-5'>Popular Non-Digital Services</h2>
                <div className='flex items-center gap-4'>
                  <li>Furniture Makers </li>
                  <input 
                    type="radio" 
                    value="Furniture"
                    checked={selectedOption === 'Furniture'}
                    onChange={handleRadioChange}
                    className="radio h-[1.2rem] w-[1.2rem] rounded-full border border-neutral-400 ml-auto" />
                </div>


                <div className='flex items-center gap-4'>
                  <li>Hair Barbers </li>
                  <input 
                    type="radio" 
                    value="bar"
                    checked={selectedOption === 'bar'}
                    onChange={handleRadioChange}
                    className="radio h-[1.2rem] w-[1.2rem] rounded-full border border-neutral-400 ml-auto" />
                </div>

                <div className='flex items-center gap-4'>
                  <li>Cobblers </li>
                  <input 
                    type="radio" 
                    value="cobblers"
                    checked={selectedOption === 'cobblers'}
                    onChange={handleRadioChange}
                    className="radio h-[1.2rem] w-[1.2rem] rounded-full border border-neutral-400 ml-auto" />
                </div>

                <div className='flex items-center gap-4'>
                  <li>Hair Stylist </li>
                  <input 
                    type="radio" 
                    value="hair"
                    checked={selectedOption === 'hair'}
                    onChange={handleRadioChange}
                    className="radio h-[1.2rem] w-[1.2rem] rounded-full border border-neutral-400 ml-auto" />
                </div>



                <h2 className='p-2 bg-blue-50 border border-blue-300 rounded-full pl-5'>Popular Digital Services</h2>
                <div className='flex items-center gap-4'>
                  <li>Web Developers </li>
                  <input 
                    type="radio" 
                    value="web"
                    checked={selectedOption === 'web'}
                    onChange={handleRadioChange}
                    className="radio h-[1.2rem] w-[1.2rem] rounded-full border border-neutral-400 ml-auto" />
                </div>


                <div className='flex items-center gap-4'>
                  <li>Content Creator </li>
                  <input 
                    type="radio" 
                    value="content"
                    checked={selectedOption === 'content'}
                    onChange={handleRadioChange}
                    className="radio h-[1.2rem] w-[1.2rem] rounded-full border border-neutral-400 ml-auto" />
                </div>

                <div className='flex items-center gap-4'>
                  <li>Mobile Developers </li>
                  <input 
                    type="radio" 
                    value="mobile"
                    checked={selectedOption === 'mobile'}
                    onChange={handleRadioChange}
                    className="radio h-[1.2rem] w-[1.2rem] rounded-full border border-neutral-400 ml-auto" />
                </div>

                <div className='flex items-center gap-4'>
                  <li>Block Chain Developer</li>
                  <input 
                    type="radio" 
                    value="block"
                    checked={selectedOption === 'block'}
                    onChange={handleRadioChange}
                    className="radio h-[1.2rem] w-[1.2rem] rounded-full border border-neutral-400 ml-auto" />
                </div>

                <div className='flex items-center gap-4'>
                  <li>Photographers</li>
                  <input 
                    type="radio" 
                    value="photo"
                    checked={selectedOption === 'photo'}
                    onChange={handleRadioChange}
                    className="radio h-[1.2rem] w-[1.2rem] rounded-full border border-neutral-400 ml-auto" />
                </div>

              </ul>
            </ul>
          </div>
        </div>
      ) : ''}

    </div>
  )
}

