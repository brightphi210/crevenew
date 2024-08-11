
import React, { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import noData from '../Images/Nin.png'
import { RiUploadCloudLine } from "react-icons/ri";
import { MdDelete } from 'react-icons/md';
import { BASE_URL } from '../Auth/BaseUrl';
import { FaArrowRight } from 'react-icons/fa';
import successImg from '../Images/gif1.gif'
import MyLoader from '../allLoadingState/MyLoader';
import { Link } from 'react-router-dom';



const UploadNIN = ({setEachState}) => {

    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
    const [isDisabled, setIsDisabled] = useState(false)
    const [image, setImage] = useState(null)
    const [ninDocs, setNINDocs] = useState(null)
    const [fetchedNiN, setFetchedNiN] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)


    const url = `${BASE_URL}/nins/`
    const handleNINPost = async (e) =>{
        setIsLoading(true)
        e.preventDefault() 

        const formData = new FormData()
        formData.append('image', ninDocs)

        try {
            
            const respose = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${authUser.access}`,
                },
                body: formData
            })
            
            if(respose.status === 200 || respose.ok){
                setIsLoading(false)
                document.getElementById('my_modal_1').showModal();
            }   

            else{
                const data = await respose.json()
                console.log(data);
                setIsLoading(false)
            }
        } catch (error) {
            console.log('There was an error', error);
            setIsLoading(false)
        }
    }


    const fetchNIN = async () => {
        setIsLoading(true);
        setIsLoading2(true);
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authUser.access}`,
                },
            })

            if (!response.ok) {
                setIsLoading(false);
                setIsLoading2(false);
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            setFetchedNiN(data)
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
                setIsLoading(false);
                setIsLoading2(false);
        }
    };

    useEffect(() => {
        fetchNIN();
    }, []);


  return (
    <div className='px-5'>
        <h2 className='pb-5 text-lg'>NIN Document</h2>

        {isLoading2 ? 
            <MyLoader /> :

            <>
                {fetchedNiN?.length === 0 ? 
                    <>
                        {image === null ? 
                            <div className='flex flex-col justify-center gap-10 pt-[12rem] m-auto'>
                                <div className='flex justify-center m-auto items-center h-0 pb-0 '>
                                    <img src={noData} alt="" className='w-[8rem]'/>
                                </div>

                                <label htmlFor="" for="dropzone" className='cursor-pointer text-center'>
                                    <input type="file" id='dropzone' disabled={isDisabled} multiple className="hidden m-auto mt-3 file-input w-fit rounded-full text-xs bg-neutral-100" 
                                        onChange={({ target: { files } }) => {
                                            if (files[0]) {
                                                if (files[0].size > 4 * 1024 * 1024) {
                                                    alert('File size exceeds 4MB');
                                                    return;
                                                }
                                                setImage(URL.createObjectURL(files[0]))
                                                setNINDocs(files[0])
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

                                <button onClick={handleNINPost} className='bg-black text-white rounded-full py-3 px-10 lg:w-fit w-full text-sm mt-5'>{isLoading === true ? <span class="loader"></span> : 'Submit' }</button>
                            </div>
                        }
                    </> :

                    <>
                        {fetchedNiN && fetchedNiN.map((image)=>(
                            <div className='rounded-md lg:w-[60%] w-full'>
                                <div className=' w-full 2xl:h-[30rem] xl:h-[20rem] lg:h-[20rem] md:h-[20rem] h-[15rem] bg-slate-100 border border-neutral-200 overflow-hidden relative rounded-sm '>
                                    <img src={image?.image} alt='' className='rounded-lg w-full h-full object-cover' />
                                </div>
                            </div>
                        ))}
                    </>
                }
            </>
        }

        <dialog id="my_modal_1" className="modal">
            <div className="modal-box  p-0 rounded-md flex justify-center items-center h-[25rem]" >
                <button onClick={()=>{document.getElementById('my_modal_1').close()}} 
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white text-black hover:text-white">✕
                </button>


                <div className=''>
                    <div className='flex m-auto justify-center'>
                        <img src={successImg} alt="" />
                    </div>
                    <h2 className='text-center'>NIN Document Uploaded Succesfully</h2>
                    <p className='text-center text-xs'>Verification of NIN in Progress, continue </p>

                    <Link to={'/creative-dashboard-profile'}>
                        <button className="btn btn-active text-xs btn-neutral w-9/12 justify-center m-auto mt-8 flex items-center gap-4">Account <FaArrowRight /></button>
                    </Link>
                </div>
            </div>
        </dialog>
    </div>
  )
}

export default UploadNIN
