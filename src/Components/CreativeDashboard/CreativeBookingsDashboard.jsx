import React, { useEffect, useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'
import { MdModeEditOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { FaRegCopy } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import { BsWhatsapp } from "react-icons/bs";

import data from '../Mock/data.json'
import { BASE_URL } from '../Auth/BaseUrl'
import { jwtDecode } from 'jwt-decode'

import noData from '../Images/nodata2.png'
import { TbAlertTriangle } from 'react-icons/tb'
import MyLoader from '../allLoadingState/MyLoader'
import NoData from '../allLoadingState/NoData'


const CreativeBookingsDashboard = () => {

  const [show, setShow] = useState(false)
  
  const handleShow = () => {
    setShow(!show)
  }



  return (
  <div className='flex flex-row w-full bg-neutral-100 2xl:h-[100vh] xl:h-full lg:h-full'>
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




  const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(
        () => setCopySuccess('Copied!'),
        (err) => setCopySuccess('Failed to copy!')
      );
  };



  return (
    <div className='2xl:p-20 2xl:pt-28 2xl:pl-[18rem] lg:pl-[18rem] p-5 pt-20'>
      <div>
        <div className='flex lg:flex-row flex-col gap-4 items-center'>
          <div className='w-full'>
            <h2 className='text-2xl font-bold'>Request</h2>
            <p className='text-xs pt-2'>List of all Request from clients</p>
          </div>

          <div className='relative lg:w-1/2 w-full ml-auto'>
            <input type="text" placeholder="Search Bookings" className="input px-5 text-xs input-bordered w-full rounded-full" />
            <button className='absolute right-2 top-1 color text-white p-3 rounded-full '><LuSearch /></button>
          </div>
        </div>

        <div className='w-full lg:mt-10 mt-5 pt-5 gap-10 overflow-y-scroll h-[70vh]'>

          {isLoading === false ? (
            <>
              <div className='2xl:w-full grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 lg:gap-10 gap-4 w-full rounded-lg'>
                {profileData && <>
                  {profileData.map((eachData) =>(

                    <label onClick={() => handleClick(eachData)} className='bg-white p-5 rounded-md cursor-pointer' drawer-conten  htmlFor="my-drawer-4">
                      <div className='flex gap-3 items-center'>
                        <div className='rounded-full w-10 h-10 flex items-center justify-center bg-neutral-200 overflow-hidden'>
                          <img src={eachData.client_profile.profile_pics} className='w-full h-full object-cover' alt="" />
                          {/* <p className='font-bold '>{eachData.client_profile.user.fullname.slice(0,2).toUpperCase()}</p> */}
                        </div>

                        <div>
                          <h2 className='text-sm'>{eachData.client_profile.user.fullname}</h2>
                          <p className='text-xs'>{eachData.phone}</p>
                        </div>

                        <div className="drawer-content ml-auto">
                          <label htmlFor="my-drawer-4" className="drawer-button hover:bg-accent btn  btn-primary min-h-[2rem] max-h-[2rem] mycolor2 border-none text-[10px] px-5  font-medium rounded-md text-white">View</label>
                        </div>
                      </div>

                      <p className='text-xs pt-3'>{eachData.title.slice(0, 20)} . . .</p>
                    </label>
                  ))}
                </>}
              </div>

              {profileData.length <= 0 && <>
                <NoData />
              </>}
            </>
          ) : (
            <MyLoader />
          )}
        </div>
      </div>


      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full 2xl:w-[25%] xl:w-[50%] lg:w-[50%] md:w-[80%] w-[90%] p-6 pt-32">
            <div className='flex justify-center'>

              {selectedRequest && 
              <div className='text-center'>
                  <div className='rounded-full flex justify-center bg-neutral-200 items-center m-auto w-20 h-20 overflow-hidden'>
                    <img src={selectedRequest.client_profile.profile_pics} className='w-full h-full object-cover' alt="" />
                    {/* <p className='font-bold text-3xl'>{selectedRequest.client_profile.user.fullname.slice(0,2).toUpperCase()}</p> */}
                  </div>

                  <div>
                    <h2 className='text-sm font-bold pt-5'>{selectedRequest.client_profile.user.fullname}</h2>
                    <p className='text-xl font-bold text-neutral-500 py-3'>{selectedRequest.phone}</p>
                    
                    <p className='text-xs pt-3'>{selectedRequest.title}</p>
                    <p className='lg:text-sm text-xs text-center lg:leading-[30px] leading-[28px] font-light'>{selectedRequest.description}</p>
                  </div>

                  <div className='mt-5 flex flex-col justify-center lg:gap-5 gap-3 lg:px-10 px-5 w-full'>
                    <button onClick={()=>copyToClipboard(selectedRequest.phone)} className="justify-center m-auto rounded-full lg:w-full w-full btn-neutral text-sm  text-black bg-white border border-neutral-200 min-h-[2.6rem] max-h-[2.6rem] flex items-center gap-2">
                      {copySuccess ? copySuccess : <><FaRegCopy />Copy Contact</> }
                    </button>

                    <Link to={`tel:${selectedRequest.phone}`} className='w-full'>
                          <p className='text-white bg-black rounded-full py-2.5 text-sm'>Call Client</p>
                    </Link>
                  </div>

                  <p className='text-green-600 bg-green-50 flex items-center mt-5 p-3 rounded-lg gap-3 border border-green-600'><TbAlertTriangle />Copy clients number to call </p>
                  <p className='absolute bottom-20 m-auto right-0 left-0 flex justify-center w-fit text-xs gap-2'>Need any help ? 
                    
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




      {/* {showBoookingsDesc === false ? 

<div className='bg-neutral-100 2xl:w-1/4 w-full p-5 2xl:pt-20 rounded-lg'>
      <p className='2xl:text-[8rem] text-[5rem] flex m-auto justify-center'><TbClick /></p>
      <h2 className='text-center pt-5'>Click to see details</h2>
  </div>:

<div className='bg-neutral-100 lg:w-1/4 w-full p-5 lg:pt-20 rounded-lg'>
    <div className='flex m-auto w-32'>
      <img src={prof} alt="" />
    </div>

    <div className='text-center pt-5'>
      <h2 className='font-semibold'>John Doe</h2>
      <p className='text-xs py-2 font-semibold'>johndoe@gmail.com</p>


      <p className='text-xs w-10/12 flex m-auto'>Lorem, ipsum dolor  neque explicabo eum iusto deleniti. Voluptatum, mollitia.</p>
    </div>

    <button className='flex m-auto w-9/12 justify-center bg-black mt-5 text-xs py-3 px-5 rounded-md text-white'>Contact Client</button>
</div>
} */}
    </div>
  )
}

