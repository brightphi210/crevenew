import React, { useState } from 'react'
import vd1 from '../Images/integrations.mp4'
import { Link, useNavigate } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BASE_URL } from '../Auth/BaseUrl';

const RegisterCom = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setfullName] = useState('')
  const [role, setRole] = useState('')

  const [error, setError] = useState('')
  const [error2, setError2] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [show, setShow] = useState(false)

  const url = `${BASE_URL}/auth/`
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          fullname,
          role
        })
      })
  
      if (response.ok || response.status === 201) {
        const data = await response.json()
        console.log(data);
        setIsLoading(false)
        navigate('/otp')
        localStorage.setItem('userData', JSON.stringify(data))
      } else {
        setIsLoading(false)
        const data = await response.json()
        console.log(data);
        setError(data.password)
        setError2(data.email)
        console.log('There was an error');
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }



  const handleClick1 = () => {
    setRole('Creative');
  };

  const handleClick2 = () => {
    setRole('Client');
  };

  return (
    <div class="bg-white flex lg:flex-row flex-col justify-center items-center lg:h-screen lg:pt-0 ">

    <div class="lg:w-1/2 w-full lg:h-screen h-[30vh] lg:block">
      <video 
          src={vd1}
          autoPlay 
          controls={false} 
          muted loop
          preload="auto" 
          className='w-full object-cover h-full'

        />
    </div>

    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 class="text-2xl font-semibold mb-4">Register</h1>
      
      <form action="" className=' flex flex-col gap-5 w-full' onSubmit={handleRegister}>

        <div className='flex lg:flex-row flex-col gap-3 items-end'>

          <span onClick={handleClick1} className='flex lg:w-full w-full 2xl:text-lg xl:text-xs lg:text-xs  text-sm cursor-pointer bg-neutral-100 items-center gap-3 border border-neutral-200 py-3 px-3 rounded-md text-black'>
            Join to Provide a Service
            <input 
              type="radio" 
              name="radio-2" 
              className="radio radio-accent 2xl:w-[1.5rem] xl:w-[1.2rem] lg:w-[1.1rem] w-[1.rem] ml-auto 2xl:h-[1.5rem] xl:h-[1.2rem] lg:h-[1.1rem] h-[1.5rem] " 
              value="Creative"
              checked={role === 'Creative'}
              onChange={(e)=>setRole(e.target.value)}
              required
            />
          </span>


          <span onClick={handleClick2} className='flex lg:w-full w-full 2xl:text-lg xl:text-xs lg:text-xs text-sm cursor-pointer bg-neutral-100 items-center gap-2 border border-neutral-200 py-3 px-3 rounded-md text-black'>
            Join to Hire Someone 
            <input 
              type="radio" 
              name="radio-2" 
              className="radio radio-accent 2xl:w-[1.5rem] xl:w-[1.2rem] lg:w-[1.1rem] w-[1.rem] ml-auto 2xl:h-[1.5rem] xl:h-[1.2rem] lg:h-[1.1rem] h-[1.5rem] " 
              value="Client"
              checked={role === 'Client'}
              onChange={(e)=>setRole(e.target.value)}
              required
            />
          </span>

        </div>


        <div>
          <input 
            type="text" 
            placeholder="Enter Fullname" 
            className="input input-bordered w-full text-sm py-6 rounded-md" required
            value={fullname}
            onChange={(e)=>setfullName(e.target.value)}
          />
        </div>

        <div>
          <input 
            type="email" 
            placeholder="Enter Email" 
            className="input input-bordered w-full text-sm py-6 rounded-md" required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className='relative'>
          <input 
            type={show === true ? "text" : "password"} 
            placeholder="Enter Password" 
            className="input input-bordered w-full text-sm py-6 rounded-md" 
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <div className='flex items-center absolute right-5 top-4 text-lg cursor-pointer'>

            {show === true ? <p onClick={()=>setShow(false)}><FaEyeSlash /></p> : <p onClick={()=>setShow(true)}><FaEye /></p>}
          
          </div>
        </div>


        <p className='text-xs text-red-500'>{error}</p>
        <p className='text-xs text-red-500'>{error2}</p>

        <div className='flex'>
          <button type='submit' 
            className="btn hover:bg-neutral-900 bg-black text-white w-full">
              {isLoading === true ? <span class="loader"></span> : 'Register'}
          </button>
        </div>

        <button className='mr-auto text-sm'>Dont have account? <Link to={'/login'}><span className='text-accent'> Login</span></Link> </button>

      </form>
    </div>

  </div>
  )
}

export default RegisterCom




















