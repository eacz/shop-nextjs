import { ReactNode, useEffect, useReducer } from 'react'
import Cookies from 'js-cookie'

import { AuthContext, AuthReducer } from '.'
import { IUser } from '@/interfaces'
import { loginResponse, signupResponse, tesloApi, validateTokenResponse } from '@/api'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  const login = async (email: string, password: string): Promise<unknown | undefined> => {
    try {
      const { data } = await tesloApi.post<loginResponse>('/user/login', { email, password })
      Cookies.set('token', data.token)
      dispatch({ type: '[Auth] - Login', payload: data.user })
    } catch (error) {
      return error
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<unknown | undefined> => {
    try {
      const { data } = await tesloApi.post<signupResponse>('/user/signup', { name, email, password })
      Cookies.set('token', data.token)
      dispatch({ type: '[Auth] - Login', payload: data.user })
    } catch (error) {
      return error
    }
  }

  const logout = () => {
    Cookies.remove('token')
    Cookies.remove('cart')
    router.reload()
  }

  const checkToken = async () => {
    if (Cookies.get('token')) {
      try {
        const { data } = await tesloApi.get<validateTokenResponse>('/user/validate-token')
        Cookies.set('token', data.token)
        dispatch({ type: '[Auth] - Login', payload: data.user })
      } catch (error) {
        Cookies.remove('token')
      }
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        ...state,

        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
