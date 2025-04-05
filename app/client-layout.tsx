"use client"

import { useEffect, useState } from "react"
import { NavigationMenu } from "@/components/navigation-menu"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SplashScreen } from "@/components/splash-screen"
import { ShoppingCart } from "@/components/shopping-cart"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import { PerformanceOptimizations } from "@/components/performance-optimizations"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)
  const [hasVisited, setHasVisited] = useState(false)
  const [isTransitionComplete, setIsTransitionComplete] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const hasVisitedBefore = localStorage.getItem("hasVisited") === "true"
    setHasVisited(hasVisitedBefore)
    if (!hasVisitedBefore) {
      localStorage.setItem("hasVisited", "true")
    } else {
      // Skip splash screen if returning visitor
      setIsTransitionComplete(true)
    }

    // Apply performance optimizations
    if (process.env.NODE_ENV === 'production') {
      // Disable unnecessary animations for better performance
      document.documentElement.classList.add('reduce-motion');
    }
  }, [])

  // Function to handle splash screen completion
  const handleSplashComplete = () => {
    setIsTransitionComplete(true)
  }

  // Ensure all client-side content only renders after mounting
  if (!isMounted) return null

  return (
    <>
      {!hasVisited && !isTransitionComplete ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <AuthProvider>
          <CartProvider>
            <NavigationMenu />
            <CustomCursor />
            <ShoppingCart />
            <PerformanceOptimizations />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      )}
    </>
  )
} 