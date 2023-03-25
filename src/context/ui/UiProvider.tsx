import { ReactNode, useReducer } from 'react'
import { UiReducer, UiContext } from '.'

export interface UiState {
  isMenuOpen: boolean
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
}

export const UiProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(UiReducer, UI_INITIAL_STATE)

  const toggleMenu = () => {
    dispatch({ type: '[UI] - toggleMenu' })
  }

  return (
    <UiContext.Provider
      value={{
        ...state,

        //methods
        toggleMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  )
}
