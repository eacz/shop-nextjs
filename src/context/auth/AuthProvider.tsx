import { ReactNode, useReducer } from 'react'

import { AuthContext, AuthReducer } from '.'
import { IUser } from '@/interfaces'

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

  return (
    <AuthContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
