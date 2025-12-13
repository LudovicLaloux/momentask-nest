export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
  }
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
