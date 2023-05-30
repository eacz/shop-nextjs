import { CartState } from './CartProvider'
import { Address, ICartProduct, OrderSummary } from '@/interfaces'

type cartActionType =
  | { type: '[Cart] - LoadCart from cookies'; payload: ICartProduct[] }
  | { type: '[Cart] - Update Cart Products'; payload: ICartProduct[] }
  | { type: '[Cart] - Update Product Quantity'; payload: ICartProduct }
  | { type: '[Cart] - Remove Product From Cart'; payload: ICartProduct }
  | { type: '[Cart] - Update Cart Summary'; payload: OrderSummary }
  | { type: '[Cart] - Update Address'; payload: Address }
  | { type: '[Cart] - Load Address from Cookies'; payload: Address }
  | { type: '[Cart] - Create Order' }

export const CartReducer = (state: CartState, action: cartActionType): CartState => {
  switch (action.type) {
    case '[Cart] - Update Cart Products':
      return { ...state, cart: [...action.payload] }

    case '[Cart] - LoadCart from cookies':
      return { ...state, cart: action.payload, isLoaded: true }

    case '[Cart] - Update Product Quantity':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product
          if (product.size !== action.payload.size) return product

          return action.payload
        }),
      }

    case '[Cart] - Remove Product From Cart':
      return {
        ...state,
        cart: state.cart.filter((product) => {
          if (product._id === action.payload._id && product.size === action.payload.size) return
          return product
        }),
      }

    case '[Cart] - Update Cart Summary':
      return { ...state, cartSummary: action.payload }

    case '[Cart] - Load Address from Cookies':
    case '[Cart] - Update Address':
      return { ...state, address: action.payload }
    case '[Cart] - Create Order':
      return {
        ...state,
        cart: [],
        cartSummary: {
          numberOfItems: 0,
          tax: 0,
          total: 0,
          subtotal: 0,
        },
      }

    default:
      return state
  }
}
