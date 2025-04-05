"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, Star, Truck, Shield, Award, ShoppingCart, Sparkles, Eye, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useCartContext } from "@/context/cart-context"
import { Product } from "@/components/product-grid"
import { sampleProducts, productExtras } from "./data"

export default function ProductPage({ params }: { params: { productId: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const { addToCart } = useCartContext()
  const [product, setProduct] = useState<Product | null>(null)
  const [extras, setExtras] = useState<any>(null)
  
  const productId = params.productId
  
  const heroRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const isInfoInView = useInView(infoRef, { once: true })
  
  // Generate additional product images (placeholders)
  const productImages = product ? [
    product.image,
    `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}`,
    `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.category)}`
  ] : []
  
  useEffect(() => {
    // Find the product based on the ID
    const foundProduct = sampleProducts.find(p => p.id === productId)
    setProduct(foundProduct || null)
    
    // Get extra product details
    setExtras(productExtras[productId as keyof typeof productExtras] || null)
    
    // Reset states when product changes
    setQuantity(1)
    setActiveImage(0)
    setIsAddedToCart(false)
  }, [productId])
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }
  
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1))
  }
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      })
      
      // Show success animation
      setIsAddedToCart(true)
      
      // Reset after animation
      setTimeout(() => {
        setIsAddedToCart(false)
      }, 3000)
    }
  }
  
  // Format price with 2 decimal places
  const formattedPrice = product ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price) : '$0.00'
  
  if (!product || !extras) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="p-8 rounded-lg bg-[#191919] text-white text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6 text-gray-400">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/shop">
            <Button className="bg-[#BB2124] hover:bg-[#8A1619] text-black">
              Return to Shop
          </Button>
        </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#121212] pb-24">
      {/* Hero section with parallax effect */}
      <div 
        ref={heroRef} 
        className="h-[40vh] relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#121212]"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#BB2124" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Content */}
        <div className="container mx-auto h-full flex items-end px-4">
          <motion.div 
            className="pb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4">
              <Badge className="bg-[#BB2124] text-black capitalize">
                {product.category}
              </Badge>
                <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-[#BB2124] fill-[#BB2124]" />
                ))}
                <span className="ml-2 text-white text-sm">(29 reviews)</span>
                </div>
                </div>
          </motion.div>
        </div>

        {/* Back button */}
        <motion.div 
          className="absolute top-8 left-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/shop">
            <Button variant="ghost" className="text-white hover:text-[#BB2124] hover:bg-black/20 backdrop-blur-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
          </Link>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images Gallery */}
          <div>
            <div className="bg-[#191919] rounded-xl overflow-hidden shadow-xl border border-[#333] aspect-square relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
              <Image
                    src={productImages[activeImage] || "/placeholder.svg"}
                    alt={`${product.name} - View ${activeImage + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                    priority={activeImage === 0}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg?height=600&width=600";
                    }}
              />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail selector */}
            <div className="flex space-x-4 mt-4">
              {productImages.map((image, index) => (
                <motion.button
                  key={index}
                  className={`rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImage === index ? "border-[#BB2124]" : "border-transparent"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveImage(index)}
                >
                  <div className="relative w-16 h-16">
                <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg?height=64&width=64";
                      }}
                    />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <motion.div 
            ref={infoRef}
            className="bg-[#191919] rounded-xl border border-[#333] p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-start mb-6">
          <div>
                <div className="text-sm text-[#999] mb-1">Price</div>
                <div className="text-3xl font-bold text-white">{formattedPrice}</div>
              </div>
              
              <Badge className="bg-[#1A1A1A] text-[#BB2124] border border-[#BB2124]/30 px-3 py-1">
                <Sparkles className="h-3.5 w-3.5 mr-1" /> Premium
              </Badge>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-white font-medium mb-2">Potency</h3>
                <p className="text-[#999]">{extras.potency}</p>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-2">Description</h3>
                <p className="text-[#999] leading-relaxed">{extras.longDescription}</p>
              </div>
            </div>

            {/* Quantity selector */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-white">Quantity:</span>
              <div className="flex items-center">
                <motion.button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    quantity <= 1 
                      ? "bg-[#333] text-[#777] cursor-not-allowed" 
                      : "bg-[#252525] text-white hover:bg-[#333]"
                  }`}
                >
                  <Minus className="h-3.5 w-3.5" />
                </motion.button>
                
                <div className="w-12 text-center text-white">{quantity}</div>
                
                <motion.button
                  onClick={increaseQuantity}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full bg-[#252525] text-white hover:bg-[#333] flex items-center justify-center"
                >
                  <Plus className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </div>

            {/* Add to cart button */}
            <motion.div 
              className="mb-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={isAddedToCart}
                className={`w-full relative overflow-hidden ${
                  isAddedToCart
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-[#BB2124] hover:bg-[#8A1619]"
                }`}
              >
                {isAddedToCart ? (
                  <motion.div 
                    className="flex items-center" 
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="mr-2 h-5 w-5" />
                    Added to Cart
                  </motion.div>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
                  </>
                )}
              </Button>
            </motion.div>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#1A1A1A] p-3 rounded-lg flex flex-col items-center text-center">
                <Truck className="h-5 w-5 text-[#BB2124] mb-2" />
                <span className="text-white text-sm">Free Shipping</span>
                <span className="text-[#999] text-xs">Orders over $100</span>
              </div>

              <div className="bg-[#1A1A1A] p-3 rounded-lg flex flex-col items-center text-center">
                <Shield className="h-5 w-5 text-[#BB2124] mb-2" />
                <span className="text-white text-sm">Quality Guarantee</span>
                <span className="text-[#999] text-xs">100% Satisfaction</span>
              </div>

              <div className="bg-[#1A1A1A] p-3 rounded-lg flex flex-col items-center text-center">
                <Award className="h-5 w-5 text-[#BB2124] mb-2" />
                <span className="text-white text-sm">Lab Tested</span>
                <span className="text-[#999] text-xs">Verified Quality</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

