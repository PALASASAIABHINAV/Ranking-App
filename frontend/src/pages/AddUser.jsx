import React, { useState } from 'react'
import { IoPersonAdd, IoCheckmark } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import useRankingStore from '../store/rankingStore'

const AddUser = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { addUser, error, clearError } = useRankingStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    clearError()

    try {
      await addUser(name.trim())
      setSuccess(true)
      setName('')
      
      // Show success message for 2 seconds then redirect
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      console.error('Failed to add user:', error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        gap: '16px'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#10b981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '32px'
        }}>
          <IoCheckmark />
        </div>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1f2937',
          margin: 0
        }}>
          User Added Successfully!
        </h2>
        <p style={{
          color: '#6b7280',
          margin: 0
        }}>
          Redirecting to home page...
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '20px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}>
        <IoPersonAdd style={{ color: '#8b5cf6' }} />
        Add New User
      </h1>

      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              User Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter user name"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              disabled={loading}
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !name.trim()}
            style={{
              width: '100%',
              backgroundColor: loading || !name.trim() ? '#9ca3af' : '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: loading || !name.trim() ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              if (!loading && name.trim()) {
                e.target.style.backgroundColor = '#7c3aed'
              }
            }}
            onMouseOut={(e) => {
              if (!loading && name.trim()) {
                e.target.style.backgroundColor = '#8b5cf6'
              }
            }}
          >
            {loading ? 'Adding User...' : 'Add User'}
          </button>
        </form>

        <div style={{
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#f9fafb'
              e.target.style.borderColor = '#9ca3af'
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.borderColor = '#d1d5db'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddUser 