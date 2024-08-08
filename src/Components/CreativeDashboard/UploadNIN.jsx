
import React, { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import noData from '../Images/Nin.png'
import { RiUploadCloudLine } from "react-icons/ri";
import { MdDelete } from 'react-icons/md';



const UploadNIN = () => {

    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;



    const [isDisabled, setIsDisabled] = useState(false)
    const [cover_image, setCover_Image] = useState(null)
    const [image, setImage] = useState(null)



  return (
    <div className='px-5'>
        {image === null ? 
            <div className='flex flex-col justify-center gap-10 pt-[12rem] m-auto'>
                <div className='flex justify-center m-auto items-center h-0 pb-0 '>
                    <img src={noData} alt="" className='w-[8rem]'/>
                </div>

                <label htmlFor="" for="dropzone" className='cursor-pointer text-center'>
                    <input type="file" id='dropzone' disabled={isDisabled} multiple className="hidden m-auto mt-3 file-input w-fit rounded-full text-xs bg-neutral-100" 
                        onChange={({ target: { files } }) => {
                            if (files[0]) {
                                // setFileName(files[0].name)
                                if (files[0].size > 4 * 1024 * 1024) {
                                    alert('File size exceeds 4MB');
                                    return;
                                }
                                setImage(URL.createObjectURL(files[0]))
                                // setCoverImage(files[0])
                                // setCover_Image(files[0])
                            }
                        }}
                    />
                    <p className='text-sm pt-6'>Upload NIN Document</p>
                    <p className='flex bg-black border border-neutral-300 text-sm w-fit p-3 px-8 text-white gap-3 items-center m-auto mt-5 rounded-full'>Upload NIN<RiUploadCloudLine className='text-lg'/></p>
                </label>
            </div>

            : 
            <div className='rounded-md lg:w-[60%] w-full'>
                <div className=' w-full 2xl:h-[30rem] xl:h-[20rem] lg:h-[20rem] md:h-[20rem] h-[15rem] bg-slate-100 border border-neutral-200 overflow-hidden relative rounded-sm '>
                    <img src={image} alt='' className='rounded-sm w-full h-full object-cover' />

                    <button onClick={()=>setImage(null)} className='absolute top-2 right-2 p-2 rounded-full bg-neutral-200 text-red-600  text-base'>
                        <MdDelete />
                    </button>
                </div>

                <button className='bg-black text-white rounded-full py-3 px-10 text-sm mt-5'>Submit</button>
            </div>
        }
    </div>
  )
}

export default UploadNIN
