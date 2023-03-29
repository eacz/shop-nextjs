import { CartState } from './CartProvider'
import { ICartProduct } from '../../interfaces/cart'

type cartActionType =
  | { type: '[Cart] - LoadCart from cookies | storage'; payload: ICartProduct[] }
  | { type: '[Cart] - Add Product'; payload: ICartProduct }

export const CartReducer = (state: CartState, action: cartActionType): CartState => {
  switch (action.type) {
    default:
      return state
  }
}
