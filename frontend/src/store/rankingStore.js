import { create } from 'zustand'
import axios from 'axios'

const useRankingStore = create((set, get) => ({
  // State
  users: [],
  leaderboard: [],
  history: [],
  loading: false,
  error: null,

  // Actions
  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get('/api/users')
      set({ users: response.data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  fetchLeaderboard: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get('/api/claim/leaderboard')
      set({ leaderboard: response.data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  fetchHistory: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get('/api/claim/history')
      set({ history: response.data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  addUser: async (name) => {
    try {
      const response = await axios.post('/api/users', { name })
      const newUser = response.data
      set(state => ({ 
        users: [...state.users, newUser]
      }))
      return newUser
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  claimPoints: async (userId) => {
    try {
      const response = await axios.post(`/api/claim/${userId}`)
      // Refresh leaderboard after claiming points
      get().fetchLeaderboard()
      get().fetchHistory()
      return response.data
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  clearError: () => {
    set({ error: null })
  }
}))

export default useRankingStore