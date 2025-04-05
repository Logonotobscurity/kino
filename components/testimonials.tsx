"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  position: string
  content: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michelle R.",
    position: "Verified Customer",
    content: "The Red Hemp Oil has completely transformed my wellness routine. I've noticed significant improvements in my sleep quality and overall stress levels. The elegant packaging also makes it a joy to use daily.",
    rating: 5,
    image: "/testimonials/avatar-1.jpg"
  },
  {
    id: 2,
    name: "James T.",
    position: "Verified Customer",
    content: "As someone who suffers from chronic muscle pain, the Recovery Balm has been a game-changer. Fast-acting and long-lasting relief that doesn't have a strong medicinal smell. Highly recommend!",
    rating: 5,
    image: "/testimonials/avatar-2.jpg"
  },
  {
    id: 3,
    name: "Sarah K.",
    position: "Verified Customer",
    content: "I was skeptical at first, but the Sleep Tincture has genuinely improved my sleep patterns. I fall asleep faster and wake up feeling more refreshed. The premium quality is evident from the first use.",
    rating: 4,
    image: "/testimonials/avatar-3.jpg"
  }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  
  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return
    
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [autoplay])
  
  // Navigation functions
  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }
  
  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }
  
  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }
  
  return (
    <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 rounded-full border border-[#BB2124]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                scale: Math.random() * 0.3 + 0.2,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: Math.random() * 10 + 10,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block text-[#BB2124] text-sm font-bold tracking-wider mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            TESTIMONIALS
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-[#BB2124] mx-auto"
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative h-96 overflow-hidden"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <div className="bg-[#151515] p-8 rounded-xl border border-[#333] shadow-xl h-full flex flex-col">
                  {/* Quote icon */}
                  <div className="flex justify-end mb-4">
                    <Quote className="h-12 w-12 text-[#BB2124]/20 -rotate-180" />
                  </div>
                  
                  {/* Testimonial content */}
                  <div className="flex-grow">
                    <div className="text-lg text-white leading-relaxed italic mb-6">
                      "{testimonials[currentIndex].content}"
                    </div>
                  </div>
                  
                  {/* Author info */}
                  <div className="flex items-center">
                    {/* Avatar placeholder */}
                    <div className="w-12 h-12 rounded-full bg-[#252525] overflow-hidden flex items-center justify-center text-[#BB2124] font-semibold text-xl border border-[#BB2124]/30">
                      {testimonials[currentIndex].name.charAt(0)}
                    </div>
                    
                    <div className="ml-4">
                      <div className="text-white font-semibold">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-[#999] text-sm">
                        {testimonials[currentIndex].position}
                      </div>
                    </div>
                    
                    <div className="ml-auto">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonials[currentIndex].rating
                                ? "text-[#BB2124] fill-[#BB2124]"
                                : "text-[#333]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-[#333] text-white hover:border-[#BB2124] hover:text-[#BB2124] transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1)
                    setCurrentIndex(i)
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === currentIndex
                      ? "bg-[#BB2124]"
                      : "bg-[#333] hover:bg-[#555]"
                  }`}
                />
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-[#333] text-white hover:border-[#BB2124] hover:text-[#BB2124] transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
} 