"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ErrorBoundary } from "@/components/error-boundary"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Lock, User } from "lucide-react"
import { CartIcon } from "@/components/cart-icon"
import { useRouter } from "next/navigation"
import { createClient } from "@/app/lib/supabase/client"

export function NavigationMenu() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeHover, setActiveHover] = useState<string | null>(null)
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const shopDropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUserAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsUserLoggedIn(!!session)
    }
    
    checkUserAuth()
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsUserLoggedIn(!!session)
    })
    
    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [supabase.auth])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(event.target as Node)) {
        setIsShopDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleShopDropdown = () => {
    setIsShopDropdownOpen(!isShopDropdownOpen)
  }

  const menuItems = [
    { name: "Home", href: "/" },
    { 
      name: "Shop", 
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "All Products", href: "/shop" },
        { name: "Dungeon Equipment", href: "/shop/dungeon" },
        { name: "BDSM Accessories", href: "/shop/accessories" }
      ]
    },
    { name: "Classes", href: "/classes" },
    { name: "Reservation", href: "/reservation" },
    { name: "Contact", href: "/contact" },
  ]

  // Handle profile click based on auth state
  const handleProfileClick = () => {
    if (isUserLoggedIn) {
      router.push('/auth/profile')
    } else {
      router.push('/auth/sign-in')
    }
  }

  return (
    <ErrorBoundary>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
          isScrolled ? "bg-[#121212]/95 backdrop-blur-sm shadow-md" : "bg-transparent",
        )}
      >
        {/* Top red border with animation */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1 bg-[#BB2124]"
        />

        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="relative group">
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-2xl font-bold text-[#BB2124]">Kinkoasis</span>
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#BB2124] rounded-full" 
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <ul className="flex space-x-8">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    {item.hasDropdown ? (
                      <div 
                        ref={shopDropdownRef}
                        className="relative" 
                        onMouseEnter={() => setActiveHover(item.name)}
                        onMouseLeave={() => setActiveHover(null)}
                      >
                        <button 
                          onClick={toggleShopDropdown}
                          className={cn(
                            "text-white font-medium flex items-center transition-colors duration-200",
                            (activeHover === item.name || isShopDropdownOpen) ? "text-[#BB2124]" : "hover:text-[#BB2124]",
                          )}
                        >
                          {item.name}
                          <ChevronDown className={cn(
                            "ml-1 h-4 w-4 transition-transform duration-200",
                            isShopDropdownOpen ? "rotate-180" : ""
                          )} />
                          
                          {/* Animated hover underline */}
                          {(activeHover === item.name || isShopDropdownOpen) && (
                            <motion.span 
                              layoutId="navigation-underline"
                              className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#BB2124] rounded-full" 
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </button>
                        
                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {isShopDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-[#1A1A1A] border border-[#333] overflow-hidden z-10"
                            >
                              <div className="py-1">
                                {item.dropdownItems?.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.name}
                                    href={dropdownItem.href}
                                    onClick={() => setIsShopDropdownOpen(false)}
                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-[#BB2124] transition-colors duration-150"
                                  >
                                    {dropdownItem.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div 
                        className="relative" 
                        onMouseEnter={() => setActiveHover(item.name)}
                        onMouseLeave={() => setActiveHover(null)}
                      >
                        <Link 
                          href={item.href} 
                          className={cn(
                            "text-white font-medium flex items-center transition-colors duration-200",
                            activeHover === item.name ? "text-[#BB2124]" : "hover:text-[#BB2124]",
                          )}
                        >
                          {item.name}
                          
                          {/* Animated hover underline */}
                          {activeHover === item.name && (
                            <motion.span 
                              layoutId="navigation-underline"
                              className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#BB2124] rounded-full" 
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </Link>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Action buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <CartIcon />
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Button 
                  onClick={handleProfileClick}
                  className="bg-[#333] hover:bg-[#444] text-white rounded-md px-4 shadow-md transition-all duration-300 hover:shadow-lg mr-2"
                >
                  <User className="mr-2 h-4 w-4" /> 
                  {isUserLoggedIn ? 'Profile' : 'Sign In'}
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link href="/community">
                  <Button className="bg-[#BB2124] hover:bg-[#8A1619] text-black rounded-md px-6 shadow-md transition-all duration-300 hover:shadow-lg">
                    <Lock className="mr-2 h-4 w-4" /> Join Community
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#BB2124]/10 text-[#BB2124] transition-colors duration-200 hover:bg-[#BB2124]/20"
              onClick={toggleMobileMenu} 
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#0F0F0F]/98 backdrop-blur-sm z-40 flex flex-col pt-20 px-6 md:hidden"
            >
              <nav className="flex flex-col items-start space-y-6">
                {menuItems.map((item) => (
                  <div key={item.name} className="w-full">
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={toggleShopDropdown}
                          className="flex items-center justify-between w-full text-xl text-white hover:text-[#BB2124] transition-colors duration-200"
                        >
                          <span>{item.name}</span>
                          <ChevronDown className={cn(
                            "ml-1 h-5 w-5 transition-transform duration-200",
                            isShopDropdownOpen ? "rotate-180" : ""
                          )} />
                        </button>
                        
                        <AnimatePresence>
                          {isShopDropdownOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="ml-4 mt-2 space-y-2 overflow-hidden"
                            >
                              {item.dropdownItems?.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  onClick={toggleMobileMenu}
                                  className="block text-gray-300 hover:text-[#BB2124] py-2 border-l-2 border-[#333] pl-4 text-lg transition-colors duration-200"
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={toggleMobileMenu}
                        className="block text-xl text-white hover:text-[#BB2124] transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Profile button in mobile menu */}
                <Button 
                  onClick={handleProfileClick}
                  className="w-full justify-start bg-[#333] hover:bg-[#444] text-white rounded-md px-4 shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <User className="mr-2 h-4 w-4" /> 
                  {isUserLoggedIn ? 'Profile' : 'Sign In'}
                </Button>
              </nav>
              
              <div className="mt-8 flex items-center">
                <CartIcon />
              </div>
              
              <div className="mt-auto pb-8 pt-8">
                <Link href="/community" onClick={toggleMobileMenu}>
                  <Button className="w-full bg-[#BB2124] hover:bg-[#8A1619] text-black rounded-md px-6 py-6 shadow-md">
                    <Lock className="mr-2 h-5 w-5" /> Join Community
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </ErrorBoundary>
  )
}

