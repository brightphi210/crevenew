import React, { useState } from 'react'
import logo from './Images/Creve.png'
import logo1 from './Images/Creve1.png'
import { MdPeople } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { RxDashboard } from "react-icons/rx";
import { BsDashSquare } from "react-icons/bs";

const Navbar = () => {

    const navigate = useNavigate()

    const [token, setToken] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);

    const userToken = token?.access ? jwtDecode(token.access) : null;
    console.log('This is the token', userToken);

    const logout = async (e) => {
        e.preventDefault()
        setToken(null)
        localStorage.removeItem('token')
        navigate('/')
    }


    const [show, setShow] = useState(false);

    const toggle = () => {
        setShow(!show);
    }

  return (
    <div className='' >
        <div className='lg:w-full z-10 fixed border border-slate-100 bg-white left-0 right-0 flex gap-5 items-center m-auto py-3 lg:px-10 px-3 backdrop-filter backdrop-blur-3xl bg-opacity-80'>
            <div className='lg:block w-24 hidden'>
                <Link to={'/'}>
                    <img src={logo} alt="" className='cursor-pointer'/>
                </Link>
            </div>

            <div className='lg:hidden w-10 block'>
                <Link to={'/'}>
                    <img src={logo1} alt="" className='cursor-pointer'/>
                </Link>
            </div>

            <p className='lg:hidden block text-xl' onClick={toggle}> {!show ? <RxDashboard /> : <BsDashSquare />}</p>

            {show && (
                <ul data-aos="fade-up" data-aos-duration="600" className='lg:hidden text-base font-bold rounded-lg drop-shadow-xl flex flex-col w-11/12 m-auto right-0 left-0  absolute color text-white top-20 p-10 items-center ml-auto lg:gap-10 gap-3 '>
                    <Link to={'/allTalents'}>
                        <li className='cursor-pointer'>Talent</li>
                    </Link>

                    <Link to={'/about'}>
                        <li className='cursor-pointer'>About</li>
                    </Link>


                    <Link to={'/blog'}>
                        <li className='cursor-pointer'>Blog</li>
                    </Link>
                </ul>
            )}



            <ul className='lg:flex items-center hidden  ml-auto lg:gap-10 gap-3 text-sm'>
                <Link to={'/allTalents'}>
                    <li className='cursor-pointer'>All Talent</li>
                </Link>

                <Link to={'/about'}>
                    <li className='cursor-pointer'>About</li>
                </Link>


                <Link to={'/blog'}>
                    <li className='cursor-pointer'>Blog</li>
                </Link>
            </ul>

            <ul className='flex items-center ml-auto lg:gap-10 gap-3 text-sm'>

                {userToken ? 
                
                    <li className='cursor-pointer' onClick={logout}>Logout</li> :

                    <Link to={'/login'}>
                        <li className='cursor-pointer'>Login</li>
                    </Link>
                
                }
              

                {!userToken && 
                <Link to={'/register'}>
                    <li className='cursor-pointer bg-black flex gap-2 items-center lg:py-3 lg:px-5 px-3 py-2 rounded-md text-white'>Join <MdPeople /></li>
                </Link>
                }


                {userToken && (

                
                <>
                {userToken.role === 'Creative' && 
                    <Link to={'/creative-dashboard-home'}>
                        <li className='cursor-pointer bg-black flex gap-2 items-center lg:py-3 lg:px-5 px-3 py-2 rounded-md text-white'>Dashboard</li>
                    </Link>
                }


                {userToken.role === 'Client' && 
                    <Link to={'/user-dashboard-home'}>
                        <li className='cursor-pointer bg-black flex gap-2 items-center lg:py-3 lg:px-5 px-3 py-2 rounded-md text-white'>Dashboard</li>
                    </Link>
                }
                </> 

                )}
            </ul>
        </div>
    </div>
  )
}

export default Navbar