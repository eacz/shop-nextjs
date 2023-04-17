import { IUser } from '@/interfaces'

export interface loginResponse {
  token: string
  user: IUser
}

export interface signupResponse {
  user: IUser
  token: string
}

export interface validateTokenResponse {
  user: IUser
  token: string
}
