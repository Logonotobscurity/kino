"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/components/product-grid"

export interface ProductCardProps {
  product: Product
  onAddToCart: () => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Format price with 2 decimal places
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="relative overflow-hidden bg-[#121212] border-[#333] hover:border-[#BB2124] transition-colors duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product image with fallback */}
        <div className="relative h-60 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="transition-transform duration-500"
            style={{
              objectFit: "cover",
              transform: isHovered ? "scale(1.05)" : "scale(1)"
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg?height=256&width=384";
            }}
          />
          
          {/* Quick view overlay */}
          <div 
            className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link href="/contact">
              <Button 
                variant="outline" 
                size="sm"
                className="text-white border-white hover:bg-white hover:text-black"
              >
                <Eye className="mr-2 h-4 w-4" />
                Quick View
              </Button>
            </Link>
          </div>
          
          {/* New product badge */}
          {product.id === "1" || product.id === "5" ? (
            <Badge 
              className="absolute top-2 left-2 bg-[#BB2124] text-black"
            >
              New
            </Badge>
          ) : null}
        </div>
        
        <CardContent className="p-4 bg-[#121212]">
          <div className="mb-1">
            <Badge 
              variant="outline"
              className="text-xs text-[#999] border-[#333] capitalize"
            >
              {product.category}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
          <p className="text-sm text-[#999] mb-3 line-clamp-2">{product.description}</p>
          
          {/* Rating stars */}
          <div className="flex items-center text-[#BB2124] mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="h-3.5 w-3.5 fill-[#BB2124]" 
                strokeWidth={0}
              />
            ))}
            <span className="ml-2 text-xs text-[#999]">(5.0)</span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex items-center justify-between bg-[#121212]">
          <div className="text-lg font-bold text-white">{formattedPrice}</div>
          <Button 
            onClick={onAddToCart}
            className="bg-[#BB2124] hover:bg-[#8A1619] text-black px-3"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
} 