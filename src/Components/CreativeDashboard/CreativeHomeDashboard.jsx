import React, { useState } from 'react'

const CreativeHomeDashboard = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  return (
    <div>
      <h2>This is Creative account</h2>
    </div>
  )
}

export default CreativeHomeDashboard