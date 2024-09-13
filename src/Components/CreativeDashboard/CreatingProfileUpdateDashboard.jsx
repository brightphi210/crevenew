import React, { useEffect, useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'

import { IoCloseSharp } from "react-icons/io5";

import validator from 'validator' 
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { FaArrowRight } from "react-icons/fa6";
import successImg from '../Images/gif1.gif'
import CreativeProfileCollection from './CreativeProfileCollection';
import GooglePlacesAutocomplete from 'react-google-autocomplete';
import CreativeSkills from './CreativeSkills';
import MyLoader from '../allLoadingState/MyLoader';
import UploadNIN from './UploadNIN';
import { FiEdit } from 'react-icons/fi';

const CreatingProfileUpdateDashboard = () => {
    const [show, setShow] = useState(false)
    const handleShow = () => {
      setShow(!show)
    }


  return (
    <div className='flex flex-row w-full'>
      <div className=''>
        <CreativeSideBarCom show={show} />
      </div>
        <div className='w-full'>
            <CreativeNavBarCom show={show} handleShow={handleShow}/>
            <CreatingProfileUpdateHome/>
        </div>
    </div>
  )
}

export default CreatingProfileUpdateDashboard


export const CreatingProfileUpdateHome = () => {
    
    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;

    const [selectedOption, setSelectedOption] = useState('')
    const [experience, setExperience] = useState('')
    const [digital_skills, setDigitalSkills] = useState('')
    const [work_type, setWorkType] = useState('')
    const [summary_of_profile, setSummary_Of_Profile] = useState('')
    const [starting_price, setStarting_Price] = useState('')
    const [about, setAbout] = useState('')
    const [nondigital_skills, setNondigital_Skills] = useState('')
    const [display_name, setDisplay_Name] = useState('')
    const [language, setLanguage] = useState('')
    const [whatsapp_link, setWhatsapp_Link] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [website_link, setWebsite_Link] = useState('')
    const [images_list, setImage_list] = useState([]) 
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState(false)
    const [error1, setError1] = useState('')
    const [cover_image, setCover_Image] = useState(null)
    const [image, setImage] = useState(null) 
    const [fileName, setFileName] = useState('') 
    const [coverImage, setCoverImage] = useState(null)


    const handleShowDigital = (e) =>{ 
        setSelectedOption(e.target.value)
    }
  

    const [address, setAddress] = useState('');
    const handlePlaceSelected = (place) => {
      const address = place?.formatted_address;
      setAddress(address);
    };


    // ==================== GETTING DATA FROM PROFILE ========================

    const url =`${BASE_URL}/creativeprofile/${userToken.profile_id}/`
    const fetchProfile = async () => {
        setIsLoading2(true);
        try {

        const respose = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${authUser.access}`,
            },
        })

        if (!respose.ok) {
            setIsLoading2(false);
            throw new Error('Network response was not ok');
        }
        const data = await respose.json();

        setDigitalSkills(data.digital_skills);
        setWorkType(data.work_type);
        setStarting_Price(data.starting_price);
        setAbout(data.about);
        setNondigital_Skills(data.nondigital_skills);
        setDisplay_Name(data.display_name);
        setAddress(data.location);
        setLanguage(data.language);
        setWhatsapp_Link(data.whatsapp_link)
        setWebsite_Link(data.website_link)
        setSelectedOption(data.category)
        setPhoneNumber(data.phone_number)
        setImage_list(data.images)   
        setExperience(data.experience)  
        setCover_Image(data.profile_pics)   

        } catch (error) {
            console.log(error);
        } finally {  
        setIsLoading2(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);
    
    // ================= HANDLE UPDATE ===================
    const handleProfileUpdate = async (e) =>{
        setIsLoading(true)
        e.preventDefault() 

        const formData = new FormData()
        formData.append('digital_skills', digital_skills)
        formData.append('work_type', work_type)
        formData.append('summary_of_profile', summary_of_profile)
        formData.append('starting_price', starting_price)
        formData.append('about', about)
        formData.append('nondigital_skills', nondigital_skills)
        formData.append('display_name', display_name)
        formData.append('category', selectedOption)
        formData.append('location', address)
        formData.append('language', language)
        formData.append('whatsapp_link', whatsapp_link)
        formData.append('phone_number', phone_number)
        formData.append('website_link', website_link)
        formData.append('experience', experience)
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
                setSuccess(true)
                setIsLoading(false)
                document.getElementById('my_modal_1').showModal();
            }   

            else{
                const data = await respose.json()
                setError1(data.website_link[0])
                setIsLoading(false)
                setMessage(true)
            }


        } catch (error) {
            console.log('There was an error', error);
            setIsLoading(false)
        }
    }


    const [showEachState, setEachState] = useState(1)

    const showOne = () => {
        setEachState(1)
    }
    const showTwo = () => {
        setEachState(2)
    }
    const showThree = () => {
        setEachState(3)
    }

    const showFour = () => {
        setEachState(4)
    }


    const showFive = () => {
        setEachState(5)
    }

    const [phoneErr, setPhoneErr] = useState('')
    const [whatsAppErr, setWhatsAppErr] = useState('')
    const [isPhoneValid, setIsPhoneValid] = useState(true)
    const validatePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
        if (validator.isMobilePhone(phone_number)) {
           setPhoneErr('')
            setIsPhoneValid(true)
        } else {
           setPhoneErr('Enter valid phone number !')
            setIsPhoneValid(false)
        }
    }

    
    const validateWhatsappNumber = (e) => {
        setWhatsapp_Link(e.target.value)
        if (validator.isMobilePhone( whatsapp_link)) {
            setWhatsAppErr('')
            setIsPhoneValid(true)
        } else {
           setWhatsAppErr('Enter valid whatsApp number !')
            setIsPhoneValid(false)
        }
    }


  return (
    <div className=''>
        {isLoading2 === true ? 
            (<MyLoader />) : (
            <div className='lg:p-20 lg:pt-28 lg:pl-[18rem] p-0 pt-20'>

                <div className="breadcrumbs lg:w-full w-full text-sm mb-10">
                    <ul className='px-5'>
                        <li onClick={showOne}  className={showEachState === 1 ? 'border-b-2 pb-2 cursor-pointer border-b-green-500 text-black lg:text-sm text-sm' : 'text-sm pb-2 cursor-pointer' }>Edit Profile</li>
                        <li onClick={showFour}  className={showEachState === 4 ? 'border-b-2 pb-2 cursor-pointer border-b-green-500 text-black lg:text-sm text-sm' : 'text-sm pb-2 cursor-pointer' }>Skills Setup</li>
                        <li onClick={showThree}  className={showEachState === 3 ? 'border-b-2 pb-2 cursor-pointer border-b-green-500 text-black lg:text-sm text-sm' : 'text-sm pb-2 cursor-pointer' }>Add Works Samples</li>
                        <li onClick={showFive}  className={showEachState === 5 ? 'border-b-2 pb-2 cursor-pointer border-b-green-500 text-black lg:text-sm text-sm' : 'text-sm pb-2 cursor-pointer' }>Add NIN Document</li>
                    </ul>
                </div>


                {showEachState === 1 && (
                    <form action="" className='flex lg:flex-row flex-col px-5 lg:gap-14  gap-5 relative' onSubmit={handleProfileUpdate}>
                        <div className='lg:w-1/2 w-full flex flex-col gap-5'>

                            <div onClick={()=> document.querySelector(".input-field").click()} className='2xl:w-fit xl:w-fit lg:w-fit md:w-fit w-fit lg:block flex '>
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
                                    <div className=' lg:w-[10rem] lg:h-[10rem] h-[10rem] w-[10rem] overflow-hidden rounded-full bg-neutral-50 border border-neutral-300'>
                                        {image && (
                                            <img src={image} alt='' className='w-full h-full object-cover cursor-pointer'/> 
                                        )}

                                        <div className='relative lg:w-[10rem] lg:h-[10rem] w-[10rem] h-[10rem]'>

                                            {cover_image && (
                                                <img src={cover_image} alt='' className='w-full h-full object-cover cursor-pointer'/> 
                                            )}


                                            <div className='absolute bg-white rounded-full bottom-4 right-5 w-fit  p-2 cursor-pointer'>
                                                <p className='text-sm p-1 text-red-500'><FiEdit /></p>
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

                            <div>
                                <p className="text-sm pb-3">Location</p>
                                <GooglePlacesAutocomplete
                                    apiKey="AIzaSyA_HnIpk-nlGgMh-G1Evi-WX2T_wwqTmGs"
                                    onPlaceSelected={handlePlaceSelected}
                                    value={address}
                                    required
                                    onChange={(e)=>setAddress(e.target.value)}
                                    options={{
                                        types: ['address'],
                                    }}
                                    className="input text-sm input-bordered border-neutral-300 w-full max-w-full" 
                                    defaultValue={address}
                                />
                            </div>
                            
                            <div>
                                <p className="text-sm pb-3">Language</p>
                                <select className="select text-sm  select-bordered w-full border-neutral-300 max-w-full" 
                                    required value={language} 
                                    onChange={(e)=>setLanguage(e.target.value)}
                                >
                                    <option className='text-sm' value={''}>Select Language</option>
                                    <option className='text-sm' value={'English'}>English</option>
                                </select>
                            </div>

                            <div>
                                <p className="text-sm pb-3">Category</p>
                                <select className="select text-sm select-bordered w-full max-w-full border-neutral-300" required value={nondigital_skills} onChange={(e)=>setNondigital_Skills(e.target.value)}>
                                    <option className='text-sm' value={''}>Select Category</option>
                                    <option className='text-sm' value={'Plumbing'}>Plumbing</option>
                                    <option className='text-sm' value={'Catering'}>Catering</option>   
                                    <option className='text-sm' value={'Hair_Stylist'}>Hair Stylist</option>
                                    <option className='text-sm' value={'Electronics/Repairs'}>Electronics/Repairs</option>
                                    <option className='text-sm' value={'Furniture-Making'}>Furniture Making</option>
                                    <option className='text-sm' value={'Cobbling'}>Cobbling</option>
                                    <option className='text-sm' value={'Mechanic'}>Mechanic</option>
                                    <option className='text-sm' value={'Fashion-Designer'}>Fashion Designing</option>
                                    <option className='text-sm' value={'Cleaning'}>Cleaning</option>
                                    <option className='text-sm' value={'Barbing'}>Barbing</option>
                                </select>
                            </div>

                            {/* <div>
                                <p className="text-sm pb-3">Phone Number</p>
                                <input 
                                    type="text" 
                                    placeholder="phone number e.g 09044338996" 
                                    required
                                    value={phone_number}
                                    onChange={validatePhoneNumber}
                                    className="input text-sm input-bordered w-full max-w-full border-neutral-300" 
                                />
                                <p className='text-red-600 text-xs pt-3'>{phoneErr}</p>
                            </div> */}
                    
                        </div>

                        <div className='lg:w-1/2 w-full flex flex-col gap-5'>

                            <div>
                                <p className="text-sm pb-3">Profession</p>
                                <input 
                                    type="text" 
                                    required
                                    value={display_name}
                                    onChange={(e)=>setDisplay_Name(e.target.value)}
                                    placeholder="profession e.g Senior Furniture Maker"  
                                    className="input text-sm input-bordered w-full max-w-full border-neutral-300" />
                            </div>


                            <div>
                                <p className="text-sm pb-3">Years of Experience</p>
                                <input 
                                    type="number" 
                                    required
                                    value={experience}
                                    onChange={(e)=>setExperience(e.target.value)}
                                    placeholder="experience e.g 5"  
                                    className="input text-sm input-bordered w-full max-w-full border-neutral-300" />
                            </div>

                            <div>
                                <p className="text-sm pb-3">Bio</p>
                                <textarea 
                                    className="textarea textarea-bordered w-full border-neutral-300 max-w-full min-h-[10rem] max-h-[10rem] h-[10rem]" 
                                    placeholder="Bio"
                                    value={about}
                                    required
                                    onChange={(e)=>setAbout(e.target.value)}
                                ></textarea>
                            </div>
                            <button disabled={!isPhoneValid} className="btn 2xl:w-fit xl:w-fit lg:w-fit md:w-fit w-full lg:my-5 mb-10 mt-2  px-20 bg-black rounded-full hover:bg-neutral-800 text-white ">{isLoading === true ? <span class="loader"></span> : 'Submit' }</button>

                        </div>
                    </form>
                )}

                {showEachState === 3 && (
                    <CreativeProfileCollection 
                        IoCloseSharp={IoCloseSharp}
                        setEachState={setEachState}
                    />
                )}

                {showEachState === 4 && (
                    <CreativeSkills setEachState={setEachState}/>
                )}

                {showEachState === 5 && (
                    <UploadNIN setEachState={setEachState}/>
                )}


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

                            <button onClick={()=>{setEachState(2); document.getElementById('my_modal_1').close()}} className="btn btn-active text-xs btn-neutral w-9/12 justify-center m-auto mt-8 flex items-center gap-4">Continue <FaArrowRight /></button>
                        </div>
                    </div>
                </dialog>

            </div>
            ) 
        }
    </div>
  )
}

