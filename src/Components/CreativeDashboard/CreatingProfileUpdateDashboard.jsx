import React, { useEffect, useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'

import { IoMdArrowRoundForward } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";


import img1 from '../Images/item6.jpg'
import img2 from '../Images/item5.jpg'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import MultipleImageUpload from './Upload/MutilpleImageUpload';
import { FaPlus } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { BsFillCollectionFill } from "react-icons/bs";
import { ImFilePicture } from "react-icons/im";

import successImg from '../Images/gif1.gif'
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import CreativeProfileCoverUpdate from './CreativeProfileCoverUpdate';
import CreativeProfileCollection from './CreativeProfileCollection';

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
    const [location, setLocation] = useState('')
    const [language, setLanguage] = useState('')
    const [whatsapp_link, setWhatsapp_Link] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [website_link, setWebsite_Link] = useState('')
    const [image, setImage] = useState(null) 


    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [images_list, setImage_list] = useState([]) 

    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)

    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState(false)




    const handleShowDigital = (e) =>{ 
        setSelectedOption(e.target.value)
    }
  

  
    const handleInputChange = (e) => {
      setNewSkill(e.target.value);
    };
  
    const addSkill = () => {
      if (newSkill.trim() !== '') {
        setSkills([...skills, newSkill]);
        // setNewSkill('');
      }

      if (skills.length + 1 === 4) {
        setIsDisabled(true);
        
      }
    };


    const handleDeleteSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
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
        setLocation(data.location);
        setLanguage(data.language);
        setWhatsapp_Link(data.whatsapp_link)
        setWebsite_Link(data.website_link)
        setSelectedOption(data.category)
        setPhoneNumber(data.phone_number)
        setNewSkill(data.dskills[0].skill)
        setImage_list(data.images)        
        
        console.log(data.dskills[0].skill);
        console.log(data);


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
        formData.append('location', location)
        formData.append('language', language)
        formData.append('whatsapp_link', whatsapp_link)
        formData.append('phone_number', phone_number)
        formData.append('website_link', website_link)
        formData.append('skills_list', skills)

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
                console.log(data);
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

  return (

    <div>

        {isLoading2 === true ? 
      
            (<Loader />) : (


            <div className='lg:p-20 lg:pt-28 lg:pl-[18rem] p-5 pt-20'>

                <div className='flex 2xl:gap-10 gap-5 pb-10'>
                    <button onClick={showOne} className={showEachState === 1 ?'border-b-2 border-b-accent 2xl:text-sm text-xs flex items-center 2xl:gap-3 gap-2 text-accent pb-1' : '2xl:text-sm text-xs flex items-center 2xl:gap-1 gap-2 pb-1'}><FaUser className='2xl:text-lg'/>Basic</button>
                    <button onClick={showTwo} className={showEachState === 2 ?'border-b-2 border-b-accent 2xl:text-sm text-xs flex items-center 2xl:gap-3 gap-2 text-accent pb-1' : '2xl:text-sm text-xs flex items-center 2xl:gap-1 gap-2 pb-1'}><ImFilePicture className='2xl:text-lg '/>Cover</button>
                    <button onClick={showThree} className={showEachState === 3 ?'border-b-2 border-b-accent 2xl:text-sm text-xs flex items-center 2xl:gap-3 gap-2 text-accent pb-1' : '2xl:text-sm text-xs flex items-center 2xl:gap-1 gap-2 pb-1'}><BsFillCollectionFill className='2xl:text-lg'/>Collections</button>
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
                                <input type="text" 
                                    placeholder="Location e.g #64, grace lane, port harcourt" 
                                    className="input text-xs input-bordered border-neutral-500 w-full max-w-full" 
                                    value={location}
                                    required
                                    onChange={(e)=>setLocation(e.target.value)}
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
                                    <option className='text-xs'>Select Category</option>
                                    <option className='text-xs' value={'DigitalSkills'}>Digital Skills</option>
                                    <option className='text-xs' value={'Non-DigitalSkills'}>Non-Digital Skills</option>
                                </select>
                            </div>

                
                            {selectedOption === 'DigitalSkills' && (

                                <div>
                                    <p className="text-xs pb-3">Digital</p>
                                    <select className="select text-xs select-bordered w-full border-neutral-500 max-w-full" required value={digital_skills} onChange={(e)=>setDigitalSkills(e.target.value)}>
                                        <option className='text-xs'>Select Digital Skill</option>
                                        <option className='text-xs' value={'BackendDevelopment'}>Backend Development</option>
                                        <option className='text-xs' value={'MobileDevelopment'}>Mobile Development</option>
                                        <option className='text-xs' value={'UI/UX_Design'}>UI/UX</option>
                                        <option className='text-xs' value={'Graphics_Design'}>Graphic Design</option>
                                        <option className='text-xs' value={'Content_Creation'}>Content Creation</option>
                                        <option className='text-xs' value={'Frontend_Development'}>Frontend Development</option>
                                    </select>
                                </div>
                            ) }
                            
                            {selectedOption === 'Non-DigitalSkills' && (

                                <div>
                                    <p className="text-xs pb-3">Non-Digital</p>
                                    <select className="select text-xs select-bordered w-full max-w-full border-neutral-500" value={nondigital_skills} onChange={(e)=>setNondigital_Skills(e.target.value)}>
                                        <option className='text-xs'>Select Non-Digital Skill</option>
                                        <option className='text-xs' value={'Plumbing'}>Plumbing</option>
                                        <option className='text-xs' value={'Catering'}>Catering</option>   
                                        <option className='text-xs' value={'Hair_Stylist'}>Hair Stylist</option>
                                        <option className='text-xs' value={'Electronics/Repairs'}>Electronics/Repairs</option>
                                        <option className='text-xs' value={'Furniture-Making'}>Furniture Making</option>
                                        <option className='text-xs' value={'Cobbling'}>Cobbling</option>
                                        <option className='text-xs' value={'Mechanic'}>Mechanic</option>
                                        <option className='text-xs' value={'Fashion-Designer'}>Fashion Designing</option>
                                    </select>
                                </div>
                            )}




                            <div>
                                <p className="text-xs pb-3">Whatsapp</p>
                                <input 
                                    type="text" 
                                    placeholder="whatsapp e.g https://example.com" 
                                    value={whatsapp_link}
                                    required
                                    onChange={(e)=>setWhatsapp_Link(e.target.value)}
                                    className="input text-xs input-bordered w-full max-w-full border-neutral-500" />
                            </div>


                            <div>
                                <p className="text-xs pb-3">Phone</p>
                                <input 
                                    type="number" 
                                    placeholder="phone e.g 08094422807" 
                                    required
                                    value={phone_number}
                                    onChange={(e)=>setPhoneNumber(e.target.value)}
                                    className="input text-xs input-bordered w-full max-w-full border-neutral-500" />
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
                                <p className="text-xs pb-3">Skills - (Maximum 4 skills)</p>
                                <div className='relative'>
                                    <input 
                                        type="text" 
                                        placeholder="skills e.g Finishing, Javascript, etc"  
                                        className="input text-xs input-bordered w-full max-w-full border-neutral-500" 
                                        required
                                        value={newSkill}
                                        onChange={handleInputChange}
                                        disabled={isDisabled}
                                    />
                                    
                                    <p onClick={addSkill}  className='bg-black text-white absolute right-3 top-2 py-2 px-2 rounded-md cursor-pointer text-sm'><FaPlus /></p>
                                    
                                </div>

                                <ul className='flex flex-row flex-wrap gap-2 py-2'>
                                    {skills.map((skill, index)=>(
                                        <li key={index} className='bg-neutral-200 w-fit rounded-md py-2 px-4 text-xs flex items-center lg:gap-3 gap-2'>{skill} <IoCloseSharp onClick={() => handleDeleteSkill(index)} className='cursor-pointer text-red-700 ml-auto'/></li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <p className="text-xs pb-3">Bio</p>
                                <textarea 
                                    className="textarea textarea-bordered w-full border-neutral-500 max-w-full min-h-[6rem] max-h-[6rem] h-[6rem]" 
                                    placeholder="Bio"
                                    value={about}
                                    required
                                    onChange={(e)=>setAbout(e.target.value)}
                                ></textarea>
                            </div>

                            <button className="btn 2xl:w-fit xl:w-fit lg:w-fit md:w-fit w-full mt-5 px-20 bg-black hover:bg-neutral-800 text-white ">{isLoading === true ? <span class="loader"></span> : 'Submit' }</button>

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
                    />
                )}


                {showEachState === 3 && (
                    <CreativeProfileCollection 
                        IoCloseSharp={IoCloseSharp}
                    />
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

                            <Link to={'/creative-dashboard-profile'}>
                                <button className="btn btn-active text-xs btn-neutral w-9/12 justify-center m-auto mt-8 flex items-center gap-4">Continue <FaArrowRight /></button>
                            </Link>
                        </div>
                    </div>
                </dialog>

            </div>
            ) 
        }
    </div>
  )
}

