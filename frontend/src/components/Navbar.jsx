import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../api/api'

export default function Navbar() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // Optional: Call backend logout
      await API.post('/logout')
    } catch (error) {
      console.log('Logout API optional')
    }

    // Clear token & redirect
    localStorage.removeItem('token')
    navigate('/', { replace: true })
    window.location.reload()  // Hard refresh
  }

  return (
    <div className="bg-zinc-700 text-white p-6 flex justify-between">
      <h1 className=" font-bold text-5xl">AI Study Mentor</h1>
      <div className="space-x-4 text-5xl flex items-center">
        <Link to="/" className="hover:text-gray-300 text-5xl">Home</Link>
        {!token ? (
          <>
            <Link to="/login" className="hover:text-gray-300 text-5xl ">Login</Link>
            <Link to="/register" className="hover:text-gray-300 text-5xl">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:text-gray-300 text-5xl">Dashboard</Link>
            <Link to="/studyLog" className="hover:text-gray-300 text-5xl">Study Log</Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-1 rounded hover:bg-red-700 text-5xl"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  )
}


