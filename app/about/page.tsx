"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MotionBackground } from "@/components/motion-background"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <main className="pt-24 pb-16 relative bg-[#121212]">
      <MotionBackground particleCount={10} />
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#BB2124]">About Kinkosais</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto font-medium">
            Empowering personal exploration through quality, discretion, and education since 2015.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden h-[500px] shadow-lg"
          >
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Our elegant showroom"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
            <p className="text-gray-300 mb-4">
              Founded in 2015, Kinkosais began with a simple mission: to provide high-quality intimate products in an environment that celebrates exploration and education.
            </p>
            <p className="text-gray-300 mb-4">
              What started as a small boutique has grown into a comprehensive destination for those seeking to enhance their personal experiences through premium products and educational opportunities.
            </p>
            <p className="text-gray-300 mb-6">
              We believe that intimacy deserves the highest quality materials, thoughtful design, and a shopping experience built on discretion and respect. Every product in our collection is carefully selected to meet our exacting standards.
            </p>
            <div className="flex items-center space-x-4">
              <div className="h-1 w-12 bg-[#BB2124] rounded-full"></div>
              <p className="text-[#BB2124] font-semibold italic">Luxury. Education. Discretion.</p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mb-16 bg-[#121212] p-8 rounded-2xl shadow-sm border border-[#333]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#121212] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#333]">
              <div className="w-12 h-12 bg-[#BB2124]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#BB2124] text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Quality First</h3>
              <p className="text-gray-300">
                We source only the finest materials and partner with ethical manufacturers who share our commitment to excellence and safety.
              </p>
            </div>

            <div className="bg-[#121212] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#333]">
              <div className="w-12 h-12 bg-[#BB2124]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#BB2124] text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Discretion Always</h3>
              <p className="text-gray-300">
                Privacy is paramount. From discreet packaging to confidential shipping and billing, we ensure your personal choices remain private.
              </p>
            </div>

            <div className="bg-[#121212] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#333]">
              <div className="w-12 h-12 bg-[#BB2124]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#BB2124] text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Education & Support</h3>
              <p className="text-gray-300">
                We believe in empowering through knowledge. Our workshops, events, and knowledgeable staff are here to guide your journey.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center bg-[#121212] p-6 rounded-xl border border-[#333]">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Emma Richardson"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white">Emma Richardson</h3>
              <p className="text-[#BB2124] font-medium">Founder & CEO</p>
              <p className="text-gray-300 mt-2">
                With a background in product design and sexual health education, Emma founded Kinkosais to combine luxury with education.
              </p>
            </div>

            <div className="text-center bg-[#121212] p-6 rounded-xl border border-[#333]">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Marcus Chen"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white">Marcus Chen</h3>
              <p className="text-[#BB2124] font-medium">Head of Education</p>
              <p className="text-gray-300 mt-2">
                A certified sex educator, Marcus develops our workshop curriculum and ensures all customer advice is accurate and helpful.
              </p>
            </div>

            <div className="text-center bg-[#121212] p-6 rounded-xl border border-[#333]">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Sophia Patel"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white">Sophia Patel</h3>
              <p className="text-[#BB2124] font-medium">Product Curator</p>
              <p className="text-gray-300 mt-2">
                With an eye for quality and design, Sophia travels the world to source the finest materials and most innovative products.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Visit Our Showroom</h2>
          <p className="text-gray-300 mb-8">
            Experience our products in person at our elegant, discreet showroom. Our knowledgeable staff is ready to assist with any questions in a respectful, judgment-free environment.
          </p>
          <Button className="bg-[#BB2124] hover:bg-[#8A1619] text-white px-8 py-6 rounded-full text-lg">
            Find Our Location
          </Button>
        </motion.div>
      </div>
    </main>
  )
} 