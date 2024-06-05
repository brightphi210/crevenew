import React, { useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'

import { IoMdArrowRoundForward } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";


import img1 from '../Images/item6.jpg'
import img2 from '../Images/item5.jpg'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

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
  return (
    <div className='lg:p-20 lg:pt-28 lg:pl-[18rem] p-5 pt-20'>
      <form action="" className='flex lg:flex-row flex-col-reverse lg:gap-32 gap-5'>
        <div className='lg:w-1/2 w-full flex flex-col gap-5'>


            <div>
                <p className="text-xs pb-3">Work Type</p>
                <select className="select text-xs select-bordered w-full max-w-full">
                    <option className='text-xs'>Remote</option>
                    <option className='text-xs'>Hybrid</option>
                    <option className='text-xs'>Onsite</option>
                </select>
            </div>
            

            <div>
                <p className="text-xs pb-3">Location</p>
                <input type="text" 
                    placeholder="Location e.g #64, grace lane, port harcourt" 
                    className="input text-xs input-bordered w-full max-w-full" 
                />
            </div>

            <div>
                <p className="text-xs pb-3">Language</p>
                <select className="select text-xs select-bordered w-full max-w-full">
                    <option className='text-xs'>English</option>
                    <option className='text-xs'>French</option>
                    <option className='text-xs'>Spanish</option>
                </select>
            </div>

            <div>
                <p className="text-xs pb-3">Category</p>
                <select className="select text-xs select-bordered w-full max-w-full">
                    <option className='text-xs'>Digital Skills</option>
                    <option className='text-xs'>Non-Digital Skills</option>
                </select>
            </div>

 


            <div>
                <p className="text-xs pb-3">Digital</p>
                <select className="select text-xs select-bordered w-full max-w-full">
                    <option className='text-xs'>Backend Development</option>
                    <option className='text-xs'>Mobile Development</option>
                    <option className='text-xs'>UI/UX</option>
                    <option className='text-xs'>Graphic Design</option>
                    <option className='text-xs'>Content Creation</option>
                    <option className='text-xs'>Frontend Development</option>
                </select>
            </div>

            <div>
                <p className="text-xs pb-3">Non-Digital</p>
                <select className="select text-xs select-bordered w-full max-w-full">
                    <option className='text-xs'>Plumbing</option>
                    <option className='text-xs'>Catering</option>
                    <option className='text-xs'>Hair Stylist</option>
                    <option className='text-xs'>Electronics/Repairs</option>
                    <option className='text-xs'>Cobbling</option>
                    <option className='text-xs'>Mechanic</option>
                    <option className='text-xs'>Fashion Designing</option>
                    <option className='text-xs'>Furniture Making</option>
                </select>
            </div>


            <div>
                <p className="text-xs pb-3">Whatsapp</p>
                <input 
                    type="text" 
                    placeholder="whatsapp e.g 08094422807" 
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
                    className="input text-xs input-bordered w-full max-w-full" />
            </div>


            <div>
                <p className="text-xs pb-3">Profession</p>
                <input 
                    type="text" 
                    placeholder="profession e.g Senior Furniture Maker"  
                    className="input text-xs input-bordered w-full max-w-full" />
            </div>


            <div>
                <p className="text-xs pb-3">Price</p>
                <input 
                    type="number" 
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
                <p className="text-xs pb-3">Skills - (Maximum 4 Images)</p>
                <input type="file" className="file-input file-input-bordered w-full max-w-full text-xs " />
                <div className='mt-4 lg:flex grid grid-cols-3 gap-2'>
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
                </div>
            </div>

            <div>
                <p className="text-xs pb-3">Bio</p>
                <textarea className="textarea textarea-bordered w-full max-w-full min-h-[8rem] max-h-[8rem] h-[8rem]" placeholder="Bio"></textarea>
            </div>
        </div>

      </form>
    </div>
  )
}

