import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import API from '@/services/api'

export const useAuthStore = defineStore('auth', () => {

  // ── State ──
  const user  = ref(JSON.parse(localStorage.getItem('auth_user') || 'null'))
  const token = ref(localStorage.getItem('auth_token') || null)

  // ── Computed ──
  const isLoggedIn = computed(() => !!token.value && !!user.value)
  const isAdmin    = computed(() => user.value?.role === 'admin')
  const initials   = computed(() => {
    if (!user.value?.name) return '?'
    return user.value.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  })

  // ── Actions ──

  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('auth_token', newToken)
  }

  function setUser(newUser) {
    user.value = newUser
    localStorage.setItem('auth_user', JSON.stringify(newUser))
  }

  async function login(email, password) {
    const { data } = await API.post('/auth/login', { email, password })
    setToken(data.token)
    setUser(data.user)
    return data
  }

  async function logout() {
    try {
      await API.post('/auth/logout')
    } catch (e) {
      // silencieux si token déjà expiré
    } finally {
      token.value = null
      user.value  = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
  }

  // Restaurer le token au démarrage — l'intercepteur dans api.js s'en charge
  function init() {
    // Rien à faire ici, api.js lit auth_token automatiquement à chaque requête
  }

  return {
    user,
    token,
    isLoggedIn,
    isAdmin,
    initials,
    setToken,
    setUser,
    login,
    logout,
    init,
  }
})