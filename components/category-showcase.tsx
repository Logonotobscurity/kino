"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface Category {
  name: string
  description: string
  image: string
  count: number
}

const categories: Category[] = [
  {
    name: "restraints",
    description: "Premium leather restraints for secure and comfortable control",
    image: "/placeholder.svg?height=400&width=600",
    count: 12
  },
  {
    name: "furniture",
    description: "Professional-grade dungeon furniture for your play space",
    image: "/placeholder.svg?height=400&width=600",
    count: 8
  },
  {
    name: "impact",
    description: "High-quality impact toys for sensation play of varying intensities",
    image: "/placeholder.svg?height=400&width=600",
    count: 6
  },
  {
    name: "rope",
    description: "Premium bondage ropes and suspension equipment for all skill levels",
    image: "/placeholder.svg?height=400&width=600",
    count: 10
  }
]

export function CategoryShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  
  return (
    <section className="py-16 bg-[#0D0D0D] relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#BB2124" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Shop by <span className="text-[#BB2124]">Category</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Browse our extensive collection organized by category to find exactly what you need
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="relative group overflow-hidden rounded-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setActiveIndex(index)}
              onHoverEnd={() => setActiveIndex(null)}
            >
              <div className="aspect-[4/5] relative overflow-hidden rounded-xl">
                {/* Background image with parallax effect */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  animate={{ 
                    scale: activeIndex === index ? 1.1 : 1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Image 
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg?height=500&width=400";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60" />
                </motion.div>
                
                {/* Red border animation */}
                <motion.div 
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: activeIndex === index ? 1 : 0,
                    boxShadow: activeIndex === index ? "inset 0 0 0 2px #BB2124" : "inset 0 0 0 0px #BB2124"
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div>
                    <motion.div 
                      className="inline-flex items-center bg-[#BB2124] text-white text-xs font-bold px-2 py-1 rounded"
                      initial={{ opacity: 0.8, x: 0 }}
                      animate={{ 
                        opacity: activeIndex === index ? 1 : 0.8,
                        x: activeIndex === index ? 5 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.count} PRODUCTS
                    </motion.div>
                  </div>
                  
                  <div>
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-2 capitalize"
                      animate={{ 
                        y: activeIndex === index ? -5 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.name}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-300 text-sm mb-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: activeIndex === index ? 1 : 0,
                        height: activeIndex === index ? "auto" : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.description}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: activeIndex === index ? 1 : 0.8,
                        y: activeIndex === index ? 0 : 10
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link 
                        href={`/shop?category=${category.name}`}
                        className="inline-flex items-center py-2 px-4 bg-[#151515] hover:bg-[#BB2124] hover:text-white text-white text-sm rounded-full transition-colors duration-300"
                      >
                        Explore Collection
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 