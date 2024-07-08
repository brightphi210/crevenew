import React, { useState } from 'react'
import UserNavbar from './UserNavbar'
import UserSideBar from './UserSideBar'

const UserCreativeDashboard = () => {

    const [show, setShow] = useState(false)

    const handleShow = () => {
      setShow(!show)
    }


  return (
    <div>
        <UserNavbar show={show} handleShow={handleShow}/>
        <div className='flex bg-neutral-100 h-screen'>
            <div className='z-40'>
                <UserSideBar show={show} />
            </div>
            <UserCreativeDashboardCom />
        </div>
    </div>
  )
}

export default UserCreativeDashboard



export const UserCreativeDashboardCom = () => {
  return (
    <div>
      
    </div>
  )
}

