import axios from 'axios'
import Cookies from 'js-cookie'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br'
  },
  withCredentials: true
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add cookie if exists
    const cookieName = import.meta.env.VITE_COOKIE_NAME
    const cookie = Cookies.get(cookieName)
    
    if (cookie) {
      config.headers['Cookie'] = `${cookieName}=${cookie}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return {
      data: response.data,
      status: response.status,
      error: null
    }
  },
  (error) => {
    const status = error.response?.status || null
    const data = error.response?.data || null
    
    return {
      data,
      status,
      error: data?.message || error.message || 'Error fetching data'
    }
  }
)

/**
 * Fetch data from API
 * @param {string} url - API endpoint
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {object} body - Request body
 * @returns {Promise} Response object with data, status, and error
 */
export async function fetchData(url, method = 'GET', body = null) {
  try {
    const config = {
      method,
      url,
      ...(body && method !== 'GET' && { data: body })
    }
    
    return await apiClient(config)
  } catch (error) {
    return {
      data: null,
      status: null,
      error: error.message
    }
  }
}

export default apiClient
