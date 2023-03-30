import { CartState } from './CartProvider'
import { ICartProduct } from '../../interfaces/cart'

type cartActionType =
  | { type: '[Cart] - LoadCart from cookies | storage'; payload: ICartProduct[] }
  | { type: '[Cart] - Update Cart Products'; payload: ICartProduct[] }

export const CartReducer = (state: CartState, action: cartActionType): CartState => {

  switch (action.type) {
    case '[Cart] - Update Cart Products':
      console.log(action.payload);
      
      return { ...state, cart: [...action.payload ]}
    default:
      return state
  }
}
