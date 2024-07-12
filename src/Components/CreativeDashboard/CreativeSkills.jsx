

import React,{useEffect, useState} from 'react'
import { FaPlus } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { BASE_URL } from '../Auth/BaseUrl';
import { jwtDecode } from 'jwt-decode';
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

    const handleSkillPost = (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${authUser.access}`,
                },
                body: JSON.stringify({'skills_list': skills}),
            })

            if (response.ok) {
                console.log('Skills added successfully');
                setIsLoading(false);
            } 
            else {
                console.error('Failed to add skills');
                setIsLoading(false);
            }
        } catch (error) {
            console.log('There was an error');
        }
    }


    console.log(skills);

  return (
    <div className=''>

        <h2 className='text-xl'>My Skills</h2>
        <div className='flex justify-center items-center h-[50vh]'>
            <div>
                <p className='text-sm pb-3'>No Skill Please add skills</p>
                <button className="bg-black py-3 px-8 text-white rounded-full text-sm flex m-auto" onClick={()=>document.getElementById('my_modal_3').showModal()}>Add Skill</button>
            </div>
        </div>
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box h-[40rem] p-5 rounded-md">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>


                <h3 className="font-bold text-2xl pt-10">Add your skill</h3>
                <form  onSubmit={handleSkillPost} className='w-full'>
                    <p className="text-xs py-3">Maximum of 8 skills</p>

                    <div className='relative'>
                        <input 
                            type="text" 
                            placeholder="skills e.g Finishing, Javascript, etc"  
                            className="input text-xs input-bordered w-full max-w-full border-neutral-500" 
                            value={newSkill}
                            onChange={handleInputChange}
                            disabled={isDisabled}
                        />

                        <p onClick={addSkill}  className='bg-black text-white absolute right-3 top-2 py-2 px-2 rounded-full cursor-pointer text-sm'><FaPlus /></p>
                    </div>


                    <ul className='flex flex-row flex-wrap gap-2 py-2 mt-5'>
                        {skills.map((skill, index)=>(
                            <li key={index} className='bg-neutral-200 w-fit rounded-md py-2 px-4 lg:text-sm text-xs flex items-center lg:gap-3 gap-2'>{skill} <IoCloseSharp onClick={() => handleDeleteSkill(index)} className='cursor-pointer text-red-700 ml-auto'/></li>
                        ))}
                    </ul>

                    <button disabled={skills.length === 0} className="btn w-full mt-5 bg-black text-sm rounded-full hover:bg-neutral-800 text-white ">{isLoading === true ? <span class="loader"></span> : 'Submit' }</button>
                </form>
            </div>
        </dialog>
    </div>
  )
}

export default CreativeSkills
