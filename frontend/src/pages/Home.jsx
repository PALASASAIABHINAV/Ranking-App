import React, { useEffect } from 'react'
import { IoStar, IoPersonAdd, IoTrophy, IoRefresh } from 'react-icons/io5'
import useRankingStore from '../store/rankingStore'

const Home = () => {
  const { users, loading, error, fetchUsers, claimPoints } = useRankingStore()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleClaimPoints = async (userId) => {
    try {
      const result = await claimPoints(userId)
      alert(`Points claimed! You got ${result.points} points.`)
    } catch (error) {
      alert('Failed to claim points: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        <p className="text-gray-600 text-lg font-medium">Loading users...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="bg-red-100 p-4 rounded-full">
          <IoRefresh className="text-red-500 text-2xl" />
        </div>
        <p className="text-red-600 text-lg font-medium">Error: {error}</p>
        <button 
          onClick={fetchUsers}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-yellow-50 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <IoTrophy className="text-4xl text-primary-500" />
            <h1 className="text-3xl font-bold text-gray-800">User Ranking System</h1>
          </div>
          <p className="text-gray-600 text-lg">Claim points and climb the leaderboard!</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <IoPersonAdd className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <IoStar className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Points</p>
                <p className="text-2xl font-bold text-gray-800">
                  {users.reduce((sum, user) => sum + (user.totalPoints || 0), 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <IoTrophy className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Top Score</p>
                <p className="text-2xl font-bold text-gray-800">
                  {users.length > 0 ? Math.max(...users.map(u => u.totalPoints || 0)) : 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Cards */}
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-6">
          {users.map((user, index) => (
            <div 
              key={user._id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  {/* User Info */}
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-xl shadow border-2 border-white">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    </div>
                    {/* User Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-800 truncate">
                        {user.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <IoStar className="text-purple-500 text-lg" />
                        <span className="text-gray-600 font-medium">
                          {user.totalPoints || 0} points
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${Math.min((user.totalPoints || 0) / 100, 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Claim Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleClaimPoints(user._id)}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
                    >
                      Claim Points
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {users.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <IoPersonAdd className="text-gray-400 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Users Found</h3>
              <p className="text-gray-600 text-lg mb-6">
                Add some users to get started with the ranking system!
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 max-w-md mx-auto">
                <p className="text-yellow-800 text-sm">
                  💡 Tip: Use the "Add User" button in the bottom navigation to create your first user.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home 