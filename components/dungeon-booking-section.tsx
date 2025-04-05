"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { 
  Clock, 
  Mail, 
  Calendar, 
  CreditCard, 
  CheckCircle,
  ArrowRight 
} from "lucide-react"
import { addRoomToCheckout } from "@/lib/checkout-helper"

export function DungeonBookingSection() {
  return (
    <section className="py-20 bg-[#121212] relative overflow-hidden">
      {/* Background decorations */}
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
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#BB2124]">Private BDSM Dungeon</span> Hire Booking
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto font-medium">
            Booking is easy! Just scroll down where you can use the fully automated booking form.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <p className="text-gray-300 mb-6">
                Please note: We do accept hourly bookings as well as Overnight and All Day Booking, so please do feel welcome to Contact Us directly to discuss your needs and arrange for your bookings.
              </p>
              
              <p className="text-gray-300 mb-6">
                Our private, self-contained establishment offers 5 unique playrooms; The Punishment room, The Incarceration / Interrogation cells, The Medical fantasy room, Wet room and The Erotic Dungeon bedroom.
              </p>
              
              <p className="text-gray-300 mb-6">
                We are open 24/7 by appointment only. E-mail inquiries are answered 24/7. We do our best to accommodate same day bookings, but we recommend at least 24 hours notice.
              </p>
              
              <p className="text-gray-300 font-medium">
                We look forward to receiving you at The Red Dungeon!
              </p>
            </div>
            
            <div className="mt-8">
              <Link href="/checkout">
                <Button className="bg-[#BB2124] hover:bg-[#8A1619] text-black py-6 px-8 rounded-lg text-lg font-bold shadow-lg"
                  onClick={() => {
                    addRoomToCheckout({
                      id: "dungeon-custom",
                      name: "Custom Dungeon Booking",
                      price: 180,
                      image: "/placeholder.svg?height=400&width=600",
                      duration: 3
                    });
                  }}
                >
                  Request Booking Now
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <video
                src="/hero/Hero-side.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="bg-[#BB2124]/20 text-[#BB2124] px-3 py-1 rounded-full text-sm font-medium">
                      <Clock className="h-4 w-4 inline-block mr-1" /> 24/7 Availability
                    </span>
                    <span className="bg-[#BB2124]/20 text-[#BB2124] px-3 py-1 rounded-full text-sm font-medium">
                      <Calendar className="h-4 w-4 inline-block mr-1" /> By Appointment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* How Rentals Work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#1A1A1A] rounded-xl p-8 border border-[#333] mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6">How Rentals Work</h3>
          
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#BB2124] text-black font-bold mr-4">1</div>
              <div>
                <p className="text-gray-300">
                  Please read this page and then submit the rental form at the bottom of this page including your contact information and possible dates you'd like to rent.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#BB2124] text-black font-bold mr-4">2</div>
              <div>
                <p className="text-gray-300">
                  We'll follow up with you by email to answer any additional questions check the availability of the dungeon on your requested date.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#BB2124] text-black font-bold mr-4">3</div>
              <div>
                <p className="text-gray-300">
                  Pay emailed invoice: Once your reservation date/time and payment method has been selected, we will email you an invoice. Please note that your reservation is not secured until your payment has been confirmed.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#BB2124] text-black font-bold mr-4">4</div>
              <div>
                <p className="text-gray-300">
                  Upon payment of the booking you'll receive a confirmation receipt through email that lets you know: we received your deposit, the amount due upon your arrival, the date, time and duration of your rental as well as the address of the dungeon, tips for parking and who to call upon your arrival.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Booking CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Link href="/checkout">
            <Button className="bg-[#BB2124] hover:bg-[#8A1619] text-black py-6 px-8 rounded-lg text-lg font-bold shadow-lg"
              onClick={() => {
                addRoomToCheckout({
                  id: "dungeon-standard",
                  name: "Standard Dungeon Booking",
                  price: 150,
                  image: "/placeholder.svg?height=400&width=600",
                  duration: 2
                });
              }}
            >
              Book Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-gray-400 mt-4">
            Questions? Contact us at <span className="text-[#BB2124]">info@kinkosais.com</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
} 