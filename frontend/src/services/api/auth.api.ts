import instance from '@/services/api/api'
import type {
  AuthResponse,
  CheckEmailResponse,
  LogInDto,
  RegisterDto,
  User,
} from '@/types/auth.types'

export const register = (data: RegisterDto) => instance.post<AuthResponse>('/auth/register', data)

export const logIn = (data: LogInDto) => instance.post<AuthResponse>('/auth/logIn', data)

export const getMe = () => instance.get<User>('/auth/me')

export const checkEmail = (email: string) =>
  instance.post<CheckEmailResponse>('/auth/checkEmail', { email })

export default {
  register,
  logIn,
  getMe,
  checkEmail,
}
