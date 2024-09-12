import React, { useState } from 'react'
import logo from './Images/Creve.png'
import logo1 from './Images/Creve1.png'
import { MdPeople } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { RxDashboard } from "react-icons/rx";
import { BsDashCircle } from "react-icons/bs";
import { BsDashSquare } from "react-icons/bs";

const Navbar = () => {

    const navigate = useNavigate()
    const [token, setToken] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = token?.access ? jwtDecode(token.access) : null;

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
    <div className='overflow-hidden' >
        <div className='lg:w-full z-50 fixed border border-slate-100 bg-white left-0 right-0 flex gap-5 items-center m-auto py-3 lg:px-10 px-3 backdrop-filter backdrop-blur-3xl bg-opacity-80'>
            <div className='lg:block w-24 hidden'>
                <Link to={'/'}>
                    <img src={logo} alt="" className='cursor-pointer'/>
                </Link>
            </div>

            <p className='lg:hidden block text-2xl text-green-700' onClick={toggle}> {!show ? <RxDashboard /> : <BsDashCircle />}</p>

            <div className='lg:hidden w-8 block'>
                <Link to={'/'}>
                    <img src={logo1} alt="" className='cursor-pointer'/>
                </Link>
            </div>

            {show && (
                <ul data-aos="fade-up" data-aos-duration="600" className='lg:hidden text-base font-bold rounded-lg drop-shadow-xl flex flex-col w-[95%] m-auto left-3  absolute color text-white top-20 p-10 items-left ml-auto lg:gap-10 gap-5 '>
                    <Link to={'/'}>
                        <li className='cursor-pointer'>Home</li>
                    </Link>

                    {/* <Link to={'/allTalents'}>
                        <li className='cursor-pointer'>TALENT</li>
                    </Link> */}

                    <Link to={'/about'}>
                        <li className='cursor-pointer'>About</li>
                    </Link>


                    <Link to={'/blog'}>
                        <li className='cursor-pointer'>Blog</li>
                    </Link>

                    <Link to={'/help'}>
                        <li className='cursor-pointer'>Support</li>
                    </Link>

                    <Link to={'/howto'}>
                        <li className='cursor-pointer'>How to use</li>
                    </Link>
                </ul>
            )}



            <ul className='lg:flex items-center hidden  ml-auto lg:gap-10 gap-3 text-sm'>
                <Link to={'/'}>
                    <li className='cursor-pointer'>Home</li>
                </Link>


                {/* <Link to={'/allTalents'}>
                    <li className='cursor-pointer'>Talents</li>
                </Link> */}

                <Link to={'/about'}>
                    <li className='cursor-pointer'>About</li>
                </Link>


                <Link to={'/blog'}>
                    <li className='cursor-pointer'>Blog</li>
                </Link>


                <Link to={'/help'}>
                    <li className='cursor-pointer'>Support</li>
                </Link>

                <Link to={'/howto'}>
                    <li className='cursor-pointer'>How to use</li>
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
                    <li className='cursor-pointer bg-black flex gap-2 items-center lg:py-3 lg:px-5 px-5 py-2 rounded-full text-white'>Join <MdPeople /></li>
                </Link>
                }


                {userToken && (

                
                <>
                {userToken.role === 'Creative' && 
                    <Link to={'/creative-dashboard-home'}>
                        <li className='cursor-pointer bg-black flex gap-2 items-center lg:py-3 lg:px-5 px-5 py-2 rounded-full text-white'>Dashboard</li>
                    </Link>
                }


                {userToken.role === 'Client' && 
                    <Link to={'/user-dashboard-home'}>
                        <li className='cursor-pointer bg-black flex gap-2 items-center lg:py-3 lg:px-5 px-5 py-2 rounded-full text-white'>Dashboard</li>
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