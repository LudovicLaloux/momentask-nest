import instance from '@/services/api/api'
import type {
  AuthResponse,
  CheckEmailResponse,
  LoginDto,
  RegisterDto,
  User,
} from '@/types/auth.types'

export const register = (data: RegisterDto) => instance.post<AuthResponse>('/auth/register', data)

export const login = (data: LoginDto) => instance.post<AuthResponse>('/auth/login', data)

export const getMe = () => instance.get<User>('/auth/me')

export const checkEmail = (email: string) =>
  instance.post<CheckEmailResponse>('/auth/checkEmail', { email })

export default {
  register,
  login,
  getMe,
  checkEmail,
}
