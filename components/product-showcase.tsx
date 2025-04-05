"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { Product } from "@/components/product-grid"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowRight, Star } from "lucide-react"
import { useCartContext } from "@/context/cart-context"

// Curated featured products
const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Premium Leather Restraints",
    description: "Handcrafted leather restraints with reinforced stitching and secure locking mechanisms for ultimate control and comfort.",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "restraints"
  },
  {
    id: "2",
    name: "Adjustable St. Andrew's Cross",
    description: "Fully adjustable professional-grade cross with padded restraint points and stable base, perfect for a variety of play scenarios.",
    price: 799.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "furniture"
  },
  {
    id: "3",
    name: "Dungeon Starter Kit",
    description: "The perfect entry point into the world of BDSM with essential equipment for setting up your first play space and exploration.",
    price: 349.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "kits"
  }
]

export function ProductShowcase() {
  const [activeProductIndex, setActiveProductIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { addToCart } = useCartContext()
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])
  
  // Animation controls for product transitions
  const controls = useAnimation()
  
  // Auto-rotate through featured products
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveProductIndex((prev) => (prev + 1) % featuredProducts.length)
      }, 5000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying])
  
  // Animate product transition when active product changes
  useEffect(() => {
    controls.start({
      opacity: [0, 1],
      y: [20, 0],
      transition: { duration: 0.5 }
    })
  }, [activeProductIndex, controls])
  
  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    
    // Visual feedback
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.3 }
    })
  }
  
  // Pause auto-rotation on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)
  
  const activeProduct = featuredProducts[activeProductIndex]

  return (
    <motion.section 
      ref={containerRef}
      className="py-20 relative overflow-hidden bg-[#121212]"
      style={{ opacity, scale }}
    >
      {/* Background particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#BB2124]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0, Math.random() * 0.5, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 5 + 5,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          style={{ y }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            <span className="text-[#BB2124]">
              Featured Products
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, crafted for exceptional quality and effectiveness
          </p>
        </motion.div>
        
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Product Image with 3D effect */}
          <motion.div 
            className="relative aspect-square rounded-xl overflow-hidden"
            animate={controls}
          >
            <div className="absolute inset-0 bg-[#121212]/70 z-10 pointer-events-none" />
            
            <motion.div
              className="relative w-full h-full"
              initial={{ rotateY: 0 }}
              whileHover={{ rotateY: 10, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              style={{ 
                transformStyle: "preserve-3d",
                transformOrigin: "center center"
              }}
            >
              <Image
                src={activeProduct.image}
                alt={activeProduct.name}
                fill
                className="object-cover rounded-xl"
                style={{ transformStyle: "preserve-3d" }}
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg?height=600&width=600";
                }}
              />
              
              {/* Floating badge */}
              <motion.div 
                className="absolute top-4 left-4 z-20 bg-[#BB2124] text-black px-3 py-1 rounded-full text-xs font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                FEATURED
              </motion.div>
              
              {/* 3D floating elements */}
              <motion.div
                className="absolute -right-6 -bottom-6 w-32 h-32 z-0"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border-2 border-dashed border-[#BB2124]/30" />
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Product details */}
          <motion.div 
            className="p-6 bg-[#151515] rounded-xl border border-[#333] relative"
            animate={controls}
          >
            {/* Category tag */}
            <div className="inline-block bg-[#1A1A1A] px-3 py-1 rounded-full text-xs text-[#999] mb-4 capitalize">
              {activeProduct.category}
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {activeProduct.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-[#BB2124] fill-[#BB2124]"
                />
              ))}
              <span className="ml-2 text-sm text-gray-400">(24 reviews)</span>
            </div>
            
            <p className="text-gray-400 mb-6">{activeProduct.description}</p>
            
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-sm text-gray-500 mb-1">Price</div>
                <div className="text-3xl font-bold text-white">
                  ${activeProduct.price.toFixed(2)}
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => handleAddToCart(activeProduct)}
                  className="bg-[#BB2124] hover:bg-[#8A1619] text-white font-bold"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </motion.div>
            </div>
            
            <Link href="/contact" className="inline-flex items-center text-[#BB2124] hover:text-[#8A1619] transition-colors">
              View Details
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            
            {/* Product selector */}
            <div className="flex justify-center mt-8 space-x-3">
              {featuredProducts.map((_, index) => (
                <div 
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                    index === activeProductIndex 
                    ? "bg-[#BB2124]" 
                    : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  onClick={() => setActiveProductIndex(index)}
                />
              ))}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -right-3 -top-3 w-6 h-6 bg-[#BB2124] rounded-full opacity-70 blur-sm" />
            <div className="absolute -left-3 -bottom-3 w-6 h-6 bg-[#BB2124] rounded-full opacity-70 blur-sm" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
} 