"use client"

import { ProductGrid } from "@/components/product-grid"
import { ShoppingCart } from "@/components/shopping-cart"
import { ProductShowcase } from "@/components/product-showcase"
import { CategoryShowcase } from "@/components/category-showcase"
import { Testimonials } from "@/components/testimonials"
import { ParallaxScroll } from "@/components/parallax-scroll"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowDown } from "lucide-react"

export default function ShopPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      {/* Enhanced Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#121212]"></div>
        
        {/* Animated background effects */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(45deg, #BB2124 25%, transparent 25%, transparent 50%, #BB2124 50%, #BB2124 75%, transparent 75%, transparent)",
            backgroundSize: "100px 100px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "100px 100px"],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear"
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#BB2124]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.4 + 0.1,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [Math.random() * 0.4 + 0.1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 10 + 10,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <motion.div 
          className="container mx-auto px-4 relative z-10 text-center"
          style={{ opacity, scale, y }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Discover Premium <br />
              <span className="text-[#BB2124]">
                Dungeon Equipment
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Elevate your experience with our carefully crafted collection of premium dungeon equipment designed for optimal durability, safety, and exceptional quality.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#121212] border border-[#333] rounded-full px-6 py-3 flex items-center"
              >
                <span className="w-3 h-3 bg-[#BB2124] rounded-full mr-3 animate-pulse"></span>
                <span className="text-white">Discreet Shipping</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#121212] border border-[#333] rounded-full px-6 py-3 flex items-center"
              >
                <span className="w-3 h-3 bg-[#BB2124] rounded-full mr-3 animate-pulse"></span>
                <span className="text-white">Premium Quality</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#121212] border border-[#333] rounded-full px-6 py-3 flex items-center"
              >
                <span className="w-3 h-3 bg-[#BB2124] rounded-full mr-3 animate-pulse"></span>
                <span className="text-white">Safety Certified</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-sm mb-2 text-gray-400">Scroll to explore</span>
          <ArrowDown className="h-5 w-5 text-[#BB2124]" />
        </motion.div>
      </section>
      
      {/* Featured Products Showcase */}
      <ProductShowcase />
      
      {/* Category Showcase */}
      <CategoryShowcase />
      
      {/* Parallax Section */}
      <ParallaxScroll />
      
      {/* Product Grid */}
      <ProductGrid />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Shopping Cart (this will only be visible when active) */}
      <ShoppingCart />
    </main>
  )
}

