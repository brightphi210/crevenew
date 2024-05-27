import React, { useState } from 'react'

const UserHomeDashboard = () => {

  const [token, setToken] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  return (
    <div>
      <h2>User Dashboard</h2>
    </div>
  )
}

export default UserHomeDashboard