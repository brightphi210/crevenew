import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { BASE_URL } from '../Auth/BaseUrl';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import successImg from '../Images/gif1.gif'

const CreativeProfileCollection = ({IoCloseSharp}) => {

    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;



    const [previewUrls, setPreviewUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    const [images_list, setImage_list] = useState([]) 

    const [checkdata, setCheckdata] = useState([]);



    const handlePostImage = (event) => {
        const files = Array.from(event.target.files);
  
        if (images_list.length + files.length > 4) {
            setIsDisabled(true);
          return;
        }
  
        setImage_list((prevImages) => [...prevImages, ...files]);  
        const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
        setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
      };


      const handleDeleteImage = (index) => {
        setImage_list((prevImages) => prevImages.filter((_, i) => i !== index));
        setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    };




    const url =`${BASE_URL}/creativeprofile/${userToken.profile_id}/`

    const handleProfileUpdate = async (e) =>{
        setIsLoading(true)
        e.preventDefault() 

        const formData = new FormData()
        images_list.forEach((image, index) => {
            formData.append(`images_list[${index}]`, image);
        });



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



  return (
    <div>
        <div className='2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-full'>


            {checkdata === null || checkdata === '' && (
                <>
                <p className="text-xs pb-3">Images - (Maximum 4 Images)</p>
                <input type="file" disabled={isDisabled} multiple className="file-input file-input-bordered w-fit text-xs" onChange={handlePostImage}/>

                <div className='mt-4 lg:grid 2xl:grid-cols-2 grid grid-cols-2 gap-2 border border-neutral-100 rounded-md '>
                    {previewUrls.map((url, index) => (
                        <div className='2xl:w-full w-full 2xl:h-60 xl:h-40 lg:h-20 md:h-20  h-40 bg-slate-200 border border-neutral-100 overflow-hidden relative rounded-lg '>
                            <img key={index} src={url} alt={`Preview ${index}`} className='rounded-sm w-full h-full object-cover' />
                            <p onClick={() => handleDeleteImage(index)} className='absolute bg-white top-1 right-1 flex justify-center items-center p-1 rounded-full'><IoCloseSharp className='cursor-pointer lg:text-md text-xs text-red-700'/></p>
                        </div>
                    ))}
                </div>
                <button onClick={handleProfileUpdate} className="btn 2xl:w-fit xl:w-fit lg:w-fit md:w-fit w-full mt-5 px-20 xl:text-xs lg:text-xs md:text-xs  bg-black hover:bg-neutral-800 text-white ">{isLoading === true ? <span class="loader"></span> : 'Submit' }</button>
                </>
            )}


            <div className='mt-4 lg:grid 2xl:grid-cols-2 grid grid-cols-2 gap-2  border border-neutral-200 rounded-md'>
                {images_list.map((url, index) => (
                    <div className='2xl:w-full w-full 2xl:h-60 xl:h-40 lg:h-20 md:h-20  h-40 bg-slate-100 border border-neutral-200 overflow-hidden relative rounded-sm '>
                        <img key={index} src={url.image} alt={`Preview ${index}`} className='rounded-sm w-full h-full object-cover' />
                    </div>
                ))}
            </div>
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

export default CreativeProfileCollection
