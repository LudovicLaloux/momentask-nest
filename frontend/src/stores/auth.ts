import { defineStore } from 'pinia'
import type { User } from '@/types/auth.types'
import authApi from '@/services/api/auth.api'
import { push } from 'notivue'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    sessionToken: localStorage.getItem('session-token') as string | null,
    isLoading: false,
  }),
  actions: {
    async register(email: string, password: string, firstname?: string, lastname?: string) {
      try {
        const { data } = await authApi.register({ email, password, firstname, lastname })
        this.user = data.user
        this.sessionToken = data.token
        localStorage.setItem('session-token', data.token)
      } catch (error: any) {
        push.error(error.message)
      }
      return { success: true }
    },
    async logIn(email: string, password: string) {
      try {
        const { data } = await authApi.logIn({ email, password })
        this.user = data.user
        this.sessionToken = data.token
        localStorage.setItem('session-token', data.token)
      } catch (error: any) {
        return { success: false, error: error }
      }
      return { success: true }
    },
    logout() {
      this.user = null
      this.sessionToken = null
      localStorage.removeItem('session-token')
    },
    async getMe() {
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
