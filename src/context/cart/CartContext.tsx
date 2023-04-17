import { createContext } from 'react'

import { ICartProduct, OrderSummary } from '@/interfaces'

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[]
  cartSummary: OrderSummary

  addProductToCart: (product: ICartProduct) => void
  updateCartQuantity: (product: ICartProduct) => void
  removeProductFromCart: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps)
