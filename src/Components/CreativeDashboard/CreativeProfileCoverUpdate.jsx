import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../Auth/BaseUrl'
import {jwtDecode} from 'jwt-decode';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import successImg from '../Images/gif1.gif'
import { FiEdit } from "react-icons/fi";
import MyLoader from '../allLoadingState/MyLoader';

const CreativeProfileCoverUpdate = ({ MdDelete, AiOutlineCloudUpload, setEachState }) => {

    let [authUser, setAuthUser] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;

    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)

    const [cover_image, setCover_Image] = useState(null)
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState('')
    const [coverImage, setCoverImage] = useState(null)

    const url = `${BASE_URL}/creativeprofile/${userToken.profile_id}/`
    const handleProfileUpdate = async (e) => {
        setIsLoading2(true)
        e.preventDefault()

        const formData = new FormData()
        formData.append('cover_image', cover_image)

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${authUser.access}`,
                },
                body: formData
            })

            if (response.status === 200 || response.ok) {
                setIsLoading2(false)
                document.getElementById('my_modal_1').showModal();
            } else {
                const data = await response.json()
                console.log(data);
                setIsLoading2(false)
            }
        } catch (error) {
            console.log('There was an error', error);
            setIsLoading(false)
        }
    }

    const fetchProfile = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authUser.access}`,
                },
            })

            if (!response.ok) {
                setIsLoading(false);
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            setCover_Image(data.cover_image)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);


    return (
        <div className='px-5'>

            {isLoading ? 
                <MyLoader /> :
                <div >
                    <p className="text-lg pb-3">Cover Image</p>

                    <div onClick={() => document.querySelector(".input-field").click()} className='2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-full'>
                        <input type="file" accept='image/*' className='input-field' hidden
                            onChange={({ target: { files } }) => {
                                if (files[0]) {
                                    setFileName(files[0].name)
                                    if (files[0].size > 4 * 1024 * 1024) {
                                        alert('File size exceeds 4MB');
                                        return;
                                    }
                                    setImage(URL.createObjectURL(files[0]))
                                    setCoverImage(files[0])
                                    setCover_Image(files[0])
                                }
                            }}
                        />

                        {image || cover_image ?
                            <div className='2xl:w-full xl:w-full lg:w-full md:w-full 2xl:h-[35rem] xl:h-[25rem] lg:h-[25rem] h-[20rem] overflow-hidden rounded-md bg-neutral-50 border border-neutral-300'>
                                {image && (
                                    <img src={image} alt='' className='w-full h-full object-cover cursor-pointer' />
                                )}

                                <div className='relative 2xl:h-[35rem] xl:h-[25rem] lg:h-[25rem] h-[25rem]'>

                                    {cover_image && (
                                        <img src={cover_image} alt='' className='w-full h-full object-cover cursor-pointer' />
                                    )}

                                    <div className='absolute bg-white rounded-full top-10 right-10 w-fit  p-3 cursor-pointer'>
                                        <p className='text-lg p-1'><FiEdit /></p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='2xl:w-full xl:w-full lg:w-full md:w-full 2xl:h-[25rem] h-[20rem] flex justify-center items-center cursor-pointer border border-neutral-300 rounded-lg'>
                                <div className=''>
                                    <p className='flex justify-center text-6xl'><AiOutlineCloudUpload /></p>
                                    <p className='text-xs'>Upload Cover Image </p>
                                </div>
                            </div>
                        }
                    </div>

                    {/* <div className='relative'>
                        {image && (
                            <p onClick={() => {
                                setFileName("No Selected File Name")
                                setImage(null)
                            }} className=' absolute cursor-pointer 2xl:bottom-[20rem] 2xl:left-10 xl:bottom-[15rem] xl:left-10  lg:bottom-[15rem] lg:left-10 bottom-[10rem] left-5  bg-white border border-neutral-100 w-fit flex items-center justify-center p-3 rounded-full text-accent shadow-md'>
                                <MdDelete className='text-xl' />
                            </p>
                        )}
                    </div> */}

                    <button onClick={handleProfileUpdate} className="py-3 rounded-full 2xl:w-fit xl:w-fit lg:w-fit md:w-fit w-full mt-5 px-20 xl:text-xs lg:text-xs md:text-xs text-sm  bg-black border text-white ">
                        {isLoading2 ? <span className="loader"></span> : 'Submit'}
                    </button>
                </div>
            }

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box  p-0 rounded-md flex justify-center items-center h-[25rem]">
                    {/* <button onClick={() => { document.getElementById('my_modal_1').close() }}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white text-black hover:text-white">✕
                    </button> */}

                    <div className=''>
                        <div className='flex m-auto justify-center'>
                            <img src={successImg} alt="" />
                        </div>
                        <h2 className='text-center'>Profile Updated</h2>
                        <p className='text-center text-xs'>Your profile has been updated, continue </p>

                        {/* <Link to={'/creative-dashboard-profile'}>
                            <button className="btn btn-active text-xs btn-neutral w-9/12 justify-center m-auto mt-8 flex items-center gap-4">Continue <FaArrowRight /></button>
                        </Link> */}


                        <button onClick={()=>{setEachState(4); document.getElementById('my_modal_1').close()}} className="btn btn-active text-xs btn-neutral w-9/12 justify-center m-auto mt-8 flex items-center gap-4">Continue <FaArrowRight /></button>

                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default CreativeProfileCoverUpdate
