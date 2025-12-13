import { defineStore } from 'pinia'
import type { User } from '@/types/auth.types'
import { authApi } from '@/services/auth.api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),
  actions: {
    async register(email: string, password: string, firstname?: string, lastname?: string) {
      const { data } = await authApi.register({ email, password, firstname, lastname })
      this.user = data.user
      this.token = data.token
    },
    async login(email: string, password: string) {
      const { data } = await authApi.login({ email, password })
      this.user = data.user
      this.token = data.token
    },
    logout() {
      this.user = null
      this.token = null
    },
    async getMe() {
      const { data } = await authApi.getMe()
      this.user = data
    },
  },
})
