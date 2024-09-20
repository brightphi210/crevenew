import React, { useEffect, useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'
import { Link } from 'react-router-dom'
import { FaRegCopy } from "react-icons/fa6";
import { BASE_URL } from '../Auth/BaseUrl'
import { jwtDecode } from 'jwt-decode'
import { TbAlertTriangle } from 'react-icons/tb'
import MyLoader from '../allLoadingState/MyLoader'
import NoData from '../allLoadingState/NoData'


const CreativeBookingsDashboard = () => {

  const [show, setShow] = useState(false)
  
  const handleShow = () => {
    setShow(!show)
  }



  return (
  <div className='flex flex-row w-full'>
    <div className=''>
      <CreativeSideBarCom show={show} />
    </div>
    <div className='w-full'>
      <CreativeNavBarCom show={show} handleShow={handleShow}/>
      <CreativeBookings />
    </div>
  </div>
  )
}

export default CreativeBookingsDashboard




export const CreativeBookings = () => {

  const [profileData, setProfileData] = useState([])
  let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
  const [isLoading, setIsLoading] = useState(false)
  const url =`${BASE_URL}/creativeprofile/${userToken.profile_id}/`


  const fetchProfile = async () => {
      setIsLoading(true);
      try {
          const respose = await fetch(url, {
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
          setIsLoading(false);
          // console.log(data);
          setProfileData(data.books)
        }
        
        catch (error) {
            console.log(error);
        } 
        
        finally {
          setIsLoading(false);
        }
  };

  useEffect(() => {
      fetchProfile();
  }, []);


  const [selectedRequest, setSelectedRequest] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');

  const handleClick = (eachData) => {
    setSelectedRequest(eachData);
    setCopySuccess('')
  };

  return (
    <div className='2xl:p-20 2xl:pt-28 2xl:pl-[18rem] lg:pl-[18rem] p-5 pt-20'>
      <div>
        <div className='flex lg:flex-row flex-col gap-4 items-center'>
          <div className='w-full'>
            <h2 className='text-2xl font-bold'>Approved Request</h2>
            <p className='text-sm pt-2'>List of all Approved Request</p>
          </div>
        </div>

        <div className='w-full lg:mt-10 mt-5 pt-5'>

          {isLoading === false ? (
            <>
              {profileData && <>
                <div className='2xl:w-full grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 lg:gap-5 gap-4 w-full rounded-lg'>
                    {profileData.filter((eachData) => eachData.status === true).length > 0 ? 
                    (
                      profileData.filter((eachData) => eachData.status === true).map((eachData)=>

                      <label onClick={() => handleClick(eachData)} className='cursor-pointer' drawer-conten  htmlFor="my-drawer-4">

                        <div className='bg-white border border-neutral-200 p-5 rounded-lg '>
                          <div className=''>
                            <div className='flex gap-2 items-center'>
                              <div className='w-8 h-8 justify-center items-center flex rounded-full overflow-hidden'>
                                <img src={eachData.client_profile.profile_pics} alt="" className='w-8 h-8 object-cover'/>
                              </div>
                              <div>
                                <h2 className='2xl:text-sm xl:text-sm lg:text-sm text-sm'>{eachData.client_profile.user.fullname}</h2>
                                <p className='text-[10px]'>{eachData.datetime}</p>
                              </div>
                            </div>

                            <div className='p-3 bg-neutral-100 my-5 rounded-md'>
                              <h2 className='text-sm font-semibold pb-2'>{eachData.title}</h2>
                              <p className='text-xs'>{eachData.description.slice(0, 30)}. . .</p>
                            </div>

                            <div>
                              <label onClick={() => handleClick(eachData)} className='mycolor2 text-white p-2 px-5 text-sm text-center m-auto rounded-full w-full block cursor-pointer' drawer-conten  htmlFor="my-drawer-4">View Request</label>
                            </div>

                          </div>
                        </div>
                      </label>
                    )) :

                    <div className='p-5 col-span-3'>
                      <h2 className='text-sm text-center text-neutral-300'>No Approved Request</h2>
                    </div>
                  }
                </div>
              </>}

              {profileData.length <= 0 && 
                <>
                  <NoData />
                </>
              }
            </>
          ) : (
            <MyLoader />
          )}
        </div>
      </div>


      <div className="drawer drawer-end">
        <input 
          id="my-drawer-4" 
          type="checkbox" 
          className="drawer-toggle" 
        />
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-4" 
            aria-label="close sidebar" 
            className="drawer-overlay z-50">
          </label>
          <ul className="menu z-50 bg-base-200 text-base-content min-h-full 2xl:w-[25%] xl:w-[40%] lg:w-[40%] md:w-[80%] w-[90%] lg:p-10 p-5 2xl:pt-20 xl:pt-20 lg:pt-16 pt-16">
            <div className='flex justify-center'>
              {selectedRequest  && 
              <div className='text-center'>
                  <div className='rounded-full flex justify-center m-auto bg-neutral-200 w-14 h-14 overflow-hidden'>
                    <img src={selectedRequest.client_profile.profile_pics} className='w-full h-full object-cover' alt="" />
                  </div>

                  <div className=''>
                    <h2 className='text-sm font-bold pt-2'>{selectedRequest.client_profile.user.fullname}</h2>
                    <p className='text-xs font-bold text-neutral-500 py-2'>{selectedRequest.datetime}</p>
                  </div>

                  <div className='bg-white p-5 rounded-lg mt-5'>
                    <p className='text-lg pt-3 font-semibold'>{selectedRequest.title}</p>
                    <p className='lg:text-sm text-sm  text-center lg:leading-[30px] leading-[28px] font-light'>{selectedRequest.description}</p>
                  </div>

                  <p className='absolute 2xl:bottom-10 xl:bottom-10 lg:bottom-5 bottom-20 m-auto right-0 left-0 flex justify-center w-fit text-xs gap-2'>Need any help ? 
                    
                    <Link to={'https://wa.link/tdyb88'}>
                      <span className='text-blue-500 underline cursor-pointer'>Contact us</span>
                    </Link>
                  </p>
              </div>
              }
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

