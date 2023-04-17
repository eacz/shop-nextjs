import { createContext } from 'react'
import { IUser } from '@/interfaces'

interface ContextProps {
  isLoggedIn: boolean
  user?: IUser

  login: (email: string, password: string) => Promise<unknown | undefined>
  signup: (name: string, email: string, password: string) => Promise<unknown | undefined>
  logout: () => void
}

export const AuthContext = createContext({} as ContextProps)
