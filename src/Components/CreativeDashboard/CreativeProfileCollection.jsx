import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { BASE_URL } from '../Auth/BaseUrl';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import successImg from '../Images/gif1.gif'
import { MdAdd, MdDelete } from 'react-icons/md';
import { LuAlertTriangle } from 'react-icons/lu';
import noData from '../Images/nodata2.png'
import { RiUploadCloudLine } from "react-icons/ri";
import { MdArrowForward } from "react-icons/md";
import MyLoader from '../allLoadingState/MyLoader';


const CreativeProfileCollection = ({IoCloseSharp}) => {

    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;



    const [previewUrls, setPreviewUrls] = useState([]);
    const [isLoading2, setIsLoading2] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    
    const [checkdata, setCheckdata] = useState([]);
    const [images_list, setImage_list] = useState([]) 
    const [images, setImages] = useState([]) 



    const handlePostImage = (event) => {
        const files = Array.from(event.target.files);
        const maxFileSize = 4 * 1024 * 1024; // 4MB in bytes
        let validFiles = [];
    
        for (let file of files) {
            if (file.size > maxFileSize) {
                alert(`${file.name} is larger than 4MB and cannot be uploaded.`);
            } else {
                validFiles.push(file);
            }
        }
    
        if (images.length + validFiles.length > 6) {
            setIsDisabled(true);
            alert('Collections Exceeds 6 images')
            return;
        }
    
        setImages((prevImages) => [...prevImages, ...validFiles]);  
        const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
        setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    };


    const handleDeleteImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    };


    const url =`${BASE_URL}/gallery/`

    const url2 =`${BASE_URL}/gallery/`

    const handleProfileUpdate = async (e) =>{
        setIsLoading2(true)
        e.preventDefault() 

        const formData = new FormData()
        images.forEach((image, index) => {
            formData.append(`images_list[${index}]`, image);
        });

        try {
            
            const respose = await fetch(url2, {
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${authUser.access}`,
                },
                body: formData
            })
            
            if(respose.status === 200 || respose.ok){
                setIsLoading2(false)
                document.getElementById('my_modal_2').close()
                document.getElementById('my_modal_1').showModal();
            }   

            else{
                const data = await respose.json()
                console.log(data);
                setIsLoading2(false)
            }
        } catch (error) {
            console.log('There was an error', error);
            setIsLoading2(false)
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

        // console.log('This is collecton', data);

        setImage_list(data)
        setCheckdata(data)
        


        } catch (error) {
            console.log(error);
        } finally {  
        setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);


    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleClick = (id) => {
        setSelectedRequest(id);
        document.getElementById('my_modal_4').showModal()

    };

    const [isLoading3, setIsLoading3] = useState(false);
    const handleDelete = async () => {
        setIsLoading3(true);
        try {
            const response = await fetch(`${BASE_URL}/gallery/${selectedRequest}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser.access}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response);
            }

            if (response.status === 200 || response.ok) {
                console.log('Delete successful, no content returned');
                setCheckdata(prevSkills => prevSkills.filter(checkdata => checkdata.id !== selectedRequest));
                setSelectedRequest(null);
                setIsLoading3(false);
                document.getElementById('my_modal_4').close()
                return;
            }

            const data = await response.json();
            console.log('Delete successful', data);
            setCheckdata(prevSkills => prevSkills.filter(checkdata => checkdata.id !== selectedRequest));
            setSelectedRequest(null);
        } catch (error) {
            console.error('There was a problem with the delete request:', error);
        }
    };


    console.log(checkdata);


  return (
    <div className=''>  
        {isLoading ? 
            <MyLoader />
        : <>
            <div className='flex w-full items-center gap-10'>
                <div >
                    <h2 className='text-2xl'>Collections</h2>
                    <p className="text-xs pb-3">Upload Maximum of 6 collections</p>
                </div>

                {images_list && images_list.length >= 6 || images_list && images_list.length === 0 ? '' :
                    <button className="lg:ml-auto ml-auto bg-neutral-500 py-2.5 px-3.5 text-white rounded-full text-xs flex gap-2 items-center " 
                        onClick={()=>document.getElementById('my_modal_2').showModal()}>Add<MdAdd className='text-sm'/>
                    </button>
                }
            </div>

            <div className='2xl:w-full xl:w-full lg:w-full md:w-full'>
                {images_list && images_list.length >= 0 && 
                    <div className='mt-4 lg:grid 2xl:grid-cols-6 xl:grid-cols-4 grid grid-cols-2 gap-2   rounded-md'>
                        {checkdata.map((url, index) => (
                            <div className=' w-full 2xl:h-[18rem] xl:h-[14rem] lg:h-[15rem] md:h-[20rem]  h-[10rem] bg-slate-100 border border-neutral-200 overflow-hidden relative rounded-sm '>
                                <img key={index} src={url.image} alt={`Preview ${index}`} className='rounded-sm w-full h-full object-cover' />

                                <button className='absolute top-2 right-2 p-2 rounded-full bg-neutral-200 text-red-600  text-base' onClick={() => handleClick(url.id)}>
                                    <MdDelete />
                                </button>
                            </div>
                        ))}
                    </div>
                }
            </div>
        
            {images_list && images_list.length === 0 &&
                <div className='flex justify-center items-center h-[50vh]'>
                    <div>
                        <p className='text-sm pb-3'>No Collections, added</p>
                        <button className="bg-black py-3 px-8 text-white rounded-full text-sm flex m-auto" onClick={()=>document.getElementById('my_modal_2').showModal()}>Add Collections</button>
                    </div>
                </div>
            }


            <dialog id="my_modal_4" className="modal">
                <div className="modal-box  p-0 rounded-xl flex justify-center items-center h-[25rem]" >
                    <button onClick={()=>{document.getElementById('my_modal_1').close()}} 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white text-black hover:text-white">✕
                    </button>


                    <div className=''>
                        <p className='text-red-600 text-4xl flex m-auto justify-center'><LuAlertTriangle /></p>
                        <h2 className='text-center text-xl pt-2'>Delete</h2>
                        <p className='text-center text-sm'>Are you sure u want to delete skill</p>
                        <div className='flex items-center gap-3 mt-5'>
                            <button onClick={handleDelete} className="py-3 w-full bg-black text-sm rounded-full hover:bg-neutral-800 text-white">{isLoading3 === true ? <span className="loading loading-spinner loading-sm"></span> : 'Delete'}</button>
                            <button onClick={()=>{document.getElementById('my_modal_4').close()}} className="py-3 w-full mt-2 bg-white text-sm rounded-full border border-neutral-300 text-black">Cancel</button>
                        </div>
                    </div>
                </div>
            </dialog>


            <dialog id="my_modal_2" className="modal">
                <div className="modal-box  p-5 rounded-md  h-[100vh] lg:max-w-[35%] w-[95%]" >
                    <button onClick={()=>{document.getElementById('my_modal_2').close()}} 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white text-black hover:text-white">✕
                    </button>

                    <div className='pt-10'>
                        <h2 className='text-xl pb-3 border-b border-b-neutral-100'>Upload Collections</h2>

                        {images.length > 0 &&
                            <label htmlFor="" for="dropzone" className='cursor-pointer'>
                                <input type="file" id='dropzone' disabled={isDisabled} multiple className="hidden m-auto mt-3 file-input w-fit rounded-full text-xs bg-neutral-100" onChange={handlePostImage}/>
                                <p className='flex bg-white border border-neutral-300 text-sm w-fit p-3 px-8 text-black gap-3 items-center mt-5 rounded-full'>Upload More Items<RiUploadCloudLine className='text-lg'/></p>
                            </label>
                        }


                        {images.length === 0 && 
                        <div className='flex flex-col justify-center gap-20 pt-[15rem] m-auto'>
                            <div className='flex justify-center m-auto items-center h-0 pb-0 '>
                                <img src={noData} alt="" className='w-[15rem]'/>
                            </div>

                            <label htmlFor="" for="dropzone" className='cursor-pointer text-center'>
                                <input type="file" id='dropzone' disabled={isDisabled} multiple className="hidden m-auto mt-3 file-input w-fit rounded-full text-xs bg-neutral-100" onChange={handlePostImage}/>
                                <p className='text-sm pt-6'>Click to upload Maximum of 6 items and Minimum of 3</p>
                                <p className='text-sm pt-2'>Image should not be greater than 3mb</p>
                                <p className='flex bg-white border border-neutral-300 text-sm w-fit p-3 px-8 text-black gap-3 items-center m-auto mt-5 rounded-full'>Upload <RiUploadCloudLine className='text-lg'/></p>
                            </label>
                        </div>
                        }

                        <div className='mt-4 lg:grid 2xl:grid-cols-2 grid grid-cols-2 gap-2 rounded-md '>
                            {previewUrls.map((url, index) => (
                                <div className='2xl:w-full w-full 2xl:h-60 xl:h-40 lg:h-20 md:h-20  h-40 bg-slate-200 border border-neutral-100 overflow-hidden relative rounded-lg '>
                                    <img key={index} src={url} alt={`Preview ${index}`} className='rounded-sm w-full h-full object-cover' />
                                    <p onClick={() => handleDeleteImage(index)} className='absolute bg-white top-1 right-1 flex justify-center items-center p-1 rounded-full'><IoCloseSharp className='cursor-pointer lg:text-md text-xs text-red-700'/></p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {images.length > 0 &&
                        <button disabled={images.length < 3} onClick={handleProfileUpdate} className=" btn 2xl:w-fit mt-5 xl:w-fit lg:w-fit md:w-fit w-full flex items-center gap-2 px-10 xl:text-xs lg:text-xs md:text-xs rounded-full bg-black hover:bg-neutral-800 text-white">
                            {isLoading2 === true ? <span class="loader"></span> : <>Submit<MdArrowForward /></> }
                        </button>
                    }
                </div>
            </dialog>


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
                            <button className="btn btn-active text-xs btn-neutral w-9/12 justify-center m-auto mt-8 flex items-center gap-4">Account <FaArrowRight /></button>
                        </Link>
                    </div>
                </div>
            </dialog>
        </> }
    </div>
  )
}

export default CreativeProfileCollection
