import React from 'react'
import Navbar from '../Components/Navbar'
import HomeCompOne from '../Components/Home/HomeCompOne'
import HomeCompoTwo from '../Components/Home/HomeCompoTwo'
import HomeComThree from '../Components/Home/HomeComThree'

const Homepage = () => {
  return (
    <div>
        <Navbar />
        <HomeCompOne />
        <HomeCompoTwo />
        <HomeComThree />
    </div>
  )
}

export default Homepage