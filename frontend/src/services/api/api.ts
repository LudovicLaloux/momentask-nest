import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
})

// add JWT token to each request
instance.interceptors.request.use(
  function (config) {
    const authStore = useAuthStore()
    const token = authStore.sessionToken

    // if a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  function (error) {
    console.error('Request error:', error)
    return Promise.reject(error)
  },
)

export default instance
