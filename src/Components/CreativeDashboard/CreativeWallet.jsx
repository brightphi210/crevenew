import React, {useState} from 'react'
import CreativeNavBarCom from './CreativeNavBarCom';
import CreativeSideBarCom from './CreativeSideBarCom';
import { ArrowRight } from 'lucide-react';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { PiEmptyBold } from "react-icons/pi";
import { HiOutlineCash } from "react-icons/hi";
import { GoPackageDependents } from "react-icons/go";
import { FaRegCircleCheck } from 'react-icons/fa6';



const CreativeWallet = () => {

    const [show, setShow] = useState(false)

    const handleShow = () => {
      setShow(!show)
    }

  return (
    <div className='flex flex-row w-full bg-neutral-100 h-full'>

        <div className=''>
            <CreativeSideBarCom show={show} />
        </div>

        <div className='w-full'>
            <CreativeNavBarCom show={show} handleShow={handleShow}/>
            <CreativeWalletHome />
        </div>
    </div>
  )
}

export default CreativeWallet


export const CreativeWalletHome = () =>{
    const amount = 100000



    return(
        <div className='2xl:p-20 2xl:pt-28 2xl:pl-[18rem] lg:pl-[18rem] p-5 pt-20'>

            <div role="alert" className="alert alert-warning text-green-800 py-2 rounded-lg flex items-center bg-green-50 border border-green-600 mb-5 lg:text-sm text-xs">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>3% of each payment is alocated to creve</span>
            </div>


            <div className='bg-black w-full lg:p-10 p-5 text-white flex lg:flex-row flex-col gap-3 rounded-lg lg:items-center'>
                <div>
                    <p className='lg:text-sm text-xs'>Hi Dikamsi, here is your balance:</p>
                    <h2 className='lg:text-3xl text-xl font-bold pt-3'>&#8358; {amount.toLocaleString()}</h2>
                </div>

                <div className='lg:ml-auto'>
                    <button onClick={()=>document.getElementById('my_modal_3').showModal()} className='flex items-center py-2 px-5 text-xs gap-3 bg-gradient-to-r from-cyan-600 to-teal-400 text-white rounded-full'>Withdraw <ArrowRight /></button>
                </div>
            </div>

            <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-2 lg:gap-5 gap-3 mt-5'>
                <div className='bg-white rounded-lg lg:p-10 p-3'>
                    <p className='bg-gray-600 text-white flex rounded-full w-fit p-3'><HiOutlineCash  /></p>
                    <h2 className='lg:text-sm text-[10px] py-2'>All-Time Earning</h2>
                    <h2 className='lg:text-2xl text-sm font-semibold'>&#8358; 20, 000</h2>
                </div>

                <div className='bg-white rounded-lg lg:p-10 p-3'>
                    <p className='bg-blue-600 text-white flex rounded-full w-fit p-3'><BsBoxArrowInUpRight  /></p>
                    <h2 className='lg:text-sm text-[10px] py-2'>Available for Withdrawal</h2>
                    <h2 className='lg:text-2xl text-sm font-semibold'>&#8358; 20, 000</h2>
                </div>

                <div className='bg-white rounded-lg lg:p-10 p-3'>
                    <p className='bg-orange-600 text-white flex rounded-full w-fit p-3'><GoPackageDependents  /></p>
                    <h2 className='lg:text-sm text-[10px] py-2'>Pending Withdrawal</h2>
                    <h2 className='lg:text-2xl text-sm font-semibold'>&#8358; 20, 000</h2>
                </div>

                <div className='bg-white rounded-lg lg:p-10 p-3'>
                    <p className='bg-green-600 text-white flex rounded-full w-fit p-3'><FaRegCircleCheck  /></p>
                    <h2 className='lg:text-sm text-[10px] py-2'>Approved Withdrawal</h2>
                    <h2 className='lg:text-2xl text-sm font-semibold'>&#8358; 20, 000</h2>
                </div>
            </div>


            <div className='text-center text-lg bg-white p-10 my-10 2xl:h-[20rem] xl:h-[10rem] lg:h-[6rem] h-fit flex justify-center items-center'>
                <div className='flex flex-col justify-center gap-1'>
                    <p className='text-4xl flex m-auto justify-center text-neutral-400'><PiEmptyBold  /></p>
                    <h2 className='pt-2 text-sm'>Empty Here!!</h2>
                    <h2 className='text-xs text-neutral-500'>No Transaction History</h2>
                </div>
            </div>



            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    
                    <form action="">
                        <h2>Place a Withdrawal below</h2>
                    </form>
                </div>
            </dialog>
        </div>
    )
}