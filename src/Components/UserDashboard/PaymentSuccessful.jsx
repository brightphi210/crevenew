import React from 'react'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';

const PaymentSuccessful = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-neutral-100 px-5'>
        <div className='text-center bg-white lg:w-[30%] p-10 w-full rounded-lg'>
            <p className='flex m-auto justify-center text-4xl bg-neutral-100 text-green-700 w-fit rounded-full items-center p-3 mb-5'><IoMdCheckmarkCircleOutline /></p>
            <h2 className='text-2xl font-semibold'>Payment Successful</h2>
            <p className='py-4'>Your payment has been completed</p>

            <Link to={'/' + 'user-dashboard-home'}>
                <button className='text-white bg-black py-3 w-full text-sm rounded-md'>Finish</button>
            </Link>
        </div>
    </div>
  )
}

export default PaymentSuccessful
