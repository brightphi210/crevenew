import React, { useEffect, useState } from 'react'
import UserSideBar from './UserSideBar'
import UserNavbar from './UserNavbar'
import { jwtDecode } from 'jwt-decode'
import { BASE_URL } from '../Auth/BaseUrl'
import MyLoader from '../allLoadingState/MyLoader'
import NoData from '../allLoadingState/NoData'
import Footer from '../Footer'
import { format } from 'date-fns';

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
        <Footer />
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

          const formattedBookings = data.map((booking) => {
            return {
              ...booking,
              formattedDate: format(new Date(booking.datetime), 'yyyy-MM-dd'), // Format as YYYY-MM-DD
              formattedTime: format(new Date(booking.datetime), 'HH:mm:ss'),   // Format time as HH:MM:SS
            };
          });
    
          console.log(data);
          setRequest(formattedBookings)
    
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
    <div className='2xl:px-[10rem] xl:px-[5rem] lg:px-[5rem] py-28 w-full px-5'>
        <h2 className='text-2xl'>All Request</h2>

        {isLoading === true ? <MyLoader />  : <>
            {allRequest.length > 0 && <>
                <div className='grid lg:grid-cols-4 grid-cols-1 gap-3 w-full mt-5 mb-10'>
                    {allRequest.map((request)=>(
                        
                        <div className='col-span-1 mb-5 flex-col gap-3 bg-white rounded-lg border border-neutral-300 p-10'>
                            {request.talent_profile && 
                            <div className='flex gap-2 items-center'>
                                <div className='w-14 h-14 flex justify-center items-center overflow-hidden rounded-full border border-neutral-200'>
                                    <img src={request.talent_profile.profile_pics} alt="" className='w-14 h-14 object-cover'/>
                                </div>
                                <div>
                                    <p className='text-lg font-semibold'>{request.talent_profile.user.fullname}</p>
                                    <p className='text-xs'>{request.formattedDate} {request.formattedTime}</p>
                                </div>
                            </div>
                            }

                            <div className='pt-5'>
                                <h2 className='text-base font-semibold lg:pb-0 pb-2'>{request.title}</h2>
                                <p className='text-xs'>{request.description}</p>
                            </div>

                            <div className='flex items-center gap-3 my-5'>
                                <button className='bg-neutral-200 text-black rounded-full py-3 w-full text-xs'>Cancle Job</button>
                                <button className='bg-green-950 text-white rounded-full py-3 w-full text-xs'>Call Talent</button>
                            </div>
                            <p className='text-xs text-green-600 font-semibold'>Request Pending - Waiting for talent to respond</p>
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

