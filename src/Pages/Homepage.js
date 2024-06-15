import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import HomeCompOne from '../Components/Home/HomeCompOne'
import HomeCompoTwo from '../Components/Home/HomeCompoTwo'
import HomeComThree from '../Components/Home/HomeComThree'
import Footer from '../Components/Footer'
import Loader from '../Components/Loader'
const Homepage = () => {

  const [loadind, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=''>

      {loadind === true ? (

        <Loader />
      ) : (
        
      <div>
        <Navbar />
        <HomeCompOne />
        <HomeCompoTwo />
        <HomeComThree />
        <Footer />
      </div>
      )}
    </div>
  )
}

export default Homepage