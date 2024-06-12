import React, { useState } from 'react'
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
        <CreatingProfileUpdateHome />
      </div>
    </div>
  )
}

export default CreatingProfileUpdateDashboard




export const CreatingProfileUpdateHome = () => {

    const [image, setImage] = useState(null) 
    const [fileName, setFileName] = useState('') 
    const [coverImage, setCoverImage] = useState(null) 


    const [selectedOption, setSelectedOption] = useState('DigitalSkills')

    const handleShowDigital = (e) =>{
        setSelectedOption(e.target.value)
    }


    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
    // console.log(authUser.access);


    const url =`${BASE_URL}/creativeprofile/${userToken.profile_id}/`


    // "id": 9,
    // "dskills": [],
    // "images": [],
    // "user": "ea955e3c-8b07-4f3e-af1e-60e8a4cc0abb",
    // "digital_skills": null,
    // "work_type": null,
    // "verified": false,
    // "cover_image": "https://creve.store/media/default.png",
    // "summary_of_profile": null,
    // "starting_price": null,
    // "about": null,
    // "nondigital_skills": null,
    // "display_name": null,
    // "category": null,
    // "profile_pics": "https://creve.store/media/default.png",
    // "location": null,
    // "language": null,
    // "whatsapp_link": null,
    // "resume_link": null,
    // "website_link": null

    const [digital_skills, setDigitalSkills] = useState('BackendDevelopment')
    const [work_type, setWorkType] = useState('Remote')
    const [cover_image, setCover_Image] = useState(null)
    const [summary_of_profile, setSummary_Of_Profile] = useState('')
    const [starting_price, setStarting_Price] = useState('')
    const [about, setAbout] = useState('')
    const [nondigital_skills, setNondigital_Skills] = useState('Plumbing')
    const [display_name, setDisplay_Name] = useState('')
    const [location, setLocation] = useState('')
    const [language, setLanguage] = useState('')
    const [whatsapp_link, setWhatsapp_Link] = useState('')
    // const [resume_link, setResume_Link] = useState('')
    const [website_link, setWebsite_Link] = useState('')
    const [dskills, setDskills] = useState([])
    const [images, setImages] = useState([])

    // console.log(cover_image);


    const handleProfileUpdate = async (e) =>{
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
        // formData.append('resume_link', resume_link)
        formData.append('website_link', website_link)
        formData.append('dskills', dskills)
        formData.append('images', images)


        try {
            
            const respose = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization' : `Bearer ${authUser.access}`,
                },
                body: formData
            })
            
            
            const data = await respose.json()
            console.log(data);


        } catch (error) {
            console.log('There was an error', error);
        }
    }


  return (
    <div className='lg:p-20 lg:pt-28 lg:pl-[18rem] p-5 pt-20'>
      <form action="" className='flex lg:flex-row flex-col-reverse lg:gap-32 gap-5' onSubmit={handleProfileUpdate}>
        <div className='lg:w-1/2 w-full flex flex-col gap-5'>


            <div>
                <p className="text-xs pb-3">Work Type</p>
                <select className="select text-xs select-bordered w-full max-w-full" 
                    value={work_type} onChange={(e) =>{setWorkType(e.target.value)}} required>
                    <option className='text-xs' value={'Remote'}>Remote</option>
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
                    onChange={(e)=>setLocation(e.target.value)}
                />
            </div>

            <div>
                <p className="text-xs pb-3">Language</p>
                <input type="text" 
                    placeholder="Language e.g English, French etc." 
                    className="input text-xs input-bordered w-full max-w-full" 
                    value={language}
                    onChange={(e)=>setLanguage(e.target.value)}
                />
            </div>

            <div>
                <p className="text-xs pb-3">Category</p>
                <select className="select text-xs  select-bordered w-full max-w-full" value={selectedOption} onChange={handleShowDigital}>
                    <option className='text-xs' value={'DigitalSkills'}>Digital Skills</option>
                    <option className='text-xs' value={'Non-DigitalSkills'}>Non-Digital Skills</option>
                </select>
            </div>

 
            {selectedOption === 'DigitalSkills' && (

                <div>
                    <p className="text-xs pb-3">Digital</p>
                    <select className="select text-xs select-bordered w-full max-w-full" value={digital_skills} onChange={(e)=>setDigitalSkills(e.target.value)}>
                        <option className='text-xs' value={'BackendDevelopment'}>Backend Development</option>
                        <option className='text-xs' value={'MobileDevelopment'}>Mobile Development</option>
                        <option className='text-xs' value={'UI/UX_Design'}>UI/UX</option>
                        <option className='text-xs' value={'Graphic_Design'}>Graphic Design</option>
                        <option className='text-xs' value={'Content_Creation'}>Content Creation</option>
                        <option className='text-xs' value={'Frontend_Development'}>Frontend Development</option>
                    </select>
                </div>
            ) }
            
            {selectedOption === 'Non-DigitalSkills' && (

                <div>
                    <p className="text-xs pb-3">Non-Digital</p>
                    <select className="select text-xs select-bordered w-full max-w-full" value={nondigital_skills} onChange={(e)=>setNondigital_Skills(e.target.value)}>
                        <option className='text-xs' value={'Plumbing'}>Plumbing</option>
                        <option className='text-xs' value={'Catering'}>Catering</option>   
                        <option className='text-xs' value={'Hair_stylist'}>Hair Stylist</option>
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
                    placeholder="whatsapp e.g 08094422807" 
                    value={whatsapp_link}
                    onChange={(e)=>setWhatsapp_Link(e.target.value)}
                    className="input text-xs input-bordered w-full max-w-full" />
            </div>


            <div>
                <p className="text-xs pb-3">Phone</p>
                <input 
                    type="text" 
                    placeholder="phone e.g 08094422807" 
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
                    onChange={(e)=>setStarting_Price(e.target.value)}
                    placeholder="starting price e.g 5,000"  
                    className="input text-xs input-bordered w-full max-w-full" />
            </div>


            <button className="btn w-full bg-black text-white mt-5">Button</button>
    
        </div>

        <div className='lg:w-1/2 w-full flex flex-col gap-5'>

            <div >
                <p className="text-xs pb-3">Cover Image</p>

                <div onClick={()=> document.querySelector(".input-field").click()} className='relative'>
                    <input type="file" accept='image/*' className='input-field' hidden
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
                    }} className=' absolute ml-auto cursor-pointer top-40 right-28 bg-white border border-neutral-100 w-fit flex items-center justify-center p-3 rounded-full text-red-500 shadow-md'>
                        <MdDelete  className=' text-xl'/>
                    </p>
                )}


            </div>

            <div>
                <p className="text-xs pb-3">Skills - (Maximum 4 skills)</p>
                <div className='relative'>
                    <input 
                        type="text" 
                        placeholder="skills e.g Finishing, Walldrope Maker, etc"  
                        className="input text-xs input-bordered w-full max-w-full" 
                        required
                    />
                    
                    <p className='bg-black text-white absolute right-3 top-2 py-2 px-3 rounded-md cursor-pointer'><IoMdArrowRoundForward /></p>
                    
                </div>

                <ul className='l:flex lg:flex-row grid grid-cols-2 gap-2 mt-4'>
                    <li className='bg-neutral-200 rounded-md py-2 px-4 text-xs flex items-center lg:gap-3 gap-2'>Cobbling <IoCloseSharp className='cursor-pointer text-red-700 ml-auto'/></li>
                    <li className='bg-neutral-200 rounded-md py-2 px-4 text-xs flex items-center lg:gap-3 gap-2'>Skit Maker <IoCloseSharp className='cursor-pointer text-red-700 ml-auto'/></li>
                    <li className='bg-neutral-200 rounded-md py-2 px-4 text-xs flex items-center lg:gap-3 gap-2'>Furniture <IoCloseSharp className='cursor-pointer text-red-700 ml-auto'/></li>
                    <li className='bg-neutral-200 rounded-md py-2 px-4 text-xs flex items-center lg:gap-3 gap-2'>Spraying <IoCloseSharp className='cursor-pointer text-red-700 ml-auto'/></li>
                </ul>
            </div>

            <div>
                <p className="text-xs pb-3">Images - (Maximum 4 Images)</p>
                <MultipleImageUpload />

                {/* <div className='mt-4 lg:flex grid grid-cols-3 gap-2'>
                    <div className='h-[3rem] w-[6rem] relative overflow-hidden rounded-lg'>
                        <img src={img1} alt="" className='w-[10rem] rounded-lg'/>
                        <p className='absolute bg-white top-1 right-1 flex justify-center items-center p-1 rounded-full'><IoCloseSharp className='cursor-pointer lg:text-md text-xs text-red-700'/></p>
                    </div>

                    <div className='h-[3rem] w-[6rem] relative overflow-hidden rounded-lg'>
                        <img src={img2} alt="" className='w-[10rem] rounded-lg'/>
                        <p className='absolute bg-white top-1 right-1 flex justify-center items-center p-1 rounded-full'><IoCloseSharp className='cursor-pointer lg:text-md text-xs text-red-700'/></p>
                    </div>

                    <div className='h-[3rem] w-[6rem] relative overflow-hidden rounded-lg'>
                        <img src={img1} alt="" className='w-[10rem] rounded-lg'/>
                        <p className='absolute bg-white top-1 right-1 flex justify-center items-center p-1 rounded-full'><IoCloseSharp className='cursor-pointer lg:text-md text-xs text-red-700'/></p>
                    </div>

                    <div className='h-[3rem] w-[6rem] relative overflow-hidden rounded-lg'>
                        <img src={img2} alt="" className='w-[10rem] rounded-lg'/>
                        <p className='absolute bg-white top-1 right-1 flex justify-center items-center p-1 rounded-full'><IoCloseSharp className='cursor-pointer lg:text-md text-xs text-red-700'/></p>
                    </div>
                </div> */}
            </div>

            <div>
                <p className="text-xs pb-3">Bio</p>
                <textarea 
                    className="textarea textarea-bordered w-full max-w-full min-h-[8rem] max-h-[8rem] h-[8rem]" 
                    placeholder="Bio"
                    value={about}
                    onChange={(e)=>setAbout(e.target.value)}
                ></textarea>
            </div>
        </div>

      </form>
    </div>
  )
}

