"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MotionBackground } from "@/components/motion-background"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: "",
      })
    }, 1500)
  }

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
            <span className="text-[#BB2124]">Contact Us</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto font-medium">
            We're here to help with any questions about our products, events, or services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white">Get In Touch</h2>
            <p className="text-gray-300">
              Have questions about our products or services? Our team is ready to assist you with any inquiries. Your privacy and comfort are our top priorities.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-[#BB2124]/10 p-3 rounded-full mr-4">
                  <Phone className="h-5 w-5 text-[#BB2124]" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Phone</h3>
                  <p className="text-gray-300">(555) 123-4567</p>
                  <p className="text-sm text-gray-400">Mon-Fri, 10am-7pm</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#BB2124]/10 p-3 rounded-full mr-4">
                  <Mail className="h-5 w-5 text-[#BB2124]" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Email</h3>
                  <p className="text-gray-300">info@kinkosais.com</p>
                  <p className="text-sm text-gray-400">We respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#BB2124]/10 p-3 rounded-full mr-4">
                  <MapPin className="h-5 w-5 text-[#BB2124]" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Location</h3>
                  <p className="text-gray-300">123 Sensory Avenue</p>
                  <p className="text-gray-300">Suite 200</p>
                  <p className="text-gray-300">New York, NY 10001</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#BB2124]/10 p-3 rounded-full mr-4">
                  <Clock className="h-5 w-5 text-[#BB2124]" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Store Hours</h3>
                  <p className="text-gray-300">Monday - Friday: 10am - 7pm</p>
                  <p className="text-gray-300">Saturday: 11am - 6pm</p>
                  <p className="text-gray-300">Sunday: 12pm - 5pm</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] p-6 rounded-xl">
              <h3 className="font-bold text-white mb-3">Privacy Assurance</h3>
              <p className="text-gray-300 text-sm">
                We understand the importance of discretion. All communications are kept strictly confidential, and our staff is trained to provide respectful, judgment-free assistance.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {isSubmitted ? (
              <motion.div 
                className="bg-[#1A1A1A] p-8 rounded-xl text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-900/30 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-300 mb-6">
                  Thank you for reaching out to us. We'll get back to you as soon as possible.
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)} 
                  className="bg-[#BB2124] hover:bg-[#BB2124]/90 text-white"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2124]/50 text-white"
                        value={formState.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2124]/50 text-white"
                        value={formState.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2124]/50 text-white"
                      value={formState.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2124]/50 text-white"
                      value={formState.subject}
                      onChange={handleChange}
                    >
                      <option value="">Select a subject</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Order Status">Order Status</option>
                      <option value="Event Information">Event Information</option>
                      <option value="Dungeon Booking">Dungeon Booking</option>
                      <option value="Membership">Membership</option>
                      <option value="Suggestions">Suggestions</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                      Request Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2124]/50 text-white"
                      value={formState.category}
                      onChange={handleChange}
                    >
                      <option value="">Select a category (optional)</option>
                      <option value="Space Reservation">Space Reservation</option>
                      <option value="Classes & Events">Classes & Events</option>
                      <option value="Product Purchase">Product Purchase</option>
                      <option value="Private Session">Private Session</option>
                      <option value="Community Membership">Community Membership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2124]/50 text-white"
                      value={formState.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  
                  <div className="text-xs text-gray-400 italic">
                    By submitting this form, you agree to our privacy policy. We will never share your information with third parties.
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#BB2124] hover:bg-[#BB2124]/90 text-white py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div 
          className="bg-gradient-to-r from-pink-light to-pink p-8 rounded-2xl text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Subscribe to our newsletter for updates on new products, upcoming events, and exclusive offers.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Button className="bg-white text-pink hover:bg-gray-100 rounded-full">
              Subscribe
            </Button>
          </div>
          <p className="text-xs mt-4 text-white/80">
            We respect your privacy and will never share your information.
          </p>
        </motion.div>

        {/* Map Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-[#1A1A1A] rounded-xl overflow-hidden shadow-md">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Our Location</h2>
              <p className="text-gray-300 mt-2">
                Come visit our showroom and experience our products in person.
              </p>
            </div>
            <div className="h-96 w-full relative">
              {/* Replace with actual map component if available */}
              <div className="absolute inset-0 bg-[#252525] flex items-center justify-center">
                <p className="text-gray-400 text-center px-4">
                  Interactive map would be displayed here. <br />
                  Located at 123 Sensory Avenue, Suite 200, New York, NY 10001
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1A1A1A] p-6 rounded-xl">
              <h3 className="font-bold text-white mb-2">What are your shipping options?</h3>
              <p className="text-gray-300">
                We offer discreet shipping on all orders. Standard shipping takes 3-5 business days, while express shipping is available for 1-2 day delivery.
              </p>
            </div>
            <div className="bg-[#1A1A1A] p-6 rounded-xl">
              <h3 className="font-bold text-white mb-2">Do you offer international shipping?</h3>
              <p className="text-gray-300">
                Yes, we ship to most international destinations. Shipping times and costs vary by location.
              </p>
            </div>
            <div className="bg-[#1A1A1A] p-6 rounded-xl">
              <h3 className="font-bold text-white mb-2">What is your return policy?</h3>
              <p className="text-gray-300">
                For hygiene reasons, we cannot accept returns on most products once opened. Please contact us for specific product return policies.
              </p>
            </div>
            <div className="bg-[#1A1A1A] p-6 rounded-xl">
              <h3 className="font-bold text-white mb-2">Are your products body-safe?</h3>
              <p className="text-gray-300">
                Absolutely! All our products are made from body-safe materials and have undergone rigorous testing to ensure quality and safety.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 