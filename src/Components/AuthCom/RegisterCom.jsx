import React, { useState } from 'react'
import vd1 from '../Images/integrations.mp4'
import { Link, useNavigate } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BASE_URL } from '../Auth/BaseUrl';
import { FaArrowAltCircleLeft } from "react-icons/fa";

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
    setRole('Client');
  };

  const handleClick2 = () => {
    setRole('Creative');
  };

  return (
    <div class="bg-white flex lg:flex-row flex-col justify-center 2xl:items-center 2xl:h-screen lg:pt-0 pt-[2rem]">

    <div class="lg:w-1/2 w-full bg-neutral-300 lg:h-screen h-[30vh] 2xl:block xl:hidden lg:hidden hidden">
      <video 
          src={'https://res.cloudinary.com/dphb7gqus/video/upload/v1722106065/mypics/dribbble_lfe49k.mp4'}
          autoPlay 
          controls={false} 
          muted loop
          preload="auto" 
          className='w-full object-cover h-full'

        />
    </div>

    <div class="2xl:p-20 xl:p-36 lg:p-36 xl:pt-[5rem] lg:pt-[5rem]  p-8 px-5 w-full 2xl:w-1/2 xl:w-3/4 lg:w-full">
      <Link to={'/'}><p className='text-2xl cursor-pointer pb-10'><FaArrowAltCircleLeft /></p></Link>
      <h1 class="text-2xl font-semibold mb-4">Register</h1>
      
      <form action="" className=' flex flex-col gap-5 w-full' onSubmit={handleRegister}>

        <div className='flex lg:flex-row flex-col gap-3 items-end'>

          <span onClick={handleClick1} className='flex lg:w-full w-full 2xl:text-xl xl:text-lg lg:text-lg font-bold  text-lg cursor-pointer bg-green-50 items-center gap-3 border border-green-200 py-3 px-3 rounded-md text-black'>
            Hire a Skilled Talent 
            <input 
              type="radio" 
              name="radio-2" 
              className="radio radio-accent 2xl:w-[1.5rem] xl:w-[1.2rem] lg:w-[1.1rem] w-[1.5rem] ml-auto 2xl:h-[1.5rem] xl:h-[1.2rem] lg:h-[1.1rem] h-[1.5rem] " 
              value="Client"
              checked={role === 'Client'}
              onChange={(e)=>setRole(e.target.value)}
              required
            />
          </span>


          <span onClick={handleClick2} className='flex lg:w-full w-full 2xl:text-xl xl:text-lg lg:text-lg font-bold  text-lg cursor-pointer bg-red-50 items-center gap-2 border border-red-200 py-3 px-3 rounded-md text-black'>
            Render a service
            <input 
              type="radio" 
              name="radio-2" 
              className="radio radio-accent 2xl:w-[1.5rem] xl:w-[1.2rem] lg:w-[1.1rem] w-[1.5rem] ml-auto 2xl:h-[1.5rem] xl:h-[1.2rem] lg:h-[1.1rem] h-[1.5rem] " 
              value="Creative"
              checked={role === 'Creative'}
              onChange={(e)=>setRole(e.target.value)}
              required
            />
          </span>

        </div>


        <div>
          <input 
            type="text" 
            placeholder="Fullname e.g Chidi Obi" 
            className="input input-bordered w-full text-sm py-7 rounded-md" required
            value={fullname}
            onChange={(e)=>setfullName(e.target.value)}
          />
        </div>

        <div>
          <input 
            type="email" 
            placeholder="Email Address e.g joe@gmail.com"  
            className="input input-bordered w-full text-sm py-7 rounded-md" required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className='relative'>
          <input 
            type={show === true ? "text" : "password"} 
            placeholder="Password e.g @John6431" 
            className="input input-bordered w-full text-sm py-7 rounded-md" 
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <div className='flex items-center absolute right-5 top-4 text-lg cursor-pointer'>

            {show === true ? <p onClick={()=>setShow(false)}><FaEyeSlash /></p> : <p onClick={()=>setShow(true)}><FaEye /></p>}
          
          </div>
        </div>

        <div className='lg:text-xs text-justify text-xs flex flex-col gap-3 text-neutral-400'>
          <p>Password must contain a special character (e.g @, $, #) ,   
            Capital letter (e.g A, B, C) , 
            lowercase letter (e.g a, b, c) ,  numbers (e.g 1, 2, 3)
          </p>
          <p>Password must be at least 8 characters long</p>
        </div>

        <p className='text-xs text-red-500'>{error}</p>
        <p className='text-xs text-red-500'>{error2}</p>

        <div className='flex'>
          <button type='submit' 
            className="btn hover:bg-neutral-900 rounded-full bg-black text-white w-full">
              {isLoading === true ? <span class="loader"></span> : 'Register'}
          </button>
        </div>

        <button className='mr-auto lg:text-lg text-sm'>Dont have account? <Link to={'/login'}><span className='text-green-500 font-bold pl-5 underline'> Login</span></Link> </button>

      </form>
    </div>

  </div>
  )
}

export default RegisterCom




















