import React, { useEffect, useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'

import { BASE_URL } from '../Auth/BaseUrl'
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import successImg from '../Images/gif1.gif'
import { FiEdit } from "react-icons/fi";
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

const CreativeSettings = () => {

    const [show, setShow] = useState(false)
  
    const handleShow = () => {
      setShow(!show)
    }

    
  return (
    <div className='flex flex-row w-full bg-neutral-100 2xl:h-[100vh] xl:h-full lg:h-full h-[100vh]'>
        <div className=''>
            <CreativeSideBarCom show={show} />
        </div>
        <div className='w-full'>
            <CreativeNavBarCom show={show} handleShow={handleShow}/>
            <CreativeSettingDashboard />
        </div>
    </div>
  )
}

export default CreativeSettings


export const CreativeSettingDashboard = () => {

    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;


    const [isLoading, setIsLoading] = useState(false)

    const [cover_image, setCover_Image] = useState(null)
    const [image, setImage] = useState(null) 
    const [fileName, setFileName] = useState('') 
    const [coverImage, setCoverImage] = useState(null)
     

    const url =`${BASE_URL}/creativeprofile/${userToken.profile_id}/`
    const handleProfileUpdate = async (e) =>{
        setIsLoading(true)
        e.preventDefault() 

        const formData = new FormData()
        formData.append('profile_pics', cover_image)


        try {
            
            const respose = await fetch(url, {
                method: 'PUT',
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

        setCover_Image(data.profile_pics)
        console.log(data);


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
        <div className='2xl:p-20 2xl:pt-28 2xl:pl-[18rem] lg:pl-[18rem] p-5 pt-20  '>

            <h2 className='text-2xl font-bold pb-10'>Settings</h2>

            <div className=''>

                <div onClick={()=> document.querySelector(".input-field").click()} className='2xl:w-fit xl:w-fit lg:w-fit md:w-fit lg:block flex justify-center '>
                    <input  type="file" accept='image/*' className='input-field' hidden
                        onChange={({target: {files}}) =>{
                            files[0] && setFileName(files[0].name)
                            if(files){
                                setImage(URL.createObjectURL(files[0]))
                                setCoverImage(files[0])
                                setCover_Image(files[0])
                            }
                        }}
                    />

                    {image || cover_image ?
                        <div className=' lg:w-[8rem] lg:h-[8rem] h-[8rem] w-[8rem] overflow-hidden rounded-full bg-neutral-50 border border-neutral-300'>
                            {image && (
                                <img src={image} alt='' className='w-full h-full object-cover cursor-pointer'/> 
                            )}

                            <div className='relative lg:w-[8rem] lg:h-[8rem] w-[8rem] h-[8rem]'>

                                {cover_image && (
                                    <img src={cover_image} alt='' className='w-full h-full object-cover cursor-pointer'/> 
                                )}


                                <div className='absolute bg-white rounded-full bottom-5 right-6 w-fit  p-2 cursor-pointer'>
                                    <p className='text-sm p-1'><FiEdit /></p>
                                </div>
                            </div>
                            
                        </div> :

                        <div className='lg:w-[8rem] w-[8rem] lg:h-[8rem] h-[8rem] flex justify-center items-center cursor-pointer border border-neutral-300 rounded-full'>
                            <div className=''>
                                <p className='text-xs'>PICS </p>
                            </div>
                        </div>
                    }

                </div>

                <button 
                    onClick={handleProfileUpdate} 
                    className="btn lg:w-fit md:w-fit w-1/2 min-h-2rem lg:px-10 xl:text-xs lg:text-xs  
                    bg-black hover:bg-neutral-800 text-white lg:block lg:m-0 lg:mt-5 flex  m-auto mt-5">{isLoading === true ? <span class="loader"></span> : 'Update' }
                </button>


                <div className='mt-5 pt-5 2xl:w-full border-t border-neutral-200'>

                    <form action="" className='flex flex-col gap-4 2xl:w-1/2'>
                        
                        <input type="text" 
                            placeholder="Update Name..." 
                            required 
                            // value={question}
                            className="input input-bordered w-full rounded-md text-xs" 
                            // onChange={handleQuestionChange}
                        />

                        <input type="email" 
                            placeholder="Update Email..."   
                            required 
                            // value={question}
                            className="input input-bordered w-full rounded-md text-xs" 
                            // onChange={handleQuestionChange}
                        />

                        <input type="password" 
                            placeholder="Update Password..."   
                            required 
                            // value={question}
                            className="input input-bordered w-full rounded-md text-xs" 
                            // onChange={handleQuestionChange}
                        />
                    </form>
                </div>

                <button 
                    // onClick={handleProfileUpdate} 
                    className="btn lg:w-fit md:w-fit w-1/2 min-h-2rem lg:px-10 xl:text-xs lg:text-xs  
                    bg-black hover:bg-neutral-800 text-white lg:block lg:m-0 lg:mt-5 flex  m-auto mt-5">Update
                </button>
            </div>



            <dialog id="my_modal_1" className="modal">
            <div className="modal-box  p-0 rounded-md flex justify-center items-center h-[25rem]" >
                <button onClick={()=>{document.getElementById('my_modal_1').close()}} 
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white text-black hover:text-white">✕
                </button>


                <div className=''>
                    <div className='flex m-auto justify-center'>
                        <img src={successImg} alt="" />
                    </div>
                    <h2 className='text-center'>Profile Updated</h2>
                    <p className='text-center text-xs'>Your profile has been updated, continue </p>

                    <Link to={'/creative-dashboard-profile'}>
                        <button className="btn btn-active text-xs btn-neutral w-9/12 justify-center m-auto mt-8 flex items-center gap-4">Continue <FaArrowRight /></button>
                    </Link>
                </div>
            </div>
            </dialog>
        </div>
    )
}