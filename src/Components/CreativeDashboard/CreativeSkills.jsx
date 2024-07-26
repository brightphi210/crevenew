

import React,{useEffect, useState} from 'react'
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { LuAlertTriangle } from "react-icons/lu";
import { MdAdd } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import successImg from '../Images/gif1.gif'
import MyLoader from '../allLoadingState/MyLoader';

const CreativeSkills = () => {

    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [isDisabled2, setIsDisabled2] = useState(false);


    const handleInputChange = (e) => {
        setNewSkill(e.target.value);
    };

    const addSkill = () => {
        if (newSkill.trim() !== '' && skills.length < 8) {
            setSkills([...skills, newSkill]);
            setNewSkill('');
        }

        if (skills.length + 1 === 8) {
            setIsDisabled(true);
        }
    };

    const handleDeleteSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
        setIsDisabled(false);
    };


    const [isLoading, setIsLoading] = useState(false)
    const url =`${BASE_URL}/skills/`

    const handleSkillPost = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${authUser.access}`,
                },
                body: JSON.stringify({'skills_list': skills}),
            })
            
                if(!response.ok) {
                    console.error('Failed to add skills');
                    setIsLoading(false);
                }
                console.log(response);

                const responseData = await response.json();
                console.log('Skills added successfully:', responseData);
            

                setIsLoading(false);
                document.getElementById('my_modal_3').close()
                document.getElementById('my_modal_1').showModal()
                // setAllSkills([...allSkills, skill])
        } catch (error) {
            console.log('There was an error');
        }
    }


    const [isLoading2, setIsLoading2] = useState(false)
    const [allSkills, setAllSkills] = useState([])
    const url2 =`${BASE_URL}/skills/`
    const fetchProfile = async () => {
        setIsLoading2(true);
        try {

        const respose = await fetch(url2, {
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
        setAllSkills(data)  
        // console.log('The skills data',data);     

        } catch (error) {
            console.log(error);
        } finally {  
        setIsLoading2(false);
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
            const response = await fetch(`${BASE_URL}/skills/${selectedRequest}/`, {
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
                setAllSkills(prevSkills => prevSkills.filter(allSkills => allSkills.id !== selectedRequest));
                setSelectedRequest(null);
                setIsLoading3(false);
                document.getElementById('my_modal_4').close()
                return;
            }

            const data = await response.json();
            console.log('Delete successful', data);
            setAllSkills(prevSkills => prevSkills.filter(allSkills => allSkills.id !== selectedRequest));
            setSelectedRequest(null);
        } catch (error) {
            console.error('There was a problem with the delete request:', error);
        }
    };

    

  return (
    <div className=''>

        {isLoading2 === true ? 
        <>
          <MyLoader />
        </> : 
        <>


            <div className='flex '>
                <h2 className='text-xl'>My Skills</h2>

                <div className='flex ml-auto gap-2'>

                    {allSkills.length >= 6 || allSkills.length === 0 ? '' : 
                    <button className="bg-neutral-500 py-2.5 px-3.5 text-white rounded-full text-xs flex gap-2 items-center " 
                        onClick={()=>document.getElementById('my_modal_3').showModal()}>Add Skill<MdAdd className='text-sm'/>
                    </button>
                    }
                </div>
            </div>

            
            {allSkills && allSkills.length > 0 ? (
                <div>
                    <ul className='flex flex-row flex-wrap gap-5 py-2 mt-5'>
                        {allSkills.map((skill, index)=>(

                            <div className='flex items-center gap-3 py-2 px-5 border bg-neutral-50 border-neutral-300 rounded-md'>
                                <li  key={index} className=' w-fit   lg:text-sm text-sm flex items-center'>
                                    {skill.skill} 
                                </li>
                                <p className='flex p-2 text-red-600 text-xl cursor-pointer items-center justify-center rounded-full' onClick={() => handleClick(skill.id)} ><VscChromeClose /></p>
                            </div>
                        ))}
                    </ul>
                </div>
            ): 
            
            (
                <div className='flex justify-center items-center h-[50vh]'>
                    <div>
                        <p className='text-sm pb-3'>No Skill Please add skills</p>
                        <button className="bg-black py-3 px-8 text-white rounded-full text-sm flex m-auto" onClick={()=>document.getElementById('my_modal_3').showModal()}>Add Skill</button>
                    </div>
                </div>
            )}
        </>}


        <dialog id="my_modal_3" className="modal">
            <div className="modal-box h-[40rem] p-5 rounded-md">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <h3 className="font-bold text-2xl pt-10">Add your skill</h3>
                <form onSubmit={handleSkillPost}  className='w-full'>
                    <p className="text-xs py-3">Minimum of 2 and maximum of 6 skills</p>

                    <div className='relative'>
                        <input 
                            type="text" 
                            placeholder="skills e.g Finishing, Javascript, etc"  
                            className="input text-xs input-bordered w-full max-w-full border-neutral-500" 
                            value={newSkill}
                            onChange={handleInputChange}
                            disabled={isDisabled}
                        />
                        <p onClick={addSkill}  className='bg-black text-white absolute  top-0 h-full right-0 flex justify-center items-center px-4 rounded-md cursor-pointer text-sm'><FaPlus /></p>
                    </div>


                    <ul className='flex flex-row flex-wrap gap-2 py-2 mt-5'>
                        {skills.map((skill, index)=>(
                            <li key={index} className='bg-neutral-200 w-fit rounded-md py-2 px-4 lg:text-sm text-xs flex items-center lg:gap-3 gap-2'>{skill} <IoCloseSharp onClick={() => handleDeleteSkill(index)} className='cursor-pointer text-red-700 ml-auto'/></li>
                        ))}
                    </ul>

                    <button type='submit' disabled={skills.length < 1 || skills.length > 6} className={`py-3 w-full mt-5 bg-black text-sm rounded-full hover:bg-neutral-800 ${skills.length < 1 || skills.length > 6 ? 'opacity-50 cursor-not-allowed' : ''} text-white `}>
                        {isLoading === true ? <span className="loading loading-spinner loading-xs"></span> : 'Submit' }
                    </button>
                </form>
            </div>
        </dialog>


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


        <dialog id="my_modal_1" className="modal">
            <div className="modal-box  p-0 rounded-md flex justify-center items-center h-[25rem]" >
                <button onClick={()=>{document.getElementById('my_modal_1').close()}} 
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white text-black hover:text-white">✕
                </button>


                <div className=''>
                    <div className='flex m-auto justify-center'>
                        <img src={successImg} alt="" />
                    </div>
                    <h2 className='text-center'>Skills Added </h2>
                    <p className='text-center text-xs'>Your skills has been added, continue </p>

                    <Link to={'/creative-dashboard-profile'}>
                        <button className="btn btn-active text-xs btn-neutral w-9/12 h-0 py-3 px-6 justify-center m-auto mt-8 flex items-center gap-4">Continue <FaArrowRight /></button>
                    </Link>
                </div>
            </div>
        </dialog>
    </div>
  )
}

export default CreativeSkills
