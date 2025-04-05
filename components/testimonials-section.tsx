"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface Testimonial {
  id: number
  quote: string
  author: string
  rating: number
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        "The reservation process was perfection. Gracious, accommodating, and impeccably discreet.",
      author: "Mistress Sissytoy",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "Found a community that truly understands the meaning of privacy and respect. The classes have been eye-opening and professionally conducted.",
      author: "Sir K.",
      rating: 5,
    },
    {
      id: 3,
      quote:
        "I was hesitant at first, but the level of professionalism and discretion exceeded my expectations. Highly recommended for newcomers.",
      author: "Anonymous Explorer",
      rating: 5,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 8000)

    return () => clearInterval(interval)
  }, [activeIndex])

  const goToPrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <section id="testimonials" className="py-24 bg-[#1E1E1E] relative overflow-hidden">
      {/* Background video with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1E1E1E]/90 z-10"></div>
        <video
          src="/hero/Hero-side.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full opacity-20"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-center leading-tight">
            What People Are <span className="text-[#BB2124]">Saying</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Decorative rope border elements */}
          <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-[#BB2124]/50 rounded-sm"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-[#BB2124]/50 rounded-sm"></div>
          
          {/* Rope design corners */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-2 border-[#BB2124]/30 rounded-full"></div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-2 border-[#BB2124]/30 rounded-full"></div>

          {/* Carousel */}
          <motion.div 
            className="relative overflow-hidden py-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className="transition-transform duration-500 ease-in-out flex"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-[#2A2A2A] shadow-lg border border-[#3A3A3A] min-w-full">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="rounded-xl bg-[#1A1A1A] p-8 shadow-lg relative">
                        <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-[#BB2124]/50 rounded-sm"></div>
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-[#BB2124]/50 rounded-sm"></div>
                        
                        {/* Extra decoration */}
                        <div className="absolute -top-2 -left-2 w-8 h-8 border-2 border-[#BB2124]/30 rounded-full"></div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-2 border-[#BB2124]/30 rounded-full"></div>

                        <div className="flex ml-auto">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? "fill-[#BB2124] text-[#BB2124]" : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-xl md:text-2xl italic mb-6 text-gray-200 font-medium">
                      "{testimonial.quote}"
                    </blockquote>
                    <p className="text-[#C0C0C0] italic">— {testimonial.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-[#2A2A2A] p-2 rounded-full text-[#BB2124] hover:bg-[#333333] transition-colors border border-[#3A3A3A] shadow-md"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 bg-[#2A2A2A] p-2 rounded-full text-[#BB2124] hover:bg-[#333333] transition-colors border border-[#3A3A3A] shadow-md"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating) return
                  setIsAnimating(true)
                  setActiveIndex(index)
                  setTimeout(() => setIsAnimating(false), 500)
                }}
                className={`h-2 transition-all duration-300 rounded-full mx-1 ${
                  index === activeIndex ? "bg-[#BB2124] w-6" : "bg-gray-600 hover:bg-gray-500"
                } w-2`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

