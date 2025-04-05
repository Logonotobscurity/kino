"use client"

import { ProductGrid } from "@/components/product-grid"
import { ShoppingCart } from "@/components/shopping-cart"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowDown, ShieldCheck, Lock, HeartHandshake, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { useCartContext } from "@/context/cart-context"
import { Product } from "@/components/product-grid"

export default function AccessoriesShopPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { addToCart } = useCartContext()
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  
  // Sample accessories products
  const accessoriesProducts: Product[] = [
    {
      id: "acc1",
      name: "Luxury Leather Blindfold",
      price: 39.99,
      description: "Soft padded leather blindfold with adjustable elastic strap for a perfect fit and complete sensory deprivation.",
      image: "/placeholder.svg?height=400&width=600",
      category: "sensory"
    },
    {
      id: "acc2",
      name: "Designer Ball Gag",
      price: 49.99,
      description: "Comfortable silicone ball with adjustable leather straps and quick-release buckle for safety and style.",
      image: "/placeholder.svg?height=400&width=600",
      category: "restraints"
    },
    {
      id: "acc3",
      name: "Shibari Rope Set",
      price: 59.99,
      description: "Set of 3 premium cotton ropes in deep red, specially treated for smooth handling and durability during play.",
      image: "/placeholder.svg?height=400&width=600",
      category: "rope"
    },
    {
      id: "acc4",
      name: "Feather Teaser",
      price: 24.99,
      description: "Soft, tickling feather teaser with sturdy handle for gentle sensory play and tantalizing experiences.",
      image: "/placeholder.svg?height=400&width=600",
      category: "sensory"
    },
    {
      id: "acc5",
      name: "Wax Play Candles (Set of 3)",
      price: 34.99,
      description: "Specially formulated low-temperature wax candles in three colors for safe temperature play.",
      image: "/placeholder.svg?height=400&width=600",
      category: "sensory"
    },
    {
      id: "acc6",
      name: "Leather Wrist Cuffs",
      price: 79.99,
      description: "Padded leather wrist cuffs with locking buckles and D-rings for versatile restraint options.",
      image: "/placeholder.svg?height=400&width=600",
      category: "restraints"
    },
    {
      id: "acc7",
      name: "Wartenberg Pinwheel",
      price: 29.99,
      description: "Stainless steel sensation tool with precise pins for intense tactile stimulation across the skin.",
      image: "/placeholder.svg?height=400&width=600",
      category: "sensory"
    },
    {
      id: "acc8",
      name: "Leather Flogger",
      price: 69.99,
      description: "Handcrafted leather flogger with 20 soft tails and braided handle for precision impact play.",
      image: "/placeholder.svg?height=400&width=600",
      category: "impact"
    },
    {
      id: "acc9",
      name: "Bondage Tape",
      price: 14.99,
      description: "Reusable non-sticky bondage tape that only adheres to itself, perfect for quick restraints without knots.",
      image: "/placeholder.svg?height=400&width=600",
      category: "restraints"
    }
  ]
  
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
  }
  
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#121212]"></div>
        
        {/* Animated background effects - keeping this for the glittering effect */}
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
              Elegant <br />
              <span className="text-[#BB2124]">
                BDSM Accessories
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Exquisite accessories and tools to enhance your intimate experiences. Crafted with attention to detail, comfort, and style.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1A1A1A] border border-[#333] rounded-full px-6 py-3 flex items-center"
              >
                <ShieldCheck className="w-5 h-5 text-[#BB2124] mr-3" />
                <span className="text-white">Body Safe Materials</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1A1A1A] border border-[#333] rounded-full px-6 py-3 flex items-center"
              >
                <Lock className="w-5 h-5 text-[#BB2124] mr-3" />
                <span className="text-white">Discreet Shipping</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1A1A1A] border border-[#333] rounded-full px-6 py-3 flex items-center"
              >
                <Heart className="w-5 h-5 text-[#BB2124] mr-3" />
                <span className="text-white">Designer Quality</span>
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
      
      {/* Featured Products */}
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Featured <span className="text-[#BB2124]">Accessories</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our most popular intimate accessories, handcrafted for sensation, control, and pleasure with premium materials.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {accessoriesProducts.slice(0, 3).map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5 }}
                className="bg-[#121212] rounded-xl overflow-hidden border border-[#333] shadow-lg"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-[#BB2124] text-black px-3 py-1 rounded-full text-xs font-bold">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{product.name}</h3>
                    <span className="text-[#BB2124] font-bold">${product.price}</span>
                  </div>
                  <p className="text-gray-400 mb-4 text-sm">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-[#BB2124]/10 text-[#BB2124] px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <Link href={`/shop/${product.id}`}>
                      <Button className="bg-[#BB2124] hover:bg-[#8A1619] text-black">View Details</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Showcase */}
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Explore by <span className="text-[#BB2124]">Category</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Discover our accessory collections organized by type of play and sensation
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Sensory Play",
                description: "Tools for heightening or restricting senses for intense experiences",
                image: "/placeholder.svg?height=400&width=600",
                count: 12
              },
              {
                name: "Restraints",
                description: "Elegant cuffs, ties and bondage accessories for control play",
                image: "/placeholder.svg?height=400&width=600",
                count: 15
              },
              {
                name: "Impact Play",
                description: "Precision crafted instruments for pleasurable sensation play",
                image: "/placeholder.svg?height=400&width=600",
                count: 8
              },
              {
                name: "Rope & Harnesses",
                description: "Premium materials for beautiful and secure binding",
                image: "/placeholder.svg?height=400&width=600",
                count: 10
              }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                className="bg-[#121212] rounded-xl overflow-hidden border border-[#333] relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-56">
                  <div className="absolute inset-0 bg-[#121212]/80 z-10" />
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 relative z-20 -mt-20">
                  <div className="inline-flex items-center bg-[#BB2124] text-black text-xs font-bold px-2 py-1 rounded mb-3">
                    {category.count} ITEMS
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                  <Link href={`/shop?category=${category.name.toLowerCase().replace(' ', '-')}`}>
                    <Button variant="outline" className="w-full border-[#333] text-white hover:bg-[#BB2124] hover:text-black hover:border-transparent">
                      Browse Collection
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How to Choose Section */}
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="bg-[#121212] rounded-2xl overflow-hidden p-8 md:p-12 relative border border-[#333]">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  How to Choose <span className="text-[#BB2124]">Accessories</span>
                </h2>
                <p className="text-gray-300 mb-8">
                  Selecting the right accessories for your intimate play is essential. Consider these factors when browsing our collection to find pieces that perfectly match your desires and needs.
                </p>
                <ul className="space-y-4 mb-8">
                  {["Material safety and quality", "Comfort and adjustability", "Experience level", "Type of sensation desired", "Aesthetic preferences"].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="rounded-full bg-[#BB2124]/20 p-1 mr-3 mt-1">
                        <svg className="w-4 h-4 text-[#BB2124]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-[#BB2124] hover:bg-[#8A1619] text-black px-6 py-2">
                  View Beginner Guides
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative h-80 rounded-xl overflow-hidden"
              >
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Accessories Guide"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* All Products Section */}
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                All <span className="text-[#BB2124]">BDSM Accessories</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Browse our complete collection of premium accessories crafted for quality, comfort, and exceptional experiences.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessoriesProducts.map((product) => (
              <div key={product.id} className="glitter-effect">
                <ProductCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Shopping Cart */}
      <ShoppingCart />
    </main>
  )
} 