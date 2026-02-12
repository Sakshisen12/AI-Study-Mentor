import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import StudyLog from './pages/StudyLog.jsx'
import FloatingNavbar from './components/FloatingNavbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Register from './pages/Register.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-[var(--text-primary)] font-sans selection:bg-indigo-500 selection:text-white relative">
        <FloatingNavbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/studyLog" element={<ProtectedRoute><StudyLog /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
