export interface loginResponse {
  token: string
  user: {
    email: string
    role: 'admin' | 'client'
    name: string
  }
}
