import React, { useEffect } from 'react'
import { IoTime, IoStar } from 'react-icons/io5'
import useRankingStore from '../store/rankingStore'

const History = () => {
  const { history, loading, error, fetchHistory } = useRankingStore()

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        fontSize: '18px',
        color: '#6b7280'
      }}>
        Loading history...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        fontSize: '18px',
        color: '#ef4444'
      }}>
        Error: {error}
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
        <IoTime style={{ color: '#8b5cf6' }} />
        Claim History
      </h1>

      <div style={{
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        {history.map((record, index) => (
          <div key={record._id || index} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            {/* Time Icon */}
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#8b5cf6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '16px'
            }}>
              <IoTime />
            </div>

            {/* User Avatar */}
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              {record.userId?.name ? record.userId.name.charAt(0).toUpperCase() : 'U'}
            </div>

            {/* Record Info */}
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0 0 4px 0'
              }}>
                {record.userId?.name || 'Unknown User'}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IoStar style={{ color: '#8b5cf6', fontSize: '14px' }} />
                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                  +{record.points} points claimed
                </span>
              </div>
            </div>

            {/* Date */}
            <div style={{
              textAlign: 'right',
              fontSize: '12px',
              color: '#6b7280'
            }}>
              {formatDate(record.claimedAt)}
            </div>
          </div>
        ))}

        {history.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6b7280',
            fontSize: '16px'
          }}>
            No claim history available.
          </div>
        )}
      </div>
    </div>
  )
}

export default History 