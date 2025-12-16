import instance from '@/services/api/api'
import type { AuthResponse, LoginDto, RegisterDto, User } from '@/types/auth.types'

export const authApi = {
  register: (data: RegisterDto) => instance.post<AuthResponse>('/auth/register', data),

  login: (data: LoginDto) => instance.post<AuthResponse>('/auth/login', data),

  getMe: () => instance.get<User>('/auth/me'),

  checkEmail: (email: string) => instance.get<boolean>('/auth/check-email', { params: { email } }),
}
