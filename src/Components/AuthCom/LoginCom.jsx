import React, { useEffect, useState } from 'react'
import vd1 from '../Images/dribbble.mp4'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { BASE_URL } from '../Auth/BaseUrl'
import { jwtDecode } from "jwt-decode";


import { validationSchema } from './Validate'
import { useFormik } from 'formik';

const LoginCom = () => {

  const navigate = useNavigate()
  let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  const userToken = authUser?.access ? jwtDecode(authUser.access) : null;
  // console.log(userToken);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)


  


  const url =`${BASE_URL}/api/token/`

  const handleLogin = async (e) => {

    setIsLoading(true)
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
            },

            body : JSON.stringify({
                email : values.email,
                password : values.password,
            })
            
        })

        if(res.ok){
          const data = await res.json();
          console.log(data);
          localStorage.setItem('token', JSON.stringify(data))
          setIsLoading(false)
          const userToken = data.access ? jwtDecode(data.access) : null;
          setShowSuccess(true)
          if(userToken.role === 'Creative'){
            setTimeout(() => {
              navigate('/creative-dashboard-home')
          }, 1000);
          }
          
          else if(userToken.role === 'Client'){
            navigate('/user-dashboard-home')
          }
        }

        else{

          const data = await res.json();
          console.log(data);
          console.log('There was an error');
          setIsLoading(false)
          setError(data.detail)
          setShowError(true)
        }
          
        } catch (error) {
            console.log(error);
            setError(error)
        }
  }

  const {values, errors, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues :{
        email: '',
        password: '',
    },

    validationSchema : validationSchema,
    onSubmit: handleLogin,
})



    useEffect(() => {
      if(showError){
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
      }
    }, [showError]);

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

      <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 relative">
        <h1 class="text-xl font-semibold mb-4">Login</h1>
        <div>

          {showError === true && (
            
            <div role="alert" data-aos="fade-up" data-aos-duration="500" className="alert alert-error absolute lg:top-0 top-[-10px] lg:w-fit w-fit m-auto right-0 left-0 p-5 text-white h-[2rem] flex items-center justify-center rounded-3xl lg:text-sm text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="lg:h-6 w-4 lg:w-6 h-4 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Invalid Credentials</span>
            </div>
          )}
          
           {showSuccess === true && (

            <div role="alert" data-aos="fade-up" data-aos-duration="500" className="alert alert-success absolute lg:top-0 top-[-10px] lg:w-fit w-fit m-auto right-0 left-0 p-5 text-white h-[2rem] flex items-center justify-center rounded-3xl lg:text-sm text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Login Successful</span>
            </div>
          )}
        </div>

        <form  className='flex flex-col gap-5' onSubmit={handleSubmit}>

        <div>
          <input 
            type="text" 
            placeholder="Enter Email" 
            className="input input-bordered w-full text-sm py-6 rounded-md" 
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name='email'

          />
          {errors.email && <p className="text-red-400 pt-3 text-xs font-normal">{errors.email}</p>}
        </div>

        <div className='relative'>
          <input 
            type={show === true ? "text" : "password"} 
            placeholder="Enter Password" 
            className="input input-bordered w-full text-sm py-6 rounded-md" 
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            name='password'
          />
          <div className='flex items-center absolute right-5 top-4 text-lg cursor-pointer'>

            {show === true ? <p onClick={()=>setShow(false)}><FaEyeSlash /></p> : <p onClick={()=>setShow(true)}><FaEye /></p>}
          
          </div>
          {errors.password && <p className="text-red-400 pt-3 text-xs font-normal">{errors.password}</p>}
        </div>

        


        <div className='flex'>
          <button type="submit" className="btn hover:bg-neutral-900 bg-black text-white w-full">{isLoading === true ? <span class="loader"></span> : 'Login'}</button>
        </div>

          <button className='mr-auto text-sm pt-5' >Dont have account? <Link to={'/register'}><span className='text-accent'> Register</span></Link> </button>
        </form>

      </div>

    </div>
  )
}

export default LoginCom