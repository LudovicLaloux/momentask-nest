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
      path: '/reset-password/:token',
      name: 'reset-password',
      component: () => import('@/views/ResetPasswordView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/',
      component: () => import('@/components/Layout/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: '/dashboard',
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: 'habits',
          name: 'habits',
          component: () => import('@/views/HabitsView.vue'),
        },
        {
          path: 'lists',
          name: 'lists',
          component: () => import('@/views/HomeView.vue'), // Placeholder for now
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/ProfileView.vue'),
        },
      ],
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
    next('/dashboard')
  } else {
    next()
  }
})

export default router
