"use client"

import { ProductGrid } from "@/components/product-grid"
import { ShoppingCart } from "@/components/shopping-cart"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowDown, ShieldCheck, Lock, HeartHandshake } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { useCartContext } from "@/context/cart-context"
import { Product } from "@/components/product-grid"

export default function DungeonShopPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { addToCart } = useCartContext()
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  
  // Sample dungeon products
  const dungeonProducts: Product[] = [
    {
      id: "dp1",
      name: "Premium Leather Restraints",
      price: 129.99,
      description: "Handcrafted leather restraints with reinforced stitching and secure locking mechanisms.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Restraints"
    },
    {
      id: "dp2",
      name: "Adjustable St. Andrew's Cross",
      price: 799.99,
      description: "Fully adjustable professional-grade cross with padded restraint points and stable base.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Furniture"
    },
    {
      id: "dp3",
      name: "Dungeon Starter Kit",
      price: 349.99,
      description: "Complete starter package with essential equipment for setting up your first play space.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Kits"
    },
    {
      id: "dp4",
      name: "Impact Play Collection",
      price: 199.99,
      description: "Set of premium impact toys including paddles, floggers, and crops of varying intensities.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Impact Play"
    },
    {
      id: "dp5",
      name: "Suspension Rigging Kit",
      price: 249.99,
      description: "Professional-grade suspension equipment with safety-rated hardware and detailed guide.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Rope & Suspension"
    },
    {
      id: "dp6",
      name: "Sensory Deprivation Hood",
      price: 89.99,
      description: "Premium leather hood with removable blindfold and gag components for customizable play.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Sensory Play"
    },
    {
      id: "dp7",
      name: "Deluxe Spanking Paddle",
      price: 69.99,
      description: "Ergonomic leather paddle designed for precision and comfort during extended play sessions.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Impact Play"
    },
    {
      id: "dp8",
      name: "Premium Bondage Rope Set",
      price: 45.99,
      description: "Set of 3 professional-grade ropes in varying lengths, perfect for intricate ties and harnesses.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Rope & Suspension"
    },
    {
      id: "dp9",
      name: "Leather Posture Collar",
      price: 89.99,
      description: "Adjustable high-neck posture collar with reinforced structure and secure locking mechanism.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Restraints"
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
              Premium <br />
              <span className="text-[#BB2124]">
                Dungeon Equipment & Toys
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Professional-grade dungeon furniture, restraints, and accessories crafted for safety, durability, and exceptional experiences.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#121212] border border-[#333] rounded-full px-6 py-3 flex items-center"
              >
                <ShieldCheck className="w-5 h-5 text-[#BB2124] mr-3" />
                <span className="text-white">Safety Certified</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#121212] border border-[#333] rounded-full px-6 py-3 flex items-center"
              >
                <Lock className="w-5 h-5 text-[#BB2124] mr-3" />
                <span className="text-white">Discreet Shipping</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#121212] border border-[#333] rounded-full px-6 py-3 flex items-center"
              >
                <HeartHandshake className="w-5 h-5 text-[#BB2124] mr-3" />
                <span className="text-white">Satisfaction Guarantee</span>
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
                Featured <span className="text-[#BB2124]">Equipment</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our most popular dungeon equipment, handcrafted by expert artisans using premium materials for maximum durability and enjoyment.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dungeonProducts.slice(0, 3).map((product) => (
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
      
      {/* Custom Design Section */}
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
                  Custom Equipment <span className="text-[#BB2124]">Design</span>
                </h2>
                <p className="text-gray-300 mb-8">
                  Can't find exactly what you're looking for? Our master craftspeople can create custom pieces designed to your specifications, ensuring perfect functionality for your unique needs.
                </p>
                <ul className="space-y-4 mb-8">
                  {["Personalized consultation", "Custom measurements", "Material selection", "Unique design elements", "Satisfaction guarantee"].map((feature, index) => (
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
                  Request Custom Design
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
                  alt="Custom Design Process"
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
                All <span className="text-[#BB2124]">Equipment & Toys</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Browse our complete collection of premium dungeon equipment and toys crafted for quality and exceptional experiences.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dungeonProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Safety & Trust Section */}
      <section className="py-16 bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#121212] border border-[#333] p-8 rounded-xl text-center"
            >
              <div className="bg-[#BB2124]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#BB2124]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Safety Certified</h3>
              <p className="text-gray-400">All our equipment is rigorously tested to meet or exceed safety standards, ensuring reliability during use.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#121212] border border-[#333] p-8 rounded-xl text-center"
            >
              <div className="bg-[#BB2124]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#BB2124]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Discreet Shipping</h3>
              <p className="text-gray-400">Your privacy matters. All orders are shipped in plain packaging with no indication of contents.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#121212] border border-[#333] p-8 rounded-xl text-center"
            >
              <div className="bg-[#BB2124]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#BB2124]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Satisfaction Guarantee</h3>
              <p className="text-gray-400">If you're not completely satisfied with your purchase, we offer a 30-day return policy.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Shopping Cart */}
      <ShoppingCart />
    </main>
  )
} 