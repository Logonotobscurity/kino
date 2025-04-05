"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ParallaxScroll() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.8, 1, 1, 0.8])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 10])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10])

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-[#121212]"
    >
      {/* Parallax background elements - simplified for pure glitter effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute bottom-0 left-[10%] w-64 h-64 rounded-full opacity-5 bg-[#BB2124] blur-xl"
          style={{ y: y1, rotate: rotate1 }}
        />
        <motion.div 
          className="absolute top-[20%] right-[15%] w-72 h-72 rounded-full opacity-5 bg-[#BB2124] blur-xl"
          style={{ y: y2, rotate: rotate2 }}
        />
        <motion.div 
          className="absolute top-[30%] left-[20%] w-48 h-48 rounded-full opacity-5 bg-[#BB2124] blur-xl"
          style={{ y: y3 }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center"
          style={{ opacity, scale }}
        >
          {/* Content */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block text-[#BB2124] text-sm font-bold tracking-wider mb-2">
                PREMIUM SELECTION
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Elevate Your <span className="text-[#BB2124]">Wellness</span> Journey
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Our carefully curated products are designed to enhance your everyday experience with premium quality ingredients and thoughtful formulations.
              </p>
              
              <div className="space-y-4">
                {["Lab Tested for Purity", "Premium Organic Ingredients", "Sustainable Practices"].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="flex items-center"
                  >
                    <div className="h-2 w-2 bg-[#BB2124] rounded-full mr-3"></div>
                    <span className="text-white">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="/shop">
                  <Button className="bg-[#BB2124] hover:bg-[#8A1619] text-white font-bold px-8 py-6">
                    Explore Collection
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Images with parallax effect */}
          <div className="relative h-[400px] md:h-[600px]">
            {/* Main image */}
            <motion.div
              className="absolute z-10 top-[10%] left-[10%] w-[80%] h-[80%] rounded-lg overflow-hidden shadow-2xl bg-[#1A1A1A] p-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ y: y1 }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <video
                  src="/hero/Hero-side.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full"
                />
              </div>
              
              {/* Product price tag */}
              <motion.div
                className="absolute -right-3 -bottom-3 bg-[#BB2124] text-white font-bold px-4 py-2 rounded-full shadow-lg"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 30,
                  delay: 0.6 
                }}
              >
                $59.99
              </motion.div>
            </motion.div>
            
            {/* Background image 1 */}
            <motion.div
              className="absolute top-[5%] right-[5%] w-[40%] h-[40%] rounded-lg overflow-hidden shadow-xl bg-[#1A1A1A] p-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ y: y2 }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/products/product-3.jpg"
                  alt="Premium product"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg?height=200&width=200";
                  }}
                />
              </div>
            </motion.div>
            
            {/* Background image 2 */}
            <motion.div
              className="absolute bottom-[5%] left-[0%] w-[35%] h-[35%] rounded-lg overflow-hidden shadow-xl bg-[#1A1A1A] p-2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ y: y3 }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/products/product-5.jpg"
                  alt="Premium product"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg?height=180&width=180";
                  }}
                />
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute top-[40%] right-[10%] w-16 h-16 rounded-full border-2 border-dashed border-[#BB2124]/50"
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 90 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ y: y2 }}
            />
            
            <motion.div
              className="absolute bottom-[20%] right-[20%] w-8 h-8 rounded-full border border-[#BB2124]/70"
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1.5, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
              style={{ y: y1 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
} 