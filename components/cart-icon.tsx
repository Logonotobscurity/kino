"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartContext } from "@/context/cart-context"
import { motion, AnimatePresence } from "framer-motion"

export function CartIcon() {
  const { cartCount, toggleCart } = useCartContext()

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative rounded-full text-white hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
        onClick={toggleCart}
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-5 w-5" />
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.div
              key="cart-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-[#D4AF37] text-black text-xs font-bold"
            >
              {cartCount}
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  )
}

