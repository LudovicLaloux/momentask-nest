import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
})

// add JWT token to each request
instance.interceptors.request.use(
  function (config) {
    // get JWT token from localStorage
    const token = localStorage.getItem('token')

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
