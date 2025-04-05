"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Calendar, ChevronRight, Shield, Award, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"

export function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const services = [
    {
      id: 1,
      icon: <Lock className="h-10 w-10 text-[#BB2124]" />,
      title: "Private Dungeons",
      description: "Rent discreet, fully equipped spaces near you. Total privacy guaranteed.",
      cta: "Browse Locations",
      bgColor: "from-[#1A1A1A] to-[#2D232E]",
      borderColor: "border-[#BB2124]/20",
      href: "/reservation"
    },
    {
      id: 2,
      icon: <Calendar className="h-10 w-10 text-[#C0C0C0]" />,
      title: "Classes & Events",
      description: "Professional Dom/sub-led classes and curated events for all experience levels.",
      cta: "View Schedule",
      bgColor: "from-[#1A1A1A] to-[#2D232E]",
      borderColor: "border-[#C0C0C0]/20",
      href: "/classes"
    },
  ]

  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-[#BB2124]" />,
      text: "24/7 Discretion Assurance",
    },
    {
      icon: <Award className="h-6 w-6 text-[#C0C0C0]" />,
      text: "Vetted Professionals",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-[#BB2124]" />,
      text: "Safe, Consensual Environment",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section id="services" className="py-24 bg-[#222222] relative">
      {/* Background video with overlay */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[#222222]/90 z-10"></div>
        <video
          src="/hero/Hero-side.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full opacity-30"
        />
      </div>
      
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden z-[1]">
        <div className="absolute top-10 left-10 w-24 h-24 bg-[#BB2124]/5 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#C0C0C0]/5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-[2]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Premium <span className="text-[#BB2124]">Services</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Clearly showcasing our offerings with a focus on usability and discretion
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={item}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Card
                className={cn(
                  "overflow-hidden bg-gradient-to-br shadow-lg border transition-all duration-300 text-white",
                  service.bgColor,
                  service.borderColor,
                  hoveredCard === service.id ? "shadow-xl" : "shadow-md",
                )}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader className="pb-2">
                  <motion.div 
                    initial={{ scale: 1 }}
                    animate={{ scale: hoveredCard === service.id ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                  >
                    {service.icon}
                  </motion.div>
                  <CardTitle className="text-2xl text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base font-medium">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href={service.href}>
                    <Button 
                      variant="ghost" 
                      className="text-[#BB2124] hover:text-[#8A1619] hover:bg-white/5 group"
                    >
                      {service.cta}
                      <ChevronRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1A1A1A] rounded-xl p-8 shadow-lg border border-[#333333]"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Choose Us?</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="bg-[#2A2A2A] p-3 rounded-full mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{benefit.text}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link href="/privacy-policy" className="text-[#BB2124] hover:text-[#8A1619] hover:bg-white/5 group">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Read our privacy policy
              <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

