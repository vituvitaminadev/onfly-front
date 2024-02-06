export interface AuthRequest {
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string
}

export interface AuthResponse {
  token: string
}
