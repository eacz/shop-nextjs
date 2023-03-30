import { ReactNode, useReducer } from 'react'

import { CartContext, CartReducer } from '.'
import { ICartProduct } from '@/interfaces'

export interface CartState {
  cart: ICartProduct[]
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE)

  const addProductToCart = (product: ICartProduct) => {
    const isProductInCart = state.cart.some((p) => p._id === product._id)
    if (!isProductInCart) {
      return dispatch({ type: '[Cart] - Update Cart Products', payload: [...state.cart, product] })
    }

    const productInCartButDifferentSize = state.cart.some((p) => p._id === product._id && p.size === product.size)
    if (!productInCartButDifferentSize) {
      return dispatch({ type: '[Cart] - Update Cart Products', payload: [...state.cart, product] })
    }

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p
      if (p.size !== product.size) return p

      p.quantity += product.quantity
      return p
    })

    dispatch({ type: '[Cart] - Update Cart Products', payload: updatedProducts })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
