import { AuthState } from '.'
import { IUser } from '@/interfaces'

type authActionType = 
| { type: '[Auth] - Login'; payload: IUser } 
| { type: '[Auth] - Logout' }

export const AuthReducer = (state: AuthState, action: authActionType): AuthState => {
  switch (action.type) {
    case '[Auth] - Login':
      return { ...state, user: action.payload }
    case '[Auth] - Logout':
      return { ...state, isLoggedIn: false, user: undefined }
    default:
      return state
  }
}
