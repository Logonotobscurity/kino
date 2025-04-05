"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Lock, Send, CheckCircle, Shield } from "lucide-react"
import { motion } from "framer-motion"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <section id="contact" className="py-24 bg-[#1A1A1A] relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#BB2124]">Contact</span> <span className="text-white">Us</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions about our products or services? We're here to help you find the information you need.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto bg-[#2A2A2A] rounded-lg p-8 border border-[#3A3A3A] shadow-lg"
        >
          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-[#BB2124] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent</h3>
              <p className="text-gray-400 mb-6">
                Thank you for reaching out. We'll respond discreetly within 24 hours.
              </p>
              <Button
                variant="outline"
                className="border-[#BB2124] text-[#BB2124] hover:bg-[#BB2124]/10"
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    className="bg-[#333333] border-[#444444] text-white placeholder:text-gray-500 focus:border-[#BB2124]/50 focus:ring-[#BB2124]/20"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    className="bg-[#333333] border-[#444444] text-white placeholder:text-gray-500 focus:border-[#BB2124]/50 focus:ring-[#BB2124]/20"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="How can we help you?"
                    required
                    className="bg-[#333333] border-[#444444] text-white placeholder:text-gray-500 focus:border-[#BB2124]/50 focus:ring-[#BB2124]/20"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message here..."
                    rows={5}
                    required
                    className="bg-[#333333] border-[#444444] text-white placeholder:text-gray-500 focus:border-[#BB2124]/50 focus:ring-[#BB2124]/20"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 text-[#BB2124] mr-2" />
                    <span className="text-xs text-gray-400">End-to-end encrypted</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-[#BB2124] mr-2" />
                    <span className="text-xs text-gray-400">GDPR compliant</span>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                  <Button
                    type="submit"
                    className="w-full bg-[#BB2124] hover:bg-[#9A1B1E] text-black font-bold shadow-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </span>
                    )}
                  </Button>
                </motion.div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

