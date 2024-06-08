import React, { useState } from 'react'
import vd1 from '../Images/dribbble.mp4'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { BASE_URL } from '../Auth/BaseUrl'
import { jwtDecode } from "jwt-decode";

const LoginCom = () => {

  const navigate = useNavigate()
  let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
  console.log(userToken);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState('')
  const [show, setShow] = useState(false)


  const url =`${BASE_URL}/api/token/`

  const handleLogin = async (e) => {

    e.preventDefault();
    setIsLoading(true)
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },

            body : JSON.stringify({
                email,
                password,
            })
            
        })

        if(res.ok){
          const data = await res.json();
          console.log(data);
          localStorage.setItem('token', JSON.stringify(data))
          setIsLoading(false)
          const userToken = data.access ? jwtDecode(data.access) : null;
          if(userToken.role === 'Creative'){
            navigate('/creative-dashboard-home')
          }
          
          else if(userToken.role === 'Client'){
            navigate('/user-dashboard-home')
          }
        }

        else{
          console.log('There was an error');
          setIsLoading(false)
        }

    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div class="bg-white flex lg:flex-row flex-col justify-center items-center lg:h-screen lg:pt-0 ">

      <div class="lg:w-1/2 w-full lg:h-screen h-[45vh]  lg:block">
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
        <h1 class="text-xl font-semibold mb-4">Login</h1>

        <form  className='flex flex-col gap-5' onSubmit={handleLogin}>

        <div>
          <input 
            type="text" 
            placeholder="Enter Email" 
            className="input input-bordered w-full text-xs py-6 rounded-md" required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}

          />
        </div>

        <div className='relative'>
          <input 
            type={show === true ? "text" : "password"} 
            placeholder="Enter Password" 
            className="input input-bordered w-full text-xs py-6 rounded-md" 
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <div className='flex items-center absolute right-5 top-4 text-lg cursor-pointer'>

            {show === true ? <p onClick={()=>setShow(false)}><FaEyeSlash /></p> : <p onClick={()=>setShow(true)}><FaEye /></p>}
          
          </div>
        </div>



        <div className='flex'>
          <button className="btn hover:bg-neutral-900 bg-black text-white w-full">{isLoading === true ? 'Loading . . ' : 'Login'}</button>
        </div>

          <button className='mr-auto text-sm pt-5'>Dont have account? <Link to={'/register'}><span className='text-accent'> Register</span></Link> </button>
        </form>

      </div>

    </div>
  )
}

export default LoginCom