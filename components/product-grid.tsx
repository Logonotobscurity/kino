"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "@/components/product-card"
import { useCartContext } from "@/context/cart-context"
import { Filter, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample product data
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Leather Restraints",
    description: "Handcrafted leather restraints with reinforced stitching and secure locking mechanisms.",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "restraints"
  },
  {
    id: "2",
    name: "Adjustable St. Andrew's Cross",
    description: "Fully adjustable professional-grade cross with padded restraint points and stable base.",
    price: 799.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "furniture"
  },
  {
    id: "3",
    name: "Dungeon Starter Kit",
    description: "Complete starter package with essential equipment for setting up your first play space.",
    price: 349.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "kits"
  },
  {
    id: "4",
    name: "Impact Play Collection",
    description: "Set of premium impact toys including paddles, floggers, and crops of varying intensities.",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "impact"
  },
  {
    id: "5",
    name: "Suspension Rigging Kit",
    description: "Professional-grade suspension equipment with safety-rated hardware and detailed guide.",
    price: 249.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "rope"
  },
  {
    id: "6",
    name: "Sensory Deprivation Hood",
    description: "Premium leather hood with removable blindfold and gag components for customizable play.",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "sensory"
  },
  {
    id: "7",
    name: "Deluxe Spanking Paddle",
    description: "Ergonomic leather paddle designed for precision and comfort during extended play sessions.",
    price: 69.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "impact"
  },
  {
    id: "8",
    name: "Premium Bondage Rope Set",
    description: "Set of 3 professional-grade ropes in varying lengths, perfect for intricate ties and harnesses.",
    price: 45.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "rope"
  }
]

const categories = [
  "all",
  "restraints",
  "furniture",
  "impact",
  "rope",
  "sensory",
  "kits"
]

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const { addToCart } = useCartContext()

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(sampleProducts)
    } else {
      setFilteredProducts(
        sampleProducts.filter(product => product.category === selectedCategory)
      )
    }
  }, [selectedCategory])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
  }

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen)
  }

  // Variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">Our Products</h2>
        
        {/* Mobile filter button */}
        <div className="md:hidden mb-4">
          <Button 
            onClick={toggleMobileFilter}
            className="w-full bg-[#121212] border border-[#333] text-white hover:bg-[#222] flex items-center justify-center"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter by Category
          </Button>
        </div>
        
        {/* Desktop category filters */}
        <div className="hidden md:flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap capitalize ${
                selectedCategory === category
                  ? "bg-[#BB2124] text-black"
                  : "bg-[#121212] text-white hover:bg-[#333]"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Mobile category filters */}
      {isMobileFilterOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden flex flex-wrap gap-2 mb-6"
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setIsMobileFilterOpen(false)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap capitalize ${
                selectedCategory === category
                  ? "bg-[#BB2124] text-black"
                  : "bg-[#121212] border border-[#333] text-white hover:bg-[#333]"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>
      )}
      
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-[#333] mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No products found</h3>
          <p className="text-[#999]">Try selecting a different category</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard 
                product={product} 
                onAddToCart={() => handleAddToCart(product)} 
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

