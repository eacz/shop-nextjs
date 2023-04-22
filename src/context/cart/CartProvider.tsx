import { ReactNode, useEffect, useReducer } from 'react'
import Cookies from 'js-cookie'

import { CartContext, CartReducer } from '.'
import { ICartProduct, OrderSummary, Address } from '@/interfaces'

export interface CartState {
  isLoaded: boolean
  cart: ICartProduct[]
  cartSummary: OrderSummary
  address: Address
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
  address: {
    firstname: '',
    lastname: '',
    address: '',
    address2: '',
    zipcode: '',
    city: '',
    country: '',
    phone: '',
  },
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE)

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

  const setAddress = (address: Address) => {
    Cookies.set('firstname', address.firstname)
    Cookies.set('lastname', address.lastname)
    Cookies.set('address', address.address)
    Cookies.set('address2', address.address2 || '')
    Cookies.set('zipcode', address.zipcode)
    Cookies.set('city', address.city)
    Cookies.set('country', address.country)
    Cookies.set('phone', address.phone)
    dispatch({ type: '[Cart] - Update Address', payload: address })
  }

  //Load initial state for cart from cookies
  useEffect(() => {
    try {
      const cartItems = JSON.parse(Cookies.get('cart') || '[]')
      dispatch({ type: '[Cart] - LoadCart from cookies', payload: cartItems })
    } catch (error) {
      dispatch({ type: '[Cart] - LoadCart from cookies', payload: [] })
    }
  }, [])

  useEffect(() => {
    if (state.cart.length > 0) {
      Cookies.set('cart', JSON.stringify(state.cart))
    }
  }, [state.cart])

  //update cart summary if cart changes
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

  //Load initial state for address from cookies
  useEffect(() => {
    if (Cookies.get('firstname')) {
      const address: Address = {
        firstname: Cookies.get('firstname') || '',
        lastname: Cookies.get('lastname') || '',
        address: Cookies.get('address') || '',
        zipcode: Cookies.get('zipcode') || '',
        address2: Cookies.get('address2') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
      }
      dispatch({ type: '[Cart] - Load Address from Cookies', payload: address })
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        ...state,

        addProductToCart,
        updateCartQuantity,
        removeProductFromCart,
        setAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
