"use client"

import { HeroBanner } from "@/components/hero-banner"
import { FeaturesSection } from "@/components/features-section"
import { ProductShowcase } from "@/components/product-showcase"
import { ParallaxScroll } from "@/components/parallax-scroll"
import { CategoryShowcase } from "@/components/category-showcase"
import { DungeonBookingSection } from "@/components/dungeon-booking-section"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import TestimonialsSection from "@/components/testimonials-section"

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  })
  
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <div ref={scrollRef} className="relative">
        <HeroBanner />
        
        {/* Floating Call-to-Action */}
        <motion.div 
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <Link href="/shop">
            <Button className="bg-[#BB2124] hover:bg-[#8A1619] text-black font-bold px-6 py-6 rounded-full shadow-lg shadow-[#BB2124]/20">
              Shop Now
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="ml-2"
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Button>
          </Link>
        </motion.div>
      </div>
      
      {/* Featured Products */}
      <ProductShowcase />
      
      {/* Feature Highlights */}
      <FeaturesSection />
      
      {/* Category Showcase */}
      <CategoryShowcase />
      
      {/* Dungeon Booking Section */}
      <DungeonBookingSection />
      
      {/* Parallax Content */}
      <ParallaxScroll />
      
      {/* Testimonials with enhanced visuals */}
      <TestimonialsSection />
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-[#121212] relative overflow-hidden">
        {/* Background Elements - keeping the grid pattern for subtle glitter */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#BB2124" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-8 text-center text-white"
            >
              <span className="text-[#BB2124]">Creating</span> a Safe Space
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-lg text-center mb-6"
            >
              At Kinkoasis, we believe in responsible exploration within a community of mutual respect.
              Our platform prioritizes your safety, privacy, and personal growth.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full"
            >
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(187, 33, 36, 0.1)" }}
                className="bg-[#121212] p-6 rounded-lg border border-[#333333] transition-all duration-300"
              >
                <h3 className="font-bold text-[#BB2124] mb-2">Privacy Focus</h3>
                <p className="text-gray-400">End-to-end encryption on all communications. No data sharing with third parties.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(187, 33, 36, 0.1)" }}
                className="bg-[#121212] p-6 rounded-lg border border-[#333333] transition-all duration-300"
              >
                <h3 className="font-bold text-[#BB2124] mb-2">Community Guidelines</h3>
                <p className="text-gray-400">Clear rules and expectations to ensure a respectful environment for all members.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(187, 33, 36, 0.1)" }}
                className="bg-[#121212] p-6 rounded-lg border border-[#333333] transition-all duration-300"
              >
                <h3 className="font-bold text-[#BB2124] mb-2">Consent Education</h3>
                <p className="text-gray-400">Resources and workshops on communication, boundaries, and healthy exploration.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

