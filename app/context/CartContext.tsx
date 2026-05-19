'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Product {
  id: string
  title: string
  description?: string
  price_eur?: number
  price_thb: number
  image: string
  product_type?: string
  handle?: string
  url?: string
  tags: {
    gender: string[]
    age: string[]
    relationship: string[]
    occasion: string[]
    budget: string[]
    style: string[]
  }
}

export interface CartItem {
  product: Product
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  updateQuantity: (productId: string, delta: number) => void
  calculateTotal: () => number
  getTotalItems: () => number
  isInCart: (productId: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('tiger-gift-cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tiger-gift-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id)
    if (existing) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { product, quantity: 1 }])
    }
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCart(cart
      .map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
      .filter(item => item.quantity > 0)
    )
  }

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.product.price_thb * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  const isInCart = (productId: string) => {
    return cart.some(item => item.product.id === productId)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, calculateTotal, getTotalItems, isInCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
