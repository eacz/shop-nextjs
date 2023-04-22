import { createContext } from 'react'

import { ICartProduct, OrderSummary, Address } from '@/interfaces'

interface ContextProps {
  isLoaded: boolean
  cart: ICartProduct[]
  cartSummary: OrderSummary
  address: Address

  addProductToCart: (product: ICartProduct) => void
  updateCartQuantity: (product: ICartProduct) => void
  removeProductFromCart: (product: ICartProduct) => void
  setAddress: (address: Address) => void
}

export const CartContext = createContext({} as ContextProps)
