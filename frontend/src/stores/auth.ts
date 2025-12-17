import { defineStore } from 'pinia'
import type { User } from '@/types/auth.types'
import authApi from '@/services/api/auth.api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    sessionToken: localStorage.getItem('session-token') as string | null,
    isLoading: false,
  }),
  actions: {
    async register(email: string, password: string, firstname?: string, lastname?: string) {
      const { data } = await authApi.register({ email, password, firstname, lastname })
      this.user = data.user
      this.sessionToken = data.token
      localStorage.setItem('session-token', data.token)
    },
    async logIn(email: string, password: string) {
      const { data } = await authApi.logIn({ email, password })
      this.user = data.user
      this.sessionToken = data.token
      localStorage.setItem('session-token', data.token)
    },
    logout() {
      this.user = null
      this.sessionToken = null
      localStorage.removeItem('session-token')
    },
    async getMe() {
      console.log('this.sessionToken', this.sessionToken)
      if (!this.sessionToken) return

      this.isLoading = true
      try {
        const { data } = await authApi.getMe()
        this.user = data
      } catch (error) {
        this.logout()
        throw error
      } finally {
        this.isLoading = false
      }
    },
  },
})
