import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import BottomNavigation from './components/BottomNavigation'
import Home from './pages/Home'
import Leaderboard from './pages/Leaderboard'
import History from './pages/History'
import AddUser from './pages/AddUser'

function App() {
  return (
    <Router>
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#fefce8',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        <div style={{ 
          paddingTop: '20px',
          paddingBottom: '80px' // Space for bottom navigation
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <BottomNavigation />
      </div>
    </Router>
  )
}

export default App
