"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { motion } from "framer-motion"
import Link from "next/link"

export function HeroBanner() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Scroll to next section function
  const scrollToNextSection = () => {
    const nextSection = heroRef.current?.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <ErrorBoundary>
      <section 
        ref={heroRef}
        id="home" 
        className="relative min-h-screen pt-32 pb-16 overflow-hidden bg-[#121212] text-white"
      >
        {/* Animated background particles - keeping these for the glittering effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#BB2124]"
              initial={{ 
                opacity: Math.random() * 0.4 + 0.1,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{ 
                x: [0, Math.random() * 100 - 50], 
                y: [0, Math.random() * 100 - 50],
                opacity: [Math.random() * 0.4 + 0.1, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: Math.random() * 10 + 10,
                ease: "easeInOut",
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Headline */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-sm">
                  <span className="text-[#BB2124] font-bold">Experience Beyond</span>
                </h1>
                <h2 className="text-3xl md:text-4xl font-medium mb-4 text-white opacity-90">
                  Fetlife: Bigger, Better, Discreet
                </h2>
              </motion.div>

              {/* Description */}
              <motion.p 
                className="text-gray-300 mb-8 text-lg font-medium leading-relaxed border border-[#333] p-4 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                We wanted a discreet kinky community—so we built one. Welcome to Kinkosais, where exploration meets privacy.
              </motion.p>

              {/* CTA Button with hover effects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="inline-block"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact">
                    <Button 
                      className="bg-[#BB2124] hover:bg-[#8A1619] text-black rounded-md px-8 py-6 text-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      Explore Safely
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Trust Markers */}
              <motion.div 
                className="mt-8 flex flex-wrap items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 border border-[#333] py-2 px-3 rounded-md">
                  <div className="w-3 h-3 rounded-full bg-[#BB2124]"></div>
                  <span className="text-sm text-gray-300">100% Private</span>
                </div>
                <div className="flex items-center gap-2 border border-[#333] py-2 px-3 rounded-md">
                  <div className="w-3 h-3 rounded-full bg-[#BB2124]"></div>
                  <span className="text-sm text-gray-300">SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2 border border-[#333] py-2 px-3 rounded-md">
                  <div className="w-3 h-3 rounded-full bg-[#BB2124]"></div>
                  <span className="text-sm text-gray-300">Verified Members</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              className="hidden lg:block relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            >
              <div className="relative w-full h-[600px]">
                <motion.div 
                  className="absolute inset-0 bg-[#121212] rounded-lg overflow-hidden shadow-2xl border border-[#333]"
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(187, 33, 36, 0.3)",
                      "0 0 60px rgba(187, 33, 36, 0.2)",
                      "0 0 20px rgba(187, 33, 36, 0.3)"
                    ]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full opacity-70"
                  >
                    <source src="/hero/Hero-side.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          onClick={scrollToNextSection}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-gray-400 text-sm font-medium mb-2">Scroll Down</span>
            <ArrowDown className="h-6 w-6 text-[#BB2124]" />
          </motion.div>
        </motion.div>
      </section>
    </ErrorBoundary>
  )
}

