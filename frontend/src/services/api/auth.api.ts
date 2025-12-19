import instance from '@/services/api/api'
import type {
  AuthResponse,
  CheckEmailResponse,
  ForgotPasswordDto,
  LogInDto,
  RegisterDto,
  ResetPasswordDto,
  User,
} from '@/types/auth.types'

export const register = (data: RegisterDto) => instance.post<AuthResponse>('/auth/register', data)

export const logIn = (data: LogInDto) =>
  instance.post<AuthResponse>('/auth/logIn', data, { skipGlobalErrorHandler: true })

export const getMe = () => instance.get<User>('/auth/me')

export const checkEmail = (email: string) =>
  instance.post<CheckEmailResponse>('/auth/checkEmail', { email })

export const forgotPassword = (data: ForgotPasswordDto) =>
  instance.post<void>('/auth/forgot-password', data)

export const resetPassword = (data: ResetPasswordDto) =>
  instance.post<void>('/auth/reset-password', data)

export default {
  register,
  logIn,
  getMe,
  checkEmail,
  forgotPassword,
  resetPassword,
}
