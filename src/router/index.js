import { createRouter, createWebHashHistory } from '@ionic/vue-router'
import { useAuthStore } from '@/stores/auth'
import PublicLayout from '@/components/layout/PublicLayout.vue'

const routes = [
  // ── Auth (sans layout) ──
  { path: '/login', name: 'login', component: () => import('@/views/auth/LoginView.vue'), meta: { title: 'Connexion' } },
  { path: '/register', name: 'register', component: () => import('@/views/auth/RegisterView.vue'), meta: { title: 'Inscription' } },
  { path: '/forgot-password', name: 'forgot-password', component: () => import('@/views/auth/ForgotPasswordView.vue'), meta: { title: 'Mot de passe oublié' } },

  // ── Tout sous PublicLayout (public + dashboard) ──
  {
    path: '/',
    component: PublicLayout,
    children: [
      // ── Pages publiques ──
      { path: '', name: 'home', component: () => import('@/views/public/Invoicegenerator.vue'), meta: { title: 'Accueil' } },
    
      // ── Dashboard (protégé) ──
      { path: 'dashboard', name: 'dash-home', component: () => import('@/views/dashboard/DashHomeView.vue'), meta: { requiresAuth: true, title: 'Dashboard' } },

    ]
  },

  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// ── Guard ──
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  if ((to.name === 'login' || to.name === 'register') && auth.isLoggedIn) {
    return next({ name: 'dash-home' })
  }

  next()
})

export default router