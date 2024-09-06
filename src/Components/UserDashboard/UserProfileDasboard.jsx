import React, { useEffect, useState } from 'react'
import UserNavbar from './UserNavbar'
import UserSideBar from './UserSideBar'
import successImg from '../Images/gif1.gif'
import { BASE_URL } from '../Auth/BaseUrl'
import { jwtDecode } from 'jwt-decode'
import { FiEdit } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import GooglePlacesAutocomplete from 'react-google-autocomplete';
import MyLoader from '../allLoadingState/MyLoader'
import Footer from '../Footer'


const UserProfileDasboard = () => {

    const [show, setShow] = useState(false)

    const handleShow = () => {
      setShow(!show)
    }

  return (
    <div>
        <UserNavbar show={show} handleShow={handleShow}/>
        <div className='flex w-full'>
            <UserProfileDash />
        </div>
        <Footer />
    </div>
  )
}

export default UserProfileDasboard



export const UserProfileDash = () => {


    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)
    const [isLoading3, setIsLoading3] = useState(false)
    const [cover_image, setCover_Image] = useState(null)
    const [image, setImage] = useState(null) 
    const [fileName, setFileName] = useState('') 
    const [coverImage, setCoverImage] = useState(null)
     


    const [address, setAddress] = useState('');
    const handlePlaceSelected = (place) => {
      const address = place.formatted_address;
      setAddress(address);
    };

    const url =`${BASE_URL}/userprofile/${userToken.profile_id}/`
    const handleProfileUpdate = async (e) =>{
        setIsLoading3(true)
        e.preventDefault() 

        const formData = new FormData()
        formData.append('profile_pics', cover_image)
        formData.append('address', address)
        try {
            
            const respose = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization' : `Bearer ${authUser.access}`,
                },
                body: formData
            })
            
            if(respose.status === 200 || respose.ok){
                setIsLoading3(false)
                document.getElementById('my_modal_1').showModal();
            }   

            else{
                const data = await respose.json()
                console.log(data);
                setIsLoading3(false)
            }

        } catch (error) {
            console.log('There was an error', error);
            setIsLoading3(false)
        }
    }

    

    const url2 =`${BASE_URL}/userprofile/${userToken.profile_id}/`
    const handleProfileUpdate2 = async (e) =>{
        setIsLoading2(true)
        e.preventDefault() 

        const formData = new FormData()
        formData.append('address', address)
        try {
            
            const respose = await fetch(url2, {
                method: 'PUT',
                headers: {
                    'Authorization' : `Bearer ${authUser.access}`,
                },
                body: formData
            })
            
            if(respose.status === 200 || respose.ok){
                setIsLoading2(false)
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

        setCover_Image(data.profile_pics)
        setAddress(data.address)
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
    <div className='2xl:px-[10rem] xl:px-[5rem] lg:px-[5rem] px-5 py-28 w-full'>
        <h2 className='text-2xl font-bold pb-10'>Profile Setup</h2>

        {isLoading === true ? <MyLoader />  :
            <div className='bg-white'>

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
                        <div className=' lg:w-[6rem] lg:h-[6rem] h-[6rem] w-[6rem] overflow-hidden rounded-full bg-neutral-50 border border-neutral-300'>
                            {image && (
                                <img src={image} alt='' className='w-full h-full object-cover cursor-pointer'/> 
                            )}

                            <div className='relative lg:w-[6rem] lg:h-[6rem] w-[6rem] h-[6rem]'>

                                {cover_image && (
                                    <img src={cover_image} alt='' className='w-full h-full object-cover cursor-pointer'/> 
                                )}


                                <div className='absolute bg-white rounded-full bottom-3 right-3 w-fit  p-1 cursor-pointer'>
                                    <p className='text-xs p-1'><FiEdit /></p>
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
                    className=" lg:w-fit w-fit py-3 px-10 rounded-full text-xs  
                    bg-black text-white lg:block lg:m-0 lg:mt-5 flex  m-auto mt-5">
                        {isLoading3 === true ? <div className='flex items-center gap-3'> <span class="loader"></span> Loading</div>  : 'Update' }
                </button>


                <form onSubmit={handleProfileUpdate2} className='mt-5 pt-5 2xl:w-[50%] w-full '>

                    <div>
                        <GooglePlacesAutocomplete
                            apiKey="AIzaSyA_HnIpk-nlGgMh-G1Evi-WX2T_wwqTmGs"
                            onPlaceSelected={handlePlaceSelected}
                            value={address}
                            required                                                                                                                                                                                            
                            onChange={(e)=>setAddress(e.target.value)}
                            options={{
                            types: ['address'],
                            }}
                            className="input text-sm input-bordered border-neutral-300 lg:w-[50%] w-full" 
                            defaultValue={address}
                        />
                    </div>
                    <button 
                        type='submit'
                        className=" lg:w-fit w-fit py-3 px-10 text-xs  
                        bg-black text-white rounded-full lg:block lg:m-0 lg:mt-5 flex text-center m-auto mt-5">
                            {isLoading2 === true ? <div className='flex items-center gap-3'> <span class="loader"></span> Loading</div>  : 'Update' }
                    </button>
                </form>

            </div>
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
                    <h2 className='text-center'>Profile Updated</h2>
                    <p className='text-center text-xs'>Your profile has been updated, continue </p>

                    <Link to={'/user-dashboard-home'}>
                        <button className="btn btn-active text-xs btn-neutral w-9/12 justify-center m-auto mt-8 flex items-center gap-4">Continue <FaArrowRight /></button>
                    </Link>
                </div>
            </div>
        </dialog>
    </div>
  )
}