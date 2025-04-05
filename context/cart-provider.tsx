"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/components/product-card"

interface CartItem extends Product {
  quantity: number
}

// Simplified version for storage to prevent circular references
interface StorableCartItem {
  id: string
  name: string
  price: number
  quantity: number
  image1: string
  category: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Convert to storable format to avoid serialization issues
const toStorableCart = (items: CartItem[]): StorableCartItem[] => {
  return items.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image1: item.image1,
    category: item.category
  }))
}

// Convert from storage format back to full cart items
const fromStorableCart = (items: StorableCartItem[], products: Product[]): CartItem[] => {
  return items.map(item => {
    // Find the full product data
    const fullProduct = products.find(p => p.id === item.id)
    
    // If we have the full product, use it, otherwise use the basic item data
    if (fullProduct) {
      return { ...fullProduct, quantity: item.quantity }
    }
    
    // Fallback with minimal data
    return {
      ...item,
      image2: '',
      description: ''
    } as CartItem
  })
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [availableProducts, setAvailableProducts] = useState<Product[]>([])

  // Calculate derived values
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      // Safe check for window object to avoid SSR issues
      if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem("premium-store-cart")
        if (storedCart) {
          try {
            const parsedCart = JSON.parse(storedCart) as StorableCartItem[]
            // Convert the simplified stored cart to full cart items
            setCartItems(parsedCart.map(item => ({
              ...item,
              image2: '',
              description: ''
            } as CartItem)))
          } catch (error) {
            console.error("Failed to parse cart from localStorage", error)
            setCartItems([])
          }
        }
        setIsInitialized(true)
      }
    } catch (error) {
      console.error("Error accessing localStorage", error)
      setIsInitialized(true)
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      try {
        // Convert to a simpler format that won't have circular references
        const storableCart = toStorableCart(cartItems)
        localStorage.setItem("premium-store-cart", JSON.stringify(storableCart))
      } catch (error) {
        console.error("Failed to stringify cart items", error)
        // Could add fallback storage option here if needed
      }
    }
  }, [cartItems, isInitialized])

  const addToCart = (product: Product) => {
    // Track available products for restoration from storage
    setAvailableProducts(prev => {
      if (!prev.some(p => p.id === product.id)) {
        return [...prev, product]
      }
      return prev
    })
    
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // Increment quantity if item already exists
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })

    // Open cart when adding items
    setIsOpen(true)
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const openCart = () => {
    setIsOpen(true)
  }

  const closeCart = () => {
    setIsOpen(false)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isOpen,
        openCart,
        closeCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

