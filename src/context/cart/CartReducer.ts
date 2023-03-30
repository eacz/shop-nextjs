import { CartState } from './CartProvider'
import { ICartProduct } from '../../interfaces/cart'

type cartActionType =
  | { type: '[Cart] - LoadCart from cookies'; payload: ICartProduct[] }
  | { type: '[Cart] - Update Cart Products'; payload: ICartProduct[] }

export const CartReducer = (state: CartState, action: cartActionType): CartState => {
  switch (action.type) {
    case '[Cart] - Update Cart Products':
      return { ...state, cart: [...action.payload] }
    case '[Cart] - LoadCart from cookies':
      return { ...state, cart: action.payload }
    default:
      return state
  }
}
