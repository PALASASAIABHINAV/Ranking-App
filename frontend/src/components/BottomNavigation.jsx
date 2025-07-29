import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoHome, IoStatsChart, IoTime, IoPersonAdd } from 'react-icons/io5'

const BottomNavigation = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: IoHome },
    { path: '/leaderboard', label: 'Ranking', icon: IoStatsChart },
    { path: '/history', label: 'History', icon: IoTime },
    { path: '/add-user', label: 'Add User', icon: IoPersonAdd }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTop: '2px solid #f3f4f6',
      boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      paddingBottom: 'env(safe-area-inset-bottom)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '8px 0 12px 0',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                minWidth: '60px',
                position: 'relative'
              }}
            >
              {/* Active indicator */}
              {active && (
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b'
                }} />
              )}
              
              {/* Icon */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: active ? '#fef3c7' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '4px',
                transition: 'all 0.2s ease'
              }}>
                <Icon style={{ 
                  fontSize: '20px',
                  color: active ? '#f59e0b' : '#9ca3af',
                  transition: 'color 0.2s ease'
                }} />
              </div>
              
              {/* Label */}
              <span style={{
                fontSize: '11px',
                fontWeight: active ? '600' : '500',
                color: active ? '#f59e0b' : '#6b7280',
                transition: 'all 0.2s ease',
                textAlign: 'center',
                lineHeight: '1.2'
              }}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation