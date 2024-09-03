import React, { useEffect, useState } from 'react'
import UserSideBar from './UserSideBar'
import UserNavbar from './UserNavbar'
import { jwtDecode } from 'jwt-decode'
import { BASE_URL } from '../Auth/BaseUrl'
import MyLoader from '../allLoadingState/MyLoader'
import NoData from '../allLoadingState/NoData'

const UserRequestBookings = () => {

    const [show, setShow] = useState(false)

    const handleShow = () => {
      setShow(!show)
    }


  return (
    <div>
        <UserNavbar show={show} handleShow={handleShow}/>
        <div className='flex bg-neutral-100 h-screen'>
            <UserRequestBookingsDashboard />
        </div>
    </div>
  )
}

export default UserRequestBookings




export const UserRequestBookingsDashboard = () => {


    const [allRequest, setRequest] = useState([])
    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
    const [isLoading, setIsLoading] = useState(false)
    const url =`${BASE_URL}/books/`

    const fetchRequest = async() => {
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
    
          console.log(data);
          setRequest(data)
    
          } catch (error) {
              console.log(error);
          } finally {
          setIsLoading(false);
          }
      }
    
      useEffect(() => {
        fetchRequest();
      }, []);

    
  return (
    <div className='2xl:px-[10rem] xl:px-[5rem] lg:px-[5rem] py-28 w-full'>
        <h2 className='text-2xl'>All Request</h2>

        {isLoading === true ? <MyLoader />  : <>
            {allRequest.length > 0 && <>
                <div className='bg-white h-[70vh] lg:p-20 p-5 w-full mt-5 rounded-2xl overflow-y-scroll'>
                    {allRequest.map((request)=>(

                        <div className='flex mb-5 flex-col gap-3  border-y border-neutral-200 py-2'>
                            {request.talent_profile && 
                            <div className='flex gap-2 items-center'>
                                <div className='w-7 h-7 flex justify-center items-center overflow-hidden rounded-full'>
                                    <img src={request.talent_profile.profile_pics} alt="" className='w-8 h-8 object-cover'/>
                                </div>
                                <p className='text-sm'>{request.talent_profile.user.fullname}</p>
                            </div>
                            }
                            <div className='lg:flex items-center gap-3 block '>
                                <h2 className='text-base font-semibold lg:pb-0 pb-2'>{request.title}</h2>
                                <p className='text-xs'>{request.description}</p>
                                {/* <p className='lg:ml-auto text-xs'>July 20</p> */}
                            </div>

                        </div>
                    ))}
                </div>
            </>}

            {allRequest.length <= 0 && <>
                <NoData />
            </>}
        </>}
    </div>
  )
}

