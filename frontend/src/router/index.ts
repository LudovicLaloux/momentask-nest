import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/',
      redirect: '/home',
    },
  ],
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  const token = authStore.sessionToken

  if (token && !authStore.user && !authStore.isLoading) {
    try {
      await authStore.getMe()
    } catch (error) {
      authStore.logout()
    }
  }

  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest
  const isAuthenticated = !!token

  if (requiresAuth && !isAuthenticated) {
    next('/auth')
  } else if (requiresGuest && isAuthenticated) {
    next('/home')
  } else {
    next()
  }
})

export default router
