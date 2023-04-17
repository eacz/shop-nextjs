import { ReactNode, useEffect, useReducer } from 'react'
import Cookie from 'js-cookie'

import { CartContext, CartReducer } from '.'
import { ICartProduct, OrderSummary } from '@/interfaces'

export interface CartState {
  isLoaded: boolean
  cart: ICartProduct[]
  cartSummary: OrderSummary
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  cartSummary: {
    numberOfItems: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
  },
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE)

  useEffect(() => {
    try {
      const cartItems = JSON.parse(Cookie.get('cart') || '[]')
      dispatch({ type: '[Cart] - LoadCart from cookies', payload: cartItems })
    } catch (error) {
      dispatch({ type: '[Cart] - LoadCart from cookies', payload: [] })
    }
  }, [])

  useEffect(() => {
    if(state.cart.length > 0){
      Cookie.set('cart', JSON.stringify(state.cart))
    }
  }, [state.cart])

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, product) => prev + product.quantity, 0)
    const subtotal = state.cart.reduce((prev, product) => prev + product.price * product.quantity, 0)
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
    const orderSummary: OrderSummary = {
      numberOfItems,
      subtotal,
      tax: subtotal * taxRate,
      total: subtotal * (taxRate + 1),
    }
    dispatch({ type: '[Cart] - Update Cart Summary', payload: orderSummary })
  }, [state.cart])

  const addProductToCart = (product: ICartProduct) => {
    const isProductInCart = state.cart.some((p) => p._id === product._id)
    if (!isProductInCart) {
      return dispatch({ type: '[Cart] - Update Cart Products', payload: [...state.cart, product] })
    }

    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    )
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

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Update Product Quantity', payload: product })
  }

  const removeProductFromCart = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Remove Product From Cart', payload: product })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,

        addProductToCart,
        updateCartQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
