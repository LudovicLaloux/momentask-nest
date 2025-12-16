export interface User {
  id: string
  email: string
  firstname?: string
  lastname?: string
  avatar?: string
  theme?: string
}

export interface RegisterDto {
  email: string
  password: string
  firstname?: string
  lastname?: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

export type AuthStep = 'email' | 'login' | 'register'

export interface AuthFlowState {
  step: AuthStep
  email: string
  userExists: boolean
}
