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
import { FaArrowRight } from "react-icons/fa6";

import successImg from '../Images/gif1.gif'
import { Link } from 'react-router-dom';
import Loader from '../Loader';

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

    const url =`${BASE_URL}/creativeprofile/${userToken.profile_id}/`

    const [fileName, setFileName] = useState('') 
    const [coverImage, setCoverImage] = useState(null) 


    const [selectedOption, setSelectedOption] = useState('')

    const handleShowDigital = (e) =>{
        setSelectedOption(e.target.value)
    }

 
    const [images_list, setImage_list] = useState([]) 
    const [previewUrls, setPreviewUrls] = useState([]);
  
    const handlePostImage = (event) => {
      const files = Array.from(event.target.files);

      if (images_list.length + files.length > 4) {
        alert('Max of four images')
        return;
      }

      setImage_list((prevImages) => [...prevImages, ...files]);  
      const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    };



    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
  
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

    // console.log(skills);



    const handleDeleteImage = (index) => {
        setImage_list((prevImages) => prevImages.filter((_, i) => i !== index));
        setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    };

    
    const [digital_skills, setDigitalSkills] = useState('')
    const [work_type, setWorkType] = useState('')
    const [cover_image, setCover_Image] = useState(null)
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


    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)

    const [success, setSuccess] = useState(false)


    const [message, setMessage] = useState(false)

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
        setCover_Image(data.cover_image);
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


        } catch (error) {
            console.log(error);
        } finally {
        setIsLoading2(false);
        }
    };


    useEffect(() => {
        fetchProfile();
    }, []);
    

    const handleProfileUpdate = async (e) =>{
        setIsLoading(true)
        e.preventDefault() 

        const formData = new FormData()
        formData.append('digital_skills', digital_skills)
        formData.append('work_type', work_type)
        formData.append('cover_image', cover_image)
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



  return (

    <div>

        {isLoading2 === true ? 
      
            (<Loader />) : (


            <div className='lg:p-20 lg:pt-28 lg:pl-[18rem] p-5 pt-20'>
                <form action="" className='flex lg:flex-row flex-col-reverse lg:gap-14 gap-5 relative' onSubmit={handleProfileUpdate}>
                    <div className='lg:w-1/2 w-full flex flex-col gap-5'>


                        <div>
                            <p className="text-xs pb-3">Work Type</p>
                            <select className="select text-xs select-bordered w-full max-w-full" 
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
                                className="input text-xs input-bordered w-full max-w-full" 
                                value={location}
                                required
                                onChange={(e)=>setLocation(e.target.value)}
                            />
                        </div>

                        <div>
                            <p className="text-xs pb-3">Language</p>
                            <input type="text" 
                                placeholder="Language e.g English, French etc." 
                                className="input text-xs input-bordered w-full max-w-full" 
                                value={language}
                                required
                                onChange={(e)=>setLanguage(e.target.value)}
                            />
                        </div>

                        <div>
                            <p className="text-xs pb-3">Category</p>
                            <select className="select text-xs  select-bordered w-full max-w-full"  value={selectedOption} onChange={handleShowDigital}>
                                <option className='text-xs'>Select Category</option>
                                <option className='text-xs' value={'DigitalSkills'}>Digital Skills</option>
                                <option className='text-xs' value={'Non-DigitalSkills'}>Non-Digital Skills</option>
                            </select>
                        </div>

            
                        {selectedOption === 'DigitalSkills' && (

                            <div>
                                <p className="text-xs pb-3">Digital</p>
                                <select className="select text-xs select-bordered w-full max-w-full" required value={digital_skills} onChange={(e)=>setDigitalSkills(e.target.value)}>
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
                                <select className="select text-xs select-bordered w-full max-w-full" value={nondigital_skills} onChange={(e)=>setNondigital_Skills(e.target.value)}>
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
                                className="input text-xs input-bordered w-full max-w-full" />
                        </div>


                        <div>
                            <p className="text-xs pb-3">Phone</p>
                            <input 
                                type="number" 
                                placeholder="phone e.g 08094422807" 
                                required
                                value={phone_number}
                                onChange={(e)=>setPhoneNumber(e.target.value)}
                                className="input text-xs input-bordered w-full max-w-full" />
                        </div>


                        <div>
                            <p className="text-xs pb-3">Website - Optional</p>
                            <input 
                                type="text" 
                                placeholder="website e.g https://example.com"  
                                value={website_link}
                                onChange={(e)=>setWebsite_Link(e.target.value)}
                                className="input text-xs input-bordered w-full max-w-full" />
                        </div>


                        <div>
                            <p className="text-xs pb-3">Profession</p>
                            <input 
                                type="text" 
                                required
                                value={display_name}
                                onChange={(e)=>setDisplay_Name(e.target.value)}
                                placeholder="profession e.g Senior Furniture Maker"  
                                className="input text-xs input-bordered w-full max-w-full" />
                        </div>


                        <div>
                            <p className="text-xs pb-3">Price</p>
                            <input 
                                type="number" 
                                value={starting_price}
                                required
                                onChange={(e)=>setStarting_Price(e.target.value)}
                                placeholder="starting price e.g 5,000"  
                                className="input text-xs input-bordered w-full max-w-full" />
                        </div>


                        <button className="btn w-full bg-black text-white mt-5">{isLoading === true ? 'Loading . .' : 'Submit' }</button>
                
                    </div>

                    <div className='lg:w-1/2 w-full flex flex-col gap-5'>

                        <div >
                            <p className="text-xs pb-3">Cover Image</p>

                            <div onClick={()=> document.querySelector(".input-field").click()} className='relative'>
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

                                {image ? 
                                    <div className='w-full h-[20rem] overflow-hidden rounded-xl'>
                                        <img src={image} alt='' className='w-full'/> 
                                    </div>

                                    : 
                                    <div className='w-full h-[20rem] flex justify-center items-center cursor-pointer border border-neutral-300 rounded-lg'>
                                        <div className=''>
                                            <p className='flex justify-center'><AiOutlineCloudUpload /></p>
                                            <p>Upload Cover Image </p>
                                        </div>
                                    </div>
                                }
            
                            </div>


                            {image && (
                                <p onClick={()=>{
                                    setFileName("No Selected File Name")
                                    setImage(null)
                                }} className=' absolute ml-auto cursor-pointer top-10 right-5 bg-white border border-neutral-100 w-fit flex items-center justify-center p-3 rounded-full text-red-500 shadow-md'>
                                    <MdDelete  className=' text-xl'/>
                                </p>
                            )}


                        </div>

                        <div>
                            <p className="text-xs pb-3">Skills - (Maximum 4 skills)</p>
                            <div className='relative'>
                                <input 
                                    type="text" 
                                    placeholder="skills e.g Finishing, Javascript, etc"  
                                    className="input text-xs input-bordered w-full max-w-full" 
                                    required
                                    value={newSkill}
                                    onChange={handleInputChange}
                                    disabled={isDisabled}
                                />
                                
                                <p onClick={addSkill}  className='bg-black text-white absolute right-3 top-2 py-2 px-3 rounded-md cursor-pointer'><IoMdArrowRoundForward /></p>
                                
                            </div>

                            <ul className='flex flex-row flex-wrap gap-2 py-5'>
                                {skills.map((skill, index)=>(
                                    <li key={index} className='bg-neutral-200 w-fit rounded-md py-2 px-4 text-xs flex items-center lg:gap-3 gap-2'>{skill} <IoCloseSharp onClick={() => handleDeleteSkill(index)} className='cursor-pointer text-red-700 ml-auto'/></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="text-xs pb-3">Images - (Maximum 4 Images)</p>
                            <input type="file" required multiple className="file-input file-input-bordered w-full text-xs" onChange={handlePostImage}/>
                
                            <div className='mt-4 lg:flex grid grid-cols-2 gap-2 '>
                                {previewUrls.map((url, index) => (
                                    <div className='2xl:w-[6rem] w-full 2xl:h-[4rem] xl:h-[4rem]  lg:h-[4rem]  h-[8rem] bg-slate-200 overflow-hidden relative rounded-lg '>
                                        <img key={index} src={url} alt={`Preview ${index}`} className='rounded-sm 2xl:w-full w-full 2xl:h-[4rem] xl:h-[4rem] lg:h-[4rem]   object-cover' />
                                        <p onClick={() => handleDeleteImage(index)} className='absolute bg-white top-1 right-1 flex justify-center items-center p-1 rounded-full'><IoCloseSharp className='cursor-pointer lg:text-md text-xs text-red-700'/></p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs pb-3">Bio</p>
                            <textarea 
                                className="textarea textarea-bordered w-full max-w-full min-h-[8rem] max-h-[8rem] h-[8rem]" 
                                placeholder="Bio"
                                value={about}
                                required
                                onChange={(e)=>setAbout(e.target.value)}
                            ></textarea>
                        </div>
                    </div>


                    {message === true ? (

                        <div role="alert" className="alert alert-error flex py-3 rounded-lg fixed top-[5rem] lg:right-[5rem] right-5 w-fit px-10">
                            <svg onClick={()=>setMessage(false)} xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className='text-white text-xs'>Please fill out proper details</span>
                        </div>
                    ) : ( '')}

                </form>


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

