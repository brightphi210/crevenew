import React, { useEffect, useState } from 'react'
import CreativeHomeDashboard from '../../Components/CreativeDashboard/CreativeHomeDashboard'
import Loader from '../../Components/Loader';

const CreaiveHomeDash = () => {

  const [loadind, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer);
  }, []);


  return (
    <div>
        <CreativeHomeDashboard />
    </div>
  )
}

export default CreaiveHomeDash