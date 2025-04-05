"use client"

import { useState, Fragment } from "react"
import { X, Trash2, ShoppingCart as ShoppingCartIcon, Plus, Minus, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { useCartContext } from "@/context/cart-context"
import { Dialog, Transition } from "@headlessui/react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function ShoppingCart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    isCartOpen, 
    closeCart,
    cartCount 
  } = useCartContext()
  
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const router = useRouter()

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false)
      alert("This is a demo. In a real application, you would be redirected to a secure checkout page.")
    }, 2000)
  }

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-[#1A1A1A] border-l border-[#333333] shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-xl font-medium text-white flex items-center">
                          <ShoppingCartIcon className="mr-2 h-5 w-5 text-[#BB2124]" /> 
                          Shopping Cart
                          <span className="ml-2 text-sm text-gray-400">({cartCount} items)</span>
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <motion.button
                            className="p-3 rounded-md hover:bg-[#2A2A2A] transition-colors duration-300 flex items-center justify-center"
                            onClick={closeCart}
                          >
                            <X className="h-5 w-5" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64">
                              <ShoppingCartIcon className="h-12 w-12 text-gray-500 mb-4" />
                              <p className="text-gray-400 mb-6">Your cart is empty</p>
                              <Button 
                                className="bg-[#BB2124] hover:bg-[#8A1619] text-white font-medium"
                                onClick={() => {
                                  closeCart();
                                  router.push("/shop");
                                }}
                              >
                                Continue Shopping
                              </Button>
                            </div>
                          ) : (
                            <ul role="list" className="-my-6 divide-y divide-[#333333]">
                              {cartItems.map((item) => (
                                <motion.li 
                                  key={item.id} 
                                  className="flex py-6"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-[#333333]">
                                    <ImageWithFallback
                                      src={item.image}
                                      fallbackSrc="/placeholder.svg?height=96&width=96"
                                      alt={item.name}
                                      className="h-full w-full object-cover object-center"
                                      width={96}
                                      height={96}
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-white">
                                        <h3>{item.name}</h3>
                                        <div className="flex items-center">
                                          <p className="text-gray-400 text-sm">${item.price.toFixed(2)} × {item.quantity}</p>
                                          <p className="ml-4 text-[#BB2124]">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center space-x-3">
                                        <button
                                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                          className="rounded-full bg-[#252525] p-1 text-gray-400 hover:text-white"
                                          disabled={item.quantity <= 1}
                                        >
                                          <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="text-gray-300">{item.quantity}</span>
                                        <button
                                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                          className="rounded-full bg-[#252525] p-1 text-gray-400 hover:text-white"
                                        >
                                          <Plus className="h-4 w-4" />
                                        </button>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => removeFromCart(item.id)}
                                        className="font-medium text-[#BB2124] hover:text-[#8A1619] flex items-center"
                                      >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </motion.li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {cartItems.length > 0 && (
                      <div className="border-t border-[#333333] px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-white mb-4">
                          <p>Subtotal</p>
                          <div className="text-lg font-bold">
                            ${cartTotal.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                          <p className="text-sm text-gray-400">Shipping and taxes calculated at checkout</p>
                        </div>

                        <div className="flex items-center justify-center mb-4">
                          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm py-2 px-3 rounded-md">
                            <Lock className="h-4 w-4 text-[#BB2124]" />
                            <span className="text-sm text-gray-300">Secure Checkout</span>
                          </div>
                        </div>

                        <div className="bg-[#1A1A1A] border border-[#333] rounded-md p-2 glitter-effect">
                          <Link href="/checkout">
                            <Button
                              onClick={closeCart}
                              className="w-full bg-[#BB2124] hover:bg-[#8A1619] text-white font-bold py-3 transition-colors"
                            >
                              Checkout
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

