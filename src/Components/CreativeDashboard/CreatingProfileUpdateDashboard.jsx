import React, { useEffect, useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'

import { IoCloseSharp } from "react-icons/io5";

import validator from 'validator' 

import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { FaArrowRight } from "react-icons/fa6";

import successImg from '../Images/gif1.gif'
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import CreativeProfileCoverUpdate from './CreativeProfileCoverUpdate';
import CreativeProfileCollection from './CreativeProfileCollection';

import GooglePlacesAutocomplete from 'react-google-autocomplete';
import CreativeSkills from './CreativeSkills';
import MyLoader from '../allLoadingState/MyLoader';


import { MdArrowRightAlt } from "react-icons/md";

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




    const handleShowDigital = (e) =>{ 
        setSelectedOption(e.target.value)
    }
  

    const [address, setAddress] = useState('');
    const handlePlaceSelected = (place) => {
      const address = place.formatted_address;
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
    console.log('This is error', error1);



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
    <div>

        {isLoading2 === true ? 
            (<MyLoader />) : (
            <div className='lg:p-20 lg:pt-28 lg:pl-[18rem] p-5 pt-20'>

                <div className='flex lg:gap-1 items-center gap-1 pb-10'>
                    <button onClick={showOne} 
                        className={showEachState === 1 ? 'bg-black py-2.5 px-3 rounded-full text-white lg:text-sm text-xs' : ' text-sm px-1 py-2.5'}>
                        Basic
                    </button>

                    <p><MdArrowRightAlt /></p>

                    <button onClick={showFour} 
                        className={showEachState === 4 ? 'bg-black py-2.5 px-3 rounded-full text-white lg:text-sm text-xs' : ' text-sm px-1 py-2.5'}>
                        Skills
                    </button>

                    <p><MdArrowRightAlt /></p>

                    <button onClick={showTwo} 
                        className={showEachState === 2 ? 'bg-black py-2.5 px-3 rounded-full text-white lg:text-sm text-xs' : ' text-sm px-1 py-2.5'}>
                        Cover
                    </button>

                    <p><MdArrowRightAlt /></p>
                    <button onClick={showThree} 
                        className={showEachState === 3 ? 'bg-black py-2.5 px-3 rounded-full text-white lg:text-sm text-xs' : ' text-sm px-1 py-2.5'}>
                        Collections
                    </button>
                </div>


                {showEachState === 1 && (
                    <form action="" className='flex lg:flex-row flex-col lg:gap-14 gap-5 relative' onSubmit={handleProfileUpdate}>
                        <div className='lg:w-1/2 w-full flex flex-col gap-5'>


                            <div>
                                <p className="text-xs pb-3">Work Type</p>
                                <select className="select text-xs select-bordered border-neutral-500 w-full max-w-full" 
                                    value={work_type} onChange={(e) =>{setWorkType(e.target.value)}} required>
                                    <option className='text-xs'required >Select Work Type</option>
                                    <option className='text-xs'required value={'Remote'}>Remote</option>
                                    <option className='text-xs' value={'Hybrid'}>Hybrid</option>
                                    <option className='text-xs' value={'On-site'}>On-site</option>
                                </select>
                            </div>
                            

                            <div>
                                <p className="text-xs pb-3">Location</p>
                                {/* <input type="text" 
                                    placeholder="Location e.g #64, grace lane, port harcourt" 
                                    className="input text-xs input-bordered border-neutral-500 w-full max-w-full" 
                                    value={location}
                                    required
                                    onChange={(e)=>setLocation(e.target.value)}
                                /> */}
                                <GooglePlacesAutocomplete
                                    apiKey="AIzaSyA_HnIpk-nlGgMh-G1Evi-WX2T_wwqTmGs"
                                    onPlaceSelected={handlePlaceSelected}
                                    value={address}
                                    required
                                    onChange={(e)=>setAddress(e.target.value)}
                                    options={{
                                    types: ['address'],
                                    }}
                                    className="input text-xs input-bordered border-neutral-500 w-full max-w-full" 
                                    defaultValue={address}
                                />
                            </div>


                            <div>
                                <p className="text-xs pb-3">Language</p>
                                <input type="text" 
                                    placeholder="Language e.g English, French etc." 
                                    className="input text-xs input-bordered w-full border-neutral-500 max-w-full" 
                                    value={language}
                                    required
                                    onChange={(e)=>setLanguage(e.target.value)}
                                />
                            </div>

                            <div>
                                <p className="text-xs pb-3">Category</p>
                                <select className="select text-xs  select-bordered w-full border-neutral-500 max-w-full"  value={selectedOption} onChange={handleShowDigital}>
                                    <option className='text-xs' value={''}>Select Category</option>
                                    <option className='text-xs' value={'DigitalSkills'}>Digital Skills</option>
                                    <option className='text-xs' value={'Non-DigitalSkills'}>Non-Digital Skills</option>
                                </select>
                            </div>

                
                            {selectedOption === 'DigitalSkills' && (

                                <div>
                                    <p className="text-xs pb-3">Digital</p>
                                    <select className="select text-xs select-bordered w-full border-neutral-500 max-w-full" required value={digital_skills} onChange={(e)=>setDigitalSkills(e.target.value)}>
                                        <option className='text-xs' value={''}>Select Digital Skill</option>
                                        <option className='text-xs' value={'BackendDevelopment'}>Backend Developement</option>
                                        <option className='text-xs' value={'MobileDevelopment'}>Mobile Developement</option>
                                        <option className='text-xs' value={'UI/UX_Design'}>UI/UX</option>
                                        <option className='text-xs' value={'Graphics_Design'}>Graphic Design</option>
                                        <option className='text-xs' value={'Content_Creation'}>Content Creation</option>
                                        <option className='text-xs' value={'Frontend_Development'}>Frontend Developement</option>
                                        <option className='text-xs' value={'Photography'}>Photography</option>
                                        <option className='text-xs' value={'WebsiteDevelopment'}>Website Developement</option>
                                        <option className='text-xs' value={'Blockchain Developement'}>Blockchain Developement</option>
                                        <option className='text-xs' value={'Video_editing'}>Video Editing</option>
                                    </select>
                                </div>
                            ) }
                            
                            {selectedOption === 'Non-DigitalSkills' && (

                                <div>
                                    <p className="text-xs pb-3">Non-Digital</p>
                                    <select className="select text-xs select-bordered w-full max-w-full border-neutral-500" value={nondigital_skills} onChange={(e)=>setNondigital_Skills(e.target.value)}>
                                        <option className='text-xs' value={''}>Select Non-Digital Skill</option>
                                        <option className='text-xs' value={'Plumbing'}>Plumbing</option>
                                        <option className='text-xs' value={'Catering'}>Catering</option>   
                                        <option className='text-xs' value={'Hair_Stylist'}>Hair Stylist</option>
                                        <option className='text-xs' value={'Electronics/Repairs'}>Electronics/Repairs</option>
                                        <option className='text-xs' value={'Furniture-Making'}>Furniture Making</option>
                                        <option className='text-xs' value={'Cobbling'}>Cobbling</option>
                                        <option className='text-xs' value={'Mechanic'}>Mechanic</option>
                                        <option className='text-xs' value={'Fashion-Designning'}>Fashion Designing</option>
                                        <option className='text-xs' value={'Cleaning'}>Cleaning</option>
                                        <option className='text-xs' value={'Barbing'}>Barbing</option>
                                    </select>
                                </div>
                            )}

                            <div>
                                <p className="text-xs pb-3">Whatsapp Number</p>
                                <input 
                                    type="text" 
                                    placeholder="whatsapp number e.g 07098822807" 
                                    value={whatsapp_link}
                                    required
                                    onChange={validateWhatsappNumber}
                                    className="input text-xs input-bordered w-full max-w-full border-neutral-500" 
                                />
                                <p className='text-red-600 text-xs pt-3'>{whatsAppErr}</p>
                            </div>


                            <div>
                                <p className="text-xs pb-3">Phone Number</p>
                                <input 
                                    type="text" 
                                    placeholder="phone number e.g 09044338996" 
                                    required
                                    value={phone_number}
                                    onChange={validatePhoneNumber}
                                    className="input text-xs input-bordered w-full max-w-full border-neutral-500" 
                                />
                                <p className='text-red-600 text-xs pt-3'>{phoneErr}</p>
                            </div>
                    
                        </div>

                        <div className='lg:w-1/2 w-full flex flex-col gap-5'>

                            <div>
                                <p className="text-xs pb-3">Website - Optional</p>
                                <input 
                                    type="text" 
                                    placeholder="website e.g https://example.com"  
                                    value={website_link}
                                    onChange={(e)=>setWebsite_Link(e.target.value)}
                                    className="input text-xs input-bordered w-full max-w-full border-neutral-500" />
                            </div>


                            <div>
                                <p className="text-xs pb-3">Profession</p>
                                <input 
                                    type="text" 
                                    required
                                    value={display_name}
                                    onChange={(e)=>setDisplay_Name(e.target.value)}
                                    placeholder="profession e.g Senior Furniture Maker"  
                                    className="input text-xs input-bordered w-full max-w-full border-neutral-500" />
                            </div>


                            <div>
                                <p className="text-xs pb-3">Price</p>
                                <input 
                                    type="number" 
                                    value={starting_price}
                                    required
                                    onChange={(e)=>setStarting_Price(e.target.value)}
                                    placeholder="starting price e.g 5,000"  
                                    className="input text-xs input-bordered w-full max-w-full border-neutral-500" />
                            </div>


                            <div>
                                <p className="text-xs pb-3">Bio</p>
                                <textarea 
                                    className="textarea textarea-bordered w-full border-neutral-500 max-w-full min-h-[15rem] max-h-[15rem] h-[15rem]" 
                                    placeholder="Bio"
                                    value={about}
                                    required
                                    onChange={(e)=>setAbout(e.target.value)}
                                ></textarea>
                            </div>

                            <button disabled={!isPhoneValid} className="btn 2xl:w-fit xl:w-fit lg:w-fit md:w-fit w-full mt-5 px-20 bg-black rounded-full hover:bg-neutral-800 text-white ">{isLoading === true ? <span class="loader"></span> : 'Submit' }</button>

                        </div>


                        {message === true ? (

                            <div role="alert" className="alert alert-error flex py-3 rounded-lg fixed top-[5rem] lg:right-[5rem] right-5 w-fit px-10">
                                <svg onClick={()=>setMessage(false)} xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span className='text-white text-xs'>Please fill out proper details</span>
                            </div>
                        ) : ( '')}

                    </form>
                )}

                {showEachState === 2 && (
                    <CreativeProfileCoverUpdate 
                        MdDelete={MdDelete}
                        AiOutlineCloudUpload={AiOutlineCloudUpload}
                        setEachState={setEachState}
                    />
                )}


                {showEachState === 3 && (
                    <CreativeProfileCollection 
                        IoCloseSharp={IoCloseSharp}
                    />
                )}

                {showEachState === 4 && (
                    <CreativeSkills setEachState={setEachState}/>
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

                            {/* <Link to={'/creative-dashboard-profile'}> */}
                                <button onClick={()=>{setEachState(4); document.getElementById('my_modal_1').close()}} className="btn btn-active text-xs btn-neutral w-9/12 justify-center m-auto mt-8 flex items-center gap-4">Continue <FaArrowRight /></button>
                            {/* </Link> */}
                        </div>
                    </div>
                </dialog>

            </div>
            ) 
        }
    </div>
  )
}

