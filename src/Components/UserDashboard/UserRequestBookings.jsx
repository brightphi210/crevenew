import React, { useEffect, useState } from 'react'
import UserNavbar from './UserNavbar'
import { jwtDecode } from 'jwt-decode'
import { BASE_URL } from '../Auth/BaseUrl'
import MyLoader from '../allLoadingState/MyLoader'
import NoData from '../allLoadingState/NoData'
import Footer from '../Footer'
import { format } from 'date-fns';
import { GoArrowRight } from "react-icons/go";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { shop100Pay } from "@100pay-hq/checkout";
import { Link } from 'react-router-dom'

const UserRequestBookings = () => {

    const [show, setShow] = useState(false)

    const handleShow = () => {
      setShow(!show)
    }


  return (
    <div>
        <UserNavbar show={show} handleShow={handleShow}/>
        <UserRequestBookingsDashboard />
        <Footer />
    </div>
  )
}

export default UserRequestBookings


export const UserRequestBookingsDashboard = () => {
    const [allRequest, setRequest] = useState([])
    const [selectedBook, setSelectedBook] = useState({})
    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
    const [isLoading, setIsLoading] = useState(false)
    const url =`${BASE_URL}/books/`


    // console.log('User Details', userToken);  
    
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [phone, setPhone] = useState('')
    
    const isButtonDisabled = !phone || !description || !amount;

    const chargeData = {
      ref_id: uuidv4(), // Unique transaction reference ID
      api_key: "LIVE;PK;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY2ZTQxNTM5YTcwNDRmMDA0OWUyZTQ3MSIsInVzZXJJZCI6IjY2ZTQxNTM5YTcwNDRmMDA0OWUyZTQ2ZSIsImlhdCI6MTcyNjIyMzY3M30.xFq6YscIVp3vuobMDmChduTl5rSnCjU7kgwfQDtPgzU", // Replace with your 100Pay API key
      billing: {
        amount: amount, // Amount to be charged
        currency: 'NGN', // Currency in which the payment will be made
        description: description, // Description of the payment
        country: 'NG', // Country of the customer
        pricing_type: "fixed", // Pricing type (fixed or variable)
      },
      customer: {
        user_id: userToken.user_id, // Unique ID of the customer
        name: userToken.name, // Name of the customer
        email: userToken.email, // Email address of the customer
        phone: phone, // Phone number of the customer
      },
      metadata: {
        is_approved: "yes",
        order_id: "OR2", // Optional order ID
        charge_ref: "REF", // Optional charge reference
      },
      call_back_url: "http://localhost:8000/verifyorder/", // URL to which the user will be redirected after payment
      onClose: () => {
        console.log("User closed the payment modal.");
      },
      callback: (reference) => {
        console.log(`Transaction successful with reference: ${reference}`);
      },
      onError: (error) => {
        console.error("An error occurred:", error);
      },
      onPayment(reference) {
        console.log("Payment completed with reference:", reference);
        
      },
    };
    
    const displayOptions = {
      maxWidth: "500px", // Optional: specify the max width of the payment modal
    };
    
    const payWith100Pay = async () => {
      shop100Pay.setup(
        chargeData,
        displayOptions
      );
    };

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
    

      console.log('All Request', allRequest);
      
  return (
    <div className='2xl:px-[10rem] xl:px-[5rem] lg:px-[5rem] py-28 w-full px-5'>
        <h2 className='text-2xl'>All Request</h2>

        {isLoading === true ? <MyLoader />  : <>
            {allRequest.length > 0 && <>
                <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 w-full mt-5 mb-10'>
                    {allRequest.map((request)=>(
                        
                        <div className='col-span-1 mb-5 flex-col gap-5 bg-white border border-neutral-200 rounded-2xl'>
                            {request.talent_profile && 
                            <div className='flex gap-5 items-center border-b border-b-neutral-200 p-5 py-3'>
                                <div className='w-12 h-12 flex justify-center items-center overflow-hidden rounded-full border border-neutral-200'>
                                    <img src={request.talent_profile.profile_pics} alt="" className='w-12 h-12 object-cover'/>
                                </div>
                                <div className=''>
                                    <p className='text-sm font-semibold text-neutral-700'>{request.talent_profile.user.fullname}</p>
                                    <p className='text-xs'>{request.formattedDate} {request.formattedTime}</p>
                                </div>
                                <p className='ml-auto'><span className="loader5"></span> </p>
                            </div>
                            }

                            <div className='p-5'>
                                <div className='my-5 bg-neutral-100 p-5 rounded-lg'>
                                    <h2 className='text-base flex items-center gap-3 text-neutral-600 font-semibold lg:pb-2 pb-2'><MdKeyboardDoubleArrowRight />{request.title}</h2>
                                    <p className='text-xs text-neutral-600'>{request.description}</p>
                                </div>

                                {/* onClick={payWith100Pay} */}
                                <div className='flex flex-col items-center gap-3 my-5'>
                                    <Link to={`tel:${request.phone_number}`} className='w-full'>
                                        <button className='border border-neutral-300 py-2 rounded-full text-xs w-full'>Call Talent</button>
                                    </Link>

                                    <button  onClick={()=>{document.getElementById('my_modal_3').showModal(); setSelectedBook(request)}} 
                                        className='text-xs bg-black text-white py-2 rounded-full m-auto justify-center font-semibold w-full flex items-center gap-3'>Proceed to payment <GoArrowRight />
                                    </button>
                                </div>

                                <p className=' bg-orange-50 text-xs italic rounded-full gap-3 py-1 px-2 text-orange-500 font-medium flex items-center m-auto justify-center'>
                                    Request Pending - Waiting for talent to respond
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </>}

            {allRequest.length <= 0 && <>
                <NoData />
            </>}
        </>}


        <dialog id="my_modal_3" className="modal">
            <div className="modal-box lg:max-w-[30%] w-[95%]">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                {selectedBook.talent_profile &&
                    <div className='flex gap-5 items-center border-b border-b-neutral-200 p-5 py-3'>
                        <div className='w-12 h-12 flex justify-center items-center overflow-hidden rounded-full border border-neutral-200'>
                            <img src={selectedBook.talent_profile.profile_pics} alt="" className='w-12 h-12 object-cover'/>
                        </div>
                        <div className=''>
                            <p className='text-sm font-semibold text-neutral-700'>{selectedBook.talent_profile.user.fullname}</p>
                            <p className='text-xs'>{selectedBook.formattedDate} {selectedBook.formattedTime}</p>
                        </div>

                        <p className='ml-auto'><span className="loader5"></span> </p>
                    </div>
                }

                <div className='my-5 bg-neutral-100 p-5 rounded-lg'>
                    <h2 className='text-base flex items-center gap-3 text-neutral-600 font-semibold lg:pb-2 pb-2'><MdKeyboardDoubleArrowRight />{selectedBook.title}</h2>
                    <p className='text-xs text-neutral-600'>{selectedBook.description}</p>
                </div>

                <div className='border-t border-t-neutral-200 pt-3'>
                    <h2 className='text-sm font-semibold pb-5'>Proceed Payment</h2>

                    <div>
                        <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="number" placeholder="Phone: e.g 09062119957 " className="input input-bordered text-xs w-full mb-3" />
                        <input value={amount} onChange={(e)=>{setAmount(e.target.value)}} type="number" placeholder="Amount: e.g 20000 " className="input input-bordered text-xs w-full mb-3" />

                        <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} className="textarea text-xs textarea-bordered w-full max-h-[5rem] min-h-[5rem]" placeholder="Description e.g Payment for cleaning service"></textarea>


                        <p className='pt-5 pb-3 text-xs text-neutral-500 text-center'>Make payment with the options below 👇👇</p>
                        <div className='flex flex-col items-center gap-3'>
                            <button disabled={isButtonDisabled} onClick={()=>{payWith100Pay(); document.getElementById('my_modal_3').close();}} className={`text-xs rounded-full py-2.5 w-full bg-green-950 text-white ${isButtonDisabled && 'cursor-not-allowed text-neutral-300 bg-green-900'}`}>Pay via Crypto</button>
                            <button className="text-xs rounded-full py-2.5 w-full bg-white border border-neutral-300 text-black">Pay via Escrow</button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    </div>
  )
}

