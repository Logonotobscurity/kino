"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Calendar, Shield, Users, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const services = [
    {
      id: 1,
      icon: <Lock className="h-10 w-10 text-pink" />,
      title: "Private Dungeons",
      description: "Rent discreet, fully equipped spaces near you. Total privacy guaranteed.",
      cta: "Browse Locations",
    },
    {
      id: 2,
      icon: <Calendar className="h-10 w-10 text-pink" />,
      title: "Classes & Events",
      description: "Professional Dom/sub-led classes and curated events for all experience levels.",
      cta: "View Schedule",
    },
  ]

  const features = [
    {
      icon: <Shield className="h-5 w-5 text-pink" />,
      text: "24/7 Discretion Assurance",
    },
    {
      icon: <Users className="h-5 w-5 text-pink" />,
      text: "Vetted Professionals",
    },
    {
      icon: <Award className="h-5 w-5 text-pink" />,
      text: "Safe, Consensual Environment",
    },
  ]

  return (
    <section id="services" className="py-24 bg-[#121212] relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="text-[#BB2124]">Services</span> We Offer
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <Card
              key={service.id}
              className={cn(
                "bg-dark-700 border-dark-600 hover:border-pink/50 transition-all duration-300",
                hoveredCard === service.id ? "transform scale-[1.02]" : "",
              )}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              data-cursor-hover="true"
            >
              <CardHeader className="pb-2">
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-2xl text-gray-200">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-base">{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={service.id === 1 ? "/reservation" : "/classes"}>
                  <Button variant="outline" className="border-pink text-pink hover:bg-pink/10" data-cursor-hover="true">
                    {service.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-dark-800/50 rounded-lg p-8 backdrop-blur-sm">
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-gray-200">Why Choose Us?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-dark-700/50 p-4 rounded-lg"
                data-cursor-hover="true"
              >
                {feature.icon}
                <span className="text-gray-200">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

