import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { BASE_URL } from '../Auth/BaseUrl';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import successImg from '../Images/gif1.gif'
import { MdAdd } from 'react-icons/md';

const CreativeProfileCollection = ({IoCloseSharp}) => {

    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;



    const [previewUrls, setPreviewUrls] = useState([]);
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
    
        if (images.length + validFiles.length > 4) {
            setIsDisabled(true);
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




    const url =`${BASE_URL}/creativeprofile/${userToken.profile_id}/`

    const url2 =`${BASE_URL}/gallery/`

    const handleProfileUpdate = async (e) =>{
        setIsLoading(true)
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

        setImage_list(data.images)
        setCheckdata(data.images)
        


        } catch (error) {
            console.log(error);
        } finally {  
        setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);



    const deleteImage = async (id) => {
        try {
          const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${authUser.access}`,
            },
          });
          if (!response.ok) throw new Error('Network response was not ok');
          setImage_list(images_list.filter(image => image.id !== id));
        } catch (error) {
          console.error('Error deleting image:', error);
        }
    };


    console.log(images.length);


  return (
    <div>  


        {images_list.length <= 0 ? 

            <div className='pt-32 flex justify-center'>
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        
        : <>

            <div className='flex items-center gap-10'>
                <div >
                    <h2 className='text-2xl'>Collections</h2>
                    <p className="text-xs pb-3">Upload Maximum of 6 collections</p>
                </div>

                {images_list.length >=8 &&
                    <button className="lg:m-0 ml-auto bg-neutral-500 py-2.5 px-3.5 text-white rounded-full text-xs flex gap-2 items-center " 
                        onClick={()=>document.getElementById('my_modal_2').showModal()}>Add<MdAdd className='text-sm'/>
                    </button>
                }
            </div>


            <div className='2xl:w-2/3 xl:w-2/3 lg:w-2/3 md:w-full'>
                {images_list.length > 0 && 
                    <div className='mt-4 lg:grid 2xl:grid-cols-3 xl:grid-cols-3 grid grid-cols-2 gap-2  border border-neutral-200 rounded-md'>
                        {checkdata.map((url, index) => (
                            <div className=' w-full 2xl:h-[18rem] xl:h-40 lg:h-[10rem] md:h-20  h-[12rem] bg-slate-100 border border-neutral-200 overflow-hidden relative rounded-sm '>
                                <img key={index} src={url.image} alt={`Preview ${index}`} className='rounded-sm w-full h-full object-cover' />
                            </div>
                        ))}
                    </div>
                }
            </div>
        
            {images_list.length <= 0 &&
                <div className='flex justify-center items-center h-[50vh]'>
                    <div>
                        <p className='text-sm pb-3'>No Collections, added</p>
                        <button className="bg-black py-3 px-8 text-white rounded-full text-sm flex m-auto" onClick={()=>document.getElementById('my_modal_2').showModal()}>Add Skill</button>
                    </div>
                </div>
            }


            <dialog id="my_modal_2" className="modal">
                <div className="modal-box  p-5 rounded-md  h-[100vh] max-w-[35%]" >
                    <button onClick={()=>{document.getElementById('my_modal_2').close()}} 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white text-black hover:text-white">✕
                    </button>

                    <div className='pt-10'>
                        <h2 className='text-xl pb-5'>Upload Collections</h2>

                        <input type="file" disabled={isDisabled} multiple className="file-input w-full max-w-xs text-xs" onChange={handlePostImage}/>

                        <div className='mt-4 lg:grid 2xl:grid-cols-2 grid grid-cols-2 gap-2 border border-neutral-100 rounded-md '>
                            {previewUrls.map((url, index) => (
                                <div className='2xl:w-full w-full 2xl:h-60 xl:h-40 lg:h-20 md:h-20  h-40 bg-slate-200 border border-neutral-100 overflow-hidden relative rounded-lg '>
                                    <img key={index} src={url} alt={`Preview ${index}`} className='rounded-sm w-full h-full object-cover' />
                                    <p onClick={() => handleDeleteImage(index)} className='absolute bg-white top-1 right-1 flex justify-center items-center p-1 rounded-full'><IoCloseSharp className='cursor-pointer lg:text-md text-xs text-red-700'/></p>
                                </div>
                            ))}
                        </div>

                        {images.length > 0 &&
                            <button onClick={handleProfileUpdate} className="btn 2xl:w-fit xl:w-fit lg:w-fit md:w-fit w-full mt-5 px-20 xl:text-xs lg:text-xs md:text-xs  bg-black hover:bg-neutral-800 text-white ">{isLoading === true ? <span class="loader"></span> : 'Submit' }</button>
                        }
                    </div>
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
                            <button className="btn btn-active text-xs btn-neutral w-9/12 justify-center m-auto mt-8 flex items-center gap-4">Continue <FaArrowRight /></button>
                        </Link>
                    </div>
                </div>
            </dialog>
        </> }
    </div>
  )
}

export default CreativeProfileCollection
