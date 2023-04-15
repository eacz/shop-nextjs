import { ReactNode, useReducer } from 'react'
import Cookies from 'js-cookie'

import { AuthContext, AuthReducer } from '.'
import { IUser } from '@/interfaces'
import { loginResponse, tesloApi } from '@/api'

export interface AuthState {
  isLoggedIn: boolean
  user?: IUser
}

const CART_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, CART_INITIAL_STATE)

  const login = async (email: string, password: string): Promise<unknown | undefined> => {
    try {
      const { data } = await tesloApi.post<loginResponse>('/user/login', { email, password })
      Cookies.set('token', data.token)
      dispatch({ type: '[Auth] - Login', payload: data.user })
    } catch (error) {
      return error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,

        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
