"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
  isCartOpen: boolean
  toggleCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize cart from localStorage on client-side
  useEffect(() => {
    setMounted(true)
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        setCartItems([])
      }
    }
  }, [])

  // Update localStorage when cart changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems, mounted])

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id)

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += item.quantity
        return updatedItems
      } else {
        return [...prevItems, item]
      }
    })
    // Open cart when adding an item
    setIsCartOpen(true)
  }

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev)
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        toggleCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  return context
} 