import axios from 'axios'
import router from '@/router/index'

// ── URL de base ──
// const baseURL = 'http://localhost:8000/api'
const baseURL = 'https://api-digital.kgsinformatique.com/api'

// ── Instance Axios configurée ──
const API = axios.create({
  baseURL,
  withCredentials: false,
})

// ── Intercepteur requêtes — ajoute le token automatiquement ──
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Intercepteur réponses — gère token expiré ──
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || ''

    // Routes à ignorer pour le 401 (ex: vérification OTP)
    const ignoredRoutes = ['/auth/verify-otp', '/auth/verify-reset-otp']
    const isIgnored = ignoredRoutes.some(route => requestUrl.includes(route))

    if (error.response?.status === 401 && !isIgnored) {
      console.warn('Token expiré ou invalide — déconnexion...')
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')

      if (router.currentRoute.value.path !== '/login') {
        router.push('/login')
      }
    }

    return Promise.reject(error)
  }
)

export default API