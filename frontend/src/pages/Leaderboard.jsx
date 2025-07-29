import React, { useEffect } from 'react'
import { IoStar, IoTrophy } from 'react-icons/io5'
import useRankingStore from '../store/rankingStore'

const ringColors = [
  'ring-yellow-400', // 1st
  'ring-gray-400',   // 2nd
  'ring-orange-500', // 3rd
  'ring-primary-300' // others
]

const Leaderboard = () => {
  const { leaderboard, loading, error, fetchLeaderboard } = useRankingStore()

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        <p className="text-gray-600 text-lg font-medium">Loading leaderboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="bg-red-100 p-4 rounded-full">
          <IoTrophy className="text-red-500 text-2xl" />
        </div>
        <p className="text-red-600 text-lg font-medium">Error: {error}</p>
        <button 
          onClick={fetchLeaderboard}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-primary-50 p-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <IoTrophy className="text-4xl text-primary-500" />
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Leaderboard</h1>
          </div>
          <p className="text-gray-500 text-lg">See who’s on top this week!</p>
        </div>
      </div>

      {/* Leaderboard Cards */}
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col gap-6">
          {leaderboard.map((user, index) => (
            <div
              key={user._id}
              className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
            >
              {/* Top badge */}
              {index === 0 && (
                <span className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Top
                </span>
              )}

              <div className="flex items-center gap-6 px-6 py-5">
                {/* Avatar with ring */}
                <div className={`flex-shrink-0 flex items-center justify-center`}>
                  <div className={`w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-2xl shadow ring-4 ${ringColors[index] || ringColors[3]} transition-all duration-300`}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </div>
                {/* User Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-gray-800 truncate">{user.name}</h3>
                    {index === 0 && (
                      <IoTrophy className="text-yellow-400 text-lg ml-1" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <IoStar className="text-purple-500 text-lg" />
                    <span className="text-gray-700 font-semibold text-lg">
                      {user.totalPoints || 0} points
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((user.totalPoints || 0) / 100, 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                {/* Rank number at the end */}
                <div className="flex-shrink-0">
                  <span className={`text-2xl font-bold ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-orange-500' : 'text-gray-400'}`}>
                    #{index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {leaderboard.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <IoTrophy className="text-gray-400 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Leaderboard Data</h3>
              <p className="text-gray-600 text-lg mb-6">
                No users have scored yet. Be the first to claim points!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard 