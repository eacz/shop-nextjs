export interface loginResponse {
  token: string
  user: {
    email: string
    role: 'admin' | 'client'
    name: string
  }
}

export interface signupResponse {
  user: {
    name: string
    email: string
    role: 'admin' | 'client'
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  token: string
}
