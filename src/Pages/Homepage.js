import React from 'react'
import Navbar from '../Components/Navbar'
import HomeCompOne from '../Components/Home/HomeCompOne'
import HomeCompoTwo from '../Components/Home/HomeCompoTwo'
import HomeComThree from '../Components/Home/HomeComThree'
import Footer from '../Components/Footer'

const Homepage = () => {
  return (
    <div>
        <Navbar />
        <HomeCompOne />
        <HomeCompoTwo />
        <HomeComThree />
        <Footer />
    </div>
  )
}

export default Homepage