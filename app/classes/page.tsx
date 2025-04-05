"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MotionBackground } from "@/components/motion-background"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, MapPin, Filter, Search, User } from "lucide-react"
import { addClassToCheckout } from "@/lib/checkout-helper"

// Types for events and workshops
type EventCategory = "Workshop" | "Demonstration" | "Discussion" | "Social" | "Special" | "Class"
type EventLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  category: EventCategory
  level: EventLevel
  maxAttendees: number
  currentAttendees: number
  price: number
  featured?: boolean
}

export default function ClassesEventsPage() {
  // Sample events data
  const allEvents: Event[] = [
    {
      id: "e1",
      title: "Introduction to Sensory Play",
      description: "Discover the world of sensory play in this beginner-friendly workshop. Learn about different materials, techniques, and safety considerations to enhance intimate experiences.",
      date: "April 15, 2025",
      time: "7:00 PM - 9:00 PM",
      location: "Main Showroom",
      image: "/placeholder.svg?height=400&width=600",
      category: "Workshop",
      level: "Beginner",
      maxAttendees: 20,
      currentAttendees: 12,
      price: 45,
      featured: true
    },
    {
      id: "e2",
      title: "Rope Techniques: Beyond Basics",
      description: "Building on fundamental rope skills, this workshop explores more advanced patterns, tension techniques, and creative expression through rope bondage.",
      date: "April 22, 2025",
      time: "6:30 PM - 9:30 PM",
      location: "Workshop Studio",
      image: "/placeholder.svg?height=400&width=600",
      category: "Workshop",
      level: "Intermediate",
      maxAttendees: 16,
      currentAttendees: 9,
      price: 60
    },
    {
      id: "e3",
      title: "Communication & Consent Roundtable",
      description: "Join our panel of educators for an open discussion about effective communication strategies and the nuances of consent in intimate relationships.",
      date: "April 29, 2025",
      time: "7:00 PM - 8:30 PM",
      location: "Lounge Area",
      image: "/placeholder.svg?height=400&width=600",
      category: "Discussion",
      level: "All Levels",
      maxAttendees: 30,
      currentAttendees: 15,
      price: 25
    },
    {
      id: "e4",
      title: "Product Showcase: New Arrivals",
      description: "Be among the first to see and try our latest product arrivals. This demonstration will cover features, materials, and best practices for each new item.",
      date: "May 5, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Main Showroom",
      image: "/placeholder.svg?height=400&width=600",
      category: "Demonstration",
      level: "All Levels",
      maxAttendees: 25,
      currentAttendees: 18,
      price: 15
    },
    {
      id: "e5",
      title: "Advanced Impact Play Techniques",
      description: "This workshop explores the nuances of impact play, including technique refinement, understanding sensation dynamics, and advanced communication methods.",
      date: "May 12, 2025",
      time: "7:00 PM - 10:00 PM",
      location: "Workshop Studio",
      image: "/placeholder.svg?height=400&width=600",
      category: "Workshop",
      level: "Advanced",
      maxAttendees: 16,
      currentAttendees: 6,
      price: 75
    },
    {
      id: "e6",
      title: "Spring Social Mixer",
      description: "Meet like-minded individuals in our seasonal social event. Enjoy refreshments, demonstrations, and connect with our community in a relaxed, casual environment.",
      date: "May 19, 2025",
      time: "8:00 PM - 11:00 PM",
      location: "Full Venue",
      image: "/placeholder.svg?height=400&width=600",
      category: "Social",
      level: "All Levels",
      maxAttendees: 60,
      currentAttendees: 35,
      price: 30,
      featured: true
    },
    {
      id: "e7",
      title: "Sensual Massage Workshop",
      description: "Learn techniques for giving and receiving pleasure through conscious touch. Covers different styles, pressure techniques, and creating a sensual atmosphere.",
      date: "May 26, 2025",
      time: "7:00 PM - 9:30 PM",
      location: "Workshop Studio",
      image: "/placeholder.svg?height=400&width=600",
      category: "Workshop",
      level: "Beginner",
      maxAttendees: 24,
      currentAttendees: 16,
      price: 50
    },
    {
      id: "e8",
      title: "Special Event: Educator Showcase",
      description: "Join us for a special evening featuring renowned educators and authors in the field of intimacy and pleasure education. Includes Q&A session and book signing.",
      date: "June 2, 2025",
      time: "6:00 PM - 10:00 PM",
      location: "Full Venue",
      image: "/placeholder.svg?height=400&width=600",
      category: "Special",
      level: "All Levels",
      maxAttendees: 100,
      currentAttendees: 45,
      price: 85,
      featured: true
    },
    {
      id: "e9",
      title: "Dungeon Equipment Class",
      description: "Learn about setting up and safely using various equipment found in a dungeon environment. This class covers proper installation, maintenance, and safe usage protocols.",
      date: "June 5, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Workshop Studio",
      image: "/placeholder.svg?height=400&width=600",
      category: "Class",
      level: "Beginner",
      maxAttendees: 20,
      currentAttendees: 8,
      price: 55,
      featured: true
    },
    {
      id: "e10",
      title: "Dungeon Etiquette & Protocol",
      description: "Essential class for anyone planning to visit public or private play spaces. Learn about common rules, expected behaviors, and communication practices in dungeon environments.",
      date: "June 12, 2025",
      time: "7:00 PM - 9:00 PM",
      location: "Lounge Area",
      image: "/placeholder.svg?height=400&width=600",
      category: "Class",
      level: "All Levels",
      maxAttendees: 30,
      currentAttendees: 12,
      price: 40
    },
    {
      id: "e11",
      title: "Dungeon Monitor Training",
      description: "Comprehensive training for those interested in serving as dungeon monitors at events. Covers safety protocols, intervention strategies, and emergency procedures.",
      date: "June 19, 2025",
      time: "6:00 PM - 10:00 PM",
      location: "Full Venue",
      image: "/placeholder.svg?height=400&width=600",
      category: "Class",
      level: "Intermediate",
      maxAttendees: 15,
      currentAttendees: 7,
      price: 80
    }
  ]

  // State for filtering
  const [category, setCategory] = useState<string>("all")
  const [level, setLevel] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  
  // Filter events based on criteria
  const filteredEvents = allEvents.filter(event => {
    // Filter by category
    if (category !== "all" && event.category !== category) return false
    
    // Filter by level
    if (level !== "all" && event.level !== level) return false
    
    // Filter by search term
    if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !event.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    
    return true
  })

  // Get featured events
  const featuredEvents = allEvents.filter(event => event.featured)
  
  // Handle class reservation
  const handleReserveClass = (classEvent: Event) => {
    // Add the class to checkout
    addClassToCheckout({
      id: classEvent.id,
      title: classEvent.title,
      price: classEvent.price,
      image: classEvent.image
    })
    
    // Redirect to checkout
    window.location.href = '/checkout'
  }
  
  return (
    <main className="min-h-screen flex flex-col bg-[#121212] relative pt-24 pb-16">
      <MotionBackground particleCount={10} />
      
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
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="text-[#BB2124]">
              Classes & Events
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto font-medium">
            Expand your knowledge and connect with our community through our workshops, demonstrations, and social gatherings.
          </p>
        </motion.div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-white">Featured Events</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ y: -5 }}
                  className="glitter-effect bg-[#1A1A1A] rounded-xl overflow-hidden shadow-lg border border-[#333] hover:shadow-[0_10px_20px_rgba(187,33,36,0.1)] transition-all duration-300"
                >
                  <div className="relative h-48">
                    <Image 
                      src={event.image} 
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#BB2124] text-black px-3 py-1 rounded-full text-xs font-bold">
                      Featured
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white">{event.title}</h3>
                      <span className="text-[#BB2124] font-semibold">${event.price}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-[#BB2124]/10 text-[#BB2124] px-2 py-1 rounded-full">
                        {event.category}
                      </span>
                      <Button 
                        className="bg-[#BB2124] hover:bg-[#8A1619] text-black"
                        onClick={() => handleReserveClass(event)}
                      >
                        Reserve Spot
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Filters */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333]">
            <h2 className="text-xl font-bold mb-4 text-white">Filter Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#444] rounded-lg focus:ring-1 focus:ring-[#BB2124] focus:border-[#BB2124] outline-none text-white"
                  />
                </div>
              </div>
              
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">Category</label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#444] rounded-lg focus:ring-1 focus:ring-[#BB2124] focus:border-[#BB2124] outline-none text-white appearance-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Demonstration">Demonstration</option>
                    <option value="Discussion">Discussion</option>
                    <option value="Social">Social</option>
                    <option value="Special">Special</option>
                    <option value="Class">Class</option>
                  </select>
                </div>
              </div>
              
              {/* Level Filter */}
              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">Level</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#444] rounded-lg focus:ring-1 focus:ring-[#BB2124] focus:border-[#BB2124] outline-none text-white appearance-none"
                  >
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">Mixed Levels</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* All Events */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Available Events</h2>
            <p className="text-gray-400">{filteredEvents.length} events found</p>
          </div>
          
          {filteredEvents.length === 0 ? (
            <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-10 text-center">
              <h3 className="text-xl font-medium text-white mb-2">No events found</h3>
              <p className="text-gray-400">Try adjusting your filters to find what you're looking for.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ y: -5 }}
                  className="glitter-effect bg-[#1A1A1A] rounded-xl overflow-hidden shadow-md border border-[#333] hover:shadow-[0_10px_20px_rgba(187,33,36,0.1)] transition-all duration-300"
                >
                  <div className="relative h-48">
                    <Image 
                      src={event.image} 
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    {event.currentAttendees / event.maxAttendees > 0.75 && (
                      <div className="absolute top-3 left-3 bg-[#721c24] text-white px-3 py-1 rounded-full text-xs font-medium">
                        Filling Fast
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-white">{event.title}</h3>
                      <span className="text-[#BB2124] font-semibold">${event.price}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-1">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-[#BB2124]/10 text-[#BB2124] px-2 py-1 rounded-full">
                          {event.category}
                        </span>
                        <span className="text-xs bg-[#333] text-gray-300 px-2 py-1 rounded-full">
                          {event.level}
                        </span>
                      </div>
                      <Button 
                        className="bg-[#BB2124] hover:bg-[#8A1619] text-white"
                        onClick={() => handleReserveClass(event)}
                      >
                        Reserve
                      </Button>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                        <span>{event.currentAttendees} / {event.maxAttendees} spots filled</span>
                        <span>{Math.round((event.currentAttendees / event.maxAttendees) * 100)}%</span>
                      </div>
                      <div className="w-full bg-[#333] rounded-full h-1.5">
                        <div 
                          className="bg-[#BB2124] h-1.5 rounded-full" 
                          style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
        
        {/* Registration CTA */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-[#121212] border border-[#333] rounded-xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#BB2124]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#BB2124]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Interested in Teaching or Hosting an Event?
              </h2>
              <p className="text-gray-300 mb-8">
                Share your knowledge and expertise with our community. We're always looking for educators, presenters, and experts to lead workshops and classes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  className="bg-[#BB2124] hover:bg-[#8A1619] text-white px-6 py-2 rounded-lg"
                  onClick={() => {
                    addClassToCheckout({
                      id: "teach-application",
                      title: "Teaching Application",
                      price: 25, // Application fee
                      image: "/placeholder.svg?height=400&width=600"
                    });
                    window.location.href = '/checkout';
                  }}
                >
                  Apply to Teach
                </Button>
                <Button 
                  className="bg-transparent border border-[#BB2124] text-[#BB2124] hover:bg-[#BB2124]/10 px-6 py-2 rounded-lg"
                  onClick={() => {
                    addClassToCheckout({
                      id: "teaching-info",
                      title: "Teaching Information Package",
                      price: 15, // Information package fee
                      image: "/placeholder.svg?height=400&width=600"
                    });
                    window.location.href = '/checkout';
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
} 