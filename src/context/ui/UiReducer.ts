import { UiState } from './UiProvider'

type uiActionType = {type: '[UI] - toggleMenu'}

export const UiReducer = (state: UiState, action: uiActionType): UiState => {
  switch(action.type){
    case '[UI] - toggleMenu':
      return {
        ...state, isMenuOpen: !state.isMenuOpen
      }
    default:
      return state
  }
}
